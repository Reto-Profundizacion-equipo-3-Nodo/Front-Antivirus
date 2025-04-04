/**
 * Contexto de autenticación
 * Proporciona estado de autenticación y funciones relacionadas a toda la aplicación
 */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  isAuthenticated as checkAuth, 
  saveAuthToken, 
  removeAuthToken, 
  loginUser as apiLoginUser,
  verifyTokenWithBackend,
  isErrorResponse,
  AuthResponse
}  from '~/services/authService';

// Definición del tipo para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

// Creación del contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ error: 'Contexto no inicializado' }),
  logout: () => {},
});

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Proveedor del contexto de autenticación
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Primero verificamos localmente si hay un token
        const localAuth = checkAuth();
        
        if (localAuth) {
          // Si hay un token, verificamos con el backend que sea válido
          const isValid = await verifyTokenWithBackend();
          setIsAuthenticated(isValid);
          
          // Si no es válido, limpiamos el token
          if (!isValid) {
            removeAuthToken();
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  /**
   * Función para iniciar sesión
   */
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiLoginUser(email, password);
      
      if (!isErrorResponse(response)) {
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error("Error en login:", error);
      return { 
        error: error instanceof Error ? error.message : 'Error desconocido al iniciar sesión' 
      };
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    // Redireccionar al usuario a la página de inicio
    window.location.href = '/';
  };

  // Contexto proporcionado a la aplicación
  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;