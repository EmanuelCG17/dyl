import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, realizamos envíos seguros y asegurados a todo el territorio nacional. El tiempo de entrega varía entre 2 y 5 días hábiles."
  },
  {
    q: "¿Tienen garantía?",
    a: "Totalmente. Ofrecemos garantía de 30 días por defectos de fábrica. No cubre desgaste por uso normal."
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos en efectivo a través de nuestros aliados."
  },
  {
    q: "¿Qué pasa si no me queda la talla?",
    a: "Tienes 5 días desde que recibes el producto para solicitar un cambio de talla, siempre y cuando el par no haya sido usado y conserve sus etiquetas originales."
  }
];

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={styles.header}
        >
          <h1 style={styles.title}>CENTRO DE <span className="text-accent">SOPORTE</span></h1>
          <p style={styles.subtitle}>Todo lo que necesitas saber antes de hacer tu compra.</p>
        </motion.div>

        <div style={styles.faqContainer}>
          {faqData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              style={styles.faqItem}
            >
              <button 
                style={{
                  ...styles.faqButton,
                  color: openIndex === index ? 'var(--color-primary)' : 'var(--color-white)'
                }}
                onClick={() => toggleFAQ(index)}
              >
                {item.q}
                <motion.i 
                  className="bi bi-chevron-down"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.i>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={styles.faqAnswer}
                  >
                    <p style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
    backgroundColor: 'var(--color-bg)'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.2rem',
    marginTop: '1rem'
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  faqItem: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  faqButton: {
    width: '100%',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: 'var(--font-family-heading)',
    textAlign: 'left',
    transition: 'color var(--transition-fast)'
  },
  faqAnswer: {
    color: 'var(--color-text-muted)',
    fontSize: '1rem',
    lineHeight: '1.6',
    overflow: 'hidden'
  }
};

export default Support;
