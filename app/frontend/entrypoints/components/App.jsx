import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { UserList } from './UserList';
import { User } from './User';
import { NotFound } from './NotFound';
import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <Router basename="/app">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">UserList</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/users/:id" element={<User/>}/>
        <Route path="*" element={<NotFound/>}/> {/* 404 page */}
      </Routes>
    </Router>
  );
}