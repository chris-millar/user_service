import React, { useState, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { useUsersQuery } from '../../services/userServices';

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 75 },
  { field: 'first_name', headerName: 'First name', type: 'string', width: 100 },
  { field: 'last_name', headerName: 'Last name', type: 'string', width: 100 },
  { field: 'email', headerName: 'Email', type: 'string', width: 300 },
  { field: 'profession', headerName: 'Profession', type: 'string', width: 200 },
  { field: 'city', headerName: 'City', type: 'string', width: 200 },
  { field: 'country', headerName: 'Country', type: 'string', width: 200 },
  {
    field: 'date_created',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    valueFormatter: (isoString) => DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_SHORT),
    sortComparator: (dateTime1, dateTime2) => dateTime1.toMillis() - dateTime2.toMillis(),
  },
];

export const UserList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const { isLoading, data } = useUsersQuery(paginationModel);
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
      <div style={{height: 400, width: '100%'}}>
        <DataGrid
          rows={data?.users || []}
          columns={columns}
          rowCount={rowCount}
          loading={isLoading}
          pageSizeOptions={[25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    </>
)
  ;
}