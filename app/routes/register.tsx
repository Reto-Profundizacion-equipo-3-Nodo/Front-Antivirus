import Navbar from "~/components/Navbar";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FormRegister from "~/components/FormRegister";

interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

export default function Register() {


  //Auth con Google
  const clienteID =
    "97095162816-lu3019h98mm3s5pmkpaujhlfd5nb606c.apps.googleusercontent.com";



  const steps: TimelineStep[] = [
    {
      number: "1",
      title: "Registro y creación del perfil personal",
      description:
        "In order for us at daCode to know that we are a good fit for your project we always start with screening questions in order to make sure that we are a suitable match for your company.",
    },
    {
      number: "2",
      title: "Recomendaciones personalizadas",
      description:
        "This meeting will be a meeting where we together go over our proposed strategy on how we can reach your website goals. Here we will establish a project update system where you will be able to follow the whole process from start to finish.",
    },
    {
      number: "3",
      title: "Guardar oportunidades",
      description:
        "In this step we will have a team meeting with the project manager and the lead developer and designer. Then we will be working using and agile and scrum framework in order to make sure to deliver your project on time and within budget.",
    },
    {
      number: "4",
      title: "Contenido exclusivo",
      description:
        "The final checks of the website will happen, we will make sure that all tracking pixels, links and user interface is compatible with all different devices. We will also perform a few different tests to make sure that the website is optimised for user experience.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-white">
        {/* Sección de Registro */}
        <div className="w-full bg-[url('/Images/registerBg.png')] bg-cover bg-center text-white flex items-center px-6 py-4 md:p-9">
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              REGISTRATE
            </h1>
          </div>
          <img
            className="w-32 md:w-52 object-cover"
            alt="Logo"
            src="Images/logo.png"
          />
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
            <GoogleOAuthProvider clientId={clienteID}>
              <GoogleLogin
                onSuccess={(response) => console.log(response)}
                onFailure={(response) => console.log(response)}
                useOneTap
                shape="pill"
                theme="outline"
              />
            </GoogleOAuthProvider>

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


            {/* Formulario de registro */}
            <FormRegister />
          </div>
        </section>
        {/* Seccion de información */}
        <section className="flex flex-col md:flex-row bg-white p-6 mt-6 rounded-lg shadow-md">
          {/* Contenido */}
          <div className="from-blue-50 to-gray-100 py-16 md:py-0 px-4 sm:px-6 lg:px-8 md:w-1/2">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative pb-12 last:pb-0">
                    {/* Vertical line */}
                    {index !== steps.length - 1 && (
                      <div className="absolute left-8 top-14 bottom-0 w-0.5 bg-blue-200"></div>
                    )}

                    <div className="relative flex items-start group">
                      {/* Number circle */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-blue-500 z-10">
                        <span className="text-2xl font-bold text-blue-600">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="ml-6 pt-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {step.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 w-full flex justify-center mt-0 md:mt-52">
            <div className="w-full max-w-lg ">
              <img
                src="/registerImg.png"
                alt="registerImg"
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
