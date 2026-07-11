const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')
const { isAuthenticated, isAdmin } = require('../middleware/auth')


// Public Routes — koi bhi access kar sakta hai
router.get('/', getProducts)
router.get('/:id', getProduct)

// Admin Routes — sirf admin
router.post('/', isAuthenticated, isAdmin, createProduct)
router.put('/:id', isAuthenticated, isAdmin, updateProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)

module.exports = router