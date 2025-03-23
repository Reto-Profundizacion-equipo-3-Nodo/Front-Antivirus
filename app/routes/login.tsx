// import { useState } from "react";
// import { Form, Link } from "@remix-run/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import Navbar from "~/components/Navbar";
// // import Footer from "~/components/Footer";
// import { motion } from "framer-motion";

// export default function LoginPage() {
//   // Estado para controlar la visibilidad de la contraseña
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <Navbar />

//       <div className="flex flex-grow items-center justify-center bg-gray-100">
//         <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
//           {/* Sección izquierda: Javi */}
//           <div className="w-1/2 bg-gray-200 p-8 md:flex items-center justify-center">
//             <motion.img src="Image/Javi.png" alt="Javi" className="w-full h-auto max-w-lg" animate={{ y: [0, -10, 0]}}
//             transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}/>
//           </div>

//           {/* Sección derecha: Formulario de Login */}
//           <div className="w-full p-8 md:w-1/2">
//             <h2 className="text-center text-2xl font-bold text-gray-800">
//               Bienvenido a tu <br />
//               <span className="text-blue-700">Banco de oportunidades</span>
//             </h2>

//             {/* Botones de acceso con redes sociales */}
//             <div className="mt-4 space-y-3">
//               <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 p-2 bg-white hover:bg-gray-100 shadow-sm transition">
//                 <FcGoogle className="text-xl" /> <span className="text-gray-700">Ingresa con Google</span>
//               </button>
//               <button className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-600 p-2 bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition">
//                 <FaFacebook className="text-xl" /> <span>Ingresa con Facebook</span>
//               </button>
//             </div>

//             {/* Separador */}
//             <div className="my-4 flex items-center">
//               <hr className="w-full border-gray-300" />
//               <span className="px-3 text-gray-600">o</span>
//               <hr className="w-full border-gray-300" />
//             </div>

//             {/* Formulario de inicio de sesión */}
//             <Form method="post" className="space-y-4">
//               <div className="relative">
//                 <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Correo Electrónico"
//                   required
//                   className="w-full rounded-md border border-gray-300 p-2 pl-10 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                 />
//               </div>

//               <div className="relative">
//                 <FaLock className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Contraseña"
//                   required
//                   className="w-full rounded-md border border-gray-300 p-2 pl-10 pr-10 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
//                   <span className="text-gray-700">Recordarme</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-blue-500 hover:underline">
//                   Olvidé mi contraseña
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full rounded-md bg-yellow-500 px-4 py-2 text-white font-semibold shadow-md hover:bg-yellow-600 transition"
//               >
//                 Login
//               </button>
//             </Form>

//             <div className="mt-4 text-center text-sm text-gray-600">
//               ¿No tienes una cuenta?{" "}
//               <Link to="/register" className="text-blue-500 hover:underline">
//                 Regístrate
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer
//       <Footer /> */}
//     </div>
//   );
// }
import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "~/components/Navbar";
import { motion } from "framer-motion";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#dcecf9]">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-grow items-center justify-center p-6">
        <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
          
          {/* Sección Izquierda */}
          <div className="hidden md:flex w-1/2 bg-[#00000] items-center justify-center p-8">
            <motion.img 
              src="Image/Javi.png" 
              alt="Javi" 
              className="w-full max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Sección Derecha - Formulario */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="text-center text-2xl font-bold text-[#212d55]">
              Bienvenido a tu <br />
              <span className="text-[#ffba07]">Banco de oportunidades</span>
            </h2>

            {/* Botones redes sociales */}
            <motion.div 
              className="mt-6 space-y-3"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 p-2 bg-white hover:bg-gray-100 shadow transition">
                <FcGoogle className="text-xl" /> <span className="text-gray-700">Ingresa con Google</span>
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#212d55] text-white p-2 hover:bg-[#33526e] shadow transition">
                <FaFacebook className="text-xl" /> <span>Ingresa con Facebook</span>
              </button>
            </motion.div>

            {/* Separador */}
            <div className="my-4 flex items-center">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">o</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Formulario */}
            <Form method="post" className="space-y-4">
              <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  required
                  className="w-full rounded-md border border-gray-300 p-2 pl-10 bg-gray-50 text-gray-900 focus:border-[#33526e] focus:ring focus:ring-[#33526e]/50 transition"
                />
              </motion.div>

              <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  required
                  className="w-full rounded-md border border-gray-300 p-2 pl-10 pr-10 bg-gray-50 text-gray-900 focus:border-[#33526e] focus:ring focus:ring-[#33526e]/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                  <span className="text-gray-700">Recordarme</span>
                </label>
                <Link to="/forgot-password" className="text-[#33526e] hover:underline">
                  Olvidé mi contraseña
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full rounded-md bg-[#ffba07] px-4 py-2 text-white font-semibold shadow-md hover:bg-[#dca606] transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Form>

            <div className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-[#33526e] hover:underline">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}