// app/routes/privacy-policy.tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Política de Privacidad | FundaciónAntivirus" }];
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-4">
        Esta política describe cómo recopilamos, usamos y protegemos la información personal de nuestros usuarios.
      </p>
      <p className="mb-4">
        No compartimos tu información personal con terceros sin tu consentimiento. Puedes solicitar la eliminación de tus datos escribiéndonos a contacto@fundacionantivirus.org.
      </p>
      <p>
        Última actualización: Abril 2025.
      </p>
    </main>
  );
}
