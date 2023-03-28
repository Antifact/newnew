const Post = require('../models/postModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new post
const createPost = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decoded.sub;

    // console.log(decoded.sub);

    const user = await User.findById(userId).select('-password');

    const post = await Post.create({
      userId,
      username: user.username,
      content: req.body.content
    });

    return res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error!' });
  }
};



// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a post by id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a post by id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { username, content, image } = req.body;
    post.username = username || post.username;
    post.content = content || post.content;
    post.image = image || post.image;
    await post.save();
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post by id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.delete();
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };