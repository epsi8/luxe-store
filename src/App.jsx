import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './CartContext'
import Navbar from './components/Navbar'
import CartPanel from './components/CartPanel'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          onCartOpen={() => setCartOpen(true)}
          onSearch={setSearchQuery}
        />

        <CartPanel
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
        />

        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        <footer style={styles.footer}>
          <p>© 2026 <span style={{ color: '#C8A882' }}>Luxé</span> · Crafted with care · All rights reserved</p>
        </footer>
      </div>
    </CartProvider>
  )
}

const styles = {
  footer: {
    background: '#1C1C1E',
    color: '#B0ABA4',
    textAlign: 'center',
    padding: '2rem 1rem',
    fontSize: 13,
    marginTop: 'auto',
  },
}
