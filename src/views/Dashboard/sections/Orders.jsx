import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from '../Dashboard.module.css';

const STATUS_COLORS = {
  pendiente: 'badgeYellow', procesando: 'badgeBlue',
  enviado: 'badgeGreen',   entregado: 'badgeGreen', cancelado: 'badgeRed',
};
const STATUS_LABELS = {
  pendiente: 'Pendiente', procesando: 'Procesando',
  enviado: 'Enviado',     entregado: 'Entregado',  cancelado: 'Cancelado',
};

const SAMPLE_ORDERS = [
  { 
    id: 'PED-001', 
    customer: 'Juan Pérez', 
    email: 'juan@email.com', 
    phone: '+57 300 123 4567', 
    address: 'Calle 123 #45-67, Bogotá, Colombia', 
    products: [
      { id: 1, name: 'Jordan 1 Retro High Chicago', price: 1500000, quantity: 1, image: '/products/prod_1_ai.png' }
    ],
    total: 1550000, 
    status: 'pendiente', 
    date: '2024-01-15', 
    notes: 'Cliente prefiere entrega mañana',
    shipping: 15000,
    subtotal: 1500000,
  },
  { 
    id: 'PED-002', 
    customer: 'María García', 
    email: 'maria@email.com', 
    phone: '+57 311 987 6543', 
    address: 'Carrera 56 #78-90, Medellín, Antioquia', 
    products: [
      { id: 2, name: 'Nike Dunk Low Panda', price: 650000, quantity: 2, image: '/products/prod_2_ai.png' }
    ],
    total: 1400000, 
    status: 'procesando', 
    date: '2024-01-14', 
    notes: '',
    shipping: 15000,
    subtotal: 1300000,
  },
  { 
    id: 'PED-003', 
    customer: 'Carlos López', 
    email: 'carlos@email.com', 
    phone: '+57 320 456 7890', 
    address: 'Avenida 45 #12-34, Cali, Valle', 
    products: [
      { id: 3, name: 'Yeezy Boost 350 V2 Zebra', price: 950000, quantity: 1, image: '/products/prod_3_ai.png' }
    ],
    total: 1000000, 
    status: 'enviado', 
    date: '2024-01-13', 
    tracking: 'SERV-789456123', 
    notes: 'Pedido urgentes para regalo',
    shipping: 15000,
    subtotal: 985000,
  },
  { 
    id: 'PED-004', 
    customer: 'Ana Rodríguez', 
    email: 'ana@email.com', 
    phone: '+57 301 234 5678', 
    address: 'Calle 89 #56-78, Barranquilla, Atlántico', 
    products: [
      { id: 4, name: 'New Balance 550 White', price: 550000, quantity: 1, image: '/products/prod_4_ai.png' }
    ],
    total: 600000, 
    status: 'entregado', 
    date: '2024-01-10', 
    notes: 'Cliente satisfecho, recompra',
    shipping: 15000,
    subtotal: 585000,
  },
  { 
    id: 'PED-005', 
    customer: 'Pedro Martínez', 
    email: 'pedro@email.com', 
    phone: '+57 310 111 2233', 
    address: 'Carrera 10 #20-30, Bucaramanga, Santander', 
    products: [
      { id: 5, name: 'Nike Air Max 90', price: 450000, quantity: 1, image: '/products/prod_5_ai.png' },
      { id: 6, name: 'Medias Jordan (3 pares)', price: 45000, quantity: 3, image: '/products/prod_6_ai.png' }
    ],
    total: 615000, 
    status: 'pendiente', 
    date: '2024-01-16', 
    notes: 'Pedido con múltiples artículos',
    shipping: 15000,
    sub: 585000,
  },
];

const ORDERS_KEY = 'dyl_orders:v1';
function loadOrders() {
  try { const d = localStorage.getItem(ORDERS_KEY); return d ? JSON.parse(d) : SAMPLE_ORDERS; }
  catch { return SAMPLE_ORDERS; }
}
function saveOrders(o) { try { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); } catch {} }

const OrderDetailModal = ({ order, onClose, onUpdateStatus }) => (
  <div className={s.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
    <motion.div 
      className={s.modal} 
      style={{ maxWidth: 640 }}
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className={s.modalHeader} style={{ position: 'relative' }}>
        <span className={s.modalTitle}><i className="bi bi-receipt" style={{ marginRight: '0.5rem' }} />Pedido {order.id}</span>
        <button 
          className={s.modalClose} 
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <i className="bi bi-x-lg" style={{ fontSize: '1.25rem' }} />
        </button>
      </div>
      
      <div className={s.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Estado del pedido */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span className={`${s.badge} ${s[STATUS_COLORS[order.status]]}`} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
            {STATUS_LABELS[order.status]}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{order.date}</span>
        </div>

        {/* Información del cliente */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bi bi-person-fill" /> Datos del cliente
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>Nombre</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>{order.customer}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>Email</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray-300)' }}>{order.email}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>Teléfono</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray-300)' }}>{order.phone}</span>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>Dirección de entrega</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray-300)' }}>{order.address}</span>
            </div>
          </div>
        </div>

        {/* Productos - 显示 como tarjetas completas */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bi bi-box-seam" /> Productos ({order.products?.length || 0})
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(order.products || []).map((product, idx) => (
              <div key={product.id || idx} style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'center', 
                padding: '0.75rem', 
                background: 'rgba(0,0,0,0.2)', 
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                {/* Imagen del producto */}
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'var(--bg-surface)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '👟'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.75rem' }}>👟</span>
                  )}
                </div>
                
                {/* Info del producto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ 
                    fontSize: 'clamp(0.85rem, 2cqi, 0.95rem)', 
                    fontWeight: 600, 
                    color: 'var(--white)', 
                    display: 'block',
                    lineHeight: 1.3,
                  }}>
                    {product.name}
                  </span>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'rgba(255,255,255,0.5)', 
                    marginTop: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}>
                    <span>${product.price?.toLocaleString('es-CO')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>×</span>
                    <span style={{ 
                      background: 'rgba(230,25,43,0.15)', 
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--red-400)',
                    }}>
                      Cant: {product.quantity}
                    </span>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ 
                    fontSize: 'clamp(0.9rem, 2.5cqi, 1rem)', 
                    fontWeight: 700, 
                    color: 'var(--red-400)',
                  }}>
                    ${(product.price * product.quantity).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen de precios */}
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            background: 'rgba(230,25,43,0.05)', 
            borderRadius: 'var(--radius-sm)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Subtotal</span>
              <span style={{ color: 'var(--gray-300)' }}>${order.subtotal?.toLocaleString('es-CO') || order.products?.reduce((a, p) => a + (p.price * p.quantity), 0).toLocaleString('es-CO')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Envío</span>
              <span style={{ color: 'var(--gray-300)' }}>${order.shipping?.toLocaleString('es-CO') || '15.000'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
              <span style={{ color: 'var(--white)' }}>Total</span>
              <span style={{ color: 'var(--red-400)' }}>${order.total?.toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>

        {/* Notas */}
        {order.notes && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(245,158,11,0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <span style={{ fontSize: '0.7rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <i className="bi bi-sticky" /> Nota
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-300)' }}>{order.notes}</span>
          </div>
        )}

        {/* Tracking */}
        {order.tracking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Tracking:</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--red-400)', fontFamily: 'monospace' }}>{order.tracking}</span>
          </div>
        )}

        {/* Cambiar estado */}
        <div>
          <label className={s.formLabel} style={{ marginBottom: '0.5rem', display: 'block' }}>Cambiar estado</label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {Object.keys(STATUS_LABELS).map(k => (
              <button 
                key={k} 
                className={`${s.actionBtn} ${order.status === k ? s.actionBtnPrimary : s.actionBtnGhost}`}
                onClick={() => onUpdateStatus(order.id, k)}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                {STATUS_LABELS[k]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.modalFooter}>
        <button className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={onClose}>Cerrar</button>
      </div>
    </motion.div>
  </div>
);

function Orders() {
  const [orders, setOrders] = useState(loadOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem(ORDERS_KEY)) {
      saveOrders(SAMPLE_ORDERS);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(o =>
      (statusFilter === 'todos' || o.status === statusFilter) &&
      (o.id?.toLowerCase().includes(q) || o.customer?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q))
    );
  }, [orders, search, statusFilter]);

  const updateStatus = useCallback((id, status) => {
    setOrders(prev => {
      const u = prev.map(o => o.id === id ? { ...o, status } : o);
      saveOrders(u);
      return u;
    });
    setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
  }, []);

  return (
    <div>
      <div className={s.card}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>
            <i className="bi bi-bag-check" style={{ color: 'var(--red-400)', marginRight: '0.5rem' }} />
            Pedidos ({filtered.length})
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className={s.searchBar}>
              <i className={`bi bi-search ${s.searchIcon}`} />
              <input className={s.searchInput} placeholder="ID, cliente o email..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select
              style={{ background: '#1a1a1e', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.7rem', fontSize: '0.8rem', cursor: 'pointer', minHeight: 36 }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="todos" style={{ background: '#1a1a1e' }}>Todos</option>
              {Object.keys(STATUS_LABELS).map(k => (
                <option key={k} value={k} style={{ background: '#1a1a1e' }}>{STATUS_LABELS[k]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.tableWrap}>
          {filtered.length === 0 ? (
            <div className={s.emptyState}>
              <div className={s.emptyIcon}>🛒</div>
              <div className={s.emptyText}>No hay pedidos que coincidan con los filtros.</div>
            </div>
          ) : (
            <table className={s.table}>
              <thead>
                <tr><th>ID</th><th>Cliente</th><th>Producto</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700, color: 'var(--red-400)', fontSize: '0.8rem' }}>{o.id}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: 'var(--white)' }}>{o.customer}</span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{o.email}</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</td>
                    <td style={{ fontWeight: 600 }}>${o.total?.toLocaleString('es-CO')}</td>
                    <td><span className={`${s.badge} ${s[STATUS_COLORS[o.status]]}`}>{STATUS_LABELS[o.status]}</span></td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{o.date}</td>
                    <td>
                      <button className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setSelected(o)} title="Ver detalles">
                        <i className="bi bi-eye" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal detalle pedido */}
      <AnimatePresence>
        {selected && (
          <OrderDetailModal order={selected} onClose={() => setSelected(null)} onUpdateStatus={updateStatus} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Orders;
