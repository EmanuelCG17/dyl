import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { ROLES } from '../types';

/**
 * ProtectedRoute
 * Protege rutas según autenticación y rol mínimo requerido.
 *
 * MIGRACIÓN AL BACKEND:
 * Este componente no cambia. Solo depende del AuthContext, que sí cambia.
 */
function ProtectedRoute({ children, requiredRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // Rol insuficiente → redirigir al inicio
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
