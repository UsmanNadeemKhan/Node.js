const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  role: { type: String, enum: ["admin", "passenger"], default: "passenger" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true }
});


module.exports = mongoose.model("User", userSchema);
