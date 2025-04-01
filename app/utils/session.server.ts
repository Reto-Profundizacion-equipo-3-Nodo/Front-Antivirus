import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Usar una variable de entorno para el secreto, con fallback para desarrollo
const sessionSecret = process.env.SESSION_SECRET || "aA89%-76~whI<:5";

// Configuración del almacenamiento de sesión
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    secrets: [sessionSecret],
  },
});

/**
 * Obtiene la sesión actual desde la request
 * 
 * @param request Request de la solicitud actual
 * @returns Objeto de sesión
 */
export async function getSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return sessionStorage.getSession(cookieHeader);
}

/**
 * Crea una sesión de usuario y establece cookies necesarias
 * 
 * @param options Opciones para crear la sesión
 * @param options.request Request original
 * @param options.user Datos del usuario a guardar en sesión
 * @param options.redirectTo Ruta a la que redirigir después de crear la sesión
 * @param options.token Token JWT para autenticación con API
 * @returns Respuesta de redirección con cookies
 */
export async function createUserSession({ 
  request, 
  user, 
  redirectTo, 
  token 
}: {
  request: Request, 
  user: any, 
  redirectTo: string,
  token?: string
}) {
  // Obtener o crear una nueva sesión
  const session = await getSession(request);
  
  // Guardar datos del usuario en la sesión
  session.set("user", user);

  // Determinar la URL de redirección (permitir override desde query param)
  let finalRedirect = redirectTo;
  const url = new URL(request.url);
  const urlRedirect = url.searchParams.get("redirectTo");
  if (urlRedirect) {
    finalRedirect = urlRedirect;
  }

  // Crear respuesta de redirección con cookie de sesión
  const headers = new Headers();
  headers.append(
    "Set-Cookie", 
    await sessionStorage.commitSession(session)
  );

  // Si hay token, añadir cookie adicional para el token JWT
  if (token) {
    headers.append(
      "Set-Cookie", 
      `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
    );
  }

  return redirect(finalRedirect, { headers });
}

/**
 * Cierra la sesión del usuario eliminando todas las cookies relacionadas
 * 
 * @param request Request de la solicitud actual
 * @param redirectTo Ruta a la que redirigir después de cerrar sesión
 * @returns Respuesta de redirección sin cookies de sesión
 */
export async function logout(request: Request, redirectTo: string = "/login") {
  // Intentar cerrar sesión en el backend
  try {
    await import("../services/authService").then(({ logout }) => logout());
  } catch (error) {
    console.error("❌ Error al cerrar sesión en el backend:", error);
  }

  // Obtener la sesión actual
  const session = await getSession(request);
  
  // Preparar headers para eliminar todas las cookies
  const headers = new Headers();
  
  // Eliminar cookie de sesión
  headers.append(
    "Set-Cookie", 
    await sessionStorage.destroySession(session)
  );
  
  // Eliminar cookie de token
  headers.append(
    "Set-Cookie", 
    "token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );

  return redirect(redirectTo, { headers });
}

/**
 * Verifica si hay una sesión activa sin redirigir
 * 
 * @param request Request de la solicitud actual
 * @returns Boolean indicando si hay sesión activa
 */
export async function isAuthenticated(request: Request) {
  const session = await getSession(request);
  return session.has("user");
}