// Archivo: routes/dashboard.server.tsx
import { json, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

// Define la interfaz para el loader
interface LoaderArgs {
  request: Request;
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  // Verificar autenticación
  if (!session.has("token")) {
    return redirect("/login");
  }
  
  // Obtener datos del usuario para enviar al cliente
  return json({
    userName: session.get("userName"),
  });
}