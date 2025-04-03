// Este archivo debe estar en la misma carpeta que el componente: login.server.jsx o dentro del mismo archivo

import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/session.server";

// Función loader para verificar si el usuario ya está autenticado
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  
  // Si ya hay un token, redirigir al dashboard
  if (session.has("token")) {
    return redirect("/dashboard");
  }
  
  return json({});
}

// Función action para manejar la autenticación
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") === "on";
  
  try {
    // Aquí debes hacer la llamada a tu API de autenticación
    const response = await fetch("tu-api-backend/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return json({ error: data.message || "Error al iniciar sesión" }, { status: 400 });
    }
    
    // Obtener token y datos del usuario de la respuesta
    const { token, user } = data;
    
    // Crear una sesión y almacenar el token
    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);
    session.set("userName", user.name);
    
    // Determinar la duración de la sesión según rememberMe
    const cookieOptions = {
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 días o sesión
    };
    
    // Retorna el token y el nombre del usuario para manejo en el cliente
    return json(
      { 
        token, 
        userName: user.name,
        success: true 
      },
      { 
        headers: { 
          "Set-Cookie": await commitSession(session, cookieOptions) 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error during login:", error);
    return json({ error: "Error al conectar con el servidor" }, { status: 500 });
  }
}