import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/home/ProductCard';
import { mockProducts } from '../../services/mockData';

const categories = ["Todos", "Jordan", "Nike", "Yeezy", "New Balance", "Ropa", "Accesorios"];

const Catalog = () => {
  const [filter, setFilter] = useState("Todos");

  const filteredProducts = filter === "Todos" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.page}
    >
      <div style={styles.container}>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.header}
        >
          <h1 style={styles.title}>CATÁLOGO <span className="text-accent">EXCLUSIVO</span></h1>
          <p style={styles.subtitle}>Selecciona la categoría y encuentra tu estilo.</p>
        </motion.div>

        {/* Filter Dropdown (E-Commerce Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={styles.filterContainer}
        >
          <div style={styles.dropdownWrapper}>
            <label htmlFor="categoryFilter" style={styles.filterLabel}>
              <i className="bi bi-funnel-fill"></i> Filtrar por:
            </label>
            <select 
              id="categoryFilter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.select}
              className="glass-panel"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{background: '#111', color: '#fff'}}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div layout style={styles.grid}>
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--color-text-muted)' }}>
            <h3>No hay productos en esta categoría por ahora.</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    paddingTop: '8rem',
    paddingBottom: '8rem',
    position: 'relative'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    position: 'relative',
    zIndex: 2
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.2rem',
    marginTop: '1rem'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '1rem'
  },
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  filterLabel: {
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-family-heading)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  select: {
    appearance: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'var(--color-white)',
    border: '1px solid var(--color-primary)',
    padding: '0.8rem 2.5rem 0.8rem 1rem',
    borderRadius: '4px',
    fontFamily: 'var(--font-family-heading)',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    outline: 'none',
    textTransform: 'uppercase',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E6192B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.7rem center',
    backgroundSize: '1em'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '3rem'
  }
};

export default Catalog;
