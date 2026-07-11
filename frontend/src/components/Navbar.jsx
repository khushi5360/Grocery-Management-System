import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown
} from 'react-icons/fi'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()

  // User check karo
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }


  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      
      {/* TOP BAR */}
      <div className="bg-green-600 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p>🚚 Free delivery on orders above ₹499</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-green-200 transition">About</Link>
            <Link to="/contact" className="hover:text-green-200 transition">Contact</Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-3xl">🛒</span>
            <span className="text-2xl font-bold text-green-600">
              Grocera
            </span>
          </Link>

          {/* SEARCH BAR */}
          <form 
            onSubmit={handleSearch}
            className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2 max-w-xl mx-auto"
          >
            <FiSearch className="text-gray-400 text-xl flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
            <button 
              type="submit"
              className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Wishlist */}
            <Link 
              to="/wishlist"
              className="relative p-2 hover:bg-green-50 rounded-full transition group"
            >
              <FiHeart className="text-2xl text-gray-600 group-hover:text-green-600 transition" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link 
              to="/cart"
              className="relative p-2 hover:bg-green-50 rounded-full transition group"
            >
              <FiShoppingCart className="text-2xl text-gray-600 group-hover:text-green-600 transition" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </Link>

            {/* User */}
            {/* User */}
            {token && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition font-medium"
                >
                  <FiUser className="text-lg" />
                  <span className="text-sm">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600 font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition font-medium"
              >
                <FiUser className="text-lg" />
                <span className="text-sm">Login</span>
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* BOTTOM NAV LINKS */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-6 py-2 overflow-x-auto">
            <Link 
              to="/"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Home
            </Link>
            <Link 
              to="/products"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Shop
            </Link>
            <Link 
              to="/products?category=fruits"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Fruits
            </Link>
            <Link 
              to="/products?category=vegetables"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Vegetables
            </Link>
            <Link 
              to="/products?category=dairy"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Dairy
            </Link>
            <Link 
              to="/products?category=beverages"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Beverages
            </Link>
            <Link 
              to="/products?offer=true"
              className="text-red-500 hover:text-red-600 font-semibold text-sm whitespace-nowrap transition"
            >
              🔥 Offers
            </Link>
            <Link 
              to="/products?best=true"
              className="text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition"
            >
              Best Sellers
            </Link>
          </nav>
        </div>
      </div>

    </header>
  )
}