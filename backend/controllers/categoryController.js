const Category = require('../models/Category')

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
    res.status(200).json({
      success: true,
      categories
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Create Category — Admin
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Category created!',
      category
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}