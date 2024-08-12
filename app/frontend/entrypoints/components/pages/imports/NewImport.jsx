import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { useImportMutation } from '../../../services/importServices';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const NewImport = ({ refetchImports }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOpen(true);
    }
  };

  const mutation = useImportMutation({
    onSuccess: () => {
      refetchImports()
    }
  });
  const closeModal = () => {
    setOpen(false);
    setSelectedFile(null);
    document.getElementById('file-input').value = '';
    mutation.reset()
  }

  return (
    <>
      <div style={ { marginBottom: "15px"} }>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon/>}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} id="file-input"/>
        </Button>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedFile && (
              <>
                <Typography variant="body1" style={{marginTop: '10px'}}>
                  Selected File: {selectedFile.name}
                </Typography>
                <Button
                  component="label"
                  variant="contained"
                  onClick={() => mutation.mutate({file: selectedFile})}
                >Import File!</Button>
                {mutation.isLoading && <CircularProgress>Importing...</CircularProgress>}
                {mutation.isSuccess && (
                  <>
                    <Alert severity="success">Import was successful!</Alert>
                    <Link to={`/users?import_id=${mutation.data.id}`}>View Users from import</Link>
                  </>
                )}
                {mutation.isError &&
                  <Alert severity="error">Error importing file: {mutation.error.response.data.error}</Alert>}
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}