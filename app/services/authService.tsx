import { request } from "node:http";
import { tokenCookie } from "~/utils/cookies";

// Interfaces
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
}

interface ErrorResponse {
    message: string;
}

interface AdminData {
    id: number;
    name: string;
    email: string;
    role: string;
}

// Función para registrar usuario
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
            throw {
                status: response.status,
                message: errorData.message || "Error al registrar usuario"
            };
        }

        return await response.json();
    } catch (error) {
        // Si el error tiene status y message, lo re-lanzamos
        if (typeof error === "object" && error !== null && "status" in error) {
            throw error;
        }

        // Si es un error general (como error de red)
        throw {
            status: 0,
            message: "Error de conexión"
        };
    }
};

// Función para login de usuario
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
            throw {
                status: response.status,
                message: errorData.message || "Error al iniciar sesión"
            };
        }

        return await response.json(); // Devuelve el token
    } catch (error) {
        if (typeof error === "object" && error !== null && "status" in error) {
            throw error;
        }

        throw {
            status: 0,
            message: "Error de conexión"
        };
    }
};

// Obtener datos del administrador
export const getAdminData = async (): Promise<AdminData> => {
    const response = await fetch('/api/Admin/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw {
            status: response.status,
            message: 'Error al obtener los datos del administrador'
        };
    }

    return response.json();
};

// Verificación de token desde la cookie
export const verifyToken = async (request: Request) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const token = await tokenCookie.parse(cookieHeader);
        if (!token) {
            throw new Error("Token inválido");
        }
        return true;
    } catch (error) {
        return false;
    }
};

// Logout del usuario
export async function logout(): Promise<AuthResponse> {
    try {
        const userData = localStorage.getItem("userData");
        const email = userData ? JSON.parse(userData).email : "";

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch("http://localhost:5261/api/Auth/login/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userData");

        return {
            success: true,
            message: "Sesión cerrada exitosamente",
            token: "",
        };
    } catch (error) {
        return {
            success: false,
            message: "Error al cerrar sesión",
            token: "",
        };
    }
}
