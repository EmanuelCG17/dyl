import { useState, useCallback, useMemo, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from '../Dashboard.module.css';
import { mockProducts } from '../../../services/mockData';

// ─── Storage ──────────────────────────────────────────────────────────────────
const PROD_KEY = 'dyl_products:v1';
const CATS_KEY = 'dyl_categories:v1';
const DEFAULT_CATS = ['Jordan', 'Nike', 'Yeezy', 'New Balance', 'Ropa', 'Accesorios'];

function loadProducts() {
  try { const d = localStorage.getItem(PROD_KEY); return d ? JSON.parse(d) : mockProducts; } catch { return mockProducts; }
}
function saveProducts(p) { try { localStorage.setItem(PROD_KEY, JSON.stringify(p)); } catch {} }

function loadCategories() {
  try { const d = localStorage.getItem(CATS_KEY); return d ? JSON.parse(d) : DEFAULT_CATS; } catch { return DEFAULT_CATS; }
}
function saveCategories(c) { try { localStorage.setItem(CATS_KEY, JSON.stringify(c)); } catch {} }

// ─── Select styles (fondo oscuro explícito para evitar blanco sobre blanco) ──
const selectStyle = {
  background: '#1a1a1e',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 'var(--radius-sm)',
  padding: '0.55rem 0.85rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  width: '100%',
  boxSizing: 'border-box',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  outline: 'none',
};

const emptyForm = { name: '', sku: '', price: '', category: '', description: '', isNew: false, image: '' };

// ─── Modal de producto ────────────────────────────────────────────────────────
const ProductModal = memo(function ProductModal({ product, categories, onClose, onSave, onAddCategory }) {
  const [form, setForm] = useState(
    product
      ? { name: product.name, sku: product.sku || '', price: product.price, category: product.category, description: product.description, isNew: product.isNew, image: product.image || '' }
      : emptyForm
  );
  const [newCatMode, setNewCatMode] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const fileRef = useRef(null);

  const handleChange = useCallback(e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  // Convertir imagen a base64
  const handleFileChange = useCallback(e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const base64 = ev.target.result;
      setForm(prev => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUrlChange = useCallback(e => {
    setForm(prev => ({ ...prev, image: e.target.value }));
    setImagePreview(e.target.value);
  }, []);

  const handleAddCategory = useCallback(() => {
    if (!newCatName.trim()) return;
    onAddCategory(newCatName.trim());
    setForm(prev => ({ ...prev, category: newCatName.trim() }));
    setNewCatName('');
    setNewCatMode(false);
  }, [newCatName, onAddCategory]);

  const handleSave = useCallback(e => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.sku) return;
    onSave({ ...form, price: Number(form.price) });
  }, [form, onSave]);

  const isValid = form.name && form.price && form.image && form.sku;

  return (
    <div 
      className={s.modalOverlay} 
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        padding: 'clamp(0.5rem, 3vw, 1rem)',
        alignItems: 'flex-start',
        overflowY: 'auto',
      }}
    >
      <motion.div
        className={s.modal}
        style={{ maxWidth: 580 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className={s.modalHeader}>
          <span className={s.modalTitle}>{product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</span>
          <button 
            className={s.modalClose} 
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <i className="bi bi-x-lg" style={{ fontSize: '1.25rem' }} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className={s.modalBody}>
            {/* Nombre + SKU */}
            <div className={s.formGrid}>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Nombre del producto *</label>
                <input className={s.dbInput} name="name" value={form.name} onChange={handleChange} placeholder="Jordan 1 Retro High..." required />
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Código / SKU *</label>
                <input className={s.dbInput} name="sku" value={form.sku} onChange={handleChange} placeholder="JD1-CHI-001" required />
              </div>
            </div>

            {/* Precio + Categoría */}
            <div className={s.formGrid}>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Precio (COP) *</label>
                <input className={s.dbInput} name="price" type="number" value={form.price} onChange={handleChange} placeholder="1500000" required min="0" />
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Categoría</label>
                {newCatMode ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      className={s.dbInput}
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      placeholder="Nueva categoría..."
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                      autoFocus
                    />
                    <button type="button" className={`${s.actionBtn} ${s.actionBtnPrimary}`} onClick={handleAddCategory}>
                      <i className="bi bi-plus" />
                    </button>
                    <button type="button" className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setNewCatMode(false)}>
                      <i className="bi bi-x" />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <select style={selectStyle} name="category" value={form.category} onChange={handleChange}>
                        <option value="" style={{ background: '#1a1a1e', color: '#fff' }}>Seleccionar...</option>
                        {categories.map(c => (
                          <option key={c} value={c} style={{ background: '#1a1a1e', color: '#fff' }}>{c}</option>
                        ))}
                      </select>
                      <i className="bi bi-chevron-down" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', fontSize: '0.75rem' }} />
                    </div>
                    <button type="button" className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setNewCatMode(true)} title="Nueva categoría">
                      <i className="bi bi-plus-circle" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Imagen — OBLIGATORIA */}
            <div className={s.formGroup}>
              <label className={s.formLabel}>
                Imagen del producto *{' '}
                <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, textTransform: 'none', fontSize: '0.7rem' }}>
                  (sube un archivo o pega una URL)
                </span>
              </label>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <button
                  type="button"
                  className={`${s.actionBtn} ${s.actionBtnGhost}`}
                  onClick={() => fileRef.current?.click()}
                  style={{ flexShrink: 0 }}
                >
                  <i className="bi bi-upload" /> Subir archivo
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <input
                  className={s.dbInput}
                  value={form.image.startsWith('data:') ? '' : form.image}
                  onChange={handleUrlChange}
                  placeholder="https://... o sube un archivo"
                  style={{ flex: 1 }}
                />
              </div>

              {/* Preview de imagen */}
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', maxHeight: 160 }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                    onError={() => setImagePreview('')}
                  />
                </motion.div>
              )}

              {!form.image && (
                <p style={{ fontSize: '0.72rem', color: 'var(--red-400)', margin: '0.25rem 0 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="bi bi-exclamation-circle" /> La imagen es obligatoria.
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className={s.formGroup}>
              <label className={s.formLabel}>Descripción</label>
              <textarea
                className={s.dbInput}
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                placeholder="Descripción del producto..."
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Marcar como nuevo */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} />
              Marcar como NUEVO
            </label>
          </div>

          <div className={s.modalFooter}>
            <button type="button" className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={onClose}>Cancelar</button>
            <button type="submit" className={`${s.actionBtn} ${s.actionBtnPrimary}`} disabled={!isValid} title={!isValid ? 'Completa todos los campos obligatorios' : ''}>
              <i className="bi bi-check-lg" /> Guardar producto
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
});

// ─── Componente principal ─────────────────────────────────────────────────────
function Products() {
  const [products, setProducts] = useState(loadProducts);
  const [categories, setCategories] = useState(loadCategories);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Todos');
  const [modal, setModal] = useState(null); // null | 'new' | product
  const [deleteId, setDeleteId] = useState(null);

  const allFilterCats = ['Todos', ...categories];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p =>
      (catFilter === 'Todos' || p.category === catFilter) &&
      (p.name.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
  }, [products, search, catFilter]);

  const handleAddCategory = useCallback(name => {
    setCategories(prev => {
      if (prev.includes(name)) return prev;
      const updated = [...prev, name];
      saveCategories(updated);
      return updated;
    });
  }, []);

  const handleSave = useCallback(data => {
    setProducts(prev => {
      let updated;
      if (modal?.id) {
        updated = prev.map(p => p.id === modal.id ? { ...p, ...data } : p);
      } else {
        updated = [...prev, { ...data, id: Date.now() }];
      }
      saveProducts(updated);
      return updated;
    });
    setModal(null);
  }, [modal]);

  const handleDelete = useCallback(id => {
    setProducts(prev => { const u = prev.filter(p => p.id !== id); saveProducts(u); return u; });
    setDeleteId(null);
  }, []);

  const toggleNew = useCallback(id => {
    setProducts(prev => { const u = prev.map(p => p.id === id ? { ...p, isNew: !p.isNew } : p); saveProducts(u); return u; });
  }, []);

  return (
    <div>
      <div className={s.card}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>
            <i className="bi bi-box-seam" style={{ color: 'var(--red-400)', marginRight: '0.5rem' }} />
            Productos ({filtered.length})
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className={s.searchBar}>
              <i className={`bi bi-search ${s.searchIcon}`} />
              <input className={s.searchInput} placeholder="Nombre, SKU..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {/* Select de filtro con estilo oscuro explícito */}
            <div style={{ position: 'relative' }}>
              <select
                style={{ ...selectStyle, width: 'auto', padding: '0.4rem 2rem 0.4rem 0.7rem', fontSize: '0.8rem' }}
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
              >
                {allFilterCats.map(c => (
                  <option key={c} value={c} style={{ background: '#1a1a1e', color: '#fff' }}>{c}</option>
                ))}
              </select>
              <i className="bi bi-chevron-down" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', fontSize: '0.65rem' }} />
            </div>
            <button className={`${s.actionBtn} ${s.actionBtnPrimary}`} onClick={() => setModal('new')}>
              <i className="bi bi-plus-lg" /> Nuevo producto
            </button>
          </div>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7}><div className={s.emptyState}><div className={s.emptyIcon}>📦</div><div className={s.emptyText}>Sin productos</div></div></td></tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.08)' }} onError={e => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>
                        <i className="bi bi-image" />
                      </div>
                    )}
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{p.sku || '—'}</td>
                  <td style={{ fontWeight: 600, color: 'var(--white)', maxWidth: 180 }}>{p.name}</td>
                  <td><span className={`${s.badge} ${s.badgeBlue}`}>{p.category}</span></td>
                  <td>${p.price.toLocaleString('es-CO')}</td>
                  <td><span className={`${s.badge} ${p.isNew ? s.badgeGreen : s.badgeYellow}`}>{p.isNew ? 'Nuevo' : 'Regular'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setModal(p)} title="Editar"><i className="bi bi-pencil" /></button>
                      <button className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => toggleNew(p.id)} title="Toggle Nuevo"><i className="bi bi-tag" /></button>
                      <button className={`${s.actionBtn} ${s.actionBtnDanger}`} onClick={() => setDeleteId(p.id)} title="Eliminar"><i className="bi bi-trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal crear/editar */}
      <AnimatePresence>
        {modal && (
          <ProductModal
            product={modal === 'new' ? null : modal}
            categories={categories}
            onClose={() => setModal(null)}
            onSave={handleSave}
            onAddCategory={handleAddCategory}
          />
        )}
      </AnimatePresence>

      {/* Confirm delete */}
      <AnimatePresence>
        {deleteId && (
          <div className={s.modalOverlay} onClick={() => setDeleteId(null)}>
            <motion.div className={s.modal} style={{ maxWidth: 360 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className={s.modalHeader}><span className={s.modalTitle}>⚠️ Eliminar producto</span></div>
              <div className={s.modalBody}><p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>¿Seguro que quieres eliminar este producto? Esta acción no se puede deshacer.</p></div>
              <div className={s.modalFooter}>
                <button className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setDeleteId(null)}>Cancelar</button>
                <button className={`${s.actionBtn} ${s.actionBtnDanger}`} onClick={() => handleDelete(deleteId)}><i className="bi bi-trash" /> Eliminar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Products;
