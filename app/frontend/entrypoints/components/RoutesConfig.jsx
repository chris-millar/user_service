import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { Home } from './pages/Home';
import { UserList } from './pages/users/UserList';
import { UserImport } from './pages/imports/UserImport';
import { User } from './pages/User';
import { Import } from './pages/Import';

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<User />} />
        <Route path="imports" element={<UserImport />} />
        <Route path="imports/:id" element={<Import />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}