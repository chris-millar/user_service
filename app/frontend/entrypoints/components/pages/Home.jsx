import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export const Home = () => {
  const [userId, setUserId] = useState('');
  const [importId, setImportId] = useState('');

  return (
    <>
      <h1>Landing Page for the User Service app</h1>
      <br/>
      The following features are currently available:
      <ul>
        <li>
          <div style={{display: "flex", alignItems: "center"}}>
            <div>Viewing a single user via <Link to={`/users/${userId}`}>{`/users/${userId}`}</Link> for a specified ID
            </div>
            &nbsp;&nbsp;
            <TextField style={{width: "75px"}} label="id" size="small" onChange={(e) => setUserId(e.target.value)}/>
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
          <div style={{display: "flex", alignItems: "center"}}>
            <div>Viewing a single import via&nbsp;&nbsp;<Link to={`/imports/${importId}`}>{`/imports/${importId}`}</Link> for a specified ID
            </div>
            &nbsp;&nbsp;
            <TextField style={{width: "75px"}} label="id" size="small" onChange={(e) => setImportId(e.target.value)}/>
          </div>
        </li>
        <li>
          Viewing previous Imports and starting a new one from a csv of Users from your machine via
          &nbsp;
          <Link to={`/imports`}>
            /imports
          </Link>
        </li>
      </ul>
    </>
  );
}