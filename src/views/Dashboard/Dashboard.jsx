import { useState, useCallback, lazy, Suspense, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../features/auth/types';
import s from './Dashboard.module.css';
import logoUrl from '../../assets/images/logodyl.png';

// Lazy load de secciones
const Overview = lazy(() => import('./sections/Overview'));
const Products = lazy(() => import('./sections/Products'));
const Orders = lazy(() => import('./sections/Orders'));
const Users = lazy(() => import('./sections/Users'));
const Settings = lazy(() => import('./sections/Settings'));

const SectionLoader = () => (
  <div style={{ padding:'3rem', textAlign:'center', color:'rgba(255,255,255,0.3)' }}>
    <div style={{ display:'inline-block', width:24, height:24, border:'2px solid rgba(255,255,255,0.1)', borderTopColor:'var(--red-500)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
  </div>
);

// Definición de secciones por rol - diferencia entre admin y superadmin
function getSections(user) {
  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;
  
  const base = [
    { id: 'overview',  label: 'Resumen',    icon: 'speedometer2', group: 'Principal', roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
    { id: 'products',  label: 'Productos',  icon: 'box-seam',     group: 'Gestión', roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
    { id: 'orders',    label: 'Pedidos',    icon: 'bag-check',    group: 'Gestión', roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
    { id: 'users',     label: 'Usuarios',   icon: 'people',       group: 'Gestión', roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
    { id: 'settings',  label: 'Ajustes',    icon: 'gear',         group: 'Sistema', roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
  ];
  
  // Admin regular tiene ajustes limitados (solo configuración básica)
  const settingsSection = base.find(s => s.id === 'settings');
  if (settingsSection) {
    settingsSection.isLimited = !isSuperAdmin;
    settingsSection.label = isSuperAdmin ? 'Configuración' : 'Ajustes';
  }
  
  // SuperAdmin tiene acceso completo + logs del sistema
  if (isSuperAdmin) {
    base.push({ id: 'system', label: 'Logs sistema', icon: 'terminal', group: 'Sistema', roles: [ROLES.SUPERADMIN] });
  }
  
  // Filtrar secciones por rol del usuario actual
  return base.filter(s => s.roles.includes(user?.role));
}

const SECTION_TITLES = {
  overview: 'Resumen general',
  products: 'Gestión de productos',
  orders:   'Gestión de pedidos',
  users:    'Gestión de usuarios',
  settings: 'Configuración',
  system:   'Logs del sistema',
};

// Panel simple de logs para SuperAdmin
const SystemLogs = memo(function SystemLogs() {
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <span className={s.cardTitle}><i className="bi bi-terminal" style={{ color:'var(--red-400)', marginRight:'0.5rem' }} />Logs del sistema</span>
        <span className={`${s.badge} ${s.badgeYellow}`}>En espera del backend</span>
      </div>
      <div className={s.emptyState}>
        <div className={s.emptyIcon}>📋</div>
        <div className={s.emptyText}>
          Los logs del sistema aparecerán aquí cuando el backend esté conectado.
          <br />
          <span style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.2)', marginTop:'0.5rem', display:'block' }}>
            GET /api/admin/logs — pendiente de implementar
          </span>
        </div>
      </div>
    </div>
  );
});

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;
  const sections = getSections(user);
  const groups = [...new Set(sections.map(s => s.group))];

  const handleLogout = useCallback(async function doLogout() {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  function renderSection() {
    switch (active) {
      case 'overview': return <Overview />;
      case 'products': return <Products />;
      case 'orders':   return <Orders />;
      case 'users':    return <Users isSuperAdmin={isSuperAdmin} />;
      case 'settings': return <Settings isSuperAdmin={isSuperAdmin} />;
      case 'system':   return isSuperAdmin ? <SystemLogs /> : <Overview />;
      default:         return null;
    }
  }

  return (
    <>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      <div className={s.dashWrap}>
        {/* Sidebar */}
        <aside className={`${s.sidebar} ${sidebarOpen ? s.sidebarOpen : ''}`}>
          <div className={s.sidebarHeader}>
            <img src={logoUrl} alt="DYL" className={s.sidebarLogo} />
            <span className={s.sidebarBadge}>ADMIN</span>
          </div>

          <nav className={s.sidebarNav}>
            {groups.map(group => (
              <div key={group} className={s.sidebarSection}>
                <div className={s.sidebarSectionLabel}>{group}</div>
                {sections.filter(sec => sec.group === group).map(sec => (
                  <button
                    key={sec.id}
                    className={`${s.sidebarLink} ${active === sec.id ? s.sidebarLinkActive : ''}`}
                    onClick={() => { setActive(sec.id); setSidebarOpen(false); }}
                  >
                    <i className={`bi bi-${sec.icon} ${s.sidebarLinkIcon}`} />
                    {sec.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className={s.sidebarFooter}>
            <div className={s.sidebarUser}>
              <div className={s.sidebarAvatar} style={{ background: ROLE_COLORS[user.role] }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={s.sidebarUserInfo}>
                <div className={s.sidebarUserName}>{user.name}</div>
                <div className={s.sidebarUserRole}>{ROLE_LABELS[user.role]}</div>
              </div>
            </div>
            <button className={s.sidebarLink} onClick={handleLogout} style={{ color:'var(--red-400)', marginTop:'0.25rem' }}>
              <i className={`bi bi-box-arrow-right ${s.sidebarLinkIcon}`} />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className={s.main}>
          <header className={s.topbar}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              {/* Botón hamburguesa - solo visible en tablet/móvil con media query CSS */}
              <button
                id="db-sidebar-toggle"
                onClick={() => setSidebarOpen(o => !o)}
                aria-label="Abrir menú"
              >
                <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`} />
              </button>
              <span className={s.topbarTitle}>{SECTION_TITLES[active]}</span>
            </div>
            <div className={s.topbarActions}>
              <Link to="/" className={s.topbarBtn}>
                <i className="bi bi-house" /> Ver tienda
              </Link>
              <button className={`${s.topbarBtn} ${s.topbarBtnDanger}`} onClick={handleLogout}>
                <i className="bi bi-box-arrow-right" /> Salir
              </button>
            </div>
          </header>

          <div className={s.content}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }}
                transition={{ duration:0.22 }}
              >
                <Suspense fallback={<SectionLoader />}>
                  {renderSection()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
