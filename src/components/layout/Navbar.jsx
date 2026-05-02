import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../features/auth/types';
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
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(function closeMobileOnNav() {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const cartCount = getCartCount();
  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = useCallback(async function doLogout() {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  const isAdmin = user?.role === ROLES.ADMIN || user?.role === ROLES.SUPERADMIN;

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} aria-label="DYL Importaciones - Inicio">
            <img src={logoUrl} alt="DYL" className={styles.logo} />
          </Link>

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

          <div className={styles.actions}>
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  id="navbar-user-btn"
                  onClick={() => setUserMenuOpen(o => !o)}
                  className={styles.authLink}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'none', border: 'none' }}
                  aria-label="Menú de usuario"
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: ROLE_COLORS[user.role],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className={styles.authLabel} style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <i className={`bi bi-chevron-${userMenuOpen ? 'up' : 'down'}`} style={{ fontSize: '0.65rem' }} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 0.75rem)', right: 0,
                        background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)', padding: '0.5rem',
                        minWidth: 200, zIndex: 200, boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div style={{ padding: '0.6rem 0.8rem 0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.4rem' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', margin: '0.15rem 0 0.3rem' }}>{user.email}</p>
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                          padding: '0.15rem 0.5rem', borderRadius: '999px',
                          background: `${ROLE_COLORS[user.role]}22`, color: ROLE_COLORS[user.role],
                          border: `1px solid ${ROLE_COLORS[user.role]}44`,
                        }}>
                          {ROLE_LABELS[user.role]}
                        </span>
                      </div>
                      {isAdmin && (
                        <Link to="/dashboard" style={dropdownItemStyle}>
                          <i className="bi bi-speedometer2" /> Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} style={{ ...dropdownItemStyle, width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red-400)' }}>
                        <i className="bi bi-box-arrow-right" /> Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.authLink} id="navbar-login-btn">
                  <i className="bi bi-person" aria-hidden="true" />
                  <span className={styles.authLabel}>Entrar</span>
                </Link>
                <Link to="/register" className={styles.registerLink} id="navbar-register-btn">
                  <i className="bi bi-person-plus" aria-hidden="true" />
                  <span className={styles.authLabel}>Registro</span>
                </Link>
              </>
            )}

            <button
              id="navbar-cart-btn"
              onClick={toggleCart}
              className={styles.cartBtn}
              aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} items` : ''}`}
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
                  <motion.div key={path} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
                    <Link to={path} className={`${styles.mobileLink} ${isActive(path) ? styles.mobileLinkActive : ''}`}>{label}</Link>
                  </motion.div>
                ))}
                <div className={styles.mobileDivider} />
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <Link to="/dashboard" className={styles.mobileLink}><i className="bi bi-speedometer2" /> Dashboard</Link>
                      </motion.div>
                    )}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
                      <button onClick={handleLogout} className={styles.mobileLink} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--red-400)' }}>
                        <i className="bi bi-box-arrow-right" /> Cerrar sesión
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: navLinks.length * 0.07 }}>
                      <Link to="/login" className={styles.mobileLink}><i className="bi bi-person" /> Entrar</Link>
                    </motion.div>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: (navLinks.length + 1) * 0.07 }}>
                      <Link to="/register" className={`${styles.mobileLink} ${styles.mobileLinkRegister}`}><i className="bi bi-person-plus" /> Registro</Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
});

const dropdownItemStyle = {
  display: 'flex', alignItems: 'center', gap: '0.6rem',
  padding: '0.55rem 0.8rem', borderRadius: 'var(--radius-sm)',
  fontSize: '0.85rem', color: 'var(--gray-200)', textDecoration: 'none',
  transition: 'background 0.15s ease',
  cursor: 'pointer',
};

export default Navbar;