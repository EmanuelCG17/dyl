import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoUrl from '../../assets/images/logodyl.png';

const footerLinks = {
  tienda: [
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Novedades', path: '/catalogo' },
    { label: 'Sneakers', path: '/catalogo' },
    { label: 'Ropa', path: '/catalogo' },
    { label: 'Accesorios', path: '/catalogo' },
  ],
  empresa: [
    { label: 'Nuestra Historia', path: '/about' },
    { label: 'Soporte', path: '/soporte' },
    { label: 'Legal', path: '/legal' },
  ],
};

const Footer = memo(function Footer() {
  return (
    <footer style={s.footer}>
      {/* Top gradient divider */}
      <div style={s.topDivider} />

      <div style={s.container}>
        {/* Main Grid */}
        <div style={s.grid}>
          {/* Brand Column */}
          <div style={s.brandCol}>
            <Link to="/" aria-label="DYL Importaciones">
              <img src={logoUrl} alt="DYL" style={s.logo} />
            </Link>
            <p style={s.tagline}>
              Importamos cultura, historia y exclusividad. El hype está aquí.
            </p>
            <div style={s.socials}>
              <a
                href="https://api.whatsapp.com/send/?phone=573142191863&text=Bienvenido%20a%20D%20y%20L%20Importaciones%2C%20aprovecha%20nuestras%20excelentes%20promociones"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...s.socialBtn, ...s.socialWa }}
                aria-label="WhatsApp"
                id="footer-whatsapp"
              >
                <i className="bi bi-whatsapp" />
              </a>
              <a
                href="https://www.instagram.com/dylimportacionesdyl/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...s.socialBtn, ...s.socialIg }}
                aria-label="Instagram"
                id="footer-instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="mailto:soporte@dylimportaciones.com"
                style={{ ...s.socialBtn, ...s.socialEmail }}
                aria-label="Email"
                id="footer-email"
              >
                <i className="bi bi-envelope" />
              </a>
            </div>
          </div>

          {/* Tienda Links */}
          <div style={s.linkCol}>
            <h4 style={s.colTitle}>Tienda</h4>
            <nav aria-label="Links de tienda">
              {footerLinks.tienda.map((link) => (
                <Link key={link.label} to={link.path} style={s.footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Empresa Links */}
          <div style={s.linkCol}>
            <h4 style={s.colTitle}>Empresa</h4>
            <nav aria-label="Links de empresa">
              {footerLinks.empresa.map((link) => (
                <Link key={link.label} to={link.path} style={s.footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div style={s.newsletterCol}>
            <h4 style={s.colTitle}>Mantente al tanto</h4>
            <p style={s.newsletterText}>
              Recibe lanzamientos exclusivos y drops antes que nadie.
            </p>
            <div style={s.newsletterForm}>
              <input
                type="email"
                placeholder="tu@email.com"
                style={s.newsletterInput}
                aria-label="Email para newsletter"
                id="footer-newsletter-input"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={s.newsletterBtn}
                id="footer-newsletter-btn"
                aria-label="Suscribirse al newsletter"
              >
                <i className="bi bi-arrow-right" />
              </motion.button>
            </div>
            <p style={s.newsletterDisclaimer}>
              Sin spam. Solo lo mejor.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={s.bottomBar}>
          <div style={s.dividerGradient} />
          <div style={s.bottomContent}>
            <span style={s.copyright}>
              © {new Date().getFullYear()} DYL Importaciones. Todos los derechos reservados.
            </span>
            <div style={s.badges}>
              <span style={s.badge}>
                <i className="bi bi-shield-check" /> Compra Segura
              </span>
              <span style={s.badge}>
                <i className="bi bi-truck" /> Envíos Colombia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

const s = {
  footer: {
    background: 'var(--bg-deep)',
    marginTop: 'auto',
    position: 'relative',
  },
  topDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--red-500) 30%, var(--red-400) 50%, var(--red-500) 70%, transparent)',
  },
  container: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '4rem var(--space-8) 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 2fr',
    gap: '3rem',
    marginBottom: '3rem',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  logo: {
    height: '52px',
    width: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 8px rgba(230,25,43,0.3))',
  },
  tagline: {
    fontSize: '0.9rem',
    color: 'var(--gray-400)',
    lineHeight: 1.7,
    maxWidth: '260px',
  },
  socials: {
    display: 'flex',
    gap: '0.6rem',
  },
  socialBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    flexShrink: 0,
  },
  socialWa: {
    background: 'rgba(37,211,102,0.12)',
    color: '#25D366',
    border: '1px solid rgba(37,211,102,0.25)',
  },
  socialIg: {
    background: 'rgba(225,48,108,0.12)',
    color: '#E1306C',
    border: '1px solid rgba(225,48,108,0.25)',
  },
  socialEmail: {
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--gray-300)',
    border: '1px solid var(--border-default)',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  colTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--gray-400)',
    fontFeatureSettings: '"ss01"',
  },
  footerLink: {
    display: 'block',
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
    padding: '0.25rem 0',
    transition: 'color 0.2s ease, transform 0.2s ease',
  },
  newsletterCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  newsletterText: {
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
    lineHeight: 1.6,
  },
  newsletterForm: {
    display: 'flex',
    gap: 0,
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    transition: 'border-color 0.25s ease',
  },
  newsletterInput: {
    flex: 1,
    padding: '0.85rem 1rem',
    background: 'var(--bg-card)',
    border: 'none',
    color: 'var(--white)',
    fontSize: '0.88rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
  },
  newsletterBtn: {
    padding: '0.85rem 1.1rem',
    background: 'var(--red-500)',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    transition: 'background 0.25s ease',
  },
  newsletterDisclaimer: {
    fontSize: '0.72rem',
    color: 'var(--gray-500)',
  },
  bottomBar: {
    marginTop: '2rem',
  },
  dividerGradient: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--border-default), transparent)',
    marginBottom: '1.5rem',
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.78rem',
    color: 'var(--gray-500)',
  },
  badges: {
    display: 'flex',
    gap: '1rem',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.72rem',
    color: 'var(--gray-500)',
    letterSpacing: '0.05em',
  },
};

export default Footer;