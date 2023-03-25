// import express
const express = require('express');

// import Post controller 
const { getPosts, getPost, createPost, deletePost, editPost } = require('../controllers/postControllers');

// import router from express
const router = express.Router();

// retrieve / GET all blog posts from the api
router.get('/', getPosts);

// retrieve / GET individual blog posts
router.get('/:id', getPost);

// send / POST new blog post
router.post('/', createPost);

// remove / DELETE blog post
router.delete('/:id', deletePost);

// edit / UPDATE blog post
router.patch('/:id', editPost);

module.exports = router;