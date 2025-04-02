import { useState } from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Loader para cargar datos iniciales (opcional)
export const loader: LoaderFunction = async () => {
  return json({ users: [
    { id: 1, name: "Juan Pérez", email: "juan@example.com" },
    { id: 2, name: "Ana Gómez", email: "ana@example.com" },
  ]});
};

const tabs = [
  { name: "Usuarios", key: "usuarios" },
  { name: "Configuración", key: "configuracion" },
];

export default function AdminProfile() {
  const data = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState("usuarios");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-3 font-medium ${
                activeTab === tab.key ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === "usuarios" && <UsuariosTab users={data.users} />}
          {activeTab === "configuracion" && <p>Configuraciones del sistema</p>}
        </div>
      </div>
    </div>
  );
}

function UsuariosTab({ users }: { users: { id: number, name: string, email: string }[] }) {
  return (
    <div>
      <button className="mb-4 p-2 bg-blue-500 text-white rounded">Agregar Usuario</button>
      <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 text-center">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 flex space-x-2">
                <button className="p-1 bg-yellow-500 text-white rounded">Editar</button>
                <button className="p-1 bg-red-500 text-white rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}