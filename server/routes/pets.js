const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// PUBLIC ROUTES ------------------------------------

// GET /api/pets - Get all pets (Everyone can see this)
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/pets/:id - Get one pet details
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN ONLY ROUTES 🔒 -----------------------------

// POST /api/pets - Add a new pet
// Notice we use BOTH middlewares: first check if logged in (auth), THEN check if admin (admin)
router.post('/', [auth, admin], async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    status: req.body.status || 'available' // Admins might want to add a pet that is already 'pending'
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/pets/:id - Edit a pet
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        res.json(updatedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/pets/:id - Delete a pet
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;