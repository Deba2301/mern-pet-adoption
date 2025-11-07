const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    // 1. Check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      // role: 'admin' // UNCOMMENT THIS LINE TEMPORARILY TO CREATE AN ADMIN USER
    });

    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully', userId: savedUser._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // 1. Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // 2. Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid email or password' });

    // 3. Create and assign token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token AND user info (including role) to frontend
    res.header('auth-token', token).json({
      token,
      user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role // VERY IMPORTANT: Send the role to the frontend
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;