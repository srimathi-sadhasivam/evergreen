const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not set in .env');
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;

