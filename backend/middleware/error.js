const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // MongoDB bad ObjectId error
  if (err.name === 'CastError') {
    error.message = 'Resource not found'
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    error.message = `${field} already exists`
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token'
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired, please login again'
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  })
}

module.exports = errorHandler