const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the user data (id & role) to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};