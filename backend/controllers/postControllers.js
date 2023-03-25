// import Post schema from model
const Post = require('../models/postModel');

// import mongoose
const mongoose = require('mongoose');


// Retrieve all posts in descending order
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({createdAt: -1});

  res.status(200).json(posts);
};

// Retrieve an individual post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No post found'})
  }; 

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({error: 'No post found!'});
  }

  res.status(200).json(post);
};

// Create new post
const createPost = async (req, res) => {
  const { username, content, image } = req.body;
  const date = Date.parse(req.body.date);

  // add a post to the database, if any errors then log it
  try {
    const post = await Post.create({ username, content, image, date });
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({error: error.message});
  };
};

// delete post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No post found!'});
  };

  const post = await Post.findOneAndDelete({_id: id});

  if (!post) {
    return res.status(400).json({error: 'No post found'});
  }

  res.status(200).json(post);
};

// edit post
const editPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No post found'});
  };

  const post = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  });

  if (!post) {
    return res.status(400).json({error: 'No post found'});
  };

  res.status(200).json(post);
};


module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost
};