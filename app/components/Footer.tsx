import { Link } from "@remix-run/react";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
// ... (otros imports se mantienen igual)

export default function Footer() {
  return (
    <footer className="relative bg-white px-3 py-1 md:px-8 lg:px-16 border-t border-gray-200">
      {/* Línea superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bb94e7] to-[#341747]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 items-center">
        {/* Logo / Sello */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2 w-full max-w-[500px] mt-[30px]">
            <h3 className="font-bold font-reddit text-base text-[#292525] whitespace-nowrap">
              Suscríbete a nuestro Blog
            </h3>

            <div className="flex-1 flex items-center overflow-hidden relative">
              <input
                type="email"
                placeholder="Ingresa tu email"
                className="w-full h-[32px] px-4 py-2 outline-none bg-transparent text-gray-700 text-base border border-gray-300 bg-[#DCEBF9] rounded-l-md"
              />
              <button className="bg-indigo-500 text-gray-900 px-5 py-2 font-semibold hover:bg-indigo-600 h-[32px] whitespace-nowrap text-sm transition-colors rounded-r-md">
                SUSCRIBIRSE
              </button>
            </div>
          </div>

          <img
            src="/Images/SelloNodo.png"
            alt="Fundación Antivirus"
            className="w-24 md:w-28 lg:w-32 mt-2"
          />
          <p className="font-light font-reddit mb-0 text-center md:text-base pt-0 text-md text-[#292525]">
            FUNDACIÓN ANTIVIRUS © 2024 - Todos los Derechos Reservados
          </p>
        </div>

        {/* Contenido (Contacto, Redes) */}
        <div className="flex flex-col space-y-3 text-center lg:text-left align-center">
          {/* Contacto */}
          <div>
            <p className="font-bold font-reddit md:text-lg text-[#292525] mb-0 text-center text-xl pb-1 pt-0">
              ¿Quieres saber más de nosotros?
            </p>
            <p className="font-light font-reddit mb-0 text-center md:text-base pt-0 text-md text-[#292525]">
              Contáctanos hoy mismo.
            </p>
          </div>

          {/* Banco de Oportunidades y Redes Sociales */}
          <div className="flex flex-col align-center text-center">
            <div className="flex justify-center space-x-3 w-full">
              <a
                href="https://www.instagram.com/somosantivirus/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
              >
                <Instagram size={28} />
              </a>

              <a
                href="https://api.whatsapp.com/send/?phone=573217066273&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
              >
                <img
                  src="public/images/whatsapp.png"
                  alt="WhatsApp"
                  className="w-7 h-7"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/antivirus-desercion"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
              >
                <Linkedin size={28} />
              </a>

              <a
                href="https://www.facebook.com/p/Fundaci%C3%B3n-Antivirus-para-la-Deserci%C3%B3n-100089714876149/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
              >
                <Facebook size={28} />
              </a>

              <a
                href="https://www.youtube.com/channel/UCCDsmMeIqSWGk_fh1m9FX0w"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
              >
                <Youtube size={28} />
              </a>
            </div>
            <div className="mt-2">
              <p className="font-light font-reddit mb-0 text-center md:text-base pt-0 text-md text-[#292525]">
                Banco de Oportunidades
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
