import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})
  const [wishlist, setWishlist] = useState(new Set())

  function addToCart(product) {
    setCart(prev => ({
      ...prev,
      [product.id]: prev[product.id]
        ? { ...prev[product.id], qty: prev[product.id].qty + 1 }
        : { ...product, qty: 1 }
    }))
  }

  function removeFromCart(id) {
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function changeQty(id, delta) {
    setCart(prev => {
      const item = prev[id]
      if (!item) return prev
      const newQty = item.qty + delta
      if (newQty <= 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { ...item, qty: newQty } }
    })
  }

  function toggleWishlist(id) {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 500 ? 0 : subtotal === 0 ? 0 : 25
  const total = subtotal + shipping

  return (
    <CartContext.Provider value={{
      cart, cartItems, cartCount, subtotal, shipping, total,
      wishlist, addToCart, removeFromCart, changeQty, toggleWishlist
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
