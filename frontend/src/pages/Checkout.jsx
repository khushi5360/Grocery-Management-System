import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cartItems, cartTotal, removeFromCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [address, setAddress] = useState({
    street: '', city: '', state: '', pincode: '', phone: ''
  })

  const deliveryPrice = cartTotal >= 499 ? 0 : 20
  const finalTotal = cartTotal + deliveryPrice

  const getEmoji = (item) => {
    if (item.emoji) return item.emoji
    const cat = item.category?.name || item.category
    if (cat === 'Fruits') return '🍎'
    if (cat === 'Vegetables') return '🥦'
    if (cat === 'Dairy') return '🥛'
    if (cat === 'Grains') return '🌾'
    if (cat === 'Beverages') return '🧃'
    if (cat === 'Snacks') return '🍿'
    return '🛒'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    if (cartItems.length === 0) { alert('Cart empty hai!'); return }

    try {
      setLoading(true)
      const orderItems = cartItems
  .filter(item => item._id) // Sirf real products
  .map(item => ({
    product: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: ''
  }))

if (orderItems.length === 0) {
  alert('Kripya Products page se items add karo!')
  navigate('/products')
  return
}

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress: address,
          paymentMethod,
          itemsPrice: cartTotal,
          deliveryPrice,
          totalPrice: finalTotal
        })
      })

      const data = await response.json()
      if (data.success) {
        cartItems.forEach(item => removeFromCart(item._id || item.id))
        alert('🎉 Order placed successfully!')
        navigate('/orders')
      } else {
        alert(data.message || 'Order failed!')
      }
    } catch (error) {
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart Empty Hai!</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Shopping Karo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout 🛍️</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-green-600" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Street Address *</label>
                    <input
                      type="text"
                      placeholder="House no, Street, Area"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="Mumbai"
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">State *</label>
                      <input
                        type="text"
                        placeholder="Maharashtra"
                        value={address.state}
                        onChange={(e) => setAddress({...address, state: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Pincode *</label>
                      <input
                        type="text"
                        placeholder="400001"
                        value={address.pincode}
                        onChange={(e) => setAddress({...address, pincode: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={address.phone}
                        onChange={(e) => setAddress({...address, phone: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">💳 Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === 'COD' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">💵 Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Delivery pe cash do</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === 'Online' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <input type="radio" value="Online" checked={paymentMethod === 'Online'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">💳 Online Payment</p>
                      <p className="text-sm text-gray-500">UPI, Card, Net Banking</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT — Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <span>{getEmoji(item)}</span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className={deliveryPrice === 0 ? 'text-green-600' : ''}>
                      {deliveryPrice === 0 ? 'FREE' : `₹${deliveryPrice}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag />
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}