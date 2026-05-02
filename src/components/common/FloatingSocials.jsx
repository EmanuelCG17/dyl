import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreConfig } from '../../context/StoreConfigContext.jsx';

const FloatingSocials = memo(function FloatingSocials() {
  const { config } = useStoreConfig();
  const [hoveredId, setHoveredId] = useState(null);

  const socials = [
    {
      id: 'whatsapp',
      icon: 'bi-whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${config.whatsappNumber}?text=Hola%2C%20me%20interesa%20un%20producto`,
      color: '#25D366',
      bg: 'rgba(37,211,102,0.12)',
      border: 'rgba(37,211,102,0.25)',
    },
    {
      id: 'instagram',
      icon: 'bi-instagram',
      label: 'Instagram',
      href: config.instagramUrl,
      color: '#E1306C',
      bg: 'rgba(225,48,108,0.12)',
      border: 'rgba(225,48,108,0.25)',
    },
  ];

  return (
    <div style={s.container} role="navigation" aria-label="Redes sociales">
      {socials.map(({ id, icon, label, href, color, bg, border }) => (
        <motion.a
          key={id}
          id={`floating-${id}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ ...s.pill, background: bg, borderColor: border }}
          onHoverStart={() => setHoveredId(id)}
          onHoverEnd={() => setHoveredId(null)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <i className={`bi ${icon}`} style={{ color, fontSize: '1.2rem', flexShrink: 0 }} aria-hidden="true" />
          <AnimatePresence>
            {hoveredId === id && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ ...s.pillLabel, color }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      ))}
    </div>
  );
});

const s = {
  container: { position: 'fixed', right: '1.2rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 900 },
  pill: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 0.85rem', borderRadius: '50px', border: '1px solid', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', cursor: 'pointer', textDecoration: 'none', overflow: 'hidden' },
  pillLabel: { fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden' },
};

export default FloatingSocials;