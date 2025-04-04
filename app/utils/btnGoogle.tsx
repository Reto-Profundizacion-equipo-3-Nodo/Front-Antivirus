import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type UserData = {
    name: string;
    email: string;
    role: string;
    avatarUrl: string;
};

export default function BtnGoogle() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    const clienteID =
        "97095162816-lu3019h98mm3s5pmkpaujhlfd5nb606c.apps.googleusercontent.com";

    interface GoogleLoginResponse {
        credential: string;
    }

    interface DecodedToken {
        name?: string;
        email?: string;
        role?: string;
        picture?: string;
    }

    const handleLoginSuccess = (response: GoogleLoginResponse) => {
        if (response.credential) {
            // Guardar el token en las cookies
            document.cookie = `token=${response.credential}; path=/; max-age=${60 * 60 * 24 * 7}`; // La cookie expira en 7 días

            // Decodificar el token y obtener los datos del usuario
            try {
                const decoded: DecodedToken = jwtDecode(response.credential);
                setCurrentUser({
                    name: decoded.name || "Usuario",
                    email: decoded.email || "Sin email",
                    role: decoded.role || "user",
                    avatarUrl: decoded.picture || "https://api.dicebear.com/9.x/pixel-art/svg",
                });
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }

            // Redirigir a la página de inicio
            navigate('/');
        }
    };

    const handleLoginFailure = (response) => {
        console.log("Error de autenticación", response);
    };

    return (
        <GoogleOAuthProvider clientId={clienteID}>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                useOneTap
                shape="pill"
                theme="filled_blue"
                logo_alignment="center"
            />
        </GoogleOAuthProvider>
    );
}
