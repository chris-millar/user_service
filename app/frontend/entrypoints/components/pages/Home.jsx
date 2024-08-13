import React, { useState } from 'react';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const Home = () => {
  const [userId, setUserId] = useState('');
  const [importId, setImportId] = useState('');

  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        User Service app
      </Typography>
      <Typography variant="body1" paragraph>
        The following features are currently available:
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">View a Single User</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">
                  View a single user by entering their ID.
                </Typography>
                <TextField
                  style={{width: "75px", marginLeft: "15px"}}
                  label="id"
                  size="small"
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Box>
            </CardContent>
            <CardActions sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>
              <Typography
                component={RouterLink}
                to={`/users/${userId}`}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Go to user with ID { userId }
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">View All Users</Typography>
              <Typography variant="body2">
                View all users with filtering and pagination options.
                <ul>
                  <li>paginate through all results via the table. Page size is fixed to 25.</li>
                  <li>live server filter by profession</li>
                  <li>
                    live server filter by a date range.
                    The range is inclusive of the min and max dates (aka gte and lte).
                    You may specify one or both sides of the range.
                  </li>
                  <li>
                    the table provides:
                    <ul>
                      <li>client sorting and filtering by column on the loaded page</li>
                      <li>customizing which columns are displayed</li>
                    </ul>
                  </li>

                </ul>
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>
              <Typography
                component={RouterLink}
                to="/users"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View users
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">View a Single Import</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">
                  View a single import by entering its ID.
                </Typography>
                <TextField
                  style={{width: "75px", marginLeft: "15px"}}
                  label="id"
                  size="small"
                  onChange={(e) => setImportId(e.target.value)}
                />
              </Box>
            </CardContent>
            <CardActions sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>
              <Typography
                component={RouterLink}
                to={`/imports/${importId}`}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Go to import with ID { importId }
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">View All Imports + Import new Users</Typography>
              <Typography variant="body2">
                View all previous Imports.
                You can also upload a new csv and import those users into the system.
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>
              <Typography
                component={RouterLink}
                to="/imports"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View imports or create a new import
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}