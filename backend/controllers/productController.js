const Product = require('../models/Product')
const Category = require('../models/Category')

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    // URL se query parameters lao
    const { category, search, best, offer } = req.query

    // Filter object banao
    let filter = { isActive: true }

    // Category filter
    if (category) {
      const categoryDoc = await Category.findOne({ 
        name: { $regex: category, $options: 'i' } 
      })
      if (categoryDoc) {
        filter.category = categoryDoc._id
      }
    }

    // Search filter
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    // Best seller filter
    if (best === 'true') {
      filter.isBestSeller = true
    }

    // Database se products lao
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: products.length,
      products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get Single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      product
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Create Product — Admin only
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update Product — Admin only
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Delete Product — Admin only
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

