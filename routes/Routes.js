const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const router = express.Router();

// View available rooms
router.get('/available', async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch available rooms.' });
  }
});

// Make a booking
router.post('/book', async (req, res) => {
  const { customerName, roomNumbers } = req.body;

  try {
    // Check if rooms are available
    const rooms = await Room.find({ roomNumber: { $in: roomNumbers }, isAvailable: true });

    if (rooms.length !== roomNumbers.length) {
      return res.status(400).json({ error: 'Some rooms are unavailable.' });
    }

    // Update rooms to mark them as unavailable
    await Room.updateMany(
      { roomNumber: { $in: roomNumbers } },
      { $set: { isAvailable: false } }
    );

    // Create a new booking
    const newBooking = new Booking({ customerName, roomNumbers });
    await newBooking.save();

    res.json({ message: 'Booking successful!', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed.' });
  }
});

module.exports = router;
