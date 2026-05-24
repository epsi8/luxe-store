import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import products from '../products'

const FILTERS = ['All', 'Jewellery', 'Bags', 'Watches', 'Accessories', 'New', 'Sale']

const SECTION_TITLES = {
  All: { title: 'Our Collection', sub: 'Handpicked luxury for every occasion' },
  Jewellery: { title: 'Fine Jewellery', sub: 'Rings, earrings, pendants & more' },
  Bags: { title: 'Luxury Bags', sub: 'Totes, clutches & crossbodies' },
  Watches: { title: 'Timepieces', sub: 'Swiss precision & craftsmanship' },
  Accessories: { title: 'Accessories', sub: 'Scarves, card holders & beyond' },
  New: { title: 'New Arrivals', sub: 'The latest additions to our collection' },
  Sale: { title: 'On Sale', sub: 'Premium pieces at exceptional value' },
}

export default function Home({ searchQuery }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const categoryParam = searchParams.get('category')
  const activeFilter = categoryParam && FILTERS.includes(categoryParam) ? categoryParam : 'All'

  function setFilter(f) {
    if (f === 'All') navigate('/')
    else navigate(`/?category=${f}`)
  }

  const filtered = products.filter(p => {
    const matchCat =
      activeFilter === 'All' ||
      p.category === activeFilter ||
      (activeFilter === 'New' && p.badge === 'New') ||
      (activeFilter === 'Sale' && p.badge === 'Sale')
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  function showToast(msg) {
    setToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  const { title, sub } = SECTION_TITLES[activeFilter] || SECTION_TITLES['All']

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>Summer Collection 2026</div>
          <h1 style={styles.heroH1}>Crafted for the Discerning Eye</h1>
          <p style={styles.heroP}>
            Timeless pieces curated from the world's finest ateliers.
            Discover luxury that transcends seasons.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
              Explore Collection
            </button>
            <button style={styles.btnOutline} onClick={() => setFilter('New')}>
              New Arrivals
            </button>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <main id="shop" style={styles.main}>
        <div style={styles.filterRow}>
          <div>
            <h2 style={styles.sectionTitle}>{title}</h2>
            <p style={styles.sectionSub}>{sub}</p>
          </div>
          <div style={styles.tabs}>
            {FILTERS.map(f => (
              <button
                key={f}
                style={{
                  ...styles.tab,
                  background: activeFilter === f ? 'var(--charcoal)' : 'var(--white)',
                  color: activeFilter === f ? 'var(--white)' : 'var(--warm-gray)',
                  borderColor: activeFilter === f ? 'var(--charcoal)' : 'var(--border)',
                }}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={styles.noResults}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: 15, color: 'var(--warm-gray)' }}>No products found</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAddToast={showToast} />
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      <div style={{
        ...styles.toast,
        transform: toastVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
      }}>
        {toast}
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1C1C1E 0%, #2D2926 100%)',
    color: 'var(--white)',
    padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)',
    textAlign: 'center',
  },
  heroInner: { maxWidth: 680, margin: '0 auto' },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(200,168,130,0.2)',
    border: '1px solid var(--accent)',
    color: 'var(--accent)',
    fontSize: 11,
    letterSpacing: '1.5px',
    padding: '5px 16px',
    borderRadius: 24,
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  heroH1: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: '1rem',
    letterSpacing: '-1px',
  },
  heroP: {
    color: '#B0ABA4',
    fontSize: 'clamp(14px, 2vw, 17px)',
    lineHeight: 1.7,
    marginBottom: '2rem',
    fontWeight: 300,
  },
  heroBtns: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: 'var(--accent)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 32,
    padding: 'clamp(10px, 2vw, 13px) clamp(20px, 4vw, 32px)',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
  },
  btnOutline: {
    background: 'transparent',
    color: 'var(--white)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 32,
    padding: 'clamp(10px, 2vw, 13px) clamp(20px, 4vw, 32px)',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 400,
  },
  main: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: 16,
  },
  sectionTitle: { fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 600, marginBottom: 4 },
  sectionSub: { fontSize: 14, color: 'var(--warm-gray)' },
  tabs: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tab: {
    border: '1px solid',
    borderRadius: 24,
    padding: '6px 16px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.3px',
    transition: 'all 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(160px, 22vw, 240px), 1fr))',
    gap: 'clamp(12px, 2vw, 24px)',
  },
  noResults: { textAlign: 'center', padding: '4rem 1rem' },
  toast: {
    position: 'fixed',
    bottom: 24,
    left: '50%',
    background: 'var(--charcoal)',
    color: 'var(--white)',
    padding: '12px 24px',
    borderRadius: 32,
    fontSize: 14,
    fontWeight: 500,
    zIndex: 300,
    transition: 'transform 0.3s',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  },
}
