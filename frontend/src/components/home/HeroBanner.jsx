import { Link } from 'react-router-dom'
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi'

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Fresh & Organic Products
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fresh Groceries
              <span className="block text-green-600">
                Delivered to Your
              </span>
              <span className="block">Doorstep</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Get the best quality products at the best prices. 
              Fresh vegetables, fruits, dairy and more — 
              delivered within 24 hours!
            </p>

            {/* Offer Badge */}
            <div className="inline-block bg-red-50 border border-red-200 rounded-2xl px-6 py-3">
              <p className="text-red-600 font-bold text-2xl">UP TO 30% OFF</p>
              <p className="text-red-400 text-sm">On your first order!</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
              >
                <FiShoppingBag className="text-xl" />
                Shop Now
                <FiArrowRight className="text-xl" />
              </Link>
              <Link
                to="/products?offer=true"
                className="flex items-center gap-2 border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all hover:-translate-y-0.5"
              >
                View Offers
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { number: '5000+', label: 'Products' },
                { number: '10K+', label: 'Customers' },
                { number: '24hr', label: 'Delivery' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE/ILLUSTRATION */}
          <div className="relative flex items-center justify-center">
            
            {/* Background Circle */}
            <div className="absolute w-80 h-80 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute w-64 h-64 bg-green-200 rounded-full opacity-30"></div>

            {/* Main Image Placeholder */}
            <div className="relative z-10 text-center">
              <div className="text-[180px] leading-none select-none">
                🧺
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <span className="text-5xl animate-bounce">🍎</span>
                <span className="text-5xl animate-bounce delay-100">🥦</span>
                <span className="text-5xl animate-bounce delay-200">🥛</span>
                <span className="text-5xl animate-bounce delay-300">🍌</span>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute top-10 right-0 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2 animate-pulse">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-xs font-bold text-gray-800">Fast Delivery</p>
                <p className="text-xs text-gray-500">Within 24 hours</p>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs font-bold text-gray-800">4.9 Rating</p>
                <p className="text-xs text-gray-500">10K+ Reviews</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}