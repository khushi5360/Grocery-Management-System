import { Link } from 'react-router-dom'

const categories = [
  { name: 'Fruits', icon: '🍎', color: 'bg-red-50', hover: 'hover:bg-red-100', border: 'border-red-200' },
  { name: 'Vegetables', icon: '🥦', color: 'bg-green-50', hover: 'hover:bg-green-100', border: 'border-green-200' },
  { name: 'Dairy', icon: '🥛', color: 'bg-blue-50', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
  { name: 'Beverages', icon: '🧃', color: 'bg-yellow-50', hover: 'hover:bg-yellow-100', border: 'border-yellow-200' },
  { name: 'Snacks', icon: '🍿', color: 'bg-orange-50', hover: 'hover:bg-orange-100', border: 'border-orange-200' },
  { name: 'Household', icon: '🧹', color: 'bg-purple-50', hover: 'hover:bg-purple-100', border: 'border-purple-200' },
  { name: 'Personal Care', icon: '🧴', color: 'bg-pink-50', hover: 'hover:bg-pink-100', border: 'border-pink-200' },
  { name: 'Bakery', icon: '🍞', color: 'bg-amber-50', hover: 'hover:bg-amber-100', border: 'border-amber-200' },
]

export default function CategorySection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Shop by Categories
            </h2>
            <p className="text-gray-500 mt-1">
              Find what you need quickly
            </p>
          </div>
          <Link
            to="/products"
            className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-1 transition"
          >
            View All →
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name.toLowerCase()}`}
              className={`
                ${cat.color} ${cat.hover} ${cat.border}
                border rounded-2xl p-4 flex flex-col items-center gap-2
                transition-all duration-300 hover:shadow-md hover:-translate-y-1
                group cursor-pointer
              `}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-gray-700 text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}