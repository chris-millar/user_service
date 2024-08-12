import React from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
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
        <Field label={"Record Count"} value={import_record.record_count}/>
        <DateField disabled label={"Performed At"} defaultValue={DateTime.fromISO(import_record.performed_at)} />
      </Stack>
    </>
  );
}