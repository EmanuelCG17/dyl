import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import logoUrl from '../../assets/images/logodyl.png';
import styles from './Navbar.module.css';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/catalogo', label: 'Catálogo' },
  { path: '/about', label: 'Nosotros' },
  { path: '/soporte', label: 'Soporte' },
];

const Navbar = memo(function Navbar() {
  const { getCartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const handleScroll = useCallback(function handleScrollEvent() {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(function attachScrollListener() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return function removeScrollListener() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(function closeMobileOnNav() {
    setMobileOpen(false);
  }, [location.pathname]);

  const cartCount = getCartCount();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX }}
      />

      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink} aria-label="DYL Importaciones - Inicio">
            <img src={logoUrl} alt="DYL" className={styles.logo} />
          </Link>

          {/* Desktop Links */}
          <div className={styles.navLinks} role="navigation" aria-label="Navegación principal">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${styles.link} ${isActive(path) ? styles.linkActive : ''}`}
              >
                {label}
                {isActive(path) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className={styles.linkIndicator}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Link to="/login" className={styles.authLink} id="navbar-login-btn">
              <i className="bi bi-person" aria-hidden="true" />
              <span className={styles.authLabel}>Entrar</span>
            </Link>

            <Link to="/register" className={styles.registerLink} id="navbar-register-btn">
              <i className="bi bi-person-plus" aria-hidden="true" />
              <span className={styles.authLabel}>Registro</span>
            </Link>

            <button
              id="navbar-cart-btn"
              onClick={toggleCart}
              className={styles.cartBtn}
              aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <i className={`bi bi-bag ${styles.cartIcon}`} aria-hidden="true" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={styles.cartBadge}
                    aria-hidden="true"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger */}
            <button
              id="navbar-menu-btn"
              onClick={() => setMobileOpen(o => !o)}
              className={styles.hamburger}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              <span className={`${styles.bar} ${mobileOpen ? styles.barTopOpen : ''}`} />
              <span className={`${styles.bar} ${mobileOpen ? styles.barMidOpen : ''}`} />
              <span className={`${styles.bar} ${mobileOpen ? styles.barBotOpen : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.mobileMenu}
            >
              <div className={styles.mobileMenuInner}>
                {navLinks.map(({ path, label }, i) => (
                  <motion.div
                    key={path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      to={path}
                      className={`${styles.mobileLink} ${isActive(path) ? styles.mobileLinkActive : ''}`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                  className={styles.mobileDivider}
                />
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.07, duration: 0.3 }}
                >
                  <Link to="/login" className={styles.mobileLink}>
                    <i className="bi bi-person" /> Entrar
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navLinks.length + 2) * 0.07, duration: 0.3 }}
                >
                  <Link to="/register" className={`${styles.mobileLink} ${styles.mobileLinkRegister}`}>
                    <i className="bi bi-person-plus" /> Registro
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
});

export default Navbar;