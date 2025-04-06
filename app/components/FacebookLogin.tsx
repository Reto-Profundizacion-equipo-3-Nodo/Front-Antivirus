// app/components/FacebookLogin.tsx

// Declaramos en el scope global de TypeScript que existen estas propiedades en el objeto window
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

// Importamos React hooks y herramientas de navegación de Remix
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { FaFacebookF } from "react-icons/fa"; // Icono oficial de Facebook

// Componente principal de login con Facebook
const FacebookLogin = () => {
  const navigate = useNavigate(); // Hook de Remix para redirecciones

  // useEffect para cargar e inicializar el SDK de Facebook solo una vez al montar el componente
  useEffect(() => {
    // Esta función se ejecuta cuando el SDK ha sido cargado
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1700586723895959", // Tu App ID de Facebook
        cookie: true,             // Permite el uso de cookies para mantener sesión
        xfbml: false,             // No usamos etiquetas XFBML
        version: "v19.0",         // Versión actual del API de Facebook
      });
    };

    // Cargar el script del SDK de Facebook dinámicamente
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return; // Evitar duplicar el script

      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Función que maneja el login con Facebook cuando se hace clic en el botón
  const handleFacebookLogin = () => {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          // Solicitamos al API de Facebook los datos del usuario logueado
          window.FB.api("/me", { fields: "name" }, function (userInfo: any) {
            console.log("✅ Usuario:", userInfo);

            // Guardamos token y nombre en cookies por 7 días
            document.cookie = `fb_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `fb_name=${userInfo.name}; path=/; max-age=${60 * 60 * 24 * 7}`;

            // Redireccionamos al dashboard luego del login exitoso
            navigate("/dashboard");
          });
        } else {
          console.log("❌ Usuario canceló el login o no autorizó.");
        }
      },
      { scope: "public_profile" } // Permisos solicitados a Facebook
    );
  };

  return (
    // Botón estilizado con Tailwind, color azul de Facebook, icono blanco
    <button
      type="button"
      onClick={handleFacebookLogin}
      className="flex items-center justify-center gap-4 w-full px-6 py-3 mt-4 rounded-full shadow-md bg-[#1877F2] hover:bg-[#166fe5] transition duration-300 text-white font-semibold text-base"
    >
      <FaFacebookF className="text-2xl" />
      <span>Iniciar sesión con Facebook</span>  {/* Texto del botón */}
    </button>
  );
};

export default FacebookLogin;
