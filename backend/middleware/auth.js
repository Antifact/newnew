const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const auth = async (req, res, next) => {
  try {
    // Get the access token from the request headers

    // console.log('Auth middleware called');
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // If there is no token, the user is not authenticated
        return res.status(401).json({ message: 'No Token' });
    }

    // Verify and decode the access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the access token
    const user = await User.findById(decoded.sub).select('-password');

    // console.log(authHeader)

    if (!user) {
        // console.log('no user')
        // If no user is found with the given ID, the user is not authenticated
        return res.status(401).json({ message: 'no user with given id' });
    }

    // Set the authenticated user in the request object
    req.user = user;
    next();
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = auth;