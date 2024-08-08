import React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';

const Field = ({label, value}) => {
  return (
    <TextField disabled variant="outlined" defaultValue={value} label={label}/>
  )
}

export const User = () => {
  const user = {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@email.com",
    profession: "Teacher",
    country: "United States",
    city: "Atlanta",
    dateCreated: "2020-01-01T00:00:00Z"
  }

  return (
    <>
      <div>User</div>
      <br/>
      <Stack spacing={2}>
        <Field label={"First Name"} value={user.firstName}/>
        <Field label={"Last Name"} value={user.lastName}/>
        <Field label={"Email"} value={user.email}/>
        <Field label={"Profession"} value={user.profession}/>
        <Field label={"City"} value={user.city}/>
        <Field label={"Country"} value={user.country}/>
        <DateField disabled label={"Date Created"} defaultValue={dayjs(user.dateCreated)} />
      </Stack>
    </>
  );
}