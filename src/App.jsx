import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext.jsx';
import { StoreConfigProvider, useStoreConfig } from './context/StoreConfigContext.jsx';
import { ROLES } from './features/auth/types';
import { useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './features/auth/components/ProtectedRoute.jsx';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import CartSidebar from './components/common/CartSidebar';
import FloatingSocials from './components/common/FloatingSocials';

// Lazy-loaded views
const Home = lazy(() => import('./views/Home/Home'));
const Catalog = lazy(() => import('./views/Catalog/Catalog'));
const About = lazy(() => import('./views/About/About'));
const Support = lazy(() => import('./views/Support/Support'));
const Legal = lazy(() => import('./views/Legal/Legal'));
const Login = lazy(() => import('./views/Auth/Login'));
const Register = lazy(() => import('./views/Auth/Register'));
const Checkout = lazy(() => import('./views/Checkout/Checkout'));
const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'));

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

const NotFound = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={notFoundStyle.page}>
    <div style={notFoundStyle.glow} aria-hidden="true" />
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} style={notFoundStyle.content}>
      <motion.h1 style={notFoundStyle.num} animate={{ textShadow: ['0 0 30px rgba(230,25,43,0.5)', '0 0 60px rgba(230,25,43,0.8)', '0 0 30px rgba(230,25,43,0.5)'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>404</motion.h1>
      <h2 style={notFoundStyle.title}>PÁGINA NO ENCONTRADA</h2>
      <p style={notFoundStyle.text}>Este par no está en nuestro catálogo. ¿Quizás buscabas algo diferente?</p>
      <div style={notFoundStyle.actions}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link to="/" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>
            <i className="bi bi-house" /> Ir al Inicio
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

// Layout general del sitio (con Navbar, Footer, etc.)
function SiteLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <CartSidebar />
      <FloatingSocials />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

// Página de mantenimiento - más completa y responsive
const MaintenancePage = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--bg-deep)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background effects */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,25,43,0.15) 0%, transparent 50%)',
      pointerEvents: 'none',
    }} />
    
    <motion.div 
      initial={{ scale: 0.8, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 500, position: 'relative', zIndex: 1 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '1.5rem', display: 'inline-block' }}
      >
        🔧
      </motion.div>
      
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 8vw, 3.5rem)',
        color: 'var(--white)',
        letterSpacing: '0.02em',
        marginBottom: '1rem',
      }}>
        EN MANTENIMIENTO
      </h1>
      
      {/* Opción de emergencia para salir del modo mantenimiento */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link 
          to="/login" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--gray-300)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <i className="bi bi-box-arrow-right" />
          ¿Eres administrador? Inicia sesión
        </Link>
      </div>
      
      <p style={{
        fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
        color: 'var(--gray-400)',
        lineHeight: 1.7,
        marginBottom: '2rem',
        maxWidth: 400,
        marginInline: 'auto',
      }}>
        Estamos mejorando la tienda para ofrecerte una mejor experiencia. Vuelve pronto.
      </p>

      {/* Contact options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(230, 25, 43, 0.08)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-accent)',
          width: '100%',
          maxWidth: 300,
        }}>
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--gray-300)', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            <i className="bi bi-whatsapp" style={{ color: '#25D366' }} />
            ¿Necesitas ayuda urgentemente?
          </p>
          <a 
            href="https://wa.me/573000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.75rem',
              padding: '0.6rem 1.5rem',
              background: '#25D366',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Chatea con nosotros
          </a>
        </div>

        {/* Social links */}
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          gap: '1.5rem',
          fontSize: '1.5rem',
        }}>
          <a href="https://instagram.com/dyl_importaciones" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray-400)' }}>
            <i className="bi bi-instagram" />
          </a>
          <a href="mailto:contacto@dyl.com" style={{ color: 'var(--gray-400)' }}>
            <i className="bi bi-envelope" />
          </a>
        </div>
      </div>

      <p style={{
        marginTop: '3rem',
        fontSize: '0.7rem',
        color: 'var(--gray-600)',
        letterSpacing: '0.1em',
      }}>
        DYL IMPORTACIONES © 2024
      </p>
    </motion.div>
  </motion.div>
);

// Wrapper que aplica modo mantenimiento para no-admins
function AppRoutes() {
  const { config } = useStoreConfig();
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === ROLES.ADMIN || user?.role === ROLES.SUPERADMIN;
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Modo mantenimiento: bloquea todo salvo dashboard y login a no-admins
  if (config.maintenanceMode && !isAdmin && !isDashboard && location.pathname !== '/login') {
    return <MaintenancePage />;
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/catalogo" element={<SiteLayout><Catalog /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
          <Route path="/soporte" element={<SiteLayout><Support /></SiteLayout>} />
          <Route path="/legal" element={<SiteLayout><Legal /></SiteLayout>} />
          <Route path="/login" element={<SiteLayout><Login /></SiteLayout>} />
          <Route path="/register" element={<SiteLayout><Register /></SiteLayout>} />
          <Route path="/checkout" element={<SiteLayout><Checkout /></SiteLayout>} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <StoreConfigProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </StoreConfigProvider>
  );
}

const loaderStyle = {
  wrapper: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-base)' },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem', width: '200px' },
  logo: { fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--red-500)', letterSpacing: '0.08em', textShadow: '0 0 20px rgba(230,25,43,0.4)' },
  barTrack: { width: '100%', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' },
  barFill: { height: '100%', background: 'linear-gradient(90deg, var(--red-600), var(--red-400))', borderRadius: '9999px', boxShadow: '0 0 10px var(--red-glow)' },
};

const notFoundStyle = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' },
  glow: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,25,43,0.12) 0%, transparent 65%)', pointerEvents: 'none' },
  content: { textAlign: 'center', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
  num: { fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 20vw, 14rem)', color: 'var(--red-500)', lineHeight: 0.9, letterSpacing: '-0.04em' },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--white)', letterSpacing: '0.05em' },
  text: { color: 'var(--gray-400)', fontSize: '1rem', maxWidth: '380px', lineHeight: 1.7 },
  actions: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' },
};

export default App;
