import { useState, useEffect } from 'react'
import { FiShoppingBag, FiUsers, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalSales: 245800,
    totalCategories: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const productsRes = await fetch('http://localhost:5000/api/products')
      const productsData = await productsRes.json()
      const categoriesRes = await fetch('http://localhost:5000/api/categories')
      const categoriesData = await categoriesRes.json()
      setStats(prev => ({
        ...prev,
        totalProducts: productsData.count || 0,
        totalCategories: categoriesData.categories?.length || 0
      }))
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: FiShoppingBag, light: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: FiTrendingUp, light: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Total Orders', value: stats.totalOrders, icon: FiShoppingCart, light: 'bg-orange-50', textColor: 'text-orange-600' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: FiUsers, light: 'bg-purple-50', textColor: 'text-purple-600' },
    ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.light} p-3 rounded-xl`}>
                  <Icon className={`text-2xl ${card.textColor}`} />
                </div>
                <span className="text-green-500 text-sm font-medium">+12%</span>
              </div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Product', path: '/admin/products', emoji: '➕' },
            { label: 'View Orders', path: '/admin/orders', emoji: '📦' },
            { label: 'Customers', path: '/admin/customers', emoji: '👥' },
            { label: 'Categories', path: '/admin/categories', emoji: '📋' },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition"
            >
              <span className="text-3xl">{action.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}