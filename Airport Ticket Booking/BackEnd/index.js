const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const userRoutes = require('./Route/userRoute');
app.use('/api/users', userRoutes);

const flightRoutes = require('./Route/flightRoute');
app.use('/api/flights', flightRoutes);

const bookingRoutes = require('./Route/bookingRoute');
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// const url = "mongodb+srv://usman:usman.123@cluster0.c5mguqg.mongodb.net/airportdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

