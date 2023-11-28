const jwt = require('jsonwebtoken');
const db = require('../db'); // Import your MySQL connection

const secretKey = 'your_secret_key'; // Replace with your actual secret key

exports.verifyTokenAndRole = (requiredRole) => (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (decoded.role !== requiredRole) {
      return res.status(403).send({ auth: false, message: 'Insufficient permissions.' });
    }

    req.userId = decoded.id;
    next();
  });
};
