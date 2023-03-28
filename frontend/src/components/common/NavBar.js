// imports
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import axios from 'axios';

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location = '/login';
  }

  return (
    // Bootstrap navigation for responsiveness 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Nav.Link as={Link} to="/home" >BIG SHITTERS</Nav.Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home" >Home</Nav.Link>
                <Nav.Link as={Link} to="" >About</Nav.Link>
              </Nav>

              <Nav>
                {/* {currentUser && <Avatar src={`${currentUser.image}`} />} */}

                {!currentUser ?
                  <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>

                  :

                  <>
                  <Avatar src={`${currentUser.image}`} />
                  <NavDropdown title={`${currentUser.username}`} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/users/me">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  </>
                  
                }
                
              </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;