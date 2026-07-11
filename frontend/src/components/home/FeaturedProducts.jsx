import { useState } from 'react'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'

// Sample product data

const products = [
  { 
    id: 1, 
    name: 'Fresh Apple', 
    price: 120, 
    originalPrice: 150, 
    discount: 20, 
    unit: 'kg', 
    rating: 4.5, 
    emoji: '🍎', 
    category: 'Fruits' 
  },
  { 
    id: 2, 
    name: 'Banana', 
    price: 60, 
    originalPrice: 80, 
    discount: 25, 
    unit: 'kg', 
    rating: 4.3, 
    emoji: '🍌', 
    category: 'Fruits' 
  },
  { 
    id: 3, 
    name: 'Broccoli', 
    price: 80, 
    originalPrice: 100, 
    discount: 20,
    unit: 'kg', 
    rating: 4.6, 
    emoji: '🥦', 
    category: 'Vegetables' 
  },
  { 
    id: 4, 
    name: 'Tomato', 
    price: 30, 
    originalPrice: 40, 
    discount: 25, 
    unit: 'kg', 
    rating: 4.2, 
    emoji: '🍅', 
    category: 'Vegetables' 
  },
]
  
// StarRating Component

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`text-xs ${
            star <= Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">
        ({rating})
      </span>
    </div>
  )
}

// ProductCard Component

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
      
      {/* IMAGE AREA */}
      <div className="relative bg-gray-50 p-6 flex items-center justify-center h-48">
        
        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </span>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition opacity-0 group-hover:opacity-100"
        >
          <FiHeart
            className={`text-lg ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400'
            }`}
          />
        </button>

        {/* Product Emoji */}
        <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4">
        <span className="text-xs text-green-600 font-medium">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-800 mt-1 mb-1">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center gap-2 mt-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-xs text-gray-500">
            /{product.unit}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2
            ${addedToCart
              ? 'bg-green-100 text-green-600'
              : 'bg-green-600 text-white hover:bg-green-700'
            }`}
        >
          <FiShoppingCart />
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>

    </div>
  )
}

// FeaturedProducts Component

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">
              Handpicked fresh products for you
            </p>
          </div>
          <a href="/products" className="text-green-600 font-semibold hover:text-green-700 transition">
            View All →
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}
