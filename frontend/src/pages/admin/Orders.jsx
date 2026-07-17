import { useState, useEffect } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/orders/all', {
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

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: status })
      })
      const data = await res.json()
      if (data.success) fetchOrders()
    } catch (error) {
      console.log(error)
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

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <div className="text-sm text-gray-500">{orders.length} total</div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500">Koi order nahi hai abhi!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* Order Header */}
              <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-mono text-sm font-bold text-gray-800">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium text-gray-800">
                    {order.user?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment</p>
                  <p className="text-sm font-medium text-gray-800">
                    {order.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-bold text-gray-900">
                    ₹{order.totalPrice}
                  </p>
                </div>
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Items + Update Status */}
              <div className="p-4 flex flex-wrap items-start justify-between gap-4">

                {/* Items */}
                <div className="space-y-1">
                  {order.orderItems.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      • {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                    </p>
                  ))}
                  <p className="text-xs text-gray-400 mt-1">
                    📍 {order.shippingAddress?.city}, {order.shippingAddress?.state}
                  </p>
                </div>

                {/* Update Status */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Update Status:</p>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-green-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}