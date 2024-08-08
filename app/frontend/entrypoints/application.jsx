import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { Settings } from 'luxon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

// server uses UTC and the dates were given a time of midnight UTC, so we want to parse/save all Dates in UTC
Settings.defaultZone = 'utc';
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);