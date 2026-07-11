import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About Grocera 🛒</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          Fresh groceries delivered to your doorstep with love!
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Grocera ka mission hai — har ghar mein fresh, quality groceries 
            pahunchana at the best prices. Hum believe karte hain ki 
            healthy food sabke liye accessible hona chahiye!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '5000+', label: 'Products' },
            { number: '24hr', label: 'Delivery' },
            { number: '4.9⭐', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-3xl font-bold text-green-600">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Us */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💚 Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { emoji: '🚚', title: 'Fast Delivery', desc: 'Within 24 hours' },
              { emoji: '✅', title: 'Fresh Products', desc: '100% quality guaranteed' },
              { emoji: '💰', title: 'Best Prices', desc: 'Lowest prices guaranteed' },
              { emoji: '🔒', title: 'Secure Payment', desc: '100% safe checkout' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            🛒 Start Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}