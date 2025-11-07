require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/UserModel');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: 'admin@petadopt.com' });
    if (adminExists) {
        console.log('⚠️  Admin already exists. Skipping...');
        process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
        username: 'SuperAdmin',
        email: 'admin@petadopt.com',
        password: hashedPassword,
        role: 'admin'
    });

    await admin.save();
    console.log('✅ Super Admin created successfully!');
    console.log('👉 Email: admin@petadopt.com');
    console.log('👉 Password: admin123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();