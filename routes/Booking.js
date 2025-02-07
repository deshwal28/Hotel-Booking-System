const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: '❌ Server Error', error });
  }
});

// ✅ POST a new booking
router.post('/', async (req, res) => {
  const { customerName, roomNumbers, bookingDate } = req.body;

  try {
    const newBooking = new Booking({
      customerName,
      roomNumbers,
      bookingDate,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: '❌ Error creating booking', error });
  }
});

module.exports = router;
