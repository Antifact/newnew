// import express
const express = require('express');
const auth = require('../middleware/auth');


// import functions from the controller required for the user
const { getUsers, getUser, getCurrentUser, registerUser, loginUser } = require('../controllers/userControllers');

// import router from express
const router = express.Router();

router.route('/register').post(registerUser);

// retrieve /, GET all users from the api
router.get('/', getUsers);

// retrieve /users/me, get current user
router.get('/me', auth, getCurrentUser);

// retrieve /users/:id,  GET one user
router.get('/:userId', getUser);

// send a post request to register a user
router.post('/', registerUser);

// send a post request to login a user
router.post('/login', loginUser);

module.exports = router;