import React, {useMemo, useRef, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useUsersQuery} from '../../../services/userServices';
import {columns} from './gridConfig';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import Grid from '@mui/material/Grid';

const PAGE_SIZE = 50;

export const UserList = () => {
  const [professionFilter, setProfessionFilter] = useState(null);
  const [minDateFilter, setMinDateFilter] = useState(null);
  const [maxDateFilter, setMaxDateFilter] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const { isLoading, data } = useUsersQuery(
    {
      ...paginationModel,
      filters: {
        professionFilter,
        minDateFilter,
        maxDateFilter
      }
    }
  );
  const rowCountRef = useRef(data?.pageInfo.totalUsers || 0);
  const rowCount = useMemo(() => {
    if (data?.pageInfo.totalUsers !== undefined) {
      rowCountRef.current = data?.pageInfo.totalUsers;
    }
    return rowCountRef.current;
  }, [data?.pageInfo.totalUsers]);


  return (
    <>
      <br/>
      Custom Filters
      <Grid container spacing={2}>
        <Grid item xs={3}>
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
        <Grid item xs={2}>
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
        <Grid item xs={2}>
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
      </Grid>
      <div style={{height: 450, width: '100%'}}>
        <DataGrid
          rows={data?.users || []}
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