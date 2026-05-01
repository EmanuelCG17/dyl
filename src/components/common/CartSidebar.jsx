import React, { memo, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EMPTY_ICON = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 12h4l8 32h24l8-22H18" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="52" r="3" fill="rgba(255,255,255,0.12)"/>
    <circle cx="42" cy="52" r="3" fill="rgba(255,255,255,0.12)"/>
    <circle cx="32" cy="26" r="6" stroke="rgba(230,25,43,0.3)" strokeWidth="2"/>
    <path d="M29 26l2 2 4-4" stroke="rgba(230,25,43,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CartItem = memo(function CartItem({ item, onRemove, onUpdateQty }) {
  const priceFormatted = item.price.toLocaleString('es-CO', { maximumFractionDigits: 0 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={s.item}
    >
      <div style={s.itemImg}>
        <img src={item.image} alt={item.name} style={s.img} loading="lazy" />
      </div>

      <div style={s.itemBody}>
        <div style={s.itemTop}>
          <div>
            <span style={s.itemCat}>{item.category}</span>
            <h4 style={s.itemName}>{item.name}</h4>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            style={s.removeBtn}
            aria-label={`Eliminar ${item.name}`}
          >
            <i className="bi bi-x" />
          </button>
        </div>

        <div style={s.itemBottom}>
          {/* Quantity Controls */}
          <div style={s.qtyRow}>
            <button
              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
              style={s.qtyBtn}
              aria-label="Reducir cantidad"
            >
              <i className="bi bi-dash" />
            </button>
            <span style={s.qty}>{item.quantity}</span>
            <button
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
              style={s.qtyBtn}
              aria-label="Aumentar cantidad"
            >
              <i className="bi bi-plus" />
            </button>
          </div>

          <span style={s.itemPrice}>$ {priceFormatted}</span>
        </div>
      </div>
    </motion.div>
  );
});

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = useCallback(function goToCheckout() {
    toggleCart();
    navigate('/checkout');
  }, [toggleCart, navigate]);

  const handleRemove = useCallback(function removeItem(id) {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleUpdateQty = useCallback(function updateItemQty(id, qty) {
    updateQuantity(id, qty);
  }, [updateQuantity]);

  const total = getCartTotal();
  const totalFormatted = total.toLocaleString('es-CO', { maximumFractionDigits: 0 });
  const shipping = total >= 200000 ? 'GRATIS' : '$ 20.000';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={s.overlay}
            onClick={toggleCart}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            style={s.sidebar}
          >
            {/* Header */}
            <div style={s.header}>
              <div>
                <h2 style={s.headerTitle}>Tu <span style={{ color: 'var(--red-500)' }}>Bolsa</span></h2>
                {cartItems.length > 0 && (
                  <span style={s.headerCount}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                )}
              </div>
              <button
                onClick={toggleCart}
                style={s.closeBtn}
                aria-label="Cerrar carrito"
                id="cart-close-btn"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            {/* Free shipping progress */}
            {cartItems.length > 0 && total < 200000 && (
              <div style={s.shippingBar}>
                <span style={s.shippingText}>
                  Agrega <strong style={{ color: 'var(--white)' }}>
                    $ {(200000 - total).toLocaleString('es-CO')}
                  </strong> más para envío gratis
                </span>
                <div style={s.shippingTrack}>
                  <motion.div
                    style={s.shippingFill}
                    animate={{ width: `${Math.min((total / 200000) * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
            {cartItems.length > 0 && total >= 200000 && (
              <div style={{ ...s.shippingBar, background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)' }}>
                <span style={{ ...s.shippingText, color: 'var(--success)' }}>
                  <i className="bi bi-truck" /> ¡Envío gratuito aplicado!
                </span>
              </div>
            )}

            {/* Items */}
            <div style={s.itemsList}>
              {cartItems.length === 0 ? (
                <div style={s.empty}>
                  {EMPTY_ICON}
                  <p style={s.emptyTitle}>Tu bolsa está vacía</p>
                  <p style={s.emptySubtitle}>Encuentra tu próximo par soñado</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary"
                    onClick={() => { toggleCart(); navigate('/catalogo'); }}
                    id="cart-explore-btn"
                  >
                    Explorar Catálogo
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                      onUpdateQty={handleUpdateQty}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={s.footer}>
                <div style={s.summaryRows}>
                  <div style={s.summaryRow}>
                    <span style={s.summaryLabel}>Subtotal</span>
                    <span style={s.summaryValue}>$ {totalFormatted}</span>
                  </div>
                  <div style={s.summaryRow}>
                    <span style={s.summaryLabel}>Envío</span>
                    <span style={{ ...s.summaryValue, color: shipping === 'GRATIS' ? 'var(--success)' : 'var(--white)' }}>
                      {shipping}
                    </span>
                  </div>
                </div>

                <div style={s.totalRow}>
                  <span style={s.totalLabel}>TOTAL</span>
                  <span style={s.totalAmount}>$ {totalFormatted}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 16px 60px rgba(230,25,43,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-full btn-lg"
                  onClick={handleCheckout}
                  id="cart-checkout-btn"
                  style={{ marginTop: '1.2rem', borderRadius: 'var(--radius-sm)', justifyContent: 'center' }}
                >
                  <i className="bi bi-lock" />
                  Pagar Ahora
                </motion.button>

                <button
                  onClick={() => { toggleCart(); navigate('/catalogo'); }}
                  style={s.continueShopping}
                  id="cart-continue-btn"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    zIndex: 1040,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '460px',
    background: 'rgba(13,13,13,0.97)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderLeft: '1px solid var(--border-subtle)',
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.8rem 1.5rem 1.4rem',
    borderBottom: '1px solid var(--border-subtle)',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    letterSpacing: '0.02em',
    marginBottom: '0.2rem',
  },
  headerCount: {
    fontSize: '0.75rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  closeBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-full)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-default)',
    color: 'var(--gray-300)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  shippingBar: {
    padding: '0.8rem 1.5rem',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid var(--border-subtle)',
    flexShrink: 0,
  },
  shippingText: {
    fontSize: '0.78rem',
    color: 'var(--gray-400)',
    display: 'block',
    marginBottom: '0.6rem',
  },
  shippingTrack: {
    width: '100%',
    height: '3px',
    background: 'var(--bg-surface)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  shippingFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--red-600), var(--red-400))',
    borderRadius: 'var(--radius-full)',
    boxShadow: '0 0 8px var(--red-glow)',
  },
  itemsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: 'var(--gray-300)',
    letterSpacing: '0.05em',
  },
  emptySubtitle: {
    fontSize: '0.88rem',
    color: 'var(--gray-500)',
    marginBottom: '0.5rem',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    paddingBottom: '1.2rem',
    marginBottom: '1.2rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  itemImg: {
    width: '88px',
    height: '88px',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  itemTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  itemCat: {
    fontSize: '0.62rem',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--red-500)',
    display: 'block',
    marginBottom: '0.2rem',
  },
  itemName: {
    fontSize: '0.88rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    color: 'var(--white)',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
  },
  removeBtn: {
    color: 'var(--gray-500)',
    fontSize: '1.1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    lineHeight: 1,
    transition: 'color 0.2s ease',
    flexShrink: 0,
  },
  itemBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.1rem',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
  },
  qtyBtn: {
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--gray-300)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.15s ease, background 0.15s ease',
  },
  qty: {
    width: '28px',
    textAlign: 'center',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
  },
  itemPrice: {
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: 'var(--font-display)',
    color: 'var(--white)',
    letterSpacing: '0.02em',
  },
  footer: {
    padding: '1.5rem',
    borderTop: '1px solid var(--border-subtle)',
    background: 'rgba(0,0,0,0.5)',
    flexShrink: 0,
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: '0.82rem',
    color: 'var(--gray-400)',
    letterSpacing: '0.05em',
  },
  summaryValue: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--white)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    letterSpacing: '0.08em',
    color: 'var(--gray-300)',
  },
  totalAmount: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: 'var(--red-500)',
    letterSpacing: '0.02em',
  },
  continueShopping: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    marginTop: '0.8rem',
    fontSize: '0.75rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.4rem',
    transition: 'color 0.2s ease',
    fontFamily: 'var(--font-body)',
  },
};

export default CartSidebar;
