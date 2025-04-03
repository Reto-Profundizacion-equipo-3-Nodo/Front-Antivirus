// Archivo: routes/auth/google.jsx
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/session.server";

export async function action({ request }) {
  try {
    // Aquí implementarías la lógica para iniciar la autenticación con Google
    // Normalmente redirige al usuario a la URL de OAuth de Google
    
    // Para fines de ejemplo, supongamos que ya obtuvimos los datos
    // En un caso real, este sería un proceso de redirección OAuth completo
    
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const clientId = "TU_CLIENT_ID_DE_GOOGLE";
    const redirectUri = "https://tu-sitio.com/auth/google/callback";
    const scope = "email profile";
    
    const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    return redirect(authUrl);
  } catch (error) {
    console.error("Error al iniciar autenticación con Google:", error);
    return redirect("/login?error=google_auth_failed");
  }
}