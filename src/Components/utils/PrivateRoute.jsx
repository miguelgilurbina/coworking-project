import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ element: Element, isAdminRoute, ...rest }) => {
  const { user } = useAuth();

  // Función para determinar si el usuario tiene acceso a la ruta basado en el rol
  const hasAccess = () => {
    if (!user) return false; // Si no hay usuario autenticado

    // Verificar si es ruta de administrador y el usuario tiene el rol adecuado
    if (isAdminRoute && user.roles.includes('admin')) {
      return true;
    }

    // Para rutas no administrativas, permitir acceso a todos los usuarios autenticados
    return true;
  };

  return (
    <Route
      {...rest}
      element={hasAccess() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;