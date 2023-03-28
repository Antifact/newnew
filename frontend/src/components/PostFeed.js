import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts');
      setPosts(response.data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {Array.isArray(posts) && posts.map(post => (
        <div key={post._id}>
          <p>{post.username}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
