import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('¡Pago exitoso! Gracias por confiar en DYL Importaciones.');
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div style={styles.emptyContainer}>
        <h2 style={{color: 'white', marginBottom: '1rem'}}>Tu bolsa está vacía</h2>
        <button className="btn-primary" onClick={() => navigate('/catalogo')}>
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.page}
    >
      <div style={styles.container}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={styles.header}
        >
          <h1 style={styles.title}>FINALIZAR <span className="text-accent">COMPRA</span></h1>
          <p style={styles.subtitle}>Estás a un paso de asegurar tu colección.</p>
        </motion.div>

        <div style={styles.content}>
          {/* Formulario de Pago */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={styles.formSection} 
            className="glass-panel"
          >
            <h3 style={styles.sectionTitle}>Datos de Envío</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group floating-input-group">
                <input type="text" id="fullname" className="form-control floating-input" required placeholder=" " />
                <label className="floating-label" htmlFor="fullname">Nombre Completo</label>
              </div>

              <div style={styles.row}>
                <div className="form-group floating-input-group" style={{flex: 1}}>
                  <input type="text" id="city" className="form-control floating-input" required placeholder=" " />
                  <label className="floating-label" htmlFor="city">Ciudad</label>
                </div>
                <div className="form-group floating-input-group" style={{flex: 1}}>
                  <input type="text" id="phone" className="form-control floating-input" required placeholder=" " />
                  <label className="floating-label" htmlFor="phone">Teléfono</label>
                </div>
              </div>

              <div className="form-group floating-input-group">
                <input type="text" id="address" className="form-control floating-input" required placeholder=" " />
                <label className="floating-label" htmlFor="address">Dirección de Entrega</label>
              </div>

              <h3 style={{...styles.sectionTitle, marginTop: '2rem'}}>Método de Pago</h3>
              <div style={styles.paymentMethods}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="payment" defaultChecked style={{accentColor: 'var(--color-primary)'}} />
                  Tarjeta de Crédito / Débito
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="payment" style={{accentColor: 'var(--color-primary)'}} />
                  Transferencia Bancaria
                </label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="btn-primary" 
                style={styles.submitBtn}
                disabled={isProcessing}
              >
                {isProcessing ? 'PROCESANDO...' : 'CONFIRMAR Y PAGAR'}
              </motion.button>
            </form>
          </motion.div>

          {/* Resumen del Pedido */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={styles.summarySection} 
            className="glass-panel"
          >
            <h3 style={styles.sectionTitle}>Resumen del Pedido</h3>
            <div style={styles.itemsList}>
              {cartItems.map(item => (
                <div key={item.id} style={styles.summaryItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemQty}>Cant: {item.quantity}</p>
                    <p style={styles.itemPrice}>${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.totals}>
              <div style={styles.totalRow}>
                <span>Subtotal</span>
                <span>${getCartTotal().toLocaleString('es-CO')}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Envío Nacional</span>
                <span>Gratis</span>
              </div>
              <div style={{...styles.totalRow, ...styles.grandTotal}}>
                <span>TOTAL A PAGAR</span>
                <span className="text-accent">${getCartTotal().toLocaleString('es-CO')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  emptyContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  page: {
    minHeight: '100vh',
    paddingTop: '8rem',
    paddingBottom: '6rem',
    position: 'relative',
    zIndex: 2
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '2rem'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    letterSpacing: '-1px',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem'
  },
  content: {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  formSection: {
    flex: '1 1 600px',
    padding: '3rem',
    borderRadius: '12px'
  },
  summarySection: {
    flex: '1 1 350px',
    padding: '2.5rem',
    borderRadius: '12px',
    position: 'sticky',
    top: '100px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: 'var(--color-white)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  row: {
    display: 'flex',
    gap: '1.5rem'
  },
  paymentMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: 'var(--color-white)',
    fontSize: '1rem',
    padding: '1rem',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)'
  },
  submitBtn: {
    width: '100%',
    padding: '1.2rem',
    fontSize: '1.1rem',
    marginTop: '2rem'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '1rem'
  },
  summaryItem: {
    display: 'flex',
    gap: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '1rem'
  },
  itemImage: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemName: {
    fontSize: '0.9rem',
    fontFamily: 'var(--font-family-heading)',
    color: 'var(--color-white)',
    marginBottom: '0.2rem'
  },
  itemQty: {
    color: 'var(--color-text-muted)',
    fontSize: '0.8rem',
    marginBottom: '0.2rem'
  },
  itemPrice: {
    color: 'var(--color-primary)',
    fontWeight: '700',
    fontSize: '1rem'
  },
  totals: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'var(--color-text-muted)',
    fontSize: '1rem'
  },
  grandTotal: {
    color: 'var(--color-white)',
    fontSize: '1.4rem',
    fontWeight: '800',
    fontFamily: 'var(--font-family-heading)',
    marginTop: '1rem',
    borderTop: '1px dashed rgba(255,255,255,0.2)',
    paddingTop: '1rem'
  }
};

export default Checkout;
