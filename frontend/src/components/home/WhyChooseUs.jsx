export default function WhyChooseUs() {
  const features = [
    {
      icon: '🚚',
      title: 'Free Delivery',
      desc: 'On orders above ₹499',
      bg: 'bg-blue-50',
      color: 'text-blue-600'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      desc: 'Within 24 hours',
      bg: 'bg-yellow-50',
      color: 'text-yellow-600'
    },
    {
      icon: '✅',
      title: 'Best Quality',
      desc: '100% Fresh products',
      bg: 'bg-green-50',
      color: 'text-green-600'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      desc: '100% Secure checkout',
      bg: 'bg-purple-50',
      color: 'text-purple-600'
    },
  ]

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 p-4 rounded-2xl hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Icon */}
              <div className={`${feature.bg} p-3 rounded-xl text-3xl group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              {/* Text */}
              <div>
                <p className={`font-semibold ${feature.color}`}>
                  {feature.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}