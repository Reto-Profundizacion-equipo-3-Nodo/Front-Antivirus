import { useLoaderData } from "@remix-run/react";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // Obtener la sesión completa desde el request
  const session = await getSession(request);

  // Extraer el usuario de la sesión
  const user = session.get("user") as { name: string } | null;

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return redirect("/login");
  }

  // Retornar los datos del usuario en formato JSON
  return json({ user });
};

export default function Dashboard() {
  // Obtener los datos del usuario desde el loader
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenido, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Este es tu dashboard personal.</p>
      </div>
    </div>
  );
}
