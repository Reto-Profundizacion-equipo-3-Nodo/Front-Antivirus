// import { Link } from "@remix-run/react";
// import {
//   Mail,
//   Phone,
//   Instagram,
//   Facebook,
//   Linkedin,
//   LinkedinIcon,
//   Youtube,
// } from "lucide-react";
// import { AiOutlineTikTok } from "react-icons/ai";
// import { BiLogoTiktok } from "react-icons/bi";
// import { BsTiktok, BsWhatsapp, BsYoutube } from "react-icons/bs";
// import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
// import { GrInstagram } from "react-icons/gr";
// import { PiTiktokLogo, PiYoutubeLogo } from "react-icons/pi";

// export default function Footer() {
//   return (
//     <footer className="relative bg-white px-3 py-3 md:px-16 lg:px-24 border-t border-gray-200">
//       {/* Línea superior */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bb94e7] to-[#341747]"></div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 py-4">
//         {/* Logo / Sello */}
//         <div className="flex flex-col items-center">
//           <h3 className="font-bold font-reddit md:text-1xl text-[#292525] mb-1 text-center md:text-1xl text-xl pb-3 pt-1 ">
//             Suscríbete a nuestro Blog
//           </h3>
//           {/* Suscripción */}
//           <div className="flex justify-center">
//             <div className="w-[400px] flex items-center max-w-md mx-auto overflow-hidden relative">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-[70%] h-[38px] px-4 py-2 outline-none bg-transparent text-gray-700 rounded-l-md border-t border-b border-l border-gray-300 bg-[#DCEBF9]"
//               />
//               <button className="bg-indigo-500 text-[#32526E] px-5 py-2 font-semibold hover:bg-indigo-600 w-[30%] h-[38px] absolute right-2 top-0 rounded-r-md">
//                 SUBSCRIBE
//               </button>
//             </div>
//           </div>
//           <img
//             src="/Images/SelloNodo.png"
//             alt="Fundación Antivirus"
//             className="w-44 md:w-52 lg:w-50 mt-4"
//           />
//         </div>

//         {/* Contenido (Contacto, Redes) */}
//         <div className="flex flex-col space-y-5 text-center lg:text-left align-center">
//           {/* Contacto */}
//           <div>
//             <p className="font-bold font-reddit md:text-1xl text-[#292525] mb-1 text-center md:text-1xl text-xl pb-3 pt-1 ">
//               ¿Quieres saber más de nosotros?
//             </p>
//             <p className="font-light font-reddit mb-1 text-center md:text-1xl pt-1 text-lg text-[#292525]">
//               Contáctanos hoy mismo.
//             </p>
//           </div>

//           {/* Banco de Oportunidades y Redes Sociales */}
//           <div className="flex flex-col align-center text-center">
//             <div className="flex justify-center space-x-5 w-full">
//               <a
//                 href="https://www.instagram.com/somosantivirus/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
//               >
//                 <Instagram size={32} />
//               </a>

//               <a
//                 href="https://api.whatsapp.com/send/?phone=573217066273&text&type=phone_number&app_absent=0"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
//               >
//                 <img
//                   src="public/images/whatsapp.png"
//                   alt="WhatsApp"
//                   className="w-8 h-8"
//                 />
//               </a>

//               <a
//                 href="https://www.linkedin.com/company/antivirus-desercion"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
//               >
//                 <Linkedin size={32} />
//               </a>

//               <a
//                 href="https://www.facebook.com/p/Fundaci%C3%B3n-Antivirus-para-la-Deserci%C3%B3n-100089714876149/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
//               >
//                 <Facebook size={32} />
//               </a>

//               <a
//                 href="https://www.youtube.com/channel/UCCDsmMeIqSWGk_fh1m9FX0w"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center w-12 h-12 rounded-full transition duration-300 text-[#292525] hover:bg-[#FFBA08]"
//               >
//                 <Youtube size={32} />
//               </a>
//             </div>
//             <div className="mt-4">
//               <p className="font-light font-reddit mb-1 text-center md:text-1xl pt-1 text-lg text-[#292525]">
//                 Banco de Oportunidades
//               </p>
//               <p className="font-light font-reddit mb-1 text-center md:text-1xl pt-1 text-lg text-[#292525]">
//                 FUNDACIÓN ANTIVIRUS © 2024 - Todos los Derechos Reservados
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { useState } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-100 text-gray-700 py-6 px-4 md:px-10 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between">
      {/* Sección de suscripción */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-4 md:mb-0">
        <h3 className="text-xl text-[#222D56] font-semibold mb-2">Suscríbete a nuestro Blog</h3>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden max-w-xs">
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full focus:outline-none"
          />
          <button className="bg-[#32526E] hover:bg-[#222D56] text-white px-4 py-2 rounded">Suscribirse</button>
        </div>
      </div>

      {/* Logo centrado */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img src="/Images/logo.png" alt="Fundación Antivirus" className="h-32 w-auto" />
      </div>

      {/* Sección de redes sociales y contacto */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-2xl font-semibold text-[#222D56]">Síguenos</h3>
        <div className="flex gap-4 text-2xl mt-2">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C76B5] text-4xl">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#32526E] text-4xl">
            <FaLinkedin />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#222D56] text-4xl">
            <FaFacebook />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFBA08] text-4xl">
            <FaYoutube />
          </a>
        </div>
        <p className="text-md text-[#222D56] mt-2">
          FUNDACIÓN ANTIVIRUS © 2024 - Todos los Derechos Reservados
        </p>
      </div>
    </footer>
  );
}