import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  // Agar cart empty hai
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty!
          </h2>
          <p className="text-gray-500 mb-6">
            Add some fresh groceries to your cart
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
          >
            <FiShoppingBag />
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart 🛒
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                {/* Product Image */}
<div className="bg-gray-50 rounded-xl p-4 w-16 h-16 flex items-center justify-center overflow-hidden">
  {item.images && item.images.length > 0 ? (
    <img
      src={item.images[0]}
      alt={item.name}
      className="w-full h-full object-cover rounded-lg"
      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
    />
  ) : null}
  <span className="text-4xl" style={{ display: item.images && item.images.length > 0 ? 'none' : 'block' }}>
    {item.emoji ? item.emoji :
     item.category?.name === 'Fruits' || item.category === 'Fruits' ? '🍎' :
     item.category?.name === 'Vegetables' || item.category === 'Vegetables' ? '🥦' :
     item.category?.name === 'Dairy' || item.category === 'Dairy' ? '🥛' :
     item.category?.name === 'Grains' || item.category === 'Grains' ? '🌾' :
     item.category?.name === 'Beverages' || item.category === 'Beverages' ? '🧃' :
     item.category?.name === 'Snacks' || item.category === 'Snacks' ? '🍿' : '🛒'}
  </span>
</div>
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold">
                    ₹{item.price}/{item.unit}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <p className="font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <FiTrash2 />
                </button>

              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={cartTotal >= 499 ? 'text-green-600' : ''}>
                    {cartTotal >= 499 ? 'FREE' : '₹20'}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal >= 499 ? cartTotal : cartTotal + 20}</span>
                </div>
              </div>

              {cartTotal < 499 && (
                <p className="text-sm text-orange-500 mb-4">
                  Add ₹{499 - cartTotal} more for FREE delivery!
                </p>
              )}

              <Link
                to="/checkout"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout →
              </Link>

              <Link
                to="/products"
                className="w-full mt-3 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                Continue Shopping
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}