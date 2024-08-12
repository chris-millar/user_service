import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Person, ImportContacts } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';


const drawerWidth = 150;

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Users', icon: <Person />, path: '/users' },
  { text: 'Imports', icon: <ImportContacts />, path: '/imports' },
];

const onMenuItem = (location, item) => {
  if (item.path === `/`) {
    return location.pathname === item.path
  }

  return location.pathname.startsWith(item.path)
}

export const PageLayout = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              selected={onMenuItem(location, item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
};