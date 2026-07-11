import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FiHome, FiShoppingBag, FiList,
  FiUsers, FiShoppingCart, FiMenu,
  FiX, FiLogOut, FiTrendingUp
} from 'react-icons/fi'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FiShoppingBag, label: 'Products' },
    { path: '/admin/categories', icon: FiList, label: 'Categories' },
    { path: '/admin/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/admin/customers', icon: FiUsers, label: 'Customers' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>

        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="font-bold text-green-400">Grocera Admin</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Icon className="text-xl flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all w-full"
          >
            <FiLogOut className="text-xl flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">Welcome,</span>
            <span className="font-semibold text-green-600">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}