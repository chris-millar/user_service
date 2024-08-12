import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import React from 'react';

export const UserListFilters = ({
   setProfessionFilter,
   setMinDateFilter,
   maxDateFilter,
   setMaxDateFilter,
   minDateFilter,
   initialImportId,
   setImportIdFilter
}) => {
  return (
    <>
      Custom Filters
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="profession-filter"
            label="Profession Filter"
            variant="outlined"
            margin="normal"
            size="small"
            onChange={(e) => {
              setProfessionFilter(e.target.value)
            }
            }/>
        </Grid>
        <Grid item xs={3}>
          <DateField
            label="After Date"
            variant="outlined"
            size="small"
            margin="normal"
            clearable
            onChange={(value, _) => {
              setMinDateFilter(value)
            }}
            maxDate={maxDateFilter?.minus({ days: 1 })}
          />
        </Grid>
        <Grid item xs={3}>
          <DateField
            label="Before Date"
            variant="outlined"
            size="small"
            margin="normal"
            clearable
            onChange={(value, _) => {
              setMaxDateFilter(value)
            }}
            minDate={minDateFilter?.plus({ days: 1 })}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            id="import-filter"
            label="Import ID"
            variant="outlined"
            margin="normal"
            size="small"
            style={{width: "100px"}}
            defaultValue={initialImportId}
            onChange={(e) => {
              setImportIdFilter(e.target.value)
            }}
          />
        </Grid>
      </Grid>
    </>
  )
};