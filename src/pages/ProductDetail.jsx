import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import products from '../products'
import { useCart } from '../CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, wishlist, addToCart, toggleWishlist } = useCart()
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div style={styles.notFound}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h2>Product not found</h2>
        <button style={styles.backBtn} onClick={() => navigate('/')}>← Back to Shop</button>
      </div>
    )
  }

  const inCart = !!cart[product.id]
  const isWished = wishlist.has(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  function handleAdd() {
    addToCart(product)
    setToast(`${product.name} added to cart`)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  return (
    <div style={styles.page}>
      <button style={styles.back} onClick={() => navigate(-1)}>← Back</button>

      <div style={styles.detail}>
        {/* Image */}
        <div style={styles.imgBox}>
          {product.badge && (
            <div style={{
              ...styles.badge,
              background: product.badge === 'Sale' ? '#FCE8E8' : '#E6F1FB',
              color: product.badge === 'Sale' ? '#A32D2D' : '#185FA5',
            }}>
              {product.badge}
            </div>
          )}
          <span style={{ fontSize: 'clamp(80px, 15vw, 140px)' }}>{product.emoji}</span>
        </div>

        {/* Info */}
        <div style={styles.info}>
          <div style={styles.category}>{product.category}</div>
          <h1 style={styles.name}>{product.name}</h1>
          <div style={styles.rating}>
            <span style={{ color: 'var(--accent)', fontSize: 16 }}>
              {'★'.repeat(Math.floor(product.rating))}
            </span>
            <span style={{ color: 'var(--warm-gray)', fontSize: 14 }}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.price}>${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span style={styles.oldPrice}>${product.oldPrice.toLocaleString()}</span>
            )}
            {product.oldPrice && (
              <span style={styles.saveBadge}>
                Save ${(product.oldPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <p style={styles.desc}>
            A masterpiece of craftsmanship, this {product.name.toLowerCase()} is part of our exclusive {product.category} collection.
            Each piece is carefully selected to ensure the highest standards of quality and elegance.
          </p>

          <div style={styles.features}>
            {['Free shipping over $500', 'Certificate of authenticity', '30-day returns', '2-year warranty'].map(f => (
              <div key={f} style={styles.feature}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {f}
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button
              style={{ ...styles.addBtn, background: inCart ? 'var(--accent)' : 'var(--charcoal)' }}
              onClick={handleAdd}
            >
              {inCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              style={{ ...styles.wishBtn, background: isWished ? '#FCE8E8' : 'var(--white)' }}
              onClick={() => toggleWishlist(product.id)}
            >
              {isWished ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={styles.related}>
          <h2 style={styles.relatedTitle}>You may also like</h2>
          <div style={styles.relatedGrid}>
            {related.map(p => (
              <div key={p.id} style={styles.relatedCard} onClick={() => navigate(`/product/${p.id}`)}>
                <div style={styles.relatedImg}>{p.emoji}</div>
                <div style={{ padding: '12px' }}>
                  <div style={styles.category}>{p.category}</div>
                  <div style={styles.relatedName}>{p.name}</div>
                  <div style={styles.price}>${p.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
  page: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)',
  },
  back: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '8px 20px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: 'var(--warm-gray)',
    marginBottom: '2rem',
  },
  detail: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: 'clamp(2rem, 6vw, 5rem)',
    alignItems: 'start',
    marginBottom: '4rem',
  },
  imgBox: {
    background: 'var(--cream)',
    borderRadius: 24,
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 14px',
    borderRadius: 20,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  info: { display: 'flex', flexDirection: 'column', gap: 16 },
  category: {
    fontSize: 11,
    color: 'var(--warm-gray)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
  },
  rating: { display: 'flex', alignItems: 'center', gap: 8 },
  priceRow: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  price: { fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700 },
  oldPrice: { fontSize: 16, textDecoration: 'line-through', color: 'var(--warm-gray)' },
  saveBadge: {
    background: '#FCE8E8',
    color: '#A32D2D',
    fontSize: 12,
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: 20,
  },
  desc: { fontSize: 15, color: 'var(--warm-gray)', lineHeight: 1.8 },
  features: { display: 'flex', flexDirection: 'column', gap: 8 },
  feature: { fontSize: 14, color: 'var(--charcoal)', display: 'flex', gap: 8 },
  actions: { display: 'flex', gap: 12, marginTop: 8 },
  addBtn: {
    flex: 1,
    color: 'var(--white)',
    border: 'none',
    borderRadius: 32,
    padding: '14px 24px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
  },
  wishBtn: {
    border: '1px solid var(--border)',
    borderRadius: 32,
    padding: '14px 20px',
    cursor: 'pointer',
    fontSize: 18,
  },
  related: { borderTop: '1px solid var(--border)', paddingTop: '3rem' },
  relatedTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
    gap: 16,
  },
  relatedCard: {
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  relatedImg: {
    background: 'var(--cream)',
    aspectRatio: '4/3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  relatedName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 6,
  },
  notFound: { textAlign: 'center', padding: '5rem 1rem' },
  backBtn: {
    background: 'var(--charcoal)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 32,
    padding: '10px 24px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    marginTop: '1.5rem',
  },
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
