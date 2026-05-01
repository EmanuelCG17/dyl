import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import CartSidebar from './components/common/CartSidebar';
import FloatingSocials from './components/common/FloatingSocials';

// Lazy-loaded views (code splitting)
const Home = lazy(() => import('./views/Home/Home'));
const Catalog = lazy(() => import('./views/Catalog/Catalog'));
const About = lazy(() => import('./views/About/About'));
const Support = lazy(() => import('./views/Support/Support'));
const Legal = lazy(() => import('./views/Legal/Legal'));
const Login = lazy(() => import('./views/Auth/Login'));
const Register = lazy(() => import('./views/Auth/Register'));
const Checkout = lazy(() => import('./views/Checkout/Checkout'));

// Premium loader
const PageLoader = () => (
  <div style={loaderStyle.wrapper}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={loaderStyle.content}
    >
      <span style={loaderStyle.logo}>DYL</span>
      <div style={loaderStyle.barTrack}>
        <motion.div
          style={loaderStyle.barFill}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  </div>
);

// Premium 404 page
const NotFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={notFoundStyle.page}
  >
    <div style={notFoundStyle.glow} aria-hidden="true" />
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      style={notFoundStyle.content}
    >
      <motion.h1
        style={notFoundStyle.num}
        animate={{ textShadow: ['0 0 30px rgba(230,25,43,0.5)', '0 0 60px rgba(230,25,43,0.8)', '0 0 30px rgba(230,25,43,0.5)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        404
      </motion.h1>
      <h2 style={notFoundStyle.title}>PÁGINA NO ENCONTRADA</h2>
      <p style={notFoundStyle.text}>
        Este par no está en nuestro catálogo. ¿Quizás buscabas algo diferente?
      </p>
      <div style={notFoundStyle.actions}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/"
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
          >
            <i className="bi bi-house" /> Ir al Inicio
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/catalogo"
            className="btn btn-ghost btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            Ver Catálogo
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <CartSidebar />
        <FloatingSocials />

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/soporte" element={<Support />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

const loaderStyle = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-base)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.8rem',
    width: '200px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'var(--red-500)',
    letterSpacing: '0.08em',
    textShadow: '0 0 20px rgba(230,25,43,0.4)',
  },
  barTrack: {
    width: '100%',
    height: '2px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '9999px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--red-600), var(--red-400))',
    borderRadius: '9999px',
    boxShadow: '0 0 10px var(--red-glow)',
  },
};

const notFoundStyle = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,25,43,0.12) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  content: {
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  num: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(7rem, 20vw, 14rem)',
    color: 'var(--red-500)',
    lineHeight: 0.9,
    letterSpacing: '-0.04em',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    color: 'var(--white)',
    letterSpacing: '0.05em',
  },
  text: {
    color: 'var(--gray-400)',
    fontSize: '1rem',
    maxWidth: '380px',
    lineHeight: 1.7,
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '0.5rem',
  },
};

export default App;
