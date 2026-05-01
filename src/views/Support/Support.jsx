import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  { q: '¿Hacen envíos a todo el país?', a: 'Sí, enviamos a todo Colombia. Tiempo estimado: 2-5 días hábiles. Envío gratuito en pedidos mayores a $200.000 COP.' },
  { q: '¿Tienen garantía de autenticidad?', a: 'Absolutamente. Todos nuestros productos son 100% originales. Hacemos verificación en cada artículo antes del despacho.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos tarjetas débito/crédito, transferencias bancarias y pagos en efectivo a través de Efecty y Baloto.' },
  { q: '¿Puedo devolver mi compra?', a: '5 días hábiles para realizar devoluciones. El producto debe estar sin usar, con todas sus etiquetas y en su empaque original.' },
  { q: '¿Cómo puedo rastrear mi pedido?', a: 'Te enviamos un correo con el número de guía una vez despachamos tu pedido. Puedes rastrearlo en tiempo real.' },
  { q: '¿Tienen tienda física?', a: 'Operamos principalmente online, pero tenemos punto de contacto en Medellín. Contáctanos para coordinar.' },
];

const CONTACT_CARDS = [
  { icon: 'bi-whatsapp', label: 'WhatsApp', value: '+57 300 123 4567', href: 'https://wa.me/573001234567', color: '#25D366', bg: 'rgba(37,211,102,0.08)', border: 'rgba(37,211,102,0.2)' },
  { icon: 'bi-instagram', label: 'Instagram', value: '@dylimportaciones', href: 'https://instagram.com/dylimportaciones', color: '#E1306C', bg: 'rgba(225,48,108,0.08)', border: 'rgba(225,48,108,0.2)' },
  { icon: 'bi-envelope', label: 'Email', value: 'soporte@dylimportaciones.com', href: 'mailto:soporte@dylimportaciones.com', color: 'var(--red-400)', bg: 'rgba(230,25,43,0.08)', border: 'rgba(230,25,43,0.2)' },
];

const FaqItem = memo(function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      style={{ ...s.faqItem, ...(isOpen ? s.faqItemOpen : {}) }}
    >
      <button
        onClick={() => onToggle(index)}
        style={s.faqQ}
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
      >
        <span style={s.faqQText}>{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={s.faqIcon}
          aria-hidden="true"
        >
          <i className="bi bi-plus-lg" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={s.faqA}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const Support = memo(function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleToggle = useCallback(function toggleFaq(i) {
    setOpenIndex(prev => prev === i ? null : i);
  }, []);

  const handleFormChange = useCallback(function changeField(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async function submitForm(e) {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  }, []);

  const filtered = search.trim()
    ? FAQ_DATA.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    )
    : FAQ_DATA;

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
          <span className="text-overline">Centro de ayuda</span>
          <h1 style={s.title}>¿CÓMO PODEMOS <span className="text-accent">AYUDAR?</span></h1>
          <p style={s.subtitle}>Encuentra respuestas rápidas a las preguntas más frecuentes.</p>

          {/* Search */}
          <div style={s.searchWrapper}>
            <i className="bi bi-search" style={s.searchIcon} aria-hidden="true" />
            <input
              id="support-search"
              type="search"
              placeholder="Buscar en preguntas frecuentes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input"
              style={s.searchInput}
              aria-label="Buscar en FAQ"
            />
          </div>
        </motion.header>

        {/* Contact Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={s.contactCards}
        >
          {CONTACT_CARDS.map((card) => (
            <motion.a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              id={`support-${card.label.toLowerCase()}`}
              whileHover={{ y: -4, boxShadow: `0 12px 40px ${card.border}` }}
              style={{ ...s.contactCard, background: card.bg, borderColor: card.border }}
            >
              <i className={`bi ${card.icon}`} style={{ color: card.color, fontSize: '1.8rem' }} />
              <div>
                <span style={{ ...s.contactCardLabel, color: card.color }}>{card.label}</span>
                <span style={s.contactCardValue}>{card.value}</span>
              </div>
              <i className="bi bi-arrow-up-right" style={{ color: card.color, marginLeft: 'auto', fontSize: '0.9rem' }} />
            </motion.a>
          ))}
        </motion.div>

        <div style={s.twoCol}>
          {/* FAQ */}
          <div>
            <h2 style={s.sectionTitle}>Preguntas Frecuentes</h2>
            {filtered.length === 0 ? (
              <div style={s.noResults}>
                <i className="bi bi-search" style={{ fontSize: '2rem', color: 'var(--gray-600)' }} />
                <p style={{ color: 'var(--gray-500)' }}>No hay resultados para "{search}"</p>
              </div>
            ) : (
              <div style={s.faqList} role="list">
                {filtered.map((item, i) => (
                  <FaqItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={s.sectionTitle}>Escríbenos</h2>
            <div style={s.formCard}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={s.sentMsg}
                  >
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '2.5rem', color: 'var(--success)' }} />
                    <p style={{ color: 'var(--white)', fontWeight: '600' }}>¡Mensaje enviado!</p>
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.88rem' }}>Te responderemos en menos de 24 horas.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    style={s.form}
                    noValidate
                  >
                    <div className="field">
                      <label htmlFor="support-name" className="field-label">Nombre</label>
                      <input id="support-name" name="name" type="text" value={formData.name} onChange={handleFormChange} placeholder="Tu nombre" className="input" required />
                    </div>
                    <div className="field">
                      <label htmlFor="support-email" className="field-label">Email</label>
                      <input id="support-email" name="email" type="email" value={formData.email} onChange={handleFormChange} placeholder="tu@email.com" className="input" required />
                    </div>
                    <div className="field">
                      <label htmlFor="support-message" className="field-label">Mensaje</label>
                      <textarea id="support-message" name="message" value={formData.message} onChange={handleFormChange} placeholder="¿En qué te podemos ayudar?" className="textarea" rows={5} required />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="support-submit-btn"
                      style={{ borderRadius: 'var(--radius-sm)', padding: '0.9rem', gap: '0.5rem' }}
                    >
                      <i className="bi bi-send" /> Enviar Mensaje
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const s = {
  page: { minHeight: '100vh', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '6rem' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 var(--space-8)' },
  header: { textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  title: { fontSize: 'clamp(2rem, 5vw, 3.5rem)' },
  subtitle: { fontSize: '1rem', color: 'var(--gray-400)', maxWidth: '450px' },
  searchWrapper: { position: 'relative', width: '100%', maxWidth: '520px', marginTop: '0.5rem' },
  searchIcon: { position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-500)', pointerEvents: 'none' },
  searchInput: { paddingLeft: '2.7rem' },
  contactCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '4rem' },
  contactCard: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid', textDecoration: 'none', transition: 'transform 0.3s ease, box-shadow 0.3s ease' },
  contactCardLabel: { display: 'block', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' },
  contactCardValue: { display: 'block', fontSize: '0.85rem', color: 'var(--gray-300)', fontWeight: '500' },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.5rem', letterSpacing: '0.02em' },
  faqList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  faqItem: { background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', transition: 'border-color 0.25s ease' },
  faqItemOpen: { borderColor: 'var(--border-accent)' },
  faqQ: { width: '100%', padding: '1.1rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' },
  faqQText: { fontSize: '0.92rem', fontWeight: '500', color: 'var(--white)', lineHeight: 1.4 },
  faqIcon: { color: 'var(--red-500)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', flexShrink: 0 },
  faqA: { padding: '0 1.2rem 1.2rem', fontSize: '0.88rem', color: 'var(--gray-400)', lineHeight: 1.75, borderTop: '1px solid var(--border-subtle)', paddingTop: '0.8rem', marginTop: 0 },
  noResults: { textAlign: 'center', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  formCard: { background: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: '2rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  sentMsg: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '3rem', textAlign: 'center' },
};

export default Support;