import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiCheck, FiX, FiTruck } from 'react-icons/fi'

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Processing': return 'bg-blue-100 text-blue-700'
      case 'Shipped': return 'bg-purple-100 text-purple-700'
      case 'Delivered': return 'bg-green-100 text-green-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FiClock />
      case 'Processing': return <FiPackage />
      case 'Shipped': return <FiTruck />
      case 'Delivered': return <FiCheck />
      case 'Cancelled': return <FiX />
      default: return <FiClock />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Koi Order Nahi Hai!
          </h2>
          <p className="text-gray-500 mb-6">
            Abhi shopping karo!
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            🛒 Shop Now
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
            My Orders 📦
          </h1>
          <span className="text-gray-500">
            {orders.length} orders
          </span>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm font-medium text-gray-800">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="text-sm font-medium text-gray-800">
                    {order.paymentMethod}
                  </p>
                </div>
                <div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address + Total */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    📍 {order.shippingAddress.city}, {order.shippingAddress.state}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-gray-900 text-lg">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}