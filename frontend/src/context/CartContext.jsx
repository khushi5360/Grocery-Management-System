import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Cart mein add karo
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Cart se remove karo
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId))
  }

  // Quantity update karo
  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  // Cart count
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}