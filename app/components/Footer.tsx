import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-6 min-h-[200px] relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bb94e7] to-[#341747]"></div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 h-full">
        {/* Logo */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center mb-4 md:mb-0">
          <img
            src="public/images/logo.png"
            alt="Logo"
            className="h-40 w-auto object-contain transform hover:scale-105 transition-transform"
          />
        </div>

        {/* opciones*/}
        <div className="w-full md:w-1/2 flex flex-col items-center font-impact">
          <div className="text-center mb-4">
            <p className="text-lg md:text-xl">
              ¿Quieres saber más de nosotros?
            </p>
            <p className="mb-4 md:mb-6 text-sm md:text-base">
              Contáctanos hoy mismo.
            </p>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a
              href="https://www.instagram.com/somosantivirus"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 hover:bg-[#FFBA08]"
            >
              <Instagram size={32} />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=573173831481&text=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 hover:bg-[#FFBA08]"
            >
              <img
                src="public/images/whatsapp.png"
                alt="WhatsApp"
                className="w-8 h-8"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/antivirus-desercion/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 hover:bg-[#FFBA08]"
            >
              <Linkedin size={32} />
            </a>

            <a
              href="https://www.facebook.com/p/Fundaci%C3%B3n-Antivirus-para-la-Deserci%C3%B3n-100089714876149/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 hover:bg-[#FFBA08]"
            >
              <Facebook size={32} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCCDsmMeIqSWGk_fh1m9FX0w"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 hover:bg-[#FFBA08]"
            >
              <Youtube size={32} />
            </a>
          </div>

          <div className="text-center">
            <p className="text-sm md:text-base">Banco de Oportunidades</p>
            <p className="text-sm md:text-base">
              FUNDACIÓN ANTIVIRUS © 2025 - Todos los Derechos Reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
