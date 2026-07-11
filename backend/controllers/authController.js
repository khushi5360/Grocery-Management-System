const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    const user = await User.create({ name, email, password, phone })
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true, runValidators: true }
    )
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Get All Users — Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get All Users — Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}