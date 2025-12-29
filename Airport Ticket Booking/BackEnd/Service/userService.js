const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123';

// Signup user
async function signupUser(data) {
  const { fullName, email, password, phone, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const user = new User({ fullName, email, password, phone, role });
  await user.save();

  return user;
}

// Login user
async function loginUser(data) {
  const { email, password } = data;

  const user = await User.findOne({ email, password });
  if (!user) throw new Error("Invalid email or password");

  return user;
}

module.exports = { signupUser, loginUser };
