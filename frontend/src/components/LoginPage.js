import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/users/login', { username, password });
      localStorage.setItem('accessToken', response.data.token);
      // Redirect to user profile page
      window.location = `/users/${response.data.id}`;
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div className='form-container'>
      <legend>Login</legend>

      <Form onSubmit={handleSubmit} className='form-wrapper'>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="john doe"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
        </Form.Group>

        <Button variant="light" type="Login">
          Submit Post
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;