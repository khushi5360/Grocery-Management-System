import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">❤️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Wishlist Empty Hai!
          </h2>
          <p className="text-gray-500 mb-6">
            Products save karo — baad mein khareedna!
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            🛒 Products Dekho
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist ❤️
          </h1>
          <span className="text-gray-500">
            {wishlistItems.length} items
          </span>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative bg-gray-50 p-6 flex items-center justify-center h-40">
                <span className="text-6xl">
                  {product.category?.name === 'Fruits' || product.category === 'Fruits' ? '🍎' :
                   product.category?.name === 'Vegetables' || product.category === 'Vegetables' ? '🥦' :
                   product.category?.name === 'Dairy' || product.category === 'Dairy' ? '🥛' :
                   product.category?.name === 'Grains' || product.category === 'Grains' ? '🌾' :
                   product.emoji || '🛒'}
                </span>

                {/* Remove from Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <span className="text-xs text-green-600 font-medium">
                  {product.category?.name || product.category}
                </span>
                <h3 className="font-semibold text-gray-800 mt-1 mb-1 text-sm">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(product)
                    toggleWishlist(product)
                  }}
                  className="w-full py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="text-sm" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}