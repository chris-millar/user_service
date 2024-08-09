import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { Home } from './pages/Home';
import { UserList } from './pages/users/UserList';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}