import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export const Home = () => {
  const [userId, setUserId] = useState('');

  return (
    <>
      <h1>Landing Page for the User Service app</h1>
      <br/>
      The following features are currently available:
      <ul>
        <li>
          <div style={{ display: "flex", alignItems: "center"}}>
            <div>Viewing a single user via <Link to={`/users/${userId}`}>{`/users/${userId}`}</Link> for a specified ID </div>
            <TextField label="id" size="small" onChange={(e) => setUserId(e.target.value)}/>
          </div>
        </li>
        <li>
          Viewing all users via <Link to="/users">/users</Link> with the ability to:
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
        </li>
        <li>
          Importing a csv of Users from your machine via
          <Link to={`/imports`}>
            Imports
          </Link>
        </li>
      </ul>
    </>
  );
}