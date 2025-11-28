const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  DateOfBirth: { type: String, required: true }
});

// Prevent "model overwrite" errors
module.exports = mongoose.models.Student || mongoose.model("Student", studentSchema);
