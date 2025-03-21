import { Form } from "@remix-run/react";
import { EyeIcon } from "lucide-react";

export default function Register() {
  const formFields = [
    { id: "nombre", label: "Nombre", placeholder: "Nombre" },
    { id: "apellido", label: "Apellido", placeholder: "Apellido" },
    { id: "nacimiento", label: "Día de nacimiento", placeholder: "DD/MM/AAAA" },
    { id: "email", label: "Email", placeholder: "example@gmail.com" },
    {
      id: "password",
      label: "Contraseña",
      placeholder: "***********",
      showEye: true,
    },
    {
      id: "confirmPassword",
      label: "Confirma tu contraseña",
      placeholder: "***********",
      showEye: true,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white">
      {/* Sección de Registro */}
      <div className="w-full bg-[#32526e] text-white flex items-center px-6 py-4 md:p-9">
        <div className="flex-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            REGISTRATE
          </h1>
        </div>
        <img className="w-32 md:w-52 object-cover" alt="Logo" src="/logo.png" />
      </div>

      {/* Sección de Bienvenida */}
      <section className="max-w-[987px] mx-auto mt-16 mb-24">
        <h2 className="text-center mb-12 text-4xl font-medium text-[#2e2e2e]">
          ¿Preparado para encontrar tu próxima{" "}
          <span className="font-black text-[#00266b] text-[46px]">
            oportunidad?
          </span>
        </h2>

        <div className="max-w-[766px] mx-auto space-y-5">
          {/* Botón de Google */}
          <button className="flex items-center justify-center w-full bg-white border border-gray-300 shadow-md rounded-md px-4 py-2 text-gray-700 font-medium hover:shadow-lg transition">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="ml-3 text-sm md:text-base">
              Ingresa con Google
            </span>
          </button>

          {/* Botón de Facebook */}
          <button className="flex items-center justify-center w-full bg-white border border-gray-300 shadow-md rounded-md px-4 py-2 text-gray-700 font-medium hover:shadow-lg transition">
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
              ></path>
              <path
                fill="#3f51b5"
                d="M34.368,25H31v17h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287	C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
              ></path>
            </svg>
            <span className="ml-3 text-sm md:text-base">
              Ingresa con Facebook
            </span>
          </button>

          {/* Separador */}
          <div className="flex items-center justify-center my-6">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-4 text-gray-500">O</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          {/* Campos del formulario */}
          <Form method="post" className="space-y-5">
            {formFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center bg-[#ebebeb] rounded-lg px-4 py-3"
              >
                <div className="flex-1">
                  <label className="block text-xs text-black">
                    {field.label}
                  </label>
                  <input
                    type={field.id.includes("password") ? "password" : "text"}
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-black font-bold text-base outline-none"
                  />
                </div>
                {field.showEye && (
                  <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                )}
              </div>
            ))}

            {/* Botón de Envío */}
            <button
              type="submit"
              className="w-full bg-[#faa307] text-white text-[25px] font-black py-4 rounded-lg"
            >
              Crear Cuenta
            </button>
          </Form>
        </div>
      </section>
      {/* Seccion de información */}
      <section className="flex flex-col md:flex-row bg-white p-6 mt-6 rounded-lg shadow-md">
        {/* Contenido */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Registro y creación del perfil personal
          </h2>
          <p className="text-gray-600 mb-4">
            In order for us at daCode to know that we are a good fit for your
            project, we always start with screening questions in order to make
            sure that we are a suitable match for your company.
          </p>
          <p className="text-gray-600 mb-6">
            This meeting will be a meeting where we together go over our
            proposed strategy on how we can reach your website goals. Here we
            will establish a project update system where you will be able to
            follow the whole process from start to finish.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Guardar oportunidades
          </h2>
          <p className="text-gray-600 mb-4">
            In this step we will have a team meeting with the project manager
            and the lead developer and designer. Then we will be working using
            an agile and scrum framework in order to make sure to deliver your
            project on time and within budget.
          </p>
          <p className="text-gray-600">
            The final checks of the website will happen, we will make sure that
            all tracking pixels, links and user interface is compatible with all
            different devices. We will also perform a few different tests to
            make sure that the website is optimized for user experience.
          </p>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 w-full flex justify-center mt-6 md:mt-0">
          <img
            src="/registerImg.png"
            alt="logo"
            className="w-full max-w-lg rounded-lg shadow"
          />
        </div>
      </section>
    </div>
  );
}
