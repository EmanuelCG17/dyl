import React, { memo } from 'react';
import Hero from '../../components/home/Hero';
import ProductCard from '../../components/home/ProductCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../services/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const FEATURED = mockProducts.filter(p => p.isNew).slice(0, 3);

const FEATURES = [
  { icon: 'bi-shield-check', title: 'Autenticidad', desc: '100% productos originales. Verificación en cada artículo.' },
  { icon: 'bi-truck', title: 'Envíos Nacionales', desc: 'Entregamos a todo Colombia. 2-5 días hábiles.' },
  { icon: 'bi-arrow-counterclockwise', title: 'Devoluciones', desc: '5 días para devolución sin complicaciones.' },
  { icon: 'bi-headset', title: 'Soporte 24/7', desc: 'WhatsApp e Instagram siempre disponibles.' },
];

const Home = memo(function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero ── */}
      <Hero />

      {/* ── Featured Products ── */}
      <section style={s.section} aria-labelledby="featured-heading">
        <div style={s.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            style={s.sectionHeader}
          >
            <span className="text-overline">Selección Exclusiva</span>
            <h2 id="featured-heading" style={s.sectionTitle}>
              LO MÁS <span className="text-accent">NUEVO</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={s.productsGrid}
          >
            {FEATURED.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={s.sectionCTA}
          >
            <motion.button
              onClick={() => navigate('/catalogo')}
              className="btn btn-ghost btn-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              id="home-catalog-btn"
            >
              Ver Catálogo Completo
              <i className="bi bi-arrow-right" style={{ marginLeft: '0.5rem' }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── About Teaser ── */}
      <section style={s.aboutSection} aria-label="Acerca de DYL">
        <div style={s.container}>
          <div style={s.aboutGrid}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={s.aboutText}
            >
              <span className="text-overline">Nuestra historia</span>
              <h2 style={s.aboutTitle}>
                NUESTRO <span className="text-accent">LEGADO</span>
              </h2>
              <p style={s.aboutParagraph}>
                No somos una tienda más. DYL Importaciones nació de una obsesión por
                la cultura del sneaker. Importamos directamente lo mejor del mercado
                mundial para que tú accedas a ese par que creías inalcanzable.
              </p>
              <p style={s.aboutParagraph}>
                Calidad, autenticidad y hype en un solo lugar.
              </p>
              <motion.button
                onClick={() => navigate('/about')}
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: '2rem' }}
                id="home-about-btn"
              >
                Conoce nuestra historia
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={s.aboutVisual}
            >
              <div style={s.bigNumber}>
                <span style={s.bigNum}>30</span>
                <span style={s.bigNumLabel}>Modelos<br />Exclusivos</span>
              </div>
              <div style={s.aboutStats}>
                <div style={s.aboutStat}>
                  <span style={s.aboutStatNum}>100%</span>
                  <span style={s.aboutStatLabel}>Originales</span>
                </div>
                <div style={s.aboutStatDiv} />
                <div style={s.aboutStat}>
                  <span style={s.aboutStatNum}>5★</span>
                  <span style={s.aboutStatLabel}>Calificación</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ ...s.section, paddingTop: '5rem' }} aria-label="Características">
        <div style={s.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={s.featuresGrid}
          >
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={s.featureCard}
                whileHover={{ y: -6, borderColor: 'var(--border-accent)' }}
                transition={{ duration: 0.3 }}
              >
                <div style={s.featureIcon}>
                  <i className={`bi ${feature.icon}`} aria-hidden="true" />
                </div>
                <h3 style={s.featureTitle}>{feature.title}</h3>
                <p style={s.featureDesc}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={s.ctaBanner} aria-label="Llamada a la acción">
        <div style={s.ctaBannerBg} aria-hidden="true" />
        <div style={s.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={s.ctaBannerContent}
          >
            <h2 style={s.ctaTitle}>¿LISTO PARA EL <span className="text-accent">DROP?</span></h2>
            <p style={s.ctaSubtitle}>
              Consíguelos antes que se acaben. Stock limitado en cada lanzamiento.
            </p>
            <div style={s.ctaActions}>
              <motion.button
                className="btn btn-primary btn-xl"
                onClick={() => navigate('/catalogo')}
                whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(230,25,43,0.5)' }}
                whileTap={{ scale: 0.96 }}
                id="home-cta-btn"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                Ver Catálogo
              </motion.button>
              <motion.button
                className="btn btn-ghost btn-xl"
                onClick={() => navigate('/soporte')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="home-support-btn"
              >
                Contactar
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
});

const s = {
  container: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 var(--space-8)',
  },
  section: {
    padding: 'var(--space-32) 0',
    position: 'relative',
    zIndex: 2,
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
  },
  sectionTitle: {
    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  sectionCTA: {
    textAlign: 'center',
    marginTop: '3rem',
  },
  aboutSection: {
    padding: 'var(--space-32) 0',
    background: 'var(--bg-deep)',
    borderTop: '1px solid var(--border-subtle)',
    borderBottom: '1px solid var(--border-subtle)',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
  },
  aboutText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  aboutTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  },
  aboutParagraph: {
    fontSize: '1.05rem',
    color: 'var(--gray-400)',
    lineHeight: 1.8,
  },
  aboutVisual: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  bigNumber: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2.5rem 3rem',
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-accent)',
    boxShadow: '0 0 60px rgba(230,25,43,0.1)',
    width: '100%',
    maxWidth: '260px',
  },
  bigNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '7rem',
    color: 'var(--red-500)',
    lineHeight: 0.9,
    textShadow: '0 0 40px rgba(230,25,43,0.5)',
  },
  bigNumLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gray-400)',
    textAlign: 'center',
    marginTop: '1rem',
    lineHeight: 1.5,
  },
  aboutStats: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  aboutStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  aboutStatNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--white)',
  },
  aboutStatLabel: {
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gray-500)',
  },
  aboutStatDiv: {
    width: '1px',
    height: '40px',
    background: 'var(--border-default)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.2rem',
  },
  featureCard: {
    padding: '2rem',
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(230,25,43,0.1)',
    border: '1px solid var(--border-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    color: 'var(--red-500)',
  },
  featureTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--white)',
  },
  featureDesc: {
    fontSize: '0.88rem',
    color: 'var(--gray-400)',
    lineHeight: 1.65,
  },
  ctaBanner: {
    position: 'relative',
    padding: '6rem 0',
    overflow: 'hidden',
    borderTop: '1px solid var(--border-subtle)',
  },
  ctaBannerBg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(230,25,43,0.12) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  ctaBannerContent: {
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  ctaTitle: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
  },
  ctaSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--gray-400)',
    maxWidth: '440px',
  },
  ctaActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '0.5rem',
  },
};

export default Home;
