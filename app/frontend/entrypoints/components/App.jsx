import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router basename="/app">
        <RoutesConfig/>
      </Router>
    </LocalizationProvider>
  );
}