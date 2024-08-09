import React, {useMemo, useRef, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useUsersQuery} from '../../../services/userServices';
import {columns} from './gridConfig';
import TextField from '@mui/material/TextField';

const PAGE_SIZE = 50;

export const UserList = () => {
  const [professionFilter, setProfessionFilter] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const { isLoading, data } = useUsersQuery({ ...paginationModel, filters: { professionFilter } });
  const rowCountRef = useRef(data?.pageInfo.totalUsers || 0);
  const rowCount = useMemo(() => {
    if (data?.pageInfo.totalUsers !== undefined) {
      rowCountRef.current = data?.pageInfo.totalUsers;
    }
    return rowCountRef.current;
  }, [data?.pageInfo.totalUsers]);


  return (
    <>
      <div>UserList</div>
      <br/>
      <TextField
        id="profession-filter"
        label="Profession Filter"
        variant="standard"
        onChange={(e) => {
          setProfessionFilter(e.target.value)
        }
      }/>
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