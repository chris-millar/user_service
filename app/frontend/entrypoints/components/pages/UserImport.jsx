import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import { useUserImportMutation } from '../../services/userServices';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

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

export const UserImport = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const mutation = useUserImportMutation();

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Selected File: {selectedFile.name}
          </Typography>
          <Button
            component="label"
            variant="contained"
            onClick={() => mutation.mutate( {file: selectedFile })}
          >Import File!</Button>
          { mutation.isLoading && <CircularProgress>Importing...</CircularProgress> }
          { mutation.isSuccess && <Alert severity="success">Import was successful!</Alert> }
          { mutation.isError && <Alert severity="error">Error importing file: {mutation.error.message}</Alert> }
        </>
      )}
    </>
  );
}