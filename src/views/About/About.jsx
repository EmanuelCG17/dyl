import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <img src="/src/assets/images/logodyl.png" alt="DYL Logo" style={styles.logo} />
          <h1 style={styles.title}>NUESTRA <span className="text-accent">HISTORIA</span></h1>
        </motion.div>

        <div style={styles.contentGrid}>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.textSection}
          >
            <h2 style={styles.subtitle}>Locos por los tenis.</h2>
            <p style={styles.text}>
              DYL Importaciones no nació como un negocio, nació de una obsesión. La cultura del sneaker
              es más que un par de zapatos; es arte, es historia y es identidad.
            </p>
            <p style={styles.text}>
              Nos dimos cuenta de que conseguir las mejores siluetas, las colaboraciones exclusivas y 
              la calidad premium era una tarea casi imposible a precios justos. Así que decidimos
              importar directamente lo mejor del mercado mundial.
            </p>
            <p style={styles.text}>
              Hoy, somos el puente entre tú y ese par que creías inalcanzable.
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={styles.imageContainer}
          >
            <img 
              src="https://images.unsplash.com/photo-1612821745127-53855be9cbd1?auto=format&fit=crop&w=1000&q=100" 
              alt="Cultura Sneaker" 
              style={styles.image}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    paddingTop: '8rem',
    paddingBottom: '6rem',
    backgroundColor: 'var(--color-bg)',
    overflow: 'hidden'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    height: '150px',
    objectFit: 'contain',
    marginBottom: '2rem',
    filter: 'drop-shadow(0 0 10px rgba(230,25,43,0.3))'
  },
  title: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    letterSpacing: '-2px'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '4rem',
    alignItems: 'center'
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  subtitle: {
    fontSize: '2rem',
    color: 'var(--color-white)',
    marginBottom: '1rem'
  },
  text: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem',
    lineHeight: '1.8'
  },
  imageContainer: {
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-glow)',
    border: '1px solid var(--color-border)'
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block'
  }
};

export default About;
