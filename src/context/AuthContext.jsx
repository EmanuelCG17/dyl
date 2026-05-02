import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getSession,
} from '../features/auth/api/authService';
import { ROLE_PERMISSIONS } from '../features/auth/types';

// ─── Contexto ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Hook público ─────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  // Rehidratación: recupera sesión del storage sin flicker
  const [user, setUser] = useState(() => getSession());
  const [loading, setLoading] = useState(false);

  // Verificar sesión al montar (por si expiró)
  useEffect(function verifySession() {
    const session = getSession();
    setUser(session);
  }, []);

  const login = useCallback(async function loginUser(credentials) {
    setLoading(true);
    try {
      const { user: loggedUser } = await apiLogin(credentials);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async function registerUser(data) {
    setLoading(true);
    try {
      const { user: newUser } = await apiRegister(data);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async function logoutUser() {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helpers de permisos (derivados, no estado extra)
  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;
      return (ROLE_PERMISSIONS[user.role] ?? []).includes(permission);
    },
    [user]
  );

  const isRole = useCallback(
    (role) => user?.role === role,
    [user]
  );

  // Valor memoizado para evitar re-renders innecesarios
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      hasPermission,
      isRole,
    }),
    [user, loading, login, register, logout, hasPermission, isRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
