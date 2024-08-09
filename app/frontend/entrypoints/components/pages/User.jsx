import React from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useUserQuery } from '../../services/userServices';

const Field = ({label, value}) => {
  return (
    <TextField disabled variant="outlined" defaultValue={value} label={label}/>
  )
}

export const User = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUserQuery(id);

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
        <Field label={"First Name"} value={user.first_name}/>
        <Field label={"Last Name"} value={user.last_name}/>
        <Field label={"Email"} value={user.email}/>
        <Field label={"Profession"} value={user.profession}/>
        <Field label={"City"} value={user.city}/>
        <Field label={"Country"} value={user.country}/>
        <DateField disabled label={"Date Created"} defaultValue={DateTime.fromISO(user.date_created)} />
      </Stack>
    </>
  );
}