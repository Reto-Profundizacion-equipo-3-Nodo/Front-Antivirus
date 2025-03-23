import { Link } from "@remix-run/react";
import { Mail, Phone, Instagram, Facebook, Linkedin, LinkedinIcon, Youtube } from "lucide-react";
import { AiOutlineTikTok } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { BsTiktok, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { PiTiktokLogo, PiYoutubeLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-12 md:px-16 lg:px-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Logo / Sello */}
        <div className="flex justify-center lg:justify-start flex-col">
          <h3 className="text-xl font-impact font-medium mb-4">
            Suscríbete a nuestro Blog
          </h3>
          <img
            src="/Images/SelloNodo.png"
            alt="Fundación Antivirus"
            className="w-44 md:w-52 lg:w-60"
          />
        </div>

        {/* Contenido (Suscripción, Contacto, Redes) */}
        <div className="flex flex-col space-y-10 text-center lg:text-left align-center">
          {/* Suscripción */}
          <div className=" flex justify-center">
            <div className="w-[400px] flex items-center max-w-md mx-auto lg:mx-0  overflow-hidden relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[70%] h-[48px] px-4 py-2 outline-none bg-transparent text-gray-700 rounded-l-md border-t border-b border-l border-gray-300 bg-[#DCEBF9] "
              />
              <button className="bg-indigo-500 text-[#32526E] px-5 py-2 font-semibold hover:bg-indigo-600 w-[30%]  h-[48px] absolute right-2 top-0 rounded-r-md rounded-l-md">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xl font-medium font-impact text-[32px] text-center pb-5">
              ¿Quieres saber más de nosotros?
            </p>
            <p className="font-medium font-impact mb-3 text-center text-[32px]">
              Contáctanos hoy mismo.
            </p>

            <div className="space-y-3 mt-8">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail className="w-6 h-6 text-black" />
                <div className="flex flex-col">
                  <strong className="text-black font-reddit">Por e-mail</strong>
                  <span className="text-black text-sm md:text-base font-reddit">
                    contactenos@fundacionantivirusparaladesercion.org
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="w-6 h-6  text-black" />
                <div className="flex flex-col">
                  <strong className="text-black font-reddit">Por whatsapp</strong>

                  <span className="text-gray-700 font-reddit text-sm md:text-base">
                    +57 3223667781
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banco de Oportunidades y Redes Sociales */}
          <div className="flex flex-col align-center text-center">
            <p className="font-semibold font-reddit text-lg text-center">
              Banco de Oportunidades
            </p>
            <div className="flex justify-center space-x-5 mt-3 w-full">
              <Link to="https://www.instagram.com/somosantivirus" aria-label="Instagram" target="_blank">
                <Instagram className="w-8 h-8 text-gray-700 hover:text-[#FAA307]"/>
              </Link>
              <Link to="https://api.whatsapp.com/send?phone=573173831481&text=phone_number&app_absent=0" aria-label="Whatsapp" target="_blank">
                <BsWhatsapp className="w-7 h-7 text-gray-700 hover:text-[#FAA307]" />
              </Link>
              <Link to="https://www.facebook.com/p/Fundaci%C3%B3n-Antivirus-para-la-Deserci%C3%B3n-100089714876149/" aria-label="Facebook" target="_blank">
                <Facebook className="w-8 h-8 text-gray-700 hover:text-[#FAA307]" />
              </Link>
              <Link to="//www.linkedin.com/company/antivirus-desercion/" aria-label="Whatsapp" target="_blank">
                <Linkedin className="w-8 h-8 text-gray-700 hover:text-[#FAA307]" />
              </Link>
              <Link to="https://www.tiktok.com/@somosantivirus" aria-label="Whatsapp" target="_blank">
                <PiTiktokLogo className="w-8 h-8 text-gray-700 hover:text-[#FAA307]" />
              </Link>
              <Link to="https://www.youtube.com/channel/UCCDsmMeIqSWGk_fh1m9FX0w" aria-label="Twitter" target="_blank">
                <Youtube className="w-8 h-8 text-gray-700 hover:text-[#FAA307]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
