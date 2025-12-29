const express = require('express');
const router = express.Router();

const { signup, login, getAllUsers, getUser, updateUser, deleteUser } = require('../Controller/userController');

const authenticateToken = require('../Middleware/auth');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// Protected CRUD routes (token required)
router.get('/', authenticateToken, getAllUsers);       // Get all users
router.get('/:id', authenticateToken, getUser);        // Get single user
router.put('/:id', authenticateToken, updateUser);     // Update user
router.delete('/:id', authenticateToken, deleteUser);  // Delete user

module.exports = router;



