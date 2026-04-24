import React from 'react';
import Hero from '../../components/home/Hero';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* Teaser de Sobre Nosotros */}
      <section style={styles.aboutTeaser}>
        <div style={styles.container}>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={styles.content}
          >
            <h2 style={styles.title}>NUESTRO <span className="text-accent">LEGADO</span></h2>
            <p style={styles.text}>
              No somos una tienda más. Importamos cultura, historia y exclusividad. 
              Si buscas el par que nadie más puede conseguir, estás en el lugar correcto.
            </p>
            <button 
              onClick={() => navigate('/about')} 
              className="btn-outline"
              style={{ marginTop: '2rem' }}
            >
              Conoce nuestra historia
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

const styles = {
  aboutTeaser: {
    padding: '8rem 0',
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(5,5,5,0.4)',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '1.5rem',
    letterSpacing: '-1px'
  },
  text: {
    color: 'var(--color-text-muted)',
    fontSize: '1.2rem',
    lineHeight: '1.8',
    maxWidth: '600px'
  }
};

export default Home;
