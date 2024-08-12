import React, {useMemo, useRef, useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useSearchParams } from 'react-router-dom';
import { useImportMutation, useImportsQuery } from '../../../services/importServices';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './gridConfig';

const PAGE_SIZE = 50;

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

  // const [searchParams] = useSearchParams();
  // const initialImportId = searchParams.get('import_id')
  const [filenameFilter, setFilenameFilter] = useState(null);
  const [minPerformedAtFilter, setMinPerformedAtFilter] = useState(null);
  const [maxPerformedAtFilter, setMaxPerformedAtFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const { isLoading, data, refetch: refetchImports } = useImportsQuery(
    {
      ...paginationModel,
      filters: {
        filenameFilter,
        minPerformedAtFilter,
        maxPerformedAtFilter,
        statusFilter
      }
    }
  );
  const rowCountRef = useRef(data?.pageInfo.totalImports || 0);
  const rowCount = useMemo(() => {
    if (data?.pageInfo.totalImports !== undefined) {
      rowCountRef.current = data?.pageInfo.totalImports;
    }
    return rowCountRef.current;
  }, [data?.pageInfo.totalImports]);

  const mutation = useImportMutation({
    onSuccess: () => {
      refetchImports()
    }
  });

  return (
    <>
      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon/>}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
        </Button>
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
      </div>
      <div style={{height: 450, width: '100%'}}>
        <DataGrid
          rows={data?.imports || []}
          columns={columns}
          rowCount={rowCount}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'linear-progress',
              noRowsVariant: 'linear-progress',
            },
          }}
          pageSizeOptions={[PAGE_SIZE]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}