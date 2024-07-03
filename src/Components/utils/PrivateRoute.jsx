import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ element: Element, isAdminRoute, ...rest }) => {
  const { usuario } = useAuth();

  // Función para determinar si el usuario tiene acceso a la ruta basado en el rol
  const hasAccess = () => {
    if (!usuario) {
      console.log('No user found');
      return false; // Si no hay usuario autenticado
      }
    // Verificar si es ruta de administrador y el usuario tiene el rol adecuado
    if (isAdminRoute && usuario.rol.includes('admin')) {
      console.log('User does not have admin role');
      return true;
    }
    console.log('User has access');
    // Para rutas no administrativas, permitir acceso a todos los usuarios autenticados
    return true;
  };

  return hasAccess() ? <Element {...rest} /> : <Navigate to="/login" replace />;
  
};

export default PrivateRoute;