const express = require('express')
const router = express.Router()
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController')
const { isAuthenticated, isAdmin } = require('../middleware/auth')

// Customer routes
router.post('/', isAuthenticated, createOrder)
router.get('/myorders', isAuthenticated, getMyOrders)

// Admin routes
router.get('/all', isAuthenticated, isAdmin, getAllOrders)
router.put('/:id', isAuthenticated, isAdmin, updateOrderStatus)

module.exports = router