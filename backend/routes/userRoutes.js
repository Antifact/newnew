// import express
const express = require('express');


// import functions from the controller required for the user
const { getUsers, getUser, registerUser, loginUser } = require('../controllers/userControllers');

// import router from express
const router = express.Router();

router.route('/register').post(registerUser);

// retrieve / and /users, GET all users from the api
router.get('/', getUsers);
router.get('/users', getUsers);

// retrieve /users/:id,  GET one user
router.get('/users/:id', getUser);

// retrieve /users/me, get current user
router.get('/users/me', getUser);

// send a post request to register a user
router.post('/', registerUser);

// send a post request to login a user
router.post('/login', loginUser);

module.exports = router;