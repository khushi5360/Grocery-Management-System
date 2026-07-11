const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name:     { type: String,  required: true },
    image:    { type: String,  default: '' },
    price:    { type: Number,  required: true },
    quantity: { type: Number,  required: true, min: 1 }
  }],
  shippingAddress: {
    street:  { type: String, required: true },
    city:    { type: String, required: true },
    state:   { type: String, required: true },
    pincode: { type: String, required: true },
    phone:   { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Online'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  itemsPrice:    { type: Number, required: true, default: 0 },
  deliveryPrice: { type: Number, required: true, default: 0 },
  discount:      { type: Number, default: 0 },
  totalPrice:    { type: Number, required: true, default: 0 },
  deliveredAt:   { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)