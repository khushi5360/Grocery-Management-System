const express = require('express')
const router = express.Router()
const { 
  getCategories, 
  createCategory 
} = require('../controllers/categoryController')
const { isAuthenticated, isAdmin } = require('../middleware/auth')

router.get('/', getCategories)
router.post('/', isAuthenticated, isAdmin, createCategory)

module.exports = router