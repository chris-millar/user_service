import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const renderIdAsLink = ({ value }) => {
  const path = `/users/${value}`
  return (<Link id={path} to={path}>{value}</Link>)
}

const renderImportIdAsLink = ({ value }) => {
  const path = `/imports/${value}`
  return (<Link id={path} to={path}>{value}</Link>)
}

export const columns = [
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
  { field: 'import_id', headerName: 'Import ID', type: 'number', width: 75, renderCell: renderImportIdAsLink }
];