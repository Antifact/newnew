// imports
// import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios.get('/api/')
  })

  return (
    // Bootstrap navigation for responsiveness 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Nav.Link as={Link} to="/" >BIG SHITTERS</Nav.Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/about" >About</Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={Link} to={`/users/${user._id}`}><Avatar src='{user.image}'/></Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;