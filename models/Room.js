const mongoose = require('mongoose');

// Define the schema for a room
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  floor: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }, // Available or not
});

// Create a model based on the schema
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;