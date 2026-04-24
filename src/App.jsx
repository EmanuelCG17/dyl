import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';

// Componentes Comunes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/common/CartSidebar';
import FloatingSocials from './components/common/FloatingSocials';

// Vistas con carga perezosa (Code Splitting para velocidad extrema)
const Home = lazy(() => import('./views/Home/Home'));
const Catalog = lazy(() => import('./views/Catalog/Catalog'));
const About = lazy(() => import('./views/About/About'));
const Support = lazy(() => import('./views/Support/Support'));
const Legal = lazy(() => import('./views/Legal/Legal'));
const Login = lazy(() => import('./views/Auth/Login'));
const Register = lazy(() => import('./views/Auth/Register'));
const Checkout = lazy(() => import('./views/Checkout/Checkout'));

// Pantalla de carga mientras React Lazy descarga las vistas
const Loader = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid rgba(230,25,43,0.3)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />
        <CartSidebar />
        <FloatingSocials />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/soporte" element={<Support />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<h2 style={{color: 'white', textAlign: 'center', marginTop: '10rem'}}>404 - Página no encontrada</h2>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
