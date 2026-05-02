/**
 * authService.js
 *
 * CAPA DE ABSTRACCIÓN DE AUTENTICACIÓN — localStorage (temporal)
 * ─────────────────────────────────────────────────────────────────────────────
 * Para migrar al backend real, reemplaza las funciones de este archivo:
 *   login()     → POST /api/auth/login
 *   register()  → POST /api/auth/register
 *   logout()    → POST /api/auth/logout
 *   getSession()→ GET  /api/auth/me
 * Los componentes NO saben de dónde vienen los datos.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ROLES } from '../types';

const STORAGE_VERSION = 'v1';
const KEYS = {
  SESSION: `dyl_session:${STORAGE_VERSION}`,
  USERS:   `dyl_users:${STORAGE_VERSION}`,
};

// ─── Utils de storage ─────────────────────────────────────────────────────────
function readStorage(key) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
function removeStorage(key) {
  try { localStorage.removeItem(key); } catch {}
}

// ─── Usuarios semilla ─────────────────────────────────────────────────────────
const SEED_USERS = [
  {
    id: 'sa_001',
    name: 'DYL Support',
    email: 'superadmin@dyl.dev',
    password: 'DYL@SuperAdmin2026!',
    role: ROLES.SUPERADMIN,
    createdAt: new Date('2026-01-01').toISOString(),
    active: true,
    avatar: null,
  },
  {
    id: 'adm_001',
    name: 'Admin DYL',
    email: 'admin@dyl.com',
    password: 'Admin@DYL2026!',
    role: ROLES.ADMIN,
    createdAt: new Date('2026-01-15').toISOString(),
    active: true,
    avatar: null,
  },
];

// Inicializar storage — inyecta seeds si no existen
(function initializeStorage() {
  const existing = readStorage(KEYS.USERS) ?? [];
  let updated = [...existing];
  for (const seed of SEED_USERS) {
    if (!updated.some(u => u.id === seed.id)) {
      updated = [seed, ...updated];
    }
  }
  writeStorage(KEYS.USERS, updated);
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId() {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
function sanitizeUser(user) {
  const { password: _omit, ...safe } = user;
  return safe;
}
function simulateDelay(ms = 600) {
  return new Promise(res => setTimeout(res, ms));
}

// ─── API PÚBLICA ──────────────────────────────────────────────────────────────

export async function login({ email, password }) {
  await simulateDelay(800);
  const users = readStorage(KEYS.USERS) ?? [];
  const found = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
  if (!found.active) throw new Error('Tu cuenta está desactivada. Contacta al soporte.');
  writeStorage(KEYS.SESSION, { userId: found.id, role: found.role, loginAt: new Date().toISOString() });
  return { user: sanitizeUser(found) };
}

export async function register({ name, email, password }) {
  await simulateDelay(900);
  const users = readStorage(KEYS.USERS) ?? [];
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Ya existe una cuenta con este email.');
  }
  const newUser = {
    id: generateId(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: ROLES.USER,
    createdAt: new Date().toISOString(),
    active: true,
    avatar: null,
  };
  writeStorage(KEYS.USERS, [...users, newUser]);
  writeStorage(KEYS.SESSION, { userId: newUser.id, role: newUser.role, loginAt: new Date().toISOString() });
  return { user: sanitizeUser(newUser) };
}

export async function logout() {
  await simulateDelay(200);
  removeStorage(KEYS.SESSION);
}

export function getSession() {
  const session = readStorage(KEYS.SESSION);
  if (!session) return null;
  const users = readStorage(KEYS.USERS) ?? [];
  const user = users.find(u => u.id === session.userId);
  if (!user || !user.active) { removeStorage(KEYS.SESSION); return null; }
  return sanitizeUser(user);
}

// ─── ADMIN API ────────────────────────────────────────────────────────────────

export async function getUsers() {
  await simulateDelay(300);
  return (readStorage(KEYS.USERS) ?? []).map(sanitizeUser);
}

export async function updateUserRole({ userId, role }) {
  await simulateDelay(300);
  const users = readStorage(KEYS.USERS) ?? [];
  const updated = users.map(u => u.id === userId ? { ...u, role } : u);
  writeStorage(KEYS.USERS, updated);
  return updated.map(sanitizeUser);
}

export async function toggleUserStatus({ userId, active }) {
  await simulateDelay(300);
  const users = readStorage(KEYS.USERS) ?? [];
  const updated = users.map(u => u.id === userId ? { ...u, active } : u);
  writeStorage(KEYS.USERS, updated);
  return updated.map(sanitizeUser);
}

export async function deleteUser({ userId }) {
  await simulateDelay(300);
  const users = readStorage(KEYS.USERS) ?? [];
  writeStorage(KEYS.USERS, users.filter(u => u.id !== userId || u.role === ROLES.SUPERADMIN));
}

export async function createAdmin({ name, email, password }) {
  await simulateDelay(500);
  const users = readStorage(KEYS.USERS) ?? [];
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Ya existe un usuario con este email.');
  }
  const newAdmin = {
    id: generateId(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: ROLES.ADMIN,
    createdAt: new Date().toISOString(),
    active: true,
    avatar: null,
  };
  writeStorage(KEYS.USERS, [...users, newAdmin]);
  return sanitizeUser(newAdmin);
}
