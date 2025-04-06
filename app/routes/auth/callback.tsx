// app/routes/auth/callback.tsx
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

// Cookie personalizada para guardar el token en el navegador
export const authToken = createCookie("authToken", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 semana
});

// Loader para capturar la cookie que nos dejó el backend
export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    (cookieHeader || "")
      .split(";")
      .map((pair) => pair.trim().split("="))
      .filter(([key]) => key && key.length)
  );

  const token = cookies["authToken"] || cookies["token"];

  if (!token) {
    // No hay token, lo redirigimos al login
    return redirect("/login");
  }

  // Creamos una cookie para mantener la sesión activa
  const cookie = await authToken.serialize(token);

  // Redirigimos al dashboard con la cookie guardada
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

export default function Callback() {
  return <p>Redirigiendo...</p>;
}
