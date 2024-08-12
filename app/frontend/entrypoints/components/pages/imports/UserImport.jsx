import React, {useMemo, useRef, useState} from 'react';
import { styled } from '@mui/material/styles';
import { useImportsQuery } from '../../../services/importServices';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './gridConfig';
import { NewImport } from './NewImport';

const PAGE_SIZE = 50;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const UserImport = () => {
  const [filenameFilter, setFilenameFilter] = useState(null);
  const [minPerformedAtFilter, setMinPerformedAtFilter] = useState(null);
  const [maxPerformedAtFilter, setMaxPerformedAtFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const { isLoading, data, refetch: refetchImports } = useImportsQuery(
    {
      ...paginationModel,
      filters: {
        filenameFilter,
        minPerformedAtFilter,
        maxPerformedAtFilter,
        statusFilter
      }
    }
  );
  const rowCountRef = useRef(data?.pageInfo.totalImports || 0);
  const rowCount = useMemo(() => {
    if (data?.pageInfo.totalImports !== undefined) {
      rowCountRef.current = data?.pageInfo.totalImports;
    }
    return rowCountRef.current;
  }, [data?.pageInfo.totalImports]);

  return (
    <>
      <NewImport refetchImports={() => refetchImports()} />
      <div style={{height: 450, width: '100%'}}>
        <DataGrid
          rows={data?.imports || []}
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