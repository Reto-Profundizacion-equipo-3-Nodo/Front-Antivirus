// authService.ts
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
}

interface ErrorResponse {
    message: string;
}

/**
 * Realiza una petición POST a la API para registrar un usuario
 * @param {RegisterUserData} userData - Datos del usuario
 * @returns {Promise<AuthResponse>} - Respuesta de la API con el token de autenticación
 */
export const registerUser = async (userData: RegisterUserData): Promise<AuthResponse> => {
    try {
        const response = await fetch("http://localhost:5261/api/Auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            if (response.status === 500) {
                // Si el error es 500, mostrar el mensaje de error
                throw new Error(errorData.message || "Ocurrió un error interno en el servidor")
            } else if (response.status === 409) {
                throw new Error(errorData.message || "El email ya está registrado");
            } else {
                throw new Error(errorData.message || "Error al registrar usuario")

            }
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Error de conexión");
        } else {
            throw new Error("Error de conexión");
        }
    }
};

/**
 * Realiza una petición POST para autenticar a un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<AuthResponse>} - Respuesta de la API con el token de autenticación
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch("http://localhost:5261/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        return await response.json(); // Devuelve el token
    } catch (error) {
        throw new Error(error.message || "Error de conexión");
    }
};

/**
 * Verifica si el token es válido
 * @param {string} token - Token JWT
 * @returns {Promise<{isValid: boolean}>} - Información sobre la validez del token
 */
export const verifyToken = async (token: string): Promise<{ isValid: boolean }> => {
    try {
        const response = await fetch("http://localhost:5261/api/Auth/verify-token", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Token inválido");
        }

        return { isValid: true }; // Devuelve información de validez
    } catch (error) {
        return { isValid: false };
    }
};
