import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { num: 1, label: 'Información' },
  { num: 2, label: 'Envío' },
  { num: 3, label: 'Pago' },
];

const PAYMENT_METHODS = [
  { id: 'card', icon: 'bi-credit-card', label: 'Tarjeta Débito/Crédito' },
  { id: 'transfer', icon: 'bi-bank', label: 'Transferencia Bancaria' },
  { id: 'cash', icon: 'bi-cash-stack', label: 'Pago en Efectivo' },
];

const SuccessModal = memo(function SuccessModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={s.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Pedido confirmado"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={s.modal}
        className="glass-panel"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
          style={s.successIcon}
        >
          <i className="bi bi-check-lg" style={{ fontSize: '2.5rem', color: 'white' }} />
        </motion.div>
        <h2 style={s.modalTitle}>¡PEDIDO CONFIRMADO!</h2>
        <p style={s.modalText}>
          Tu pedido fue procesado exitosamente. Te contactaremos pronto con los detalles de envío.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn btn-primary btn-lg"
          onClick={onClose}
          id="checkout-success-btn"
          style={{ borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}
        >
          Volver al inicio
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', address: '', notes: ''
  });

  const handleChange = useCallback(function changeField(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleNext = useCallback(function goNext() {
    setStep(s => Math.min(s + 1, 3));
  }, []);

  const handleBack = useCallback(function goBack() {
    setStep(s => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async function submitOrder(e) {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular tiempo de procesamiento
    await new Promise(r => setTimeout(r, 2000));
    
    // Calcular totales
    const total = getCartTotal();
    const shipping = total >= 200000 ? 0 : 20000;
    const grandTotal = total + shipping;

    // Crear el objeto del pedido
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`, // Genera ej: ORD-123456
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      product: cartItems.length === 1 ? cartItems[0].name : `${cartItems.length} artículos`,
      items: cartItems, // Guardar detalle para un futuro modal
      total: grandTotal,
      status: 'pendiente',
      date: new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date()),
      paymentMethod,
    };

    // Guardar en localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dyl_orders:v1') || '[]');
      localStorage.setItem('dyl_orders:v1', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error('Error al guardar el pedido:', err);
    }

    setIsProcessing(false);
    setShowSuccess(true);
  }, [formData, cartItems, getCartTotal, paymentMethod]);

  const handleSuccessClose = useCallback(function closeSuccess() {
    clearCart();
    navigate('/');
  }, [clearCart, navigate]);

  const total = getCartTotal();
  const totalFormatted = total.toLocaleString('es-CO', { maximumFractionDigits: 0 });
  const shipping = total >= 200000 ? 0 : 20000;
  const grandTotal = (total + shipping).toLocaleString('es-CO', { maximumFractionDigits: 0 });

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.emptyPage}>
        <div style={s.emptyIconWrap}>
          <i className="bi bi-bag-x" style={s.emptyBigIcon} />
        </div>
        <h2 style={s.emptyTitle}>Tu bolsa está vacía</h2>
        <p style={s.emptyText}>Agrega productos antes de continuar al pago</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/catalogo')}
          id="checkout-empty-btn"
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          Ver Catálogo
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={s.page}
      >
        <div style={s.container}>
          {/* ── Header ── */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={s.pageHeader}
          >
            <h1 style={s.title}>CHECKOUT</h1>

            {/* Steps indicator */}
            <div style={s.stepsRow} role="list" aria-label="Pasos del checkout">
              {STEPS.map(({ num, label }) => (
                <div key={num} style={s.stepWrapper} role="listitem">
                  <div style={{
                    ...s.stepCircle,
                    ...(step >= num ? s.stepCircleActive : {}),
                    ...(step > num ? s.stepCircleDone : {}),
                  }}>
                    {step > num ? <i className="bi bi-check2" /> : num}
                  </div>
                  <span style={{ ...s.stepLabel, ...(step >= num ? s.stepLabelActive : {}) }}>
                    {label}
                  </span>
                  {num < STEPS.length && (
                    <div style={{ ...s.stepLine, ...(step > num ? s.stepLineDone : {}) }} />
                  )}
                </div>
              ))}
            </div>
          </motion.header>

          {/* ── Content ── */}
          <div style={s.content}>
            {/* Form Section */}
            <div style={s.formSection}>
              <AnimatePresence mode="wait">
                {/* Step 1: Info */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={s.stepTitle}>
                      <i className="bi bi-person" style={s.stepTitleIcon} />
                      Información Personal
                    </h2>
                    <div style={s.formGrid}>
                      <div className="field">
                        <label htmlFor="co-name" className="field-label">Nombre completo</label>
                        <div className="input-group">
                          <i className="bi bi-person input-icon" />
                          <input id="co-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Tu nombre completo" className="input" required />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="co-email" className="field-label">Email</label>
                        <div className="input-group">
                          <i className="bi bi-envelope input-icon" />
                          <input id="co-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="input" required />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="co-phone" className="field-label">Teléfono</label>
                        <div className="input-group">
                          <i className="bi bi-telephone input-icon" />
                          <input id="co-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="300 123 4567" className="input" required />
                        </div>
                      </div>
                    </div>
                    <div style={s.stepActions}>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary btn-lg" onClick={handleNext} id="checkout-step1-btn" style={{ borderRadius: 'var(--radius-sm)' }}>
                        Continuar <i className="bi bi-arrow-right" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Envío */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={s.stepTitle}>
                      <i className="bi bi-truck" style={s.stepTitleIcon} />
                      Dirección de Envío
                    </h2>
                    <div style={s.formGrid}>
                      <div className="field">
                        <label htmlFor="co-city" className="field-label">Ciudad</label>
                        <div className="input-group">
                          <i className="bi bi-geo-alt input-icon" />
                          <input id="co-city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Medellín" className="input" required />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="co-address" className="field-label">Dirección</label>
                        <div className="input-group">
                          <i className="bi bi-house input-icon" />
                          <input id="co-address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Calle 10 #20-30" className="input" required />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="co-notes" className="field-label">Notas (opcional)</label>
                        <textarea id="co-notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Indicaciones de entrega..." className="textarea" rows={3} style={{ paddingLeft: '1.1rem' }} />
                      </div>
                    </div>
                    <div style={s.stepActions}>
                      <button className="btn btn-ghost" onClick={handleBack} id="checkout-back2-btn">
                        <i className="bi bi-arrow-left" /> Atrás
                      </button>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary btn-lg" onClick={handleNext} id="checkout-step2-btn" style={{ borderRadius: 'var(--radius-sm)' }}>
                        Continuar <i className="bi bi-arrow-right" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Pago */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={s.stepTitle}>
                      <i className="bi bi-credit-card" style={s.stepTitleIcon} />
                      Método de Pago
                    </h2>
                    <div style={s.paymentGrid}>
                      {PAYMENT_METHODS.map(({ id, icon, label }) => (
                        <button
                          key={id}
                          id={`payment-${id}`}
                          onClick={() => setPaymentMethod(id)}
                          style={{
                            ...s.paymentCard,
                            ...(paymentMethod === id ? s.paymentCardActive : {}),
                          }}
                          aria-pressed={paymentMethod === id}
                        >
                          <i className={`bi ${icon}`} style={{ fontSize: '1.5rem', color: paymentMethod === id ? 'var(--red-500)' : 'var(--gray-400)' }} />
                          <span style={{ ...s.paymentLabel, color: paymentMethod === id ? 'var(--white)' : 'var(--gray-300)' }}>
                            {label}
                          </span>
                          {paymentMethod === id && (
                            <motion.span layoutId="pay-check" style={s.payCheck}>
                              <i className="bi bi-check2" />
                            </motion.span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div style={s.stepActions}>
                      <button className="btn btn-ghost" onClick={handleBack} id="checkout-back3-btn">
                        <i className="bi bi-arrow-left" /> Atrás
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: '0 16px 50px rgba(230,25,43,0.45)' }}
                        whileTap={{ scale: 0.97 }}
                        className="btn btn-primary btn-lg"
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        id="checkout-confirm-btn"
                        style={{ borderRadius: 'var(--radius-sm)' }}
                      >
                        {isProcessing ? (
                          <><span className="spinner" style={{ width: 18, height: 18 }} /> Procesando...</>
                        ) : (
                          <><i className="bi bi-lock" /> Confirmar Pedido</>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary Section */}
            <aside style={s.summary} aria-label="Resumen del pedido">
              <h3 style={s.summaryTitle}>Resumen</h3>
              <div style={s.summaryItems}>
                {cartItems.map(item => (
                  <div key={item.id} style={s.summaryItem}>
                    <div style={s.summaryItemImg}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={s.summaryItemQty}>{item.quantity}</span>
                    </div>
                    <div style={s.summaryItemInfo}>
                      <span style={s.summaryItemName}>{item.name}</span>
                      <span style={s.summaryItemCat}>{item.category}</span>
                    </div>
                    <span style={s.summaryItemPrice}>$ {item.price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
              </div>
              <div style={s.summaryDivider} />
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Subtotal</span>
                <span style={s.summaryValue}>$ {totalFormatted}</span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Envío</span>
                <span style={{ ...s.summaryValue, color: shipping === 0 ? 'var(--success)' : 'var(--white)' }}>
                  {shipping === 0 ? 'GRATIS' : `$ ${shipping.toLocaleString('es-CO')}`}
                </span>
              </div>
              <div style={s.summaryDivider} />
              <div style={s.summaryTotalRow}>
                <span style={s.summaryTotalLabel}>TOTAL</span>
                <span style={s.summaryTotalAmount}>$ {grandTotal}</span>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const s = {
  page: { minHeight: '100vh', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '5rem' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 var(--space-8)' },
  emptyPage: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '2rem' },
  emptyIconWrap: { width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyBigIcon: { fontSize: '2.5rem', color: 'var(--gray-500)' },
  emptyTitle: { color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '2rem' },
  emptyText: { color: 'var(--gray-400)', fontSize: '0.95rem' },
  pageHeader: { marginBottom: '3rem', textAlign: 'center' },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '0.04em' },
  stepsRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 },
  stepWrapper: { display: 'flex', alignItems: 'center', gap: 0 },
  stepCircle: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-body)', background: 'var(--bg-elevated)', border: '2px solid var(--border-default)', color: 'var(--gray-500)', transition: 'all 0.3s ease', flexShrink: 0 },
  stepCircleActive: { background: 'var(--red-500)', borderColor: 'var(--red-500)', color: 'white', boxShadow: '0 4px 16px var(--red-glow)' },
  stepCircleDone: { background: 'rgba(34,197,94,0.15)', borderColor: 'var(--success)', color: 'var(--success)' },
  stepLabel: { fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', margin: '0 0.8rem', whiteSpace: 'nowrap', transition: 'color 0.3s ease' },
  stepLabelActive: { color: 'var(--white)' },
  stepLine: { width: '50px', height: '1px', background: 'var(--border-default)', transition: 'background 0.3s ease', flexShrink: 0 },
  stepLineDone: { background: 'var(--success)' },
  content: { display: 'flex', flexWrap: 'wrap-reverse', gap: '2.5rem', alignItems: 'flex-start' },
  formSection: { flex: '1 1 500px', minWidth: 0, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' },
  stepTitle: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' },
  stepTitleIcon: { color: 'var(--red-500)', fontSize: '1.3rem' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '1.2rem' },
  stepActions: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' },
  paymentGrid: { display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '0.5rem' },
  paymentCard: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s ease', textAlign: 'left', position: 'relative' },
  paymentCardActive: { border: '1px solid var(--border-accent)', background: 'rgba(230,25,43,0.06)', boxShadow: '0 0 0 1px var(--red-500)' },
  paymentLabel: { fontSize: '0.9rem', fontWeight: '500', flex: 1, transition: 'color 0.2s ease' },
  payCheck: { position: 'absolute', right: '1rem', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--red-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' },
  summary: { flex: '1 1 320px', minWidth: 0, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 4vw, 2rem)', position: 'sticky', top: 'calc(var(--navbar-height) + 1rem)' },
  summaryTitle: { fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '1.5rem' },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' },
  summaryItem: { display: 'flex', alignItems: 'center', gap: '0.8rem' },
  summaryItemImg: { width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--bg-card)', flexShrink: 0, position: 'relative', border: '1px solid var(--border-subtle)' },
  summaryItemQty: { position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--red-500)', color: 'white', fontSize: '0.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' },
  summaryItemInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 },
  summaryItemName: { fontSize: '0.82rem', fontWeight: '600', color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  summaryItemCat: { fontSize: '0.65rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  summaryItemPrice: { fontSize: '0.88rem', fontWeight: '700', color: 'var(--white)', flexShrink: 0 },
  summaryDivider: { height: '1px', background: 'var(--border-subtle)', margin: '1rem 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' },
  summaryLabel: { fontSize: '0.82rem', color: 'var(--gray-400)' },
  summaryValue: { fontSize: '0.88rem', fontWeight: '600', color: 'var(--white)' },
  summaryTotalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' },
  summaryTotalLabel: { fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gray-300)', letterSpacing: '0.08em' },
  summaryTotalAmount: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--red-500)', letterSpacing: '0.02em' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  modal: { maxWidth: '460px', width: '100%', padding: '3rem 2.5rem', borderRadius: 'var(--radius-2xl)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' },
  successIcon: { width: '80px', height: '80px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(34,197,94,0.4)', marginBottom: '0.5rem' },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--white)', letterSpacing: '0.04em' },
  modalText: { fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.7, maxWidth: '340px' },
};

export default Checkout;