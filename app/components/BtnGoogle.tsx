import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "@remix-run/react";

type UserData = {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

export default function BtnGoogle() {
  // Hook de navegación de Remix
  const navigate = useNavigate();
  // Estado para almacenar los datos del usuario
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // ID de cliente OAuth de Google
  const clienteID =
    "97095162816-lu3019h98mm3s5pmkpaujhlfd5nb606c.apps.googleusercontent.com";

  // Interfaces para tipar las respuestas de Google
  interface GoogleLoginResponse {
    credential: string;
  }

  interface DecodedToken {
    name?: string;
    email?: string;
    role?: string;
    picture?: string;
  }

  // Manejador para login exitoso
  const handleLoginSuccess = (response: GoogleLoginResponse) => {
    if (response.credential) {
      // Guardar el token en las cookies (lado cliente) por 7 días
      document.cookie = `token=${response.credential}; path=/; max-age=${60 * 60 * 24 * 7}`;

      try {
        // Decodificar el token JWT para obtener la información del usuario
        const decoded: DecodedToken = jwtDecode(response.credential);
        setCurrentUser({
          name: decoded.name || "Usuario",
          email: decoded.email || "Sin email",
          role: decoded.role || "user",
          avatarUrl:
            decoded.picture || "https://api.dicebear.com/9.x/pixel-art/svg",
        });
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }

      // Redirige usando Remix
      navigate("/dashboard");
    }
  };

  // Manejador para errores de login
  const handleLoginFailure = (response: unknown) => {
    console.error("Error de autenticación", response);
  };

  // Componente personalizado para crear nuestro propio botón de Google
  const CustomGoogleButton = () => {
    return (
      <button 
        type="button"
        onClick={() => {
          // Buscar y activar el botón real de Google
          const googleButton = document.querySelector('[aria-labelledby="button-label"]');
          if (googleButton) {
            (googleButton as HTMLElement).click();
          }
        }}
        className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-full shadow-md bg-white hover:bg-gray-50 transition duration-300 text-gray-700 font-medium text-base"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        <span>Iniciar sesión con Google</span>
      </button>
    );
  };

  return (
    <GoogleOAuthProvider clientId={clienteID}>
      <div className="w-full relative">
        {/* Botón personalizado visible */}
        <CustomGoogleButton />
        
        {/* Botón real de Google oculto pero funcional */}
        <div className="absolute opacity-0 pointer-events-none" style={{ top: '-1000px' }}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
            type="standard"
            theme="outline"
            shape="pill"
            size="medium"
            text="signin_with"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}