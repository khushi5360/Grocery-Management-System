import { Link } from 'react-router-dom'


const offers = [
  {
    id: 1,
    title: 'Fresh Fruits',
    subtitle: 'Up to 30% Off',
    description: 'Get the freshest fruits delivered to your door',
    emoji: '🍎',
    bg: 'from-red-400 to-orange-400',
    link: '/products?category=fruits'
  },
  {
    id: 2,
    title: 'Farm Vegetables',
    subtitle: 'Up to 25% Off',
    description: 'Direct from farm to your kitchen',
    emoji: '🥦',
    bg: 'from-green-400 to-emerald-500',
    link: '/products?category=vegetables'
  },
  {
    id: 3,
    title: 'Dairy Products',
    subtitle: 'Buy 2 Get 1 Free',
    description: 'Fresh milk, cheese, butter and more',
    emoji: '🥛',
    bg: 'from-blue-400 to-cyan-400',
    link: '/products?category=dairy'
  },
]

// OffersSection Component

export default function OffersSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Special Offers
            </h2>
            <p className="text-gray-500 mt-1">
              Limited time deals just for you!
            </p>
          </div>
          <Link
            to="/products?offer=true"
            className="text-green-600 font-semibold hover:text-green-700 transition"
          >
            View All →
          </Link>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              to={offer.link}
              className={`
                bg-gradient-to-r ${offer.bg}
                rounded-2xl p-6 flex items-center justify-between
                hover:shadow-xl transition-all duration-300
                hover:-translate-y-1 group overflow-hidden relative
              `}
            >
              {/* Left Content */}
              <div className="text-white z-10">
                <p className="text-sm font-medium opacity-90">
                  {offer.title}
                </p>
                <p className="text-2xl font-bold mt-1">
                  {offer.subtitle}
                </p>
                <p className="text-sm opacity-80 mt-1 max-w-[150px]">
                  {offer.description}
                </p>
                <div className="mt-4 inline-block bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full group-hover:bg-opacity-90 transition">
                  Shop Now →
                </div>
              </div>

              {/* Right Emoji */}
              <div className="text-7xl group-hover:scale-110 transition-transform duration-300 z-10">
                {offer.emoji}
              </div>

              {/* Background Circle Decoration */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white opacity-10 rounded-full"></div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}