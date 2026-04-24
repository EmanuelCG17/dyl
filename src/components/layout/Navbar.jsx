import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logoUrl from '../../assets/images/logodyl.png';

const Navbar = () => {
  const { getCartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'glass-dark' : ''} style={{
      ...styles.nav,
      backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent'
    }}>
      <div style={styles.container}>
        
        {/* Logo */}
        <Link to="/" style={styles.logoContainer}>
          <img 
            src={logoUrl} 
            alt="DYL Importaciones" 
            style={styles.logoImage} 
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <span style={{...styles.logoFallback, display: 'none'}}>DYL <span className="text-accent">IMPORTS</span></span>
        </Link>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <Link to="/" style={{...styles.link, color: location.pathname === '/' ? 'var(--color-primary)' : 'var(--color-white)'}}>Inicio</Link>
          <Link to="/catalogo" style={{...styles.link, color: location.pathname === '/catalogo' ? 'var(--color-primary)' : 'var(--color-white)'}}>Catálogo</Link>
          <Link to="/about" style={{...styles.link, color: location.pathname === '/about' ? 'var(--color-primary)' : 'var(--color-white)'}}>Nosotros</Link>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <div style={styles.authGroup}>
            <Link to="/login" style={styles.authLink}>Entrar</Link>
            <span style={styles.separator}>|</span>
            <Link to="/register" style={styles.authLink}>Registro</Link>
          </div>
          
          <button style={styles.cartBtn} onClick={toggleCart} aria-label="Bolsa de compras">
            <i className="bi bi-bag-fill" style={styles.cartIcon}></i>
            {getCartCount() > 0 && (
              <span style={styles.cartBadge}>{getCartCount()}</span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};

const styles = {
  nav: {
    color: 'var(--color-white)',
    padding: '1rem 0',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    transition: 'all var(--transition-fast)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'var(--color-white)'
  },
  logoImage: {
    height: '80px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))'
  },
  logoFallback: {
    fontSize: '1.8rem',
    fontWeight: '900',
    fontFamily: 'var(--font-family-heading)',
    letterSpacing: '2px'
  },
  navLinks: {
    display: 'flex',
    gap: '2.5rem'
  },
  link: {
    fontWeight: '700',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'var(--font-family-heading)',
    transition: 'color var(--transition-fast)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  authGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  authLink: {
    color: 'var(--color-white)',
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'color var(--transition-fast)'
  },
  separator: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '0.9rem'
  },
  cartBtn: {
    color: 'var(--color-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    transition: 'transform 0.2s ease'
  },
  cartIcon: {
    fontSize: '1.5rem'
  },
  cartBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    fontSize: '0.75rem',
    fontWeight: '800',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(230,25,43,0.4)',
    transform: 'translate(25%, -25%)'
  }
};

export default Navbar;
