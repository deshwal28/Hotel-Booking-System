// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import authentication routes

// ✅ Initialize Express app
const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Database connection
mongoose.connect('mongodb+srv://khushdeshwal28:%23Deshwal_28@hotel-booking-db.35loo.mongodb.net/hotel-booking')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Booking Model (Simple Example)
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  roomType: String,
  checkInDate: Date,
  checkOutDate: Date
});
const Booking = mongoose.model('Booking', bookingSchema);

// ✅ Routes
app.use('/api/auth', authRoutes); // Apply auth routes

// ✅ Booking Route
app.post('/api/booking/book', async (req, res) => {
  console.log('Incoming Request:', req.body);  // Debug log

  const { name, email, roomType, checkInDate, checkOutDate } = req.body;

  if (!name || !email || !roomType || !checkInDate || !checkOutDate) {
    console.log('Validation Failed:', { name, email, roomType, checkInDate, checkOutDate });
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newBooking = new Booking({ name, email, roomType, checkInDate, checkOutDate });
    await newBooking.save();
    res.status(200).json({ message: '✅ Booking successful!', data: newBooking });
  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({ message: 'Error while booking.' });
  }
});

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

