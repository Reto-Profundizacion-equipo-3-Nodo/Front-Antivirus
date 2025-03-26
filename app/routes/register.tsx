import Navbar from "~/components/Navbar";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FormRegister from "~/components/FormRegister";
import { useState } from "react";

interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

export default function Register() {
  const [isRocketFlying, setIsRocketFlying] = useState(false);

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

  const handleRocketLaunch = () => {

    setIsRocketFlying(true);
    setTimeout(() => {
      setIsRocketFlying(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-white">
        {/* Card con Formulario y Login */}
        <section className="max-w-7xl mx-auto mt-16 mb-24 px-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Card para Titulo,Login(google) y Formulario */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3">
              <h2 className="text-center mb-12 text-4xl font-medium text-[#2e2e2e]">
                ¿Preparado para encontrar tu próxima{" "}
                <span className="font-black text-[#00266b] text-[46px]">oportunidad?</span>
              </h2>
              {/* Botón de Google */}
              <GoogleOAuthProvider clientId={clienteID}>
                <GoogleLogin
                  onSuccess={(response) => console.log(response)}
                  onFailure={(response) => console.log(response)}
                  useOneTap
                  shape="pill"
                  theme="filled_blue"
                  logo_alignment="center"
                />

              </GoogleOAuthProvider>

              {/* Separador */}
              <div className="flex items-center justify-center my-6">
                <hr className="w-1/3 border-gray-300" />
                <span className="mx-4 text-gray-500">O</span>
                <hr className="w-1/3 border-gray-300" />
              </div>

              {/* Título de formulario */}
              <div className="text-center text-lg font-semibold text-gray-700 mb-6">
                Completa los datos para crear tu cuenta
              </div>
              {/* Formulario de registro */}
              <FormRegister handleRocketLaunch={handleRocketLaunch} />
            </div>

            {/* Imagen del cohete */}
            <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div
                className={`md:block hidden transition-transform duration-[2500ms] ease-in-out ${isRocketFlying ? "transform translate-y-[-2000px]" : ""}`}
              >
                <img
                  src="/Images/Cohete.png"
                  alt="Cohete"
                  className="w-40 h-40 md:w-full md:h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de información */}
        <section className="flex flex-col md:flex-row bg-white p-6 mt-6 rounded-lg shadow-md">
          <div className="from-blue-50 to-gray-100 py-16 md:py-0 px-4 sm:px-6 lg:px-8 md:w-1/2">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative pb-12 last:pb-0">
                    {index !== steps.length - 1 && (
                      <div className="absolute left-8 top-14 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <div className="relative flex items-start group">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-blue-500 z-10">
                        <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                      </div>
                      <div className="ml-6 pt-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {step.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Imagen Footer*/}
          <div className="md:w-1/2 w-full flex justify-center mt-0 md:mt-52">
            <div className="w-full max-w-lg">
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
