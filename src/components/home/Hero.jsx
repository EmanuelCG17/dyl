import { useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import logoUrl from '../../assets/images/logodyl.png';

const BRANDS = ['JORDAN', 'NIKE', 'YEEZY', 'NEW BALANCE', 'ADIDAS', 'SUPREME', 'JORDAN', 'NIKE', 'YEEZY', 'NEW BALANCE', 'ADIDAS', 'SUPREME'];

function useParticles(canvasId) {
  useEffect(function initParticles() {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId;

    const count = Math.min(Math.floor(width * 0.04), 60);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.08,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(230,25,43,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,25,43,${p.a})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', onResize, { passive: true });

    return function cleanup() {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [canvasId]);
}

const letterVariants = {
  hidden: { y: 80, opacity: 0, rotateX: -30 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Hero = memo(function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useParticles('hero-canvas');

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  const line1 = 'LOCOS POR'.split('');
  const line2 = 'LOS TENIS'.split('');

  return (
    <section ref={sectionRef} style={s.section} aria-label="Hero principal">
      {/* Particle canvas */}
      <canvas id="hero-canvas" style={s.canvas} aria-hidden="true" />

      {/* Background shapes */}
      <div style={s.bgShape1} aria-hidden="true" />
      <div style={s.bgShape2} aria-hidden="true" />

      {/* Main content */}
      <motion.div
        style={{ ...s.content, y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={s.logoWrapper}
        >
          <img src={logoUrl} alt="DYL Importaciones" style={s.logo} />
        </motion.div>

        {/* Headline — letter by letter animation */}
        <div style={s.headline}>
          <div style={s.headlineLine} aria-label="Locos por">
            {line1.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ ...s.headlineChar, ...(char === ' ' ? { width: '0.4em' } : {}) }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div style={{ ...s.headlineLine, ...s.headlineAccentLine }} aria-label="Los tenis">
            {line2.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                custom={line1.length + i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{
                  ...s.headlineChar,
                  ...s.headlineAccent,
                  ...(char === ' ' ? { width: '0.4em' } : {}),
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={s.subtitle}
        >
          El hype está aquí. Encontrá tu next pair soñado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={s.ctas}
        >
          <motion.button
            onClick={() => navigate('/catalogo')}
            className="btn btn-primary btn-xl"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(230,25,43,0.45)' }}
            whileTap={{ scale: 0.96 }}
            style={s.ctaPrimary}
            id="hero-catalog-btn"
          >
            Ver Catálogo
            <i className="bi bi-arrow-right" style={{ marginLeft: '0.5rem' }} />
          </motion.button>

          <motion.button
            onClick={() => navigate('/about')}
            className="btn btn-ghost btn-xl"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="hero-about-btn"
          >
            Nuestra Historia
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={s.stats}
        >
          {[
            { num: '30+', label: 'Modelos' },
            { num: '100%', label: 'Originales' },
            { num: '🚚', label: 'Envíos CO' },
          ].map((stat, i) => (
            <div key={i} style={s.statWrapper}>
              {i > 0 && <div style={s.statDivider} aria-hidden="true" />}
              <div style={s.stat}>
                <span style={s.statNum}>{stat.num}</span>
                <span style={s.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={s.scrollIndicator}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div style={s.scrollLine} />
        <span style={s.scrollText}>Scroll</span>
      </motion.div>

      {/* Brand marquee */}
      <div style={s.marqueeWrapper} aria-hidden="true">
        <div style={s.marqueeTrack}>
          {BRANDS.map((brand, i) => (
            <span key={i} style={s.marqueeItem}>
              {brand} <span style={s.marqueeDot}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

const s = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-base)',
    overflow: 'hidden',
    paddingTop: 'var(--navbar-height)',
    paddingBottom: '5rem',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  bgShape1: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: '60vw',
    height: '60vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(230,25,43,0.07) 0%, transparent 65%)',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  bgShape2: {
    position: 'absolute',
    bottom: '-10%',
    right: '-5%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(230,25,43,0.05) 0%, transparent 65%)',
    pointerEvents: 'none',
    filter: 'blur(60px)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    willChange: 'transform, opacity',
  },
  logoWrapper: {
    marginBottom: '2rem',
  },
  logo: {
    height: '72px',
    width: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 20px rgba(230,25,43,0.4))',
  },
  headline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.8rem',
    perspective: '800px',
  },
  headlineLine: {
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  headlineAccentLine: {
    marginTop: '-0.1em',
  },
  headlineChar: {
    display: 'inline-block',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3.8rem, 13vw, 9rem)',
    lineHeight: 0.9,
    color: 'var(--white)',
    letterSpacing: '-0.02em',
    willChange: 'transform, opacity',
  },
  headlineAccent: {
    color: 'var(--red-500)',
    textShadow: '0 0 40px rgba(230,25,43,0.5)',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
    color: 'var(--gray-300)',
    marginBottom: '2.5rem',
    maxWidth: '480px',
    lineHeight: 1.7,
  },
  ctas: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '3.5rem',
  },
  ctaPrimary: {
    borderRadius: 'var(--radius-sm)',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
  },
  statWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  statDivider: {
    width: '1px',
    height: '36px',
    background: 'var(--border-default)',
    margin: '0 2.5rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    color: 'var(--white)',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gray-500)',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '5.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    zIndex: 3,
  },
  scrollLine: {
    width: '1px',
    height: '50px',
    background: 'linear-gradient(to bottom, var(--red-500), transparent)',
  },
  scrollText: {
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gray-500)',
    fontFamily: 'var(--font-body)',
  },
  marqueeWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: '1px solid var(--border-subtle)',
    background: 'rgba(0,0,0,0.4)',
    overflow: 'hidden',
    zIndex: 3,
    height: '2.8rem',
    display: 'flex',
    alignItems: 'center',
  },
  marqueeTrack: {
    display: 'flex',
    gap: 0,
    whiteSpace: 'nowrap',
    animation: 'marquee 25s linear infinite',
    willChange: 'transform',
  },
  marqueeItem: {
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gray-600)',
    padding: '0 2rem',
    fontFamily: 'var(--font-body)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2rem',
  },
  marqueeDot: {
    color: 'var(--red-500)',
    fontSize: '0.5rem',
  },
};

export default Hero;