import { useCart } from '../CartContext'

export default function CartPanel({ isOpen, onClose }) {
  const { cartItems, subtotal, shipping, total, changeQty, removeFromCart } = useCart()

  return (
    <>
      <div
        onClick={onClose}
        style={{
          ...styles.overlay,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
      />
      <div style={{ ...styles.panel, transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div style={styles.header}>
          <h3 style={styles.title}>Your Cart</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.items}>
          {cartItems.length === 0 ? (
            <div style={styles.empty}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛍</div>
              <p style={{ fontSize: 15, color: 'var(--warm-gray)' }}>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={styles.item}>
                <div style={styles.itemImg}>{item.emoji}</div>
                <div style={styles.itemInfo}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemPrice}>${item.price.toLocaleString()} each</div>
                  <div style={styles.qtyCtrl}>
                    <button style={styles.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                    <span style={styles.qtyNum}>{item.qty}</span>
                    <button style={styles.qtyBtn} onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totals}>
              <div style={styles.row}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div style={styles.row}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
              <div style={{ ...styles.row, ...styles.rowTotal }}>
                <span>Total</span><span>${total.toLocaleString()}</span>
              </div>
            </div>
            <button style={styles.checkoutBtn} onClick={onClose}>
              Proceed to Checkout →
            </button>
            <p style={styles.shippingNote}>
              {subtotal < 500
                ? `Add $${500 - subtotal} more for free shipping`
                : '✓ You qualify for free shipping!'}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 200,
    transition: 'opacity 0.3s',
  },
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 'min(420px, 100vw)',
    height: '100vh',
    background: 'var(--white)',
    boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
    zIndex: 201,
    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border)',
  },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 20 },
  closeBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: 32,
    height: 32,
    cursor: 'pointer',
    fontSize: 14,
    color: 'var(--warm-gray)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  empty: { textAlign: 'center', padding: '3rem 1rem' },
  item: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  itemImg: {
    background: 'var(--cream)',
    borderRadius: 10,
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    flexShrink: 0,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 2 },
  itemPrice: { fontSize: 13, color: 'var(--warm-gray)' },
  qtyCtrl: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 },
  qtyBtn: {
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: 24,
    height: 24,
    cursor: 'pointer',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum: { fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: 'center' },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#E24B4A',
    fontSize: 16,
    padding: 4,
    flexShrink: 0,
  },
  footer: { padding: '20px 24px', borderTop: '1px solid var(--border)' },
  totals: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'var(--warm-gray)',
  },
  rowTotal: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--charcoal)',
    paddingTop: 8,
    borderTop: '1px solid var(--border)',
  },
  checkoutBtn: {
    width: '100%',
    background: 'var(--charcoal)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 32,
    padding: 14,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    letterSpacing: '0.2px',
  },
  shippingNote: {
    textAlign: 'center',
    fontSize: 12,
    color: 'var(--warm-gray)',
    marginTop: 10,
  },
}
