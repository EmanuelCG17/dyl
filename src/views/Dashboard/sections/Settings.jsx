import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import s from '../Dashboard.module.css';
import { useStoreConfig } from '../../../context/StoreConfigContext.jsx';

// ─── Subcomponentes fuera del render para evitar pérdida de foco ─────────────
const SectionTitle = ({ icon, title }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem', paddingBottom:'0.75rem', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
    <i className={`bi bi-${icon}`} style={{ color:'var(--red-400)', fontSize:'1.1rem' }} />
    <span style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--white)' }}>{title}</span>
  </div>
);

const Field = ({ label, name, type = 'text', placeholder, value, onChange }) => (
  <div className={s.formGroup}>
    <label className={s.formLabel}>{label}</label>
    <input
      className={s.dbInput}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const Toggle = ({ name, label, description, danger, checked, onChange }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.75rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
    <div>
      <p style={{ margin:0, fontSize:'0.85rem', fontWeight:600, color: danger && checked ? 'var(--red-400)' : 'var(--white)' }}>{label}</p>
      {description && <p style={{ margin:'0.2rem 0 0', fontSize:'0.75rem', color:'rgba(255,255,255,0.4)' }}>{description}</p>}
    </div>
    <label style={{ position:'relative', width:44, height:24, flexShrink:0, cursor:'pointer' }}>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} style={{ opacity:0, width:0, height:0, position:'absolute' }} />
      <div style={{ position:'absolute', inset:0, borderRadius:12, background: checked ? (danger ? '#e6192b' : 'var(--red-500)') : 'rgba(255,255,255,0.15)', transition:'background 0.2s' }}>
        <div style={{ position:'absolute', top:2, left: checked ? 22 : 2, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} />
      </div>
    </label>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Settings — 100% funcional: cada cambio se aplica en tiempo real en la app
// Admin y SuperAdmin tienen permisos diferenciados
// ─────────────────────────────────────────────────────────────────────────────
function Settings({ isSuperAdmin }) {
  const { config, saveConfig } = useStoreConfig();
  const [draft, setDraft] = useState(config);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback(e => {
    const { name, value, type, checked } = e.target;
    setDraft(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
    }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(e => {
    e.preventDefault();
    saveConfig(draft);  // ← aplica en toda la app inmediatamente
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [draft, saveConfig]);

  return (
    <form onSubmit={handleSave}>
      {/* Aviso de cambios no guardados */}
      {JSON.stringify(draft) !== JSON.stringify(config) && (
        <motion.div
          initial={{ opacity:0, y:-8 }}
          animate={{ opacity:1, y:0 }}
          style={{ padding:'0.75rem 1rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:'var(--radius-sm)', color:'#f59e0b', fontSize:'0.82rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem' }}
        >
          <i className="bi bi-exclamation-triangle" /> Tienes cambios sin guardar. Haz clic en "Guardar cambios" para aplicarlos.
        </motion.div>
      )}

      {/* Información de la tienda - visible para todos los admins */}
      <div className={s.card} style={{ marginBottom:'1rem' }}>
        <div className={s.cardBody}>
          <SectionTitle icon="shop" title="Información de la tienda" />
          <div className={s.formGrid}>
            <Field label="Nombre de la tienda" name="storeName" placeholder="DYL Importaciones" value={draft.storeName} onChange={handleChange} />
            <Field label="Email de contacto" name="storeEmail" type="email" placeholder="contacto@dyl.com" value={draft.storeEmail} onChange={handleChange} />
            <Field label="Teléfono" name="storePhone" placeholder="+57 300 000 0000" value={draft.storePhone} onChange={handleChange} />
            <Field label="Dirección" name="storeAddress" placeholder="Bogotá, Colombia" value={draft.storeAddress} onChange={handleChange} />
          </div>
          <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginTop:'0.75rem', margin:'0.75rem 0 0' }}>
            ℹ️ El nombre de la tienda se refleja en el título del navegador al guardar.
          </p>
        </div>
      </div>

      {/* E-commerce - visible para todos los admins */}
      <div className={s.card} style={{ marginBottom:'1rem' }}>
        <div className={s.cardBody}>
          <SectionTitle icon="cart3" title="Configuración de e-commerce" />
          <div className={s.formGrid}>
            <Field label="Moneda" name="currency" placeholder="COP" value={draft.currency} onChange={handleChange} />
            <Field label="Costo de envío (COP)" name="shippingCost" type="number" value={draft.shippingCost} onChange={handleChange} />
            <Field label="Mínimo para envío gratis (COP)" name="freeShippingThreshold" type="number" value={draft.freeShippingThreshold} onChange={handleChange} />
            <Field label="Máx. ítems en carrito" name="maxCartItems" type="number" value={draft.maxCartItems} onChange={handleChange} />
          </div>
          <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginTop:'0.75rem', margin:'0.75rem 0 0' }}>
            ℹ️ El costo de envío y el mínimo para envío gratis se aplican en el carrito y checkout.
          </p>
        </div>
      </div>

      {/* Redes sociales - visible para todos los admins */}
      <div className={s.card} style={{ marginBottom:'1rem' }}>
        <div className={s.cardBody}>
          <SectionTitle icon="share" title="Redes sociales" />
          <div className={s.formGrid}>
            <Field label="Instagram URL" name="instagramUrl" placeholder="https://instagram.com/..." value={draft.instagramUrl} onChange={handleChange} />
            <Field label="WhatsApp (número con código de país)" name="whatsappNumber" placeholder="573000000000" value={draft.whatsappNumber} onChange={handleChange} />
          </div>
          <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginTop:'0.75rem', margin:'0.75rem 0 0' }}>
            ℹ️ Los botones flotantes de redes sociales se actualizan al guardar.
          </p>
        </div>
      </div>

      {/* Opciones del sistema - SOLO SuperAdmin */}
      {isSuperAdmin && (
        <div className={s.card} style={{ marginBottom:'1.5rem' }}>
          <div className={s.cardBody}>
            <SectionTitle icon="toggles" title="Opciones del sistema" />
            <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginBottom:'1rem' }}>
              ⚠️ Estas opciones afectan el funcionamiento global de la plataforma. Solo SuperAdmin tiene acceso.
            </p>
            <Toggle
              name="allowRegistrations"
              label="Permitir registros de usuarios"
              description="Cuando está desactivado, el formulario de registro estará bloqueado."
              checked={draft.allowRegistrations}
              onChange={handleChange}
            />
            <Toggle
              name="maintenanceMode"
              label="Modo mantenimiento"
              description="Activa una página de mantenimiento para todos los visitantes no-admin. ¡Úsalo con cuidado!"
              danger
              checked={draft.maintenanceMode}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.75rem', alignItems:'center' }}>
        {saved && (
          <motion.span
            initial={{ opacity:0, x:10 }}
            animate={{ opacity:1, x:0 }}
            style={{ fontSize:'0.83rem', color:'#22c55e', display:'flex', alignItems:'center', gap:'0.4rem' }}
          >
            <i className="bi bi-check-circle" /> ¡Cambios aplicados en toda la app!
          </motion.span>
        )}
        <button
          type="button"
          className={`${s.actionBtn} ${s.actionBtnGhost}`}
          onClick={() => setDraft(config)}
        >
          Descartar
        </button>
        <button type="submit" className={`${s.actionBtn} ${s.actionBtnPrimary}`} style={{ padding:'0.6rem 1.4rem', fontSize:'0.85rem' }}>
          <i className="bi bi-floppy" /> Guardar cambios
        </button>
      </div>
    </form>
  );
}

export default Settings;
