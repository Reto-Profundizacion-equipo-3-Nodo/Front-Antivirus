import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { motion } from "framer-motion";
import styles from "~/styles/login.module.css";

/**
 * Componente para el campo de contraseña con funcionalidad de mostrar/ocultar.
 */
const PasswordInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative"> {/* Contenedor relativo para posicionar íconos */}
      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32526E]" />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Contraseña"
        required
        className="w-full p-3 pl-10 rounded-lg border border-[#708BC6] bg-white text-gray-800 shadow-sm 
                  focus:outline-none focus:ring-0 focus:border-[#32526E]"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl 
                  focus:outline-none focus:ring-0"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
      </button>
    </div>
  );
};

/**
 * Botones para iniciar sesión con Google y Facebook.
 */
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

/**
 * Página de inicio de sesión.
 */
export default function LoginPage() {
  return (
    <div className={`relative flex flex-col min-h-screen ${styles.bgLogin}`}> {/* Contenedor principal con fondo */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div> {/* Capa de desenfoque */}
      <Navbar /> {/* Navbar mantenido sin modificaciones */}

      <div className="flex flex-grow items-center justify-center p-6 relative z-10"> {/* Contenedor centrado del login */}
        <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white/10 backdrop-blur-md shadow-xl border border-white/20"> {/* Tarjeta del login */}

          {/* Imagen de Javi en el lado izquierdo (solo visible en pantallas grandes) */}
          <div className="hidden md:flex w-1/2 items-center justify-center p-8">
            <motion.img
              src="/Images/Javi.png"
              alt="Javi"
              className="w-full max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Contenedor del formulario de login */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="text-center text-3xl font-bold text-[#222D56]">
              Bienvenido a tu <br />
              <span className="text-[#32526E]">Banco de oportunidades</span>
            </h2>

            <SocialButtons /> {/* Botones de inicio de sesión con redes sociales */}

            <div className="my-4 flex items-center"> {/* Separador */}
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">o</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Formulario de inicio de sesión */}
            <Form method="post" className="space-y-4">
              {/* Campo de correo electrónico */}
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

              <PasswordInput /> {/* Campo de contraseña con funcionalidad */}

              {/* Opciones adicionales */}
              <div className="flex items-center justify-between text-sm md:text-base">
                <label className="flex items-center gap-2 cursor-pointer text-[#1a2a44] md:text-lg">
                  <input type="checkbox" className="rounded border-gray-400 cursor-pointer scale-125 accent-[#32526E] focus:ring-[#22256]" />
                  <span className=" text-[#222D56] text-gray-700">Recordarme</span>
                </label>
                <Link to="/forgot-password" className="text-[#222D56] hover:underline text-sm md:text-lg font-semibold">Olvidé mi contraseña</Link>
              </div>

              {/* Botón de inicio de sesión */}
              <motion.button
                type="submit"
                className="w-full px-4 py-2 text-white font-semibold shadow-md bg-[#ffba07] rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Form>

            {/* Enlace de registro */}
            <div className="text-[#222D56] mt-4 text-center text-sm md:text-lg text-gray-600">
              ¿No tienes una cuenta? <Link to="/register" className="text-[#222D56] hover:underline font-semibold text-sm md:text-lg">Regístrate</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Footer mantenido sin modificaciones */}
    </div>
  );
}
