import { useEffect, useState } from "react";
import { getUsers, updateUser } from "~/services/authService";

export default function AdminProfile() {
  const [view, setView] = useState("admin");
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const adminData = {
    name: "Administrador",
    email: "admin@example.com",
    celular: "1234567890",
    fechaNacimiento: "1985-04-02",
    rol: "Super Admin",
  };

  useEffect(() => {
    if (view === "users") {
      fetchData();
    }
  }, [view]);

  const fetchData = async () => {
    const result = await getUsers();
    if (result.length > 0) {
      setUsers(result);
    }
  };

  const getButtonClasses = (buttonName: string) => {
    return `px-4 py-2 rounded border ${
      view === buttonName
        ? "bg-[#06407A] text-white"
        : "bg-[#06407A]/30  text-black"
    }`;
  };

  const openEditModal = (userId: number) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (!userToEdit) return;
    setSelectedUser(userToEdit);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const saveUserChanges = async() => {
    const result = await updateUser(selectedUser.id, selectedUser);
    console.log(result);
  };

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

  console.log(selectedUser)

  return (
    <div className="min-h-screen p-6  text-[#222D56] font-[Renograre Regular]">
      <h1 className="text-3xl text-center mb-6 font-[Impact]">
        Bienvenido, {adminData.name}
      </h1>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedUser?.name || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={selectedUser?.email || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="celular"
                >
                  Celular
                </label>
                <input
                  type="text"
                  id="celular"
                  name="celular"
                  value={selectedUser?.celular || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="rol">
                  Rol
                </label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={selectedUser?.rol || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="rol">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={
                    selectedUser?.fechaNacimiento
                      ? selectedUser.fechaNacimiento.split("T")[0]
                      : ""
                  }
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-2 bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={saveUserChanges}
                  className="bg-[#06407A] text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
              {users.map((user) => (
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
                    <button
                      className="mr-2 bg-[#FFBA08] text-black px-2 py-1 rounded"
                      onClick={() => openEditModal(user.id)}
                    >
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
