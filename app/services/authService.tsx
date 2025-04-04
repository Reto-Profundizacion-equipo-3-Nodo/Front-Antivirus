// import { request } from "node:http";
// import { tokenCookie } from "~/utils/cookies";

// // authService.ts
// interface RegisterUserData {
//     name: string;
//     email: string;
//     password: string;
//     rol: string;
//     celular: string;
//     fechaNacimiento: string;
// }

// interface AuthResponse {
//     token: string;
//     success?: boolean; // Optional property for success
//     message?: string;  // Optional property for message
// }

// interface ErrorResponse {
//     message: string;
// }

// /**
//  * Realiza una petición POST a la API para registrar un usuario
//  * @param {RegisterUserData} userData - Datos del usuario
//  * @returns {Promise<AuthResponse>} - Respuesta de la API con el token de autenticación
//  */
// export const registerUser = async (userData: RegisterUserData): Promise<AuthResponse> => {
//     try {
//         const response = await fetch("http://localhost:5261/api/Auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//         });

//         if (!response.ok) {
//             const errorData: ErrorResponse = await response.json();
//             if (response.status === 500) {
//                 // Si el error es 500, mostrar el mensaje de error
//                 throw new Error(errorData.message || "Ocurrió un error interno en el servidor")
//             } else if (response.status === 409) {
//                 throw new Error(errorData.message || "El email ya está registrado");
//             } else {
//                 throw new Error(errorData.message || "Error al registrar usuario")

//             }
//         }

//         return await response.json();
//     } catch (error) {
//         if (error instanceof Error) {
//             throw new Error(error.message || "Error de conexión");
//         } else {
//             throw new Error("Error de conexión");
//         }
//     }
// };

// /**
//  * Realiza una petición POST para autenticar a un usuario
//  * @param {string} email - Email del usuario
//  * @param {string} password - Contraseña del usuario
//  * @returns {Promise<AuthResponse>} - Respuesta de la API con el token de autenticación
//  */
// export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
//     try {
//         const response = await fetch("http://localhost:5261/api/Auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             const errorData: ErrorResponse = await response.json();
//             throw new Error(errorData.message || "Error al iniciar sesión");
//         }

//         return await response.json(); // Devuelve el token
//     } catch (error) {
//         throw new Error(error.message || "Error de conexión");
//     }
// };

// /**
//  * Verifica si el token es válido
//  * @param {Request} request - Petición HTTP
//  * @returns {Promise<{isValid: boolean}>} - Información sobre la validez del token
//  */
// export const verifyToken = async (request: Request) => {
//     try {
//         const cookieHeader = request.headers.get("Cookie");
//         const token = await tokenCookie.parse(cookieHeader);
//         if (!token) {
//             throw new Error("Token inválido");
//         }
//         return true;
//     } catch (error) {
//         return false;
//     }
// };
// /**
//  * Servicio para cerrar la sesión del usuario
//  * @returns Promise<AuthResponse> - Respuesta con el estado del cierre de sesión
//  */
// export async function logout(): Promise<AuthResponse> {
//     try {
//         // Obtiene los datos del usuario almacenados en localStorage
//         const userData = localStorage.getItem("userData");
//         // Extrae el email del usuario, si no existe retorna cadena vacía
//         const email = userData ? JSON.parse(userData).email : "";

//         // Busca el token de autenticación en las cookies
//         const token = document.cookie
//             .split("; ") // Divide las cookies en un array
//             .find((row) => row.startsWith("token=")) // Busca la cookie que comienza con 'token='
//             ?.split("=")[1]; // Obtiene el valor del token

//         // Verifica si existe el token
//         if (!token) {
//             throw new Error("No authentication token found");
//         }

//         // Realiza la petición al servidor para cerrar sesión
//         const response = await fetch("http://localhost:5261/api/Auth/login/logout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ email }),
//         });

//         // Verifica si la respuesta fue exitosa
//         if (!response.ok) {
//             throw new Error("Logout failed");
//         }

//         // Elimina el token de las cookies estableciendo una fecha expirada
//         // y estableciendo el path a la raíz del dominio
//         document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         // Elimina los datos del usuario del localStorage
//         localStorage.removeItem("userData");

//         // Retorna la respuesta del servidor
//         return {
//             success: true,
//             message: "Sesión cerrada exitosamente",
//             token: "",
//         };
//     } catch (error) {
//         // En caso de error, retorna un objeto con el estado de error
//         return {
//             success: false,
//             message: "Error al cerrar sesión",
//             token: "",
//         };
//     }
// }
/**
 * Servicio de autenticación
 * Maneja las operaciones relacionadas con autenticación y gestión de tokens
 */

// Define la URL base de la API
const API_URL = 'http://localhost:5261/api';

// Interfaces para las respuestas de autenticación
export interface AuthSuccessResponse {
  token: string;
}

export interface AuthErrorResponse {
  error: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

/**
 * Verifica si una respuesta contiene un error
 * @param response - Respuesta de autenticación a verificar
 * @returns Boolean indicando si la respuesta es un error
 */
export function isErrorResponse(response: AuthResponse): response is AuthErrorResponse {
  return 'error' in response;
}

/**
 * Almacena el token de autenticación en una cookie
 * @param token - Token JWT a almacenar
 * @param expirationDays - Días hasta la expiración (por defecto 1 día)
 */
export function saveAuthToken(token: string, expirationDays: number = 1): void {
  const expirationMs = expirationDays * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + expirationMs);
  document.cookie = `authToken=${token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
  
  // También guardamos en localStorage como respaldo
  localStorage.setItem('authToken', token);
}

/**
 * Obtiene el token de autenticación almacenado
 * @returns El token si existe, undefined si no existe
 */
export function getAuthToken(): string | undefined {
  // Primero intentamos obtener de las cookies
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
  if (authCookie) {
    return authCookie.split('=')[1];
  }
  
  // Si no está en las cookies, intentamos obtenerlo del localStorage
  return localStorage.getItem('authToken') || undefined;
}

/**
 * Elimina el token de autenticación
 */
export function removeAuthToken(): void {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  localStorage.removeItem('authToken');
}

/**
 * Verifica si el usuario está autenticado
 * @returns Boolean indicando si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

/**
 * Inicia sesión de usuario con email y password
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns Promise con el token o un mensaje de error
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // const response = await fetch(`${API_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    //   credentials: 'include', // Importante para el manejo de cookies
    // });
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      // Sin credentials: 'include'
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { error: data.message || 'Error en la autenticación' };
    }
    
    // Almacenamos el token en una cookie y localStorage
    saveAuthToken(data.token);
    
    return { token: data.token };
  } catch (error: unknown) {
    console.error('Error en loginUser:', error);
    return {
      error: error instanceof Error ? error.message : 'Error al conectar con el servidor'
    };
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logoutUser = (): void => {
  removeAuthToken();
  // Opcionalmente, podemos llamar al endpoint de logout en el backend
  // fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
};

/**
 * Verifica la validez del token con el backend
 * @returns Promise<boolean> indicando si el token es válido
 */
export const verifyTokenWithBackend = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return false;
  }
};

// Placeholders para futuras implementaciones
export const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  return {
    error: 'Inicio de sesión con Google no implementado en el backend'
  };
};

export const loginWithFacebook = async (accessToken: string): Promise<AuthResponse> => {
  return {
    error: 'Inicio de sesión con Facebook no implementado en el backend'
  };
};