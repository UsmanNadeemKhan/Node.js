const { signupUser, loginUser } = require('../Service/userService');
const User = require('../Model/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123'; // same as in auth.js

// Signup
async function signup(req, res) {
  try {
    const user = await signupUser(req.body);

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET
    );

    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Login
async function login(req, res) {
  try {
    const user = await loginUser(req.body);

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET
    );

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get single user
async function getUser(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update user
async function updateUser(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete user
async function deleteUser(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { signup, login, getAllUsers, getUser, updateUser, deleteUser };
