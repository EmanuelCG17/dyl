import React from 'react';
import { motion } from 'framer-motion';

const Legal = () => {
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
          <h1 style={styles.title}>TÉRMINOS Y <span className="text-accent">POLÍTICAS</span></h1>
          <p style={styles.subtitle}>Información legal importante sobre el uso de nuestro sitio y compras.</p>
        </motion.div>

        <div style={styles.content}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Términos y Condiciones</h2>
            <p style={styles.text}>
              Bienvenido a DYL Importaciones. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo, por favor no utilices el sitio.
            </p>
            <p style={styles.text}>
              Todas las ventas son finales una vez procesado el envío. Nos reservamos el derecho de cancelar cualquier orden en caso de sospecha de fraude o error en el inventario. Los precios están sujetos a cambios sin previo aviso.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Política de Privacidad</h2>
            <p style={styles.text}>
              Respetamos tu privacidad. Cualquier información personal que nos proporciones (nombre, correo electrónico, dirección) se utilizará exclusivamente para procesar tus pedidos y mejorar tu experiencia. No compartimos ni vendemos tu información a terceros.
            </p>
            <p style={styles.text}>
              Nuestro sitio utiliza cookies para mantener tu sesión activa y recordar los productos en tu bolsa de compras.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Políticas de Devolución</h2>
            <p style={styles.text}>
              Las devoluciones solo se aceptan dentro de los primeros 5 días hábiles después de haber recibido el producto, y únicamente por defectos de fábrica o errores de talla por parte de DYL Importaciones. El calzado debe estar sin usar, en su caja original y con todas sus etiquetas.
            </p>
          </section>
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
    position: 'relative',
    zIndex: 2
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    marginBottom: '4rem',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '2rem'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    letterSpacing: '-1px',
    marginBottom: '1rem'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: 'var(--color-white)',
    letterSpacing: '1px'
  },
  text: {
    color: 'var(--color-text-muted)',
    fontSize: '1.05rem',
    lineHeight: '1.8'
  }
};

export default Legal;
