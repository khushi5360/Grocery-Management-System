import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const bestSellers = [
  {
    id: 1,
    name: 'Whole Milk 1L',
    price: 60,
    originalPrice: 65,
    discount: 8,
    unit: 'litre',
    rating: 4.8,
    sold: 1200,
    emoji: '🥛',
    category: 'Dairy',
  },
  {
    id: 2,
    name: 'Fresh Potato',
    price: 40,
    originalPrice: 50,
    discount: 20,
    unit: 'kg',
    rating: 4.5,
    sold: 980,
    emoji: '🥔',
    category: 'Vegetables',
  },
  {
    id: 3,
    name: 'Basmati Rice',
    price: 120,
    originalPrice: 140,
    discount: 14,
    unit: 'kg',
    rating: 4.7,
    sold: 850,
    emoji: '🍚',
    category: 'Grains',
  },
  {
    id: 4,
    name: 'Fresh Onion',
    price: 25,
    originalPrice: 35,
    discount: 29,
    unit: 'kg',
    rating: 4.3,
    sold: 760,
    emoji: '🧅',
    category: 'Vegetables',
  },
]

function BestSellerCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false)

  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">

      <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 p-6 flex items-center justify-center h-44">

        <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          <FiTrendingUp className="text-xs" />
          Best Seller
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition"
        >
          <FiHeart
            className={`text-lg ${
              isWishlisted(product.id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400'
            }`}
          />
        </button>

        <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
      </div>

      <div className="p-4">
        <span className="text-xs text-orange-500 font-medium">
          {product.category}
        </span>

        <h3 className="font-semibold text-gray-800 mt-1 mb-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-yellow-400 text-xs" />
            <span className="text-xs text-gray-600">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            {product.sold}+ sold
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          <span className="text-sm line-through text-gray-400">
            ₹{product.originalPrice}
          </span>

          <span className="text-xs text-red-500">
            -{product.discount}%
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold ${
            addedToCart
              ? 'bg-orange-100 text-orange-600'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <FiShoppingCart />
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function BestSellers() {
  return (
    <section className="py-12 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-orange-500 text-2xl" />
              <h2 className="text-3xl font-bold">
                Best Sellers
              </h2>
            </div>

            <p className="text-gray-500">
              Most loved products by our customers
            </p>
          </div>

          <Link
            to="/products?best=true"
            className="text-orange-500 font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <BestSellerCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  )
}