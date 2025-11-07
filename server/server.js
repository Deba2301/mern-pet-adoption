require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRouter = require('./routes/auth');
const petsRouter = require('./routes/pets');
const applicationsRouter = require('./routes/applications');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use('/api/auth', authRouter);
app.use('/api/pets', petsRouter);
app.use('/api/applications', applicationsRouter);

// Database Connection
// Ensure MONGO_URI in .env is set to: mongodb://127.0.0.1:27017/petdb (for local)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Basic Testing Route
app.get('/', (req, res) => {
  res.send('Pet Adoption API is running...');
});

// --- TEMPORARY ADMIN ROUTE (DELETE AFTER USE) ---
app.get('/make-me-admin', async (req, res) => {
    const User = require('./models/UserModel');
    // *** IMPORTANT: CHANGE THIS TO YOUR ACTUAL EMAIL ***
    const myEmail = 'admin@test.com';

    try {
      const user = await User.findOneAndUpdate(
          { email: myEmail },
          { role: 'admin' },
          { new: true }
      );
      if (!user) return res.send(`User with email ${myEmail} not found.`);
      res.send(`Success! User ${user.username} is now an Admin permanently. Log out and log back in.`);
    } catch (err) {
      res.send("Error: " + err.message);
    }
  });
// -----------------------------------------------

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});