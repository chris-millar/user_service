import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const PageLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">User List</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>User Service App</p>
      </footer>
    </div>
  );
}