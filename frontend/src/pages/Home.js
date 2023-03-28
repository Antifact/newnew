import React, { useState, useEffect } from 'react';
import NavBar from '../components/common/NavBar';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';

const Home = () => {

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


  return (
    <>
      <NavBar />
      <h1>Hello</h1>
      
      { currentUser ? 
        <CreatePost />
        :
        null
      }

      <PostFeed />
    </>
  )
}

export default Home;