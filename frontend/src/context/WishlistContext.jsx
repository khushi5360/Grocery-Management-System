import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])

  const toggleWishlist = (product) => {
    // id ya _id dono handle karo
    const productId = product._id || product.id
    
    setWishlistItems((prev) => {
      const exists = prev.find((item) => 
        (item._id || item.id) === productId
      )
      if (exists) {
        return prev.filter((item) => 
          (item._id || item.id) !== productId
        )
      }
      return [...prev, product]
    })
  }

  const isWishlisted = (productId) => {
    return wishlistItems.some((item) => 
      (item._id || item.id) === productId
    )
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}