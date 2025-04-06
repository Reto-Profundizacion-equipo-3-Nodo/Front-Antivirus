// app/routes/delete-data.tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Eliminación de Datos | FundaciónAntivirus" }];
};

export default function DeleteData() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Eliminación de Datos</h1>
      <p className="mb-4">
        Para solicitar la eliminación de tus datos personales de nuestra base de datos, envíanos un correo a:
      </p>
      <p className="font-semibold">
        contacto@fundacionantivirus.org
      </p>
      <p className="mt-4">
        Procesaremos tu solicitud en un plazo máximo de 7 días hábiles.
      </p>
    </main>
  );
}
