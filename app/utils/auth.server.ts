import { redirect } from "@remix-run/node";
import { getSession } from "./session.server";
import { verifyToken } from "../services/authService";

/**
 * Middleware que verifica si el usuario está autenticado
 * Si no lo está, redirige al login
 * 
 * @param request Request de la solicitud actual
 * @param redirectTo Ruta a la que redirigir si no hay autenticación (default: /login)
 * @returns Datos del usuario si está autenticado
 */
export async function requireAuth(request: Request, redirectTo: string = "/login") {
  // Obtener la sesión actual
  const session = await getSession(request);
  const user = session.get("user");

  // Verificar también el token JWT si lo usas para API
  const isValidToken = await verifyToken(request);

  // Si no hay usuario o el token no es válido, redirigir al login
  if (!user || !isValidToken) {
    // Guardar la URL actual para redirigir después del login
    const url = new URL(request.url);
    const params = new URLSearchParams([["redirectTo", url.pathname]]);
    throw redirect(`/login?${params}`);
  }

  return user;
}

/**
 * Verifica si el usuario tiene un rol específico
 * 
 * @param request Request de la solicitud actual
 * @param requiredRole Rol requerido para acceder
 * @param redirectTo Ruta a la que redirigir si no tiene el rol adecuado (default: /)
 * @returns Datos del usuario si tiene el rol correcto
 */
export async function requireRole(
  request: Request, 
  requiredRole: string, 
  redirectTo: string = "/"
) {
  // Primero verificar que esté autenticado
  const user = await requireAuth(request);
  
  // Verificar si tiene el rol requerido
  if (user.role !== requiredRole) {
    throw redirect(redirectTo);
  }
  
  return user;
}

/**
 * Verifica si hay un usuario autenticado, pero no redirige si no lo hay
 * Útil para componentes que cambian basados en el estado de autenticación
 * 
 * @param request Request de la solicitud actual
 * @returns Datos del usuario o null si no está autenticado
 */
export async function getAuthUser(request: Request) {
  const session = await getSession(request);
  return session.get("user") || null;
}