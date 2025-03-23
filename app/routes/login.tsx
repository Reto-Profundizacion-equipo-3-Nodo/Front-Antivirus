// import { useState } from "react";
// import { Form, Link } from "@remix-run/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import Navbar from "~/components/Navbar";
// import Footer from "~/components/Footer";
// import { motion } from "framer-motion";
// import styles from "~/styles/login.module.css"; 

// // 📌 Componente reutilizable para el campo de contraseña
// const PasswordInput: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className="relative">
//       <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32526E]" />
//       <input
//         type={showPassword ? "text" : "password"}
//         name="password"
//         placeholder="Contraseña"
//         required
//         className="w-full p-3 pl-10 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-[#32526E]"
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
//         aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//       >
//         {showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
//       </button>
//     </div>
//   );
// };

// // 📌 Componente Botones de Redes Sociales
// const SocialButtons: React.FC = () => (
//   <motion.div className="mt-4 space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full items-center justify-center gap-2 p-2 bg-white border border-gray-300 rounded shadow">
//       <FcGoogle className="text-xl" /> <span className="text-gray-700">Ingresa con Google</span>
//     </motion.button>
//     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full items-center justify-center gap-2 p-2 bg-[#212d55] text-white rounded shadow">
//       <FaFacebook className="text-xl" /> <span>Ingresa con Facebook</span>
//     </motion.button>
//   </motion.div>
// );

// export default function LoginPage() {
//   return (
//     <div className={`flex flex-col min-h-screen ${styles.bgLogin}`}> {/* Se aplica el fondo desde CSS Modules */}
//       <Navbar />
//       <div className="flex flex-grow items-center justify-center p-6">
//         <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
//           {/* 📌 Sección Izquierda - Imagen */}
//           <div className="hidden md:flex w-1/2 items-center justify-center p-8">
//             <motion.img 
//               src="/Images/Javi.png" // Asegúrate de que la imagen esté en la carpeta `public/Images`
//               alt="Javi"
//               className="w-full max-w-md"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </div>
//           {/* 📌 Sección Derecha - Formulario */}
//           <div className="w-full p-8 md:w-1/2">
//             <h2 className="text-center text-2xl font-bold text-[#212d55]">
//               Bienvenido a tu <br />
//               <span className="text-[#ffba07]">Banco de oportunidades</span>
//             </h2>
//             {/* 📌 Botones redes sociales */}
//             <SocialButtons />
//             {/* 📌 Separador */}
//             <div className="my-4 flex items-center">
//               <hr className="w-full border-gray-300" />
//               <span className="px-3 text-gray-500">o</span>
//               <hr className="w-full border-gray-300" />
//             </div>
//             {/* 📌 Formulario */}
//             <Form method="post" className="space-y-4">
//               <div className="relative">
//                 <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32526E]" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Correo Electrónico"
//                   required
//                   className="w-full p-3 pl-10 rounded-lg border border-[#708BC6] bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-[#32526E]"
//                 />
//               </div>
//               <PasswordInput />
//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
//                   <span className="text-gray-700">Recordarme</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-[#33526e] hover:underline">Olvidé mi contraseña</Link>
//               </div>
//               <motion.button
//                 type="submit"
//                 className="w-full px-4 py-2 text-white font-semibold shadow-md bg-[#ffba07] rounded"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Login
//               </motion.button>
//             </Form>
//             <div className="mt-4 text-center text-sm text-gray-600">
//               ¿No tienes una cuenta? <Link to="/register" className="text-[#33526e] hover:underline">Regístrate</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { motion } from "framer-motion";
import styles from "~/styles/login.module.css"; 

// 📌 Componente reutilizable para el campo de contraseña
const PasswordInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32526E]" />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Contraseña"
        required
        className="w-full p-3 pl-10 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-[#32526E]"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
      </button>
    </div>
  );
};

// 📌 Componente Botones de Redes Sociales
const SocialButtons: React.FC = () => (
  <motion.div className="mt-4 space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full items-center justify-center gap-2 p-2 bg-white border border-gray-300 rounded shadow">
      <FcGoogle className="text-xl" /> <span className="text-gray-700">Ingresa con Google</span>
    </motion.button>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full items-center justify-center gap-2 p-2 bg-[#212d55] text-white rounded shadow">
      <FaFacebook className="text-xl" /> <span>Ingresa con Facebook</span>
    </motion.button>
  </motion.div>
);

export default function LoginPage() {
  return (
    <div className={`flex flex-col min-h-screen ${styles.bgLogin}`}> {/* Se aplica el fondo desde CSS Modules */}
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-6"> {/* Asegura que el contenido crezca */}
        <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
          {/* 📌 Sección Izquierda - Imagen */}
          <div className="hidden md:flex w-1/2 items-center justify-center p-8">
            <motion.img 
              src="/Images/Javi.png" // Asegúrate de que la imagen esté en la carpeta `public/Images`
              alt="Javi"
              className="w-full max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          {/* 📌 Sección Derecha - Formulario */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="text-center text-2xl font-bold text-[#212d55]">
              Bienvenido a tu <br />
              <span className="text-[#ffba07]">Banco de oportunidades</span>
            </h2>
            {/* 📌 Botones redes sociales */}
            <SocialButtons />
            {/* 📌 Separador */}
            <div className="my-4 flex items-center">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">o</span>
              <hr className="w-full border-gray-300" />
            </div>
            {/* 📌 Formulario */}
            <Form method="post" className="space-y-4">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32526E]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  required
                  className="w-full p-3 pl-10 rounded-lg border border-[#708BC6] bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-[#32526E]"
                />
              </div>
              <PasswordInput />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                  <span className="text-gray-700">Recordarme</span>
                </label>
                <Link to="/forgot-password" className="text-[#33526e] hover:underline">Olvidé mi contraseña</Link>
              </div>
              <motion.button
                type="submit"
                className="w-full px-4 py-2 text-white font-semibold shadow-md bg-[#ffba07] rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Form>
            <div className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes una cuenta? <Link to="/register" className="text-[#33526e] hover:underline">Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer se mantiene abajo */}
    </div>
  );
}