import React from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Cerrar sidebar
    navigate('/checkout'); // Ir a la pantalla de pago
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.overlay} 
            onClick={toggleCart}
          />
          
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={styles.sidebar} 
            className="glass-panel"
          >
            <div style={styles.header}>
              <h2>TU <span className="text-accent">BOLSA</span></h2>
              <button style={styles.closeBtn} onClick={toggleCart}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div style={styles.content}>
              {cartItems.length === 0 ? (
                <div style={styles.empty}>
                  <i className="bi bi-bag-x" style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.1)' }}></i>
                  <p style={{fontFamily: 'var(--font-family-heading)', fontSize: '1.2rem', letterSpacing: '1px'}}>BOLSA VACÍA</p>
                  <button 
                    className="btn-primary" 
                    onClick={() => {
                      toggleCart();
                      navigate('/catalogo');
                    }} 
                    style={{ marginTop: '1.5rem' }}
                  >
                    Explorar Catálogo
                  </button>
                </div>
              ) : (
                <div style={styles.itemsList}>
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={item.id} 
                        style={styles.cartItem}
                      >
                        <img src={item.image} alt={item.name} style={styles.itemImage} />
                        <div style={styles.itemDetails}>
                          <h4 style={styles.itemName}>{item.name}</h4>
                          <p style={styles.itemPrice}>${item.price.toLocaleString('es-CO')}</p>
                          
                          <div style={styles.actionsRow}>
                            <div style={styles.quantityControls}>
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                              <span style={styles.qty}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={styles.footer}>
                <div style={styles.totalRow}>
                  <span>TOTAL</span>
                  <span style={styles.totalPrice}>${getCartTotal().toLocaleString('es-CO')}</span>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={handleCheckout} 
                  style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}
                >
                  PAGAR AHORA
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)', /* Blur mucho más fuerte y premium */
    zIndex: 1040,
  },
  sidebar: {
    position: 'fixed',
    top: 0, right: 0, bottom: 0,
    width: '100%',
    maxWidth: '450px',
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
    borderLeft: '1px solid rgba(255,255,255,0.1)'
  },
  header: {
    padding: '2rem 1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    fontSize: '1.5rem',
    color: 'var(--color-white)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color var(--transition-fast)'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem'
  },
  empty: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: 'var(--color-text-muted)'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  cartItem: {
    display: 'flex',
    gap: '1.2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  itemImage: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#050505',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: '1rem',
    fontFamily: 'var(--font-family-heading)',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--color-white)'
  },
  itemPrice: {
    color: 'var(--color-primary)',
    fontWeight: '800',
    fontSize: '1.1rem',
    marginBottom: '0.5rem'
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '4px',
    padding: '0.2rem 0.5rem'
  },
  qtyBtn: {
    fontSize: '1.2rem',
    color: 'var(--color-white)',
    fontWeight: '700',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  qty: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--color-white)',
    width: '20px',
    textAlign: 'center'
  },
  removeBtn: {
    color: 'var(--color-text-muted)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  footer: {
    padding: '2rem 1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.4rem',
    fontWeight: '800',
    fontFamily: 'var(--font-family-heading)'
  },
  totalPrice: {
    color: 'var(--color-primary)'
  }
};

export default CartSidebar;
