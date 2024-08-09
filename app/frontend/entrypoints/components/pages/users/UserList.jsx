import React, {useState, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useUsersQuery } from '../../../services/userServices';
import { columns } from './gridConfig';

const PAGE_SIZE = 50;

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
  );
}