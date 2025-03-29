import FormRegister from "~/components/register/FormRegister";
import FooterRegister from "~/components/register/FooterRegister";
import BtnGoogle from "~/utils/btnGoogle";

export default function Register() {

  return (
    <>
      <div className="relative flex flex-col items-center bg-[url('/Images/Background.webp')] bg-cover bg-no-repeat">
        {/* Capa de desenfoque */}
        <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm"></div>
        {/* Card con Formulario y Login */}
        <section className="max-w-7xl mx-auto px-6 z-10">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Card para Titulo,Login(google) y Formulario */}
            <div className="bg-white/30 backdrop-blur-md shadow-xl border border-white/20  p-6 w-full md:w-2/3">
              <h2 className="text-center mb-12 text-4xl font-medium text-[#2e2e2e]">
                ¿Preparado para encontrar tu próxima{" "}
                <span className="font-black text-[#00266b] text-[46px]">oportunidad?</span>
              </h2>
              {/* Botón de Google */}
              <BtnGoogle />

              {/* Separador */}
              <div className="flex items-center justify-center my-6">
                <hr className="w-1/3 border-gray-300" />
                <span className="mx-4 text-gray-500">O</span>
                <hr className="w-1/3 border-gray-300" />
              </div>

              {/* Título de formulario */}
              <div className="text-center text-xl font-bold text-[#32526E] mb-6">
                Completa los datos para crear tu cuenta
              </div>
              {/* Formulario de registro */}
              <FormRegister />
            </div>

            {/* Imagen del cohete */}
            <div className="w-full md:w-1/3 flex justify-center items-end mt-6 md:mt-0">
              <div
                className="md:block hidden "
              >
                <img
                  src="/Images/Cohete.png"
                  alt="Cohete"
                  className="w-40 h-40 md:w-full md:h-full object-contain pt-[41rem]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de información */}
        <FooterRegister />
      </div>
    </>
  );
}
