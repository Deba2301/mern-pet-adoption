const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// POST /api/applications - Create a new application (Protected route)
router.post('/', auth, async (req, res) => {
  try {
    // 1. Check if user already applied for THIS specific pet
    const existingApplication = await Application.findOne({
        user: req.user._id,
        pet: req.body.petId
    });
    if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this pet.' });
    }

    // 2. Create new application
    const application = new Application({
      user: req.user._id, // Got from the auth middleware
      pet: req.body.petId,
      userMessage: req.body.userMessage
    });

    const savedApp = await application.save();
    res.status(201).json(savedApp);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications - Get ALL applications (For Admin mainly)
router.get('/', auth, async (req, res) => {
    try {
        // .populate() replaces the IDs with the actual Pet/User data
        const applications = await Application.find()
            .populate('pet', 'name species imageUrl')
            .populate('user', 'username email');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/applications/:id - Update status (Admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;

        // 1. Update the application status
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        // 2. IF APPROVED: Automatically mark the PET as 'adopted'
        if (status === 'approved') {
            const Pet = require('../models/Pet'); // Import here to avoid circular dependency issues
            await Pet.findByIdAndUpdate(application.pet, { status: 'adopted' });
        }

        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;