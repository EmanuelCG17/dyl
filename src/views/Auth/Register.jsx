import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.page}
    >
      {/* Elemento decorativo de fondo */}
      <div style={styles.glowCircle}></div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        style={styles.container}
        className="glass-panel"
      >
        <div style={styles.header}>
          <img src="/src/assets/images/logodyl.png" alt="DYL" style={styles.logo} />
          <h2 style={styles.title}>ÚNETE A <span className="text-accent">DYL</span></h2>
          <p style={styles.subtitle}>Crea tu cuenta y empieza el hype.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group floating-input-group">
            <input type="text" id="name" className="form-control floating-input" required placeholder=" " />
            <label className="floating-label" htmlFor="name">Nombre Completo</label>
          </div>

          <div className="form-group floating-input-group">
            <input type="email" id="email" className="form-control floating-input" required placeholder=" " />
            <label className="floating-label" htmlFor="email">Correo Electrónico</label>
          </div>

          <div className="form-group floating-input-group">
            <input type="password" id="password" className="form-control floating-input" required placeholder=" " />
            <label className="floating-label" htmlFor="password">Contraseña</label>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary" 
            style={{width: '100%', marginTop: '1.5rem', padding: '1.2rem', fontSize: '1.1rem'}}
          >
            CREAR CUENTA
          </motion.button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            ¿Ya tienes cuenta? <Link to="/login" style={styles.footerLink}>Inicia Sesión</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8rem 2rem 4rem 2rem',
    position: 'relative',
    zIndex: 2
  },
  glowCircle: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(230,25,43,0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
    filter: 'blur(40px)'
  },
  container: {
    width: '100%',
    maxWidth: '480px',
    padding: '3.5rem 3rem',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    height: '70px',
    objectFit: 'contain',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 0 8px rgba(230,25,43,0.4))'
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '0.5rem',
    letterSpacing: '1px'
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  footer: {
    marginTop: '2.5rem',
    textAlign: 'center',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '2rem'
  },
  footerText: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem'
  },
  footerLink: {
    color: 'var(--color-primary)',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginLeft: '0.5rem',
    textShadow: '0 0 10px rgba(230,25,43,0.3)'
  }
};

export default Register;
