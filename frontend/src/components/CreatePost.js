import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    const post = {
      content,
      image
    };

    try {
      const response = await axios.post('http://localhost:5001/api/posts', post, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      setContent('');
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Control
          as="textarea"
          name="content"
          rows={3}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default CreatePost;
