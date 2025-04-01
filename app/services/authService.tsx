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
import { tokenCookie } from "../utils/cookies";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  rol: string;
  celular: string;
  fechaNacimiento: string;
}

interface AuthResponse {
  token: string;
  success?: boolean;
  message?: string;
  user?: any;
}

interface ErrorResponse {
  message: string;
}

// URL base para las llamadas a la API (Idealmente en una variable de entorno)
const API_URL = "http://localhost:5261/api";

/**
 * 🔹 Registra un usuario en la API
 * @param userData Datos del usuario
 * @returns Token de autenticación
 */
export const registerUser = async (
  userData: RegisterUserData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    throw new Error(error instanceof Error ? error.message : "Error de conexión");
  }
};

/**
 * 🔹 Inicia sesión en la API
 * @param email Correo electrónico
 * @param password Contraseña
 * @returns Token de autenticación y datos del usuario
 */
export const loginUser = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const result = await response.json();
    
    // Registrar el inicio de sesión
    console.log(`✅ Usuario autenticado: ${email}`);
    
    return result;
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    throw new Error(error instanceof Error ? error.message : "Error de conexión");
  }
};

/**
 * 🔹 Inicia el flujo de autenticación con Google
 * Redirige al usuario a la página de autenticación de Google
 */
export const loginWithGoogle = () => {
  // Obtener la URL actual para el callback después de la autenticación
  const redirectUri = `${window.location.origin}/auth/google/callback`;
  
  // Redirigir al usuario al endpoint de login con Google
  window.location.href = `${API_URL}/Auth/google-login?redirectUri=${encodeURIComponent(redirectUri)}`;
};

/**
 * 🔹 Inicia el flujo de autenticación con Facebook
 * Redirige al usuario a la página de autenticación de Facebook
 */
export const loginWithFacebook = () => {
  // Obtener la URL actual para el callback después de la autenticación
  const redirectUri = `${window.location.origin}/auth/facebook/callback`;
  
  // Redirigir al usuario al endpoint de login con Facebook
  window.location.href = `${API_URL}/Auth/facebook-login?redirectUri=${encodeURIComponent(redirectUri)}`;
};

/**
 * 🔹 Procesa el callback de la autenticación OAuth (Google/Facebook)
 * @param provider Proveedor OAuth (google/facebook)
 * @param code Código de autorización
 * @returns Token de autenticación y datos del usuario
 */
export const processOAuthCallback = async (
  provider: string,
  code: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/Auth/${provider}-callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || "Error en autenticación con proveedor externo");
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Error en processOAuthCallback (${provider}):`, error);
    throw new Error(error instanceof Error ? error.message : "Error de conexión");
  }
};

/**
 * 🔹 Verifica si el usuario está autenticado
 * @param request Petición HTTP
 * @returns Boolean indicando si el token es válido
 */
export const verifyToken = async (request: Request): Promise<boolean> => {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const token = await tokenCookie.parse(cookieHeader);

    if (!token) {
      console.warn("⚠️ No se encontró token");
      return false;
    }

    // Validar token con el backend
    const response = await fetch(`${API_URL}/Auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn("⚠️ Token inválido");
      return false;
    }

    console.log("✅ Token válido");
    return true;
  } catch (error) {
    console.error("❌ Error en verifyToken:", error);
    return false;
  }
};

/**
 * 🔹 Cierra sesión del usuario
 * @returns Estado del cierre de sesión
 */
export const logout = async (): Promise<AuthResponse> => {
  try {
    // Obtener el token de la cookie en el navegador
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.warn("⚠️ No hay token para cerrar sesión");
      return {
        success: true,
        message: "No había sesión activa",
        token: "",
      };
    }

    // Enviar petición para cerrar sesión en el backend
    const response = await fetch(`${API_URL}/Auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión en el servidor");
    }

    console.log("✅ Sesión cerrada en el servidor");
    
    return {
      success: true,
      message: "Sesión cerrada exitosamente",
      token: "",
    };
  } catch (error) {
    console.error("❌ Error en logout:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al cerrar sesión",
      token: "",
    };
  }
};

/**
 * 🔹 Obtiene información del usuario actual
 * @param token Token de autenticación
 * @returns Datos del usuario
 */
export const getCurrentUser = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/Auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener información del usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en getCurrentUser:", error);
    throw new Error(error instanceof Error ? error.message : "Error de conexión");
  }
};