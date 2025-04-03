import { useState } from "react";

export default function AdminProfile() {
  const [view, setView] = useState("admin");

  const adminData = {
    name: "Administrador",
    email: "admin@example.com",
    celular: "1234567890",
    fechaNacimiento: "1985-04-02",
    rol: "Super Admin",
  };

  const getButtonClasses = (buttonName: string) => {
    return `px-4 py-2 rounded border ${view === buttonName ? "bg-[#06407A] text-white" : "bg-[#06407A]/30  text-black"}`;
  };

  const usersData = [
    {
      id: 1,
      name: "Carlos Perez",
      email: "carlos.perez@example.com",
      celular: "987654321",
      fechaNacimiento: "1990-05-10",
      rol: "user",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      celular: "123123123",
      fechaNacimiento: "1995-08-21",
      rol: "admin",
    },
    {
      id: 3,
      name: "Juan Lopez",
      email: "juan.lopez@example.com",
      celular: "456789123",
      fechaNacimiento: "1988-12-15",
      rol: "user",
    },
  ];

  const opportunitiesData = [
    {
      id: 1,
      name: "Beca de Desarrollo Web",
      observation: "Dirigido a estudiantes de ingeniería",
      type: "Beca",
      description: "Curso intensivo de desarrollo web",
      requires: "Conocimientos básicos de HTML y CSS",
      guide: "Guía para aplicar",
      additionalDates: "Incluye material de estudio",
      serviceChannels: "Online y presencial",
      manager: "Juan Perez",
      modality: "Presencial",
      categoryId: 1,
      institutionId: 1,
    },
    {
      id: 2,
      name: "Programa de Ciberseguridad",
      observation: "Orientado a profesionales",
      type: "Curso",
      description: "Formación en protección de sistemas",
      requires: "Experiencia en redes",
      guide: "Manual de inscripción",
      additionalDates: "Certificación incluida",
      serviceChannels: "Online",
      manager: "Ana Lopez",
      modality: "Online",
      categoryId: 2,
      institutionId: 2,
    },
  ];

  return (
    <div className="min-h-screen p-6  text-[#222D56] font-[Renograre Regular]">
      <h1 className="text-3xl text-center mb-6 font-[Impact]">
        Bienvenido, {adminData.name}
      </h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={getButtonClasses("admin")}
          onClick={() => setView("admin")}
        >
          Administrador
        </button>
        <button
          className={getButtonClasses("users")}
          onClick={() => setView("users")}
        >
          Usuarios
        </button>
        <button
          className={getButtonClasses("opportunities")}
          onClick={() => setView("opportunities")}
        >
          Oportunidades
        </button>
      </div>

      <div>
        {view === "admin" && (
          <div className="p-4 border rounded bg-white font-[Lucida Fax]">
            <p>
              <strong>Nombre:</strong> {adminData.name}
            </p>
            <p>
              <strong>Email:</strong> {adminData.email}
            </p>
            <p>
              <strong>Celular:</strong> {adminData.celular}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong> {adminData.fechaNacimiento}
            </p>
            <p>
              <strong>Rol:</strong> {adminData.rol}
            </p>
          </div>
        )}
        {view === "users" && (
          <table className="w-full mt-4 border-collapse border border-gray-300 font-[Lucida Fax]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Celular</th>
                <th className="border border-gray-300 px-4 py-2">Perfil</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.celular}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.rol}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="mr-2 bg-[#FFBA08] text-black px-2 py-1 rounded">
                      Editar
                    </button>
                    <button className="bg-[#D00000] text-white px-2 py-1 rounded">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {view === "opportunities" && (
          <table className="w-full mt-4 border-collapse border border-gray-300 font-[Lucida Fax]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Descripción
                </th>
                <th className="border border-gray-300 px-4 py-2">Requisitos</th>
                <th className="border border-gray-300 px-4 py-2">Modalidad</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {opportunitiesData.map((opp) => (
                <tr key={opp.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {opp.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {opp.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {opp.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {opp.requires}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {opp.modality}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="mr-2 bg-[#FFBA08] text-black px-2 py-1 rounded">
                      Editar
                    </button>
                    <button className="bg-[#D00000] text-white px-2 py-1 rounded">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
