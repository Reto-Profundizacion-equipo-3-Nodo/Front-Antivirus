// Archivo: utils/session.server.js
import { createCookieSessionStorage } from "@remix-run/node";

// Configuración del almacenamiento de sesiones
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "app_session",
    // normalmente usarías variables de entorno para estos valores
    secrets: ["s3cr3t0-d3-l4-4pl1c4c10n"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

// Obtener sesión desde la cookie
export async function getSession(cookie) {
  return sessionStorage.getSession(cookie);
}

// Guardar la sesión y obtener la cookie
export async function commitSession(session, options) {
  return sessionStorage.commitSession(session, options);
}

// Destruir la sesión
export async function destroySession(session) {
  return sessionStorage.destroySession(session);
}

// Función para verificar token JWT
export async function verifyAuthToken(token) {
  if (!token) return false;
  
  try {
    // Aquí implementarías la lógica para verificar tu token JWT
    // Por ejemplo, usando una biblioteca como jsonwebtoken
    
    // Ejemplo (pseudocódigo):
    // const decoded = jwt.verify(token, "tu-secreto-jwt");
    // return decoded;
    
    // Para este ejemplo, simplemente retornamos true
    return true;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return false;
  }
}