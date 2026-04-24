import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        {product.isNew && <span style={styles.badge}>Hype</span>}
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            ...styles.image,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }} 
        />
        
        <div style={{
          ...styles.overlay,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
        }}>
          <button 
            style={styles.quickAddBtn}
            onClick={() => addToCart(product)}
          >
            Añadir a Bolsa
          </button>
        </div>
      </div>

      <div style={styles.info}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>${product.price.toLocaleString('es-CO')}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid var(--color-border)',
    padding: '1rem',
    transition: 'all var(--transition-fast)'
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%', 
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
    marginBottom: '1.5rem'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    padding: '0.4rem 1rem',
    fontSize: '0.75rem',
    fontWeight: '800',
    zIndex: 2,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    boxShadow: 'var(--shadow-glow)'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    background: 'linear-gradient(to top, rgba(5,5,5,0.9), transparent)',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'center'
  },
  quickAddBtn: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    padding: '1rem',
    width: '100%',
    fontWeight: '800',
    fontFamily: 'var(--font-family-heading)',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    border: '1px solid var(--color-primary)',
    transition: 'all 0.2s ease'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0'
  },
  category: {
    color: 'var(--color-text-muted)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '0.5rem'
  },
  name: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-family-heading)',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'var(--color-white)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: '800',
    fontFamily: 'var(--font-family-heading)',
    color: 'var(--color-primary)'
  }
};

export default ProductCard;
