import React from 'react';
import { Settings } from 'luxon';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'


export const App = () => {
  // server uses UTC and the dates were given a time of midnight UTC, so we want to parse/save all Dates in UTC
  Settings.defaultZone = 'utc';

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Router basename="/app">
        <RoutesConfig/>
      </Router>
    </LocalizationProvider>
  );
}