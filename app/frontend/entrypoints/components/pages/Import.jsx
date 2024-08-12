import React from 'react';
import { DateTime } from 'luxon';
import {Link, useParams} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {useImportQuery} from '../../services/importServices';

const Field = ({label, value}) => {
  return (
    <TextField disabled variant="outlined" defaultValue={value} label={label}/>
  )
}

const RecordCountLinkToUsers = ({ label, importId, recordCount }) => {
  return (
    <Box position="relative" display="inline-block">
      <TextField
        defaultValue={recordCount}
        disabled
        fullWidth
        label={label}
      />
      <Link
        to={`/users?import_id=${importId}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'inherit',
          pointerEvents: importId ? 'auto' : 'none',
        }}
      >
      </Link>
    </Box>
  );
};

export const Import = () => {
  const { id } = useParams();
  const { data: import_record, isLoading, error } = useImportQuery(id);

  if (isLoading) return (
    <Box sx={{ width: '100%' }}>
      Loading: <CircularProgress />
    </Box>
  )
  if (error) return (<Alert severity="error">{ error.message }</Alert>)

  return (
    <>
      <br/>
      <Stack spacing={2}>
        <Field label={"Filename"} value={import_record.filename}/>
        <Field label={"Status"} value={import_record.status}/>
        <RecordCountLinkToUsers label={"Record Count"} recordCount={import_record.record_count} importId={id}/>
        <DateField disabled label={"Performed At"} defaultValue={DateTime.fromISO(import_record.performed_at)} />
      </Stack>
    </>
  );
}