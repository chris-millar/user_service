import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { Home } from './pages/Home';
import { UserList } from './pages/users/UserList';
import { User } from './pages/User';

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<User />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}