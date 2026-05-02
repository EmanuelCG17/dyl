import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import s from '../Dashboard.module.css';
import { mockProducts } from '../../../services/mockData';
import { useStoreConfig } from '../../../context/StoreConfigContext.jsx';

const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const SALES_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const MAX_SALE = 10; // evitar división por cero

const StatCard = memo(function StatCard({ icon, label, value, change, up, color }) {
  return (
    <motion.div className={s.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className={s.statCardHeader}>
        <span className={s.statLabel}>{label}</span>
        <div className={s.statIcon} style={{ background: `${color}18` }}>
          <i className={`bi bi-${icon}`} style={{ color }} />
        </div>
      </div>
      <div className={s.statValue}>{value}</div>
      <div className={`${s.statChange} ${up ? s.statUp : s.statDown}`}>
        <i className={`bi bi-arrow-${up ? 'up' : 'down'}-short`} />
        {change}
      </div>
    </motion.div>
  );
});

function Overview({ users = [] }) {
  const { config } = useStoreConfig();

  const stats = [
    { icon: 'currency-dollar', label: 'Ingresos Totales', value: `${config.currency} $0`, change: 'Sin datos aún', up: true, color: '#22c55e' },
    { icon: 'bag-check',       label: 'Pedidos',          value: 0,                        change: 'Sin pedidos aún', up: true, color: '#6366f1' },
    { icon: 'people',          label: 'Usuarios',         value: users.length,             change: `${users.length} registrados`, up: true, color: '#f59e0b' },
    { icon: 'box-seam',        label: 'Productos',        value: mockProducts.length,      change: 'En catálogo', up: true, color: 'var(--red-400)' },
  ];

  return (
    <div>
      <div className={s.statsGrid}>
        {stats.map(st => <StatCard key={st.label} {...st} />)}
      </div>

      {/* Gráfica limpia */}
      <div className={s.card}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>
            <i className="bi bi-bar-chart-fill" style={{ color: 'var(--red-400)', marginRight: '0.5rem' }} />
            Ventas mensuales — {new Date().getFullYear()}
          </span>
          <span className={`${s.badge} ${s.badgeYellow}`}>Esperando datos</span>
        </div>
        <div className={s.cardBody}>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.25)' }}>
            <i className="bi bi-bar-chart" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'block' }} />
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Las estadísticas de ventas aparecerán cuando el backend esté conectado.</p>
          </div>
          <div className={s.chartLabels}>
            {MONTHS.map(m => <span key={m} className={s.chartLabel}>{m}</span>)}
          </div>
        </div>
      </div>

      {/* Top productos */}
      <div className={s.card}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>
            <i className="bi bi-fire" style={{ color: 'var(--red-400)', marginRight: '0.5rem' }} />
            Catálogo actual ({mockProducts.length} productos)
          </span>
        </div>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead><tr><th>#</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th></tr></thead>
            <tbody>
              {mockProducts.slice(0, 6).map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>#{i + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>{p.name}</td>
                  <td><span className={`${s.badge} ${s.badgeBlue}`}>{p.category}</span></td>
                  <td>${p.price.toLocaleString('es-CO')}</td>
                  <td><span className={`${s.badge} ${s.badgeGreen}`}>Disponible</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Overview;
