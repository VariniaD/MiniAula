import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RoleRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole = allowedRoles.includes(user?.rol);

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
}

export default RoleRoute;

