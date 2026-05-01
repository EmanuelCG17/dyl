import { motion } from 'framer-motion';

const SECTIONS = [
  {
    num: '01',
    title: 'Términos y Condiciones',
    icon: 'bi-file-text',
    content: [
      'Bienvenido a DYL Importaciones. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo, por favor no utilices el sitio.',
      'Todas las ventas son finales una vez procesado el envío. Nos reservamos el derecho de cancelar cualquier orden en caso de sospecha de fraude o error en el inventario.',
      'Los precios están sujetos a cambios sin previo aviso. DYL Importaciones no se hace responsable por errores tipográficos en los precios publicados.',
    ],
  },
  {
    num: '02',
    title: 'Política de Privacidad',
    icon: 'bi-shield-lock',
    content: [
      'Respetamos tu privacidad. Cualquier información personal (nombre, correo, dirección) se utilizará exclusivamente para procesar tus pedidos y mejorar tu experiencia. No compartimos ni vendemos tu información a terceros.',
      'Nuestro sitio utiliza cookies técnicas para mantener tu sesión activa y recordar los productos en tu bolsa de compras. No utilizamos cookies de seguimiento de terceros sin tu consentimiento.',
    ],
  },
  {
    num: '03',
    title: 'Política de Devoluciones',
    icon: 'bi-arrow-counterclockwise',
    content: [
      'Las devoluciones se aceptan dentro de los primeros 5 días hábiles después de recibir el producto, únicamente por defectos de fábrica o errores de talla por parte de DYL Importaciones.',
      'El calzado debe estar sin usar, en su caja original y con todas sus etiquetas. No se aceptan devoluciones de productos con señales de uso o sin empaque original.',
    ],
  },
  {
    num: '04',
    title: 'Autenticidad y Garantías',
    icon: 'bi-patch-check',
    content: [
      'Todos los productos vendidos por DYL Importaciones son 100% originales y auténticos. Realizamos verificación exhaustiva antes de cada despacho.',
      'Ofrecemos garantía de 30 días por defectos de fábrica. Esta garantía no cubre daños por uso normal, accidentes o mal cuidado del producto.',
    ],
  },
];

const Legal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={s.page}
    >
      <div style={s.container}>
        {/* Header */}
        <motion.header
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={s.header}
        >
          <span className="text-overline">Información Legal</span>
          <h1 style={s.title}>
            TÉRMINOS Y <span className="text-accent">POLÍTICAS</span>
          </h1>
          <p style={s.subtitle}>
            Información legal importante sobre el uso de nuestro sitio y compras.
            Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long' })}.
          </p>
        </motion.header>

        <div style={s.content} role="main">
          {SECTIONS.map(({ num, title, icon, content }, i) => (
            <motion.section
              key={num}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={s.section}
              aria-labelledby={`legal-${num}`}
            >
              <div style={s.sectionHeader}>
                <span style={s.sectionNum}>{num}</span>
                <div style={s.sectionTitleRow}>
                  <i className={`bi ${icon}`} style={s.sectionIcon} aria-hidden="true" />
                  <h2 id={`legal-${num}`} style={s.sectionTitle}>{title}</h2>
                </div>
              </div>
              <div style={s.sectionBody}>
                {content.map((para, j) => (
                  <p key={j} style={s.text}>{para}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={s.footerNote}
        >
          <i className="bi bi-info-circle" style={{ color: 'var(--gray-500)', marginRight: '0.5rem' }} />
          ¿Tienes preguntas sobre nuestras políticas?{' '}
          <a href="mailto:soporte@dylimportaciones.com" style={s.footerLink}>
            Contáctanos
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const s = {
  page: { minHeight: '100vh', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '6rem' },
  container: { maxWidth: '860px', margin: '0 auto', padding: '0 var(--space-8)' },
  header: { marginBottom: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  title: { fontSize: 'clamp(2.2rem, 6vw, 4rem)' },
  subtitle: { fontSize: '1rem', color: 'var(--gray-400)', lineHeight: 1.7, maxWidth: '520px' },
  content: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  section: { background: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', overflow: 'hidden', transition: 'border-color 0.3s ease' },
  sectionHeader: { display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--border-subtle)' },
  sectionNum: { fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'rgba(230,25,43,0.15)', padding: '1.5rem 1.5rem', display: 'flex', alignItems: 'center', borderRight: '1px solid var(--border-subtle)', lineHeight: 1, letterSpacing: '-2px', flexShrink: 0, minWidth: '80px', justifyContent: 'center' },
  sectionTitleRow: { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1.5rem' },
  sectionIcon: { color: 'var(--red-500)', fontSize: '1.2rem', flexShrink: 0 },
  sectionTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--white)', letterSpacing: '0' },
  sectionBody: { padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  text: { fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.85 },
  footerNote: { marginTop: '3rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--gray-500)', padding: '1.5rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' },
  footerLink: { color: 'var(--red-400)', fontWeight: '600', textDecoration: 'none' },
};

export default Legal;
