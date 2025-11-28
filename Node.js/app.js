const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/Students"); 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const url = "mongodb+srv://usman:usman.123@cluster0.c5mguqg.mongodb.net/"; 
mongoose.connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/students", studentRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
