const Order = require('../models/Order')

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryPrice,
      totalPrice
    } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid products add karo!'
      })
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryPrice,
      totalPrice
    })

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      orders
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get All Orders — Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      orders
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update Order Status — Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: 'Order status updated!',
      order
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}