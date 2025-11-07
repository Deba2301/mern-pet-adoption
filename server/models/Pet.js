const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true }, // e.g., Dog, Cat
  breed: { type: String },
  age: { type: Number },
  description: { type: String },
  imageUrl: { type: String }, // URL to a photo
  status: {
    type: String,
    enum: ['available', 'adopted', 'pending'],
    default: 'available'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);