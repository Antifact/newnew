import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

function ShowUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <h2><Link to={`/users/${user._id}`}>{user.username}</Link></h2>
            <p>Email: {user.email}</p>
            <Avatar src={user.image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowUsers;
