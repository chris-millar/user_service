import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const renderIdAsLink = ({ value }) => {
  const path = `/imports/${value}`
  return (<Link id={path} to={path}>{value}</Link>)
}

export const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 75, renderCell: renderIdAsLink },
  { field: 'filename', headerName: 'Filename', type: 'string', width: 200 },
  { field: 'status', headerName: 'Status', type: 'string', width: 75 },
  { field: 'record_count', headerName: 'Record Count', type: 'string', width: 150 },
  {
    field: 'performed_at',
    headerName: 'Performed At',
    type: 'date',
    width: 200,
    valueFormatter: (isoString) => DateTime.fromISO(isoString).toLocaleString(DateTime.DATETIME_MED),
    sortComparator: (dateTime1, dateTime2) => dateTime1.toMillis() - dateTime2.toMillis(),
  },
];