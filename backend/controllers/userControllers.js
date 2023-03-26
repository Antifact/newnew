const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// function for getting users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});

  res.status(200).json(users);
};

// function for getting one user
const getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      let user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: `User with ID ${userId} not found` });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};


// get the current user
const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};

// the register user function. takes the username, email and password
// checks to see if the user exists, and if so, throws an error.
// posts the user to the database using json.
const registerUser = async (req, res) => {
  try {
    const { username, email, password, bio, image } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashedPassword, bio, image });
    await newUser.save();

    
    let token = generateToken(newUser._id);
    res.status(200).json({ message: 'User successfully signed up!', token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    token = generateToken(user._id);
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });

    console.log(token);

    res.status(200).json({ message: 'User successfully logged in!', token });
  } else {
    res.status(400);
    throw new Error('Invalid username or password!');
  }
});

module.exports = { getUsers, getUser, getCurrentUser, registerUser, loginUser };