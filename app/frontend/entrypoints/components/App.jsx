import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';

export const App = () => {
  return (
    <Router basename="/app">
      <RoutesConfig/>
    </Router>
  );
}