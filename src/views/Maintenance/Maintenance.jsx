import { motion } from 'framer-motion';

const Maintenance = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-deep)',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 500 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{
            fontSize: '5rem',
            marginBottom: '1.5rem',
            display: 'inline-block',
          }}
        >
          🔧
        </motion.div>
        
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          color: 'var(--white)',
          marginBottom: '1rem',
          letterSpacing: '0.02em',
        }}>
          EN MANTENIMIENTO
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-400)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          Estamos trabajando para mejorar tu experiencia. 
          Pronto volveremos con nuevas funcionalidades y un servicio aún mejor.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <div style={{
            padding: '1rem 2rem',
            background: 'rgba(230, 25, 43, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-accent)',
          }}>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--gray-300)', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <i className="bi bi-whatsapp" style={{ color: '#25D366' }} />
              ¿Necesitas ayuda urgentemente?
            </p>
            <a 
              href="https://wa.me/573000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '0.75rem',
                padding: '0.6rem 1.5rem',
                background: '#25D366',
                color: '#fff',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Chatea con nosotros
            </a>
          </div>

          <div style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '1.5rem',
            fontSize: '1.5rem',
          }}>
            <a href="https://instagram.com/dyl_importaciones" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray-400)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#E1306C'} onMouseOut={e => e.target.style.color = 'var(--gray-400)'}>
              <i className="bi bi-instagram" />
            </a>
            <a href="mailto:contacto@dyl.com" style={{ color: 'var(--gray-400)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--red-400')} onMouseOut={e => e.target.style.color = 'var(--gray-400)'}>
              <i className="bi bi-envelope" />
            </a>
          </div>
        </div>

        <p style={{
          marginTop: '3rem',
          fontSize: '0.75rem',
          color: 'var(--gray-600)',
          letterSpacing: '0.1em',
        }}>
          DYL IMPORTACIONES © 2024
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Maintenance;