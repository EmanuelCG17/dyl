import React from 'react';
import { motion } from 'framer-motion';

const FloatingSocials = () => {
  return (
    <div style={styles.container}>
      <motion.a 
        href="https://www.instagram.com/dylimportacionesdyl/" 
        target="_blank" 
        rel="noreferrer"
        style={styles.btn}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="social-float-btn instagram-float"
      >
        <i className="bi bi-instagram"></i>
      </motion.a>

      <motion.a 
        href="https://wa.me/573000000000" 
        target="_blank" 
        rel="noreferrer"
        style={styles.btn}
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            "0 0 10px rgba(230,25,43,0.3)",
            "0 0 25px rgba(230,25,43,0.8)",
            "0 0 10px rgba(230,25,43,0.3)"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="social-float-btn whatsapp-float"
      >
        <i className="bi bi-whatsapp"></i>
      </motion.a>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 9999
  },
  btn: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-primary)', // Rojo
    border: '2px solid var(--color-bg)', // Borde negro
    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease'
  }
};

export default FloatingSocials;
