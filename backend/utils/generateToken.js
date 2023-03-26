const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;

const generateToken = (id) => {
  const payload = {
    sub: id, // Add the 'sub' claim to the payload
    iat: Date.now() // Add the 'iat' (issued at) claim to the payload
  };
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

module.exports = generateToken;