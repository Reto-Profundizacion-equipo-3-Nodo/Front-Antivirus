// Archivo: routes/forgot-password.server.tsx
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node"; // o "@remix-run/server-runtime"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  
  if (!email) {
    return json({ error: "El correo electrónico es obligatorio" }, { status: 400 });
  }
  
  try {
    // Aquí implementarías la lógica para enviar el correo de recuperación
    // Por ejemplo, hacer una solicitud a tu API
    const response = await fetch("tu-api-backend/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return json({ error: data.message || "Error al enviar el correo" }, { status: 400 });
    }
    
    return json({ success: true });
  } catch (error) {
    console.error("Error al solicitar recuperación de contraseña:", error);
    return json({ error: "Error al conectar con el servidor" }, { status: 500 });
  }
}