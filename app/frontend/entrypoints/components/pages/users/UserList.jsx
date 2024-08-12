import React, { useMemo, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useUsersQuery } from '../../../services/userServices';
import { columns } from './gridConfig';
import { useSearchParams } from 'react-router-dom';
import { UserListFilters } from './UserListFilters';

const PAGE_SIZE = 50;

export const UserList = () => {
  const [searchParams] = useSearchParams();
  const initialImportId = searchParams.get('import_id')
  const [professionFilter, setProfessionFilter] = useState(null);
  const [minDateFilter, setMinDateFilter] = useState(null);
  const [maxDateFilter, setMaxDateFilter] = useState(null);
  const [importIdFilter, setImportIdFilter] = useState(initialImportId);

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
        maxDateFilter,
        importIdFilter
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
      <UserListFilters
        setProfessionFilter={setProfessionFilter}
        setMinDateFilter={setMinDateFilter}
        setMaxDateFilter={setMaxDateFilter}
        setImportIdFilter={setImportIdFilter}
        maxDateFilter={maxDateFilter}
        minDateFilter={minDateFilter}
        initialImportId={initialImportId}
      />
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