export const ROLES = Object.freeze({
  USER:       'usuario',
  ADMIN:      'admin',
  SUPERADMIN: 'superadmin',
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.USER]: ['view_products', 'manage_own_orders'],
  [ROLES.ADMIN]: [
    'view_products', 'manage_products', 'manage_orders',
    'manage_users', 'view_analytics', 'manage_own_orders',
  ],
  [ROLES.SUPERADMIN]: [
    'view_products', 'manage_products', 'manage_orders',
    'manage_users', 'view_analytics', 'manage_own_orders',
    'manage_admins', 'view_system_logs', 'manage_settings',
  ],
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.USER]:       'Usuario',
  [ROLES.ADMIN]:      'Administrador',
  [ROLES.SUPERADMIN]: 'SuperAdmin',
});

export const ROLE_COLORS = Object.freeze({
  [ROLES.USER]:       '#6366f1',
  [ROLES.ADMIN]:      '#f59e0b',
  [ROLES.SUPERADMIN]: '#e6192b',
});
