module.exports = function (req, res, next) {
  // 401 Unauthorized vs 403 Forbidden
  // 401 = I don't know who you are.
  // 403 = I know who you are, but you aren't allowed here.

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Admins only.' });
  }
  next();
};