import React, {useState, useMemo, useRef, useCallback} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useUsersQuery } from '../../services/userServices';

const PAGE_SIZE = 50;

const renderIdAsLink = ({ value }) => {
  const path = `/users/${value}`
  return (<Link id={path} to={path}>{value}</Link>)
}

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 75, renderCell: renderIdAsLink },
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
    pageSize: PAGE_SIZE,
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
      <div style={{height: 500, width: '100%'}}>
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
)
  ;
}