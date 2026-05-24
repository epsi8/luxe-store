import { useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function ProductCard({ product, onAddToast }) {
  const { cart, wishlist, addToCart, toggleWishlist } = useCart()
  const navigate = useNavigate()
  const inCart = !!cart[product.id]
  const isWished = wishlist.has(product.id)

  function handleAdd(e) {
    e.stopPropagation()
    addToCart(product)
    onAddToast(`${product.name} added to cart`)
  }

  function handleWish(e) {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <div style={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      <div style={styles.imgBox}>
        {product.badge && (
          <div style={{
            ...styles.badge,
            background: product.badge === 'Sale' ? '#FCE8E8' : '#E6F1FB',
            color: product.badge === 'Sale' ? 'var(--badge-red)' : '#185FA5',
          }}>
            {product.badge}
          </div>
        )}
        <button
          style={{ ...styles.wishBtn, background: isWished ? '#FCE8E8' : 'var(--white)' }}
          onClick={handleWish}
          aria-label="Toggle wishlist"
        >
          {isWished ? '❤️' : '🤍'}
        </button>
        <span style={{ fontSize: 'clamp(40px, 7vw, 64px)' }}>{product.emoji}</span>
      </div>

      <div style={styles.info}>
        <div style={styles.category}>{product.category}</div>
        <div style={styles.name}>{product.name}</div>
        <div style={styles.rating}>
          <span style={{ color: 'var(--accent)', fontSize: 12 }}>
            {'★'.repeat(Math.floor(product.rating))}
          </span>
          <span style={{ fontSize: 12, color: 'var(--warm-gray)' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div style={styles.footer}>
          <div>
            <span style={styles.price}>${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span style={styles.oldPrice}>${product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            style={{
              ...styles.addBtn,
              background: inCart ? 'var(--accent)' : 'var(--charcoal)',
            }}
            onClick={handleAdd}
          >
            {inCart ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  imgBox: {
    position: 'relative',
    background: 'var(--cream)',
    aspectRatio: '4/3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontSize: 10,
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: 20,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  wishBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 14,
  },
  info: {
    padding: 'clamp(12px, 2vw, 16px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: 'var(--warm-gray)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(14px, 2vw, 16px)',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  rating: { display: 'flex', alignItems: 'center', gap: 6 },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 8,
  },
  price: { fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 600 },
  oldPrice: {
    fontSize: 13,
    textDecoration: 'line-through',
    color: 'var(--warm-gray)',
    marginLeft: 6,
    fontWeight: 400,
  },
  addBtn: {
    color: 'var(--white)',
    border: 'none',
    borderRadius: 24,
    padding: '7px 14px',
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
}
