import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from '../Dashboard.module.css';
import { useAuth } from '../../../context/AuthContext';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../../features/auth/types';
import { getUsers, updateUserRole, toggleUserStatus, deleteUser, createAdmin } from '../../../features/auth/api/authService';

const emptyAdmin = { name:'', email:'', password:'' };

function Users({ isSuperAdmin }) {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [adminForm, setAdminForm] = useState(emptyAdmin);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(function fetchUsers() {
    getUsers().then(u => { setUsers(u); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u =>
      (roleFilter === 'todos' || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    );
  }, [users, search, roleFilter]);

  const handleRoleChange = useCallback(async (userId, role) => {
    const updated = await updateUserRole({ userId, role });
    setUsers(updated);
  }, []);

  const handleToggle = useCallback(async (userId, active) => {
    const updated = await toggleUserStatus({ userId, active });
    setUsers(updated);
  }, []);

  const handleDelete = useCallback(async (userId) => {
    if (!window.confirm('¿Eliminar usuario? No se puede deshacer.')) return;
    await deleteUser({ userId });
    setUsers(prev => prev.filter(u => u.id !== userId));
  }, []);

  const handleCreateAdmin = useCallback(async e => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const newAdmin = await createAdmin(adminForm);
      setUsers(prev => [...prev, newAdmin]);
      setCreateModal(false);
      setAdminForm(emptyAdmin);
    } catch (err) {
      setFormError(err.message);
    } finally { setSaving(false); }
  }, [adminForm]);

  if (loading) return <div style={{ padding:'2rem', color:'rgba(255,255,255,0.4)', textAlign:'center' }}>Cargando usuarios...</div>;

  return (
    <div>
      <div className={s.card}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}><i className="bi bi-people" style={{ color:'var(--red-400)', marginRight:'0.5rem' }} />Usuarios ({filtered.length})</span>
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            <div className={s.searchBar}>
              <i className={`bi bi-search ${s.searchIcon}`} />
              <input className={s.searchInput} placeholder="Nombre o email..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className={`${s.dbInput} ${s.dbSelect}`} style={{ width:'auto', padding:'0.4rem 0.7rem', fontSize:'0.8rem' }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="todos">Todos los roles</option>
              {Object.values(ROLES).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
            </select>
            {isSuperAdmin && (
              <button className={`${s.actionBtn} ${s.actionBtnPrimary}`} onClick={() => setCreateModal(true)}>
                <i className="bi bi-person-plus" /> Crear Admin
              </button>
            )}
          </div>
        </div>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead><tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Registro</th><th>Acciones</th></tr></thead>
            <tbody>
              {filtered.map(u => {
                const isMe = u.id === currentUser.id;
                const isSA = u.role === ROLES.SUPERADMIN;
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:ROLE_COLORS[u.role], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:700, color:'#fff', flexShrink:0 }}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight:600, color:'var(--white)' }}>{u.name} {isMe && <span style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.3)' }}>(tú)</span>}</span>
                      </div>
                    </td>
                    <td style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.82rem' }}>{u.email}</td>
                    <td>
                      {isSA || !isSuperAdmin ? (
                        <span className={s.badge} style={{ background:`${ROLE_COLORS[u.role]}18`, color:ROLE_COLORS[u.role], border:`1px solid ${ROLE_COLORS[u.role]}44` }}>{ROLE_LABELS[u.role]}</span>
                      ) : (
                        <select className={`${s.dbInput} ${s.dbSelect}`} style={{ width:'auto', padding:'0.25rem 0.5rem', fontSize:'0.78rem' }} value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} disabled={isMe}>
                          {Object.values(ROLES).filter(r => r !== ROLES.SUPERADMIN).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                        </select>
                      )}
                    </td>
                    <td>
                      <span className={`${s.badge} ${u.active ? s.badgeGreen : s.badgeRed}`}>
                        {u.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.75rem' }}>
                      {new Date(u.createdAt).toLocaleDateString('es-CO')}
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:'0.4rem' }}>
                        {!isMe && !isSA && (
                          <>
                            <button className={`${s.actionBtn} ${u.active ? s.actionBtnDanger : s.actionBtnSuccess}`} onClick={() => handleToggle(u.id, !u.active)}>
                              <i className={`bi bi-${u.active ? 'pause' : 'play'}`} />
                            </button>
                            {isSuperAdmin && (
                              <button className={`${s.actionBtn} ${s.actionBtnDanger}`} onClick={() => handleDelete(u.id)}>
                                <i className="bi bi-trash" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal crear admin */}
      <AnimatePresence>
        {createModal && (
          <div className={s.modalOverlay} onClick={e => e.target === e.currentTarget && setCreateModal(false)}>
            <motion.div className={s.modal} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}>
              <div className={s.modalHeader}>
                <span className={s.modalTitle}>Crear Administrador</span>
                <button className={s.modalClose} onClick={() => setCreateModal(false)}><i className="bi bi-x-lg" /></button>
              </div>
              <form onSubmit={handleCreateAdmin}>
                <div className={s.modalBody}>
                  {formError && <div style={{ padding:'0.6rem 0.8rem', background:'rgba(230,25,43,0.1)', border:'1px solid rgba(230,25,43,0.3)', borderRadius:'var(--radius-sm)', color:'var(--red-400)', fontSize:'0.82rem' }}>{formError}</div>}
                  <div className={s.formGroup}><label className={s.formLabel}>Nombre</label><input className={s.dbInput} value={adminForm.name} onChange={e => setAdminForm(p => ({...p, name:e.target.value}))} required placeholder="Nombre completo" /></div>
                  <div className={s.formGroup}><label className={s.formLabel}>Email</label><input className={s.dbInput} type="email" value={adminForm.email} onChange={e => setAdminForm(p => ({...p, email:e.target.value}))} required placeholder="admin@dyl.com" /></div>
                  <div className={s.formGroup}><label className={s.formLabel}>Contraseña</label><input className={s.dbInput} type="password" value={adminForm.password} onChange={e => setAdminForm(p => ({...p, password:e.target.value}))} required placeholder="••••••••" minLength={6} /></div>
                </div>
                <div className={s.modalFooter}>
                  <button type="button" className={`${s.actionBtn} ${s.actionBtnGhost}`} onClick={() => setCreateModal(false)}>Cancelar</button>
                  <button type="submit" className={`${s.actionBtn} ${s.actionBtnPrimary}`} disabled={saving}>
                    {saving ? 'Creando...' : <><i className="bi bi-person-plus" /> Crear Admin</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Users;
