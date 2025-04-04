/**
 * Componente para rutas protegidas que requieren autenticación
 */
import React from 'react';
import { Navigate, useLocation } from '@remix-run/react';
import { useAuth } from "~/context/AuthContext";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * HOC (Higher-Order Component) que protege rutas que requieren autenticación
 * Redirige a la página de login si el usuario no está autenticado
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mientras se verifica la autenticación, mostramos un indicador de carga
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigimos a login con el parámetro de redirección
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
  }

  // Si está autenticado, mostramos el contenido de la ruta
  return <>{children}</>;
};

export default ProtectedRoute;