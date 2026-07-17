import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar, FiFilter, FiSearch } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const category = searchParams.get('category')
  const search = searchParams.get('search')

  // Fetch products from the backend API based on category and search parameters

  useEffect(() => {
    fetchProducts()
  }, [category, search])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      let url = 'http://localhost:5000/api/products'
      const params = new URLSearchParams()
      
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      
      if (params.toString()) {
        url += '?' + params.toString()
      }

      console.log('Fetching:', url) // Debug ke liye

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setProducts(data.products)
      }

    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </h1>
          <p className="text-gray-500 mt-1">
            {products.length} products found
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-gray-500 text-lg">No products found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Image Area */}
                <div className="relative bg-gray-50 p-6 flex items-center justify-center h-48">
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                  <span className="text-8xl">
                    {product.category.name === 'Fruits' ? '🍎' :
                     product.category.name === 'Vegetables' ? '🥦' :
                     product.category.name === 'Dairy' ? '🥛' :
                     product.category.name === 'Grains' ? '🌾' : '🛒'}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3    right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
                >
                  <FiHeart
                    className={`text-lg ${
                     isWishlisted(product._id)
                     ? 'fill-red-500        text-red-500'
                     : 'text-gray-400'
               }`}
                  />
                </button>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs text-green-600 font-medium">
                    {product.category.name}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-1 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
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
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}