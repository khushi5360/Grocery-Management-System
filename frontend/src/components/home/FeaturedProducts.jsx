import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

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
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  )
}

function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const emoji =
    product.category?.name === 'Fruits' ? '🍎' :
    product.category?.name === 'Vegetables' ? '🥦' :
    product.category?.name === 'Dairy' ? '🥛' :
    product.category?.name === 'Grains' ? '🌾' : '🛒'

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
      <div className="relative bg-gray-50 p-6 flex items-center justify-center h-48">
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </span>
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition opacity-0 group-hover:opacity-100"
        >
          <FiHeart
            className={`text-lg ${
              isWishlisted(product._id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400'
            }`}
          />
        </button>

        {product.images && product.images.length > 0 && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
        ) : null}
        <span
          className="text-8xl group-hover:scale-110 transition-transform duration-300"
          style={{ display: product.images && product.images.length > 0 && product.images[0] ? 'none' : 'block' }}
        >
          {emoji}
        </span>
      </div>
      <div className="p-4">
        <span className="text-xs text-green-600 font-medium">
          {product.category?.name}
        </span>
        <h3 className="font-semibold text-gray-800 mt-1 mb-1">
          {product.name}
        </h3>
        <StarRating rating={product.ratings?.average || 0} />
        <div className="flex items-center gap-2 mt-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.originalPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
          <span className="text-xs text-gray-500">/{product.unit}</span>
        </div>
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured()
  }, [])

  const fetchFeatured = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()

      if (data.success) {
        const featured = data.products.filter((p) => p.isFeatured)
        setProducts(featured.length > 0 ? featured.slice(0, 4) : data.products.slice(0, 4))
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || products.length === 0) return null

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">Handpicked fresh products for you</p>
          </div>
          <Link to="/products" className="text-green-600 font-semibold hover:text-green-700 transition">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
