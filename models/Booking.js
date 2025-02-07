const mongoose = require('mongoose');

// Define the schema for booking
const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  roomNumbers: [{ type: Number, required: true }], // Array of booked room numbers
  bookingDate: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;