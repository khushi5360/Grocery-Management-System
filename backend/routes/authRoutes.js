const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers
} = require('../controllers/authController')
const { isAuthenticated, isAdmin } = require('../middleware/auth')

// Public routes
router.post('/register', register)
router.post('/login', login)

// Private routes
router.get('/profile', isAuthenticated, getProfile)
router.put('/profile', isAuthenticated, updateProfile)

// Admin routes
router.get('/users', isAuthenticated, isAdmin, getAllUsers)

module.exports = router