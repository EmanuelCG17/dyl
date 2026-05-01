import { memo } from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LocationMap from '../../components/home/LocationMap';
import logoUrl from '../../assets/images/logodyl.png';

const TIMELINE = [
  { year: '2020', title: 'El Origen', desc: 'Todo comenzó con un par de Jordan 1 y una obsesión imparable por la cultura sneaker.' },
  { year: '2021', title: 'Primera Importación', desc: 'Importamos directamente desde EE.UU. y Asia, eliminando intermediarios para traer los mejores precios.' },
  { year: '2022', title: 'Comunidad', desc: 'Nuestra comunidad de coleccionistas y hypebeasts creció a más de 1.000 clientes satisfechos.' },
  { year: '2023', title: 'Expansión', desc: 'Ampliamos el catálogo a ropa y accesorios premium, consolidando el estilo DYL.' },
  { year: 'HOY', title: 'Seguimos Creciendo', desc: '30+ modelos, envíos a todo Colombia y el compromiso de traerte siempre lo mejor.' },
];

const About = memo(function About() {
  const imageRef = useRef(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(imgScroll, [0, 1], [40, -40]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={s.page}
    >
      <div style={s.container}>
        {/* ── Header ── */}
        <motion.header
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={s.header}
        >
          <motion.img
            src={logoUrl}
            alt="DYL Importaciones"
            style={s.logo}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 20px rgba(230,25,43,0.6))' }}
          />
          <span className="text-overline">Quiénes somos</span>
          <h1 style={s.title}>
            NUESTRA <span className="text-accent">HISTORIA</span>
          </h1>
        </motion.header>

        {/* ── Intro split ── */}
        <div style={s.introGrid}>
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={s.introText}
          >
            <h2 style={s.introHeading}>Locos por los tenis.</h2>
            <p style={s.introPara}>
              DYL Importaciones no nació como un negocio, nació de una obsesión.
              La cultura del sneaker es más que un par de zapatos; es arte, es historia e identidad.
            </p>
            <p style={s.introPara}>
              Nos dimos cuenta de que conseguir las mejores siluetas, las colaboraciones exclusivas
              y la calidad premium era casi imposible a precios justos. Así que decidimos importar
              directamente lo mejor del mercado mundial.
            </p>
            <p style={s.introPara}>
              Hoy, somos el puente entre tú y ese par que creías inalcanzable.
            </p>
          </motion.div>

          <div ref={imageRef} style={s.imageWrapper}>
            <motion.div style={{ ...s.imageInner, y: imageY }}>
              <img
                src="https://images.unsplash.com/photo-1612821745127-53855be9cbd1?auto=format&fit=crop&w=1000&q=80"
                alt="Cultura Sneaker"
                style={s.image}
                loading="lazy"
              />
              <div style={s.imageOverlay} />
            </motion.div>
            <div style={s.imageGlow} aria-hidden="true" />
          </div>
        </div>

        {/* ── Timeline ── */}
        <section style={s.timelineSection} aria-label="Historia de DYL">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={s.timelineHeading}
          >
            NUESTRO <span className="text-accent">CAMINO</span>
          </motion.h2>

          <div style={s.timeline} role="list">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                role="listitem"
                initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ ...s.timelineItem, ...(i % 2 !== 0 ? s.timelineItemRight : {}) }}
              >
                <div style={s.timelineContent}>
                  <span style={s.timelineYear}>{item.year}</span>
                  <h3 style={s.timelineTitle}>{item.title}</h3>
                  <p style={s.timelineDesc}>{item.desc}</p>
                </div>
                <div style={s.timelineDot} aria-hidden="true" />
              </motion.div>
            ))}
            <div style={s.timelineLine} aria-hidden="true" />
          </div>
        </section>

        {/* ── Map ── */}
        <section style={s.mapSection} aria-label="Ubicación">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={s.mapHeading}
          >
            DÓNDE <span className="text-accent">ESTAMOS</span>
          </motion.h2>
          <LocationMap />
        </section>
      </div>
    </motion.div>
  );
});

const s = {
  page: { minHeight: '100vh', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '6rem', overflow: 'hidden' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-8)' },
  header: { textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  logo: { height: '100px', objectFit: 'contain', filter: 'drop-shadow(0 0 14px rgba(230,25,43,0.4))', cursor: 'pointer', transition: 'filter 0.3s ease' },
  title: { fontSize: 'clamp(2.5rem, 7vw, 5rem)' },
  introGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center', marginBottom: '7rem' },
  introText: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  introHeading: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--white)', letterSpacing: '0.01em' },
  introPara: { fontSize: '1.05rem', color: 'var(--gray-400)', lineHeight: 1.85 },
  imageWrapper: { position: 'relative' },
  imageInner: { borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', position: 'relative', zIndex: 2, willChange: 'transform' },
  image: { width: '100%', height: 'auto', display: 'block' },
  imageOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.7) 100%)', pointerEvents: 'none' },
  imageGlow: { position: 'absolute', top: '-15%', left: '-15%', width: '130%', height: '130%', background: 'radial-gradient(circle, rgba(230,25,43,0.18) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 },
  timelineSection: { marginBottom: '7rem' },
  timelineHeading: { textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '4rem' },
  timeline: { position: 'relative', display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingLeft: '2rem' },
  timelineLine: { position: 'absolute', left: 'calc(2rem - 1px)', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--red-500), transparent)' },
  timelineItem: { display: 'flex', alignItems: 'flex-start', gap: '2rem', paddingLeft: '2rem', position: 'relative' },
  timelineItemRight: {},
  timelineDot: { position: 'absolute', left: '-9px', top: '1.2rem', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--red-500)', border: '3px solid var(--bg-base)', boxShadow: '0 0 12px var(--red-glow)', flexShrink: 0, zIndex: 2 },
  timelineContent: { background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.5rem', flex: 1, transition: 'border-color 0.3s ease' },
  timelineYear: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--red-500)', display: 'block', lineHeight: 1, marginBottom: '0.4rem' },
  timelineTitle: { fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '700', color: 'var(--white)', marginBottom: '0.6rem' },
  timelineDesc: { fontSize: '0.88rem', color: 'var(--gray-400)', lineHeight: 1.7 },
  mapSection: { marginTop: '2rem' },
  mapHeading: { textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '2.5rem' },
};

export default About;