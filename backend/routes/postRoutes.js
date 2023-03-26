

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postControllers');


// Create a new post
router.post('/', createPost);

// Update an existing post by ID
router.put('/:id', updatePost);

// Delete a post by ID
router.delete('/:id', deletePost);

// Get all posts
router.get('/', getAllPosts);

// Get post by ID
router.get('/:id', getPostById);

module.exports = router;
