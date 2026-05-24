import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function Navbar({ onCartOpen, onSearch }) {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    setQuery(e.target.value)
    onSearch(e.target.value)
    if (location.pathname !== '/') navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div style={styles.logo} onClick={() => { navigate('/'); onSearch('') }}>
          Lux<span style={{ color: 'var(--accent)' }}>é</span>
        </div>

        <div style={styles.links}>
          {['Jewellery', 'Bags', 'Watches', 'Accessories'].map(cat => (
            <button
              key={cat}
              style={styles.link}
              onClick={() => navigate(`/?category=${cat}`)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.right}>
          <div style={styles.searchBar}>
            <span style={{ color: 'var(--warm-gray)', fontSize: 14 }}>🔍</span>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearch}
            />
          </div>
          <button style={styles.cartBtn} onClick={onCartOpen}>
            🛍 Cart
            <span style={styles.cartBadge}>{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '0 clamp(1rem, 4vw, 3rem)',
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    gap: '1rem',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  },
  links: {
    display: 'flex',
    gap: 'clamp(12px, 2vw, 24px)',
    alignItems: 'center',
  },
  link: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    color: 'var(--warm-gray)',
    fontWeight: 500,
    letterSpacing: '0.3px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '6px 14px',
    gap: 8,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    width: 'clamp(80px, 12vw, 160px)',
    outline: 'none',
  },
  cartBtn: {
    position: 'relative',
    background: 'var(--charcoal)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 24,
    padding: '8px 18px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
  },
  cartBadge: {
    background: 'var(--accent)',
    color: 'var(--white)',
    borderRadius: '50%',
    width: 18,
    height: 18,
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
  },
}
