import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/images/logodyl.png';

const Footer = () => {
  return (
    <footer style={styles.footer} className="glass-dark">
      <div style={styles.container}>
        
        {/* Info Column */}
        <div style={styles.column}>
          <img src={logoUrl} alt="DYL Logo" style={styles.logo} />
          <p style={styles.text}>El hype en su máxima expresión. Las mejores siluetas, directo a tus manos.</p>
        </div>

        {/* Links Column */}
        <div style={styles.column}>
          <h4 style={styles.subtitle}>Empresa</h4>
          <Link to="/about" style={styles.link}>Nuestra Historia</Link>
          <Link to="/soporte" style={styles.link}>Soporte y Ayuda</Link>
          <Link to="/legal" style={styles.link}>Legal y Políticas</Link>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} DYL IMPORTACIONES. TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    paddingTop: '6rem',
    marginTop: 'auto',
    borderTop: '1px solid var(--color-border)',
    position: 'relative',
    zIndex: 10
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '4rem',
    marginBottom: '4rem'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  logo: {
    height: '100px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
    filter: 'drop-shadow(0 0 5px rgba(230,25,43,0.2))'
  },
  subtitle: {
    fontFamily: 'var(--font-family-heading)',
    fontSize: '1.2rem',
    color: 'var(--color-primary)',
    letterSpacing: '2px'
  },
  text: {
    color: 'var(--color-text-muted)',
    fontSize: '1rem',
    lineHeight: '1.8'
  },
  link: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    transition: 'color var(--transition-fast)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '700'
  },
  bottomBar: {
    borderTop: '1px solid var(--color-border)',
    padding: '2rem',
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '600'
  }
};

export default Footer;
