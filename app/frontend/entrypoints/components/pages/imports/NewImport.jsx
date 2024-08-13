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
            {mutation.isSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Import was successful!
              </Alert>
            )}
            {mutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Error importing file: {mutation.error.response.data.error}
              </Alert>
            )}

            {selectedFile && (
              <>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Selected File: {selectedFile.name}
                </Typography>

                {mutation.isSuccess && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <Link to={`/users?import_id=${mutation.data.id}`}>
                      View Users from import
                    </Link>
                  </Typography>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 4,
                    borderTop: '1px solid #ddd',
                    pt: 2,
                  }}
                >
                  <Button variant="outlined" onClick={closeModal} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button
                    component="label"
                    variant="contained"
                    onClick={() => mutation.mutate({ file: selectedFile })}
                  >
                    Complete Import
                  </Button>
                </Box>

                {mutation.isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Importing...</Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}