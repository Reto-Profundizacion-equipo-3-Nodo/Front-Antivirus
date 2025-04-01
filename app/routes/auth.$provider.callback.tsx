import { LoaderFunction, redirect } from "@remix-run/node";
import { processOAuthCallback } from "~/services/authService";
import { createUserSession } from "~/utils/session.server";

/**
 * Maneja los callbacks de autenticación OAuth (Google/Facebook)
 * Esta ruta recibe el código de autorización y lo intercambia por un token
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  // Obtener el proveedor OAuth desde los parámetros de la ruta
  const provider = params.provider; // google o facebook
  
  // Obtener el código de autorización del query string
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  
  // Verificar si hay errores en la respuesta OAuth
  if (error) {
    console.error(`❌ Error en OAuth callback: ${error}`);
    return redirect(`/login?error=${encodeURIComponent("Error de autenticación con proveedor externo")}`);
  }
  
  // Verificar que tenemos el código y el proveedor
  if (!code || !provider) {
    console.error("❌ Falta código o proveedor en el callback OAuth");
    return redirect("/login?error=missing_params");
  }
  
  try {
    // Validar que el proveedor sea uno de los soportados
    if (provider !== "google" && provider !== "facebook") {
      throw new Error(`Proveedor OAuth no soportado: ${provider}`);
    }
    
    // Intercambiar el código por un token usando nuestro servicio
    const authResponse = await processOAuthCallback(provider, code);
    
    if (!authResponse.token) {
      throw new Error("No se recibió token del proveedor OAuth");
    }
    
    // Construir objeto de usuario a partir de la respuesta
    // Ajustar esto según lo que devuelva tu API
    const user = authResponse.user || {
      id: "oauth-user",
      email: `user@${provider}.com`, // Este valor debería venir de tu backend
      role: "user"
    };
    
    // Crear sesión y redirigir al dashboard
    return createUserSession({
      request,
      user,
      redirectTo: "/dashboard",
      token: authResponse.token,
    });
  } catch (error) {
    console.error("❌ Error procesando callback OAuth:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Error de autenticación";
    
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }
};

/**
 * No necesitamos un componente porque esta ruta solo maneja la redirección
 */
export default function AuthCallback() {
  return <div>Procesando autenticación...</div>;
}