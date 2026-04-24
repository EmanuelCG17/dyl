import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={styles.content}
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={styles.badge}
          >
            DYL Exclusives
          </motion.span>
          <h1 style={styles.title}>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ color: 'var(--color-white)' }}
            >
              LOCOS POR
            </motion.span>
            <br/>
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
              className="text-accent"
            >
              LOS TENIS
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={styles.subtitle}
          >
            El hype está aquí. Domina las calles con la calidad y exclusividad que solo DYL te puede dar.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={styles.actionGroup}
          >
            <button onClick={() => navigate('/catalogo')} className="btn-primary">Ver Catálogo</button>
            <button onClick={() => navigate('/register')} className="btn-outline">Únete a DYL</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: '700px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&w=1920&q=100")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', 
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-white)'
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.7) 50%, rgba(5,5,5,0.3) 100%)',
    zIndex: 1
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '0 2rem'
  },
  content: {
    maxWidth: '700px'
  },
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1.2rem',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    fontWeight: '800',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: '2rem',
    borderRadius: '2px',
    boxShadow: 'var(--shadow-glow)'
  },
  title: {
    fontSize: 'clamp(4rem, 8vw, 6.5rem)',
    lineHeight: '0.9',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '-2px'
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
    marginBottom: '3rem',
    color: 'var(--color-text-muted)',
    maxWidth: '550px',
    lineHeight: '1.6'
  },
  actionGroup: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
};

export default Hero;
