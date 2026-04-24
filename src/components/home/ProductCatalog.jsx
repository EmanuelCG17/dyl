import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../services/mockData';

const ProductCatalog = () => {
  return (
    <section id="catalogo" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>NUESTRO <span className="text-accent">CATÁLOGO</span></h2>
          <p style={styles.subtitle}>Las siluetas más buscadas. Solo calidad Premium.</p>
        </div>

        <div style={styles.grid}>
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--color-bg)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '5rem'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'var(--color-white)',
    lineHeight: '1',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.2rem',
    marginTop: '1rem',
    maxWidth: '600px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '3rem'
  }
};

export default ProductCatalog;
