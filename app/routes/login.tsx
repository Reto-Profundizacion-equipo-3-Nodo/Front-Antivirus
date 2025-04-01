//Importamos los módulos necesarios
import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from '../styles/login.module.css';


// Componente para la entrada de contraseña con opción de mostrar u ocultar
const PasswordInput = () => {
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.inputContainer}>
      {/* Ícono de candado */}
      <FaLock className={styles.icon} />
      {/* Input para la contraseña */}
      <input
        type={showPassword ? "text" : "password"} // Alterna entre texto y password
        name="password"
        placeholder="Contraseña"
        required
        className={styles.input}
      />
      {/* Botón para mostrar/ocultar la contraseña */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)} // Alternar estado
        className={styles.togglePassword}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Ícono dinámico */}
      </button>
    </div>
  );
};

// Componente para los botones de inicio de sesión con redes sociales
const SocialButtons = () => (
  <motion.div 
    className={styles.socialButtons} 
    initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
    animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
    transition={{ duration: 0.5 }} // Duración de la animación
  >
    {/* Botón para ingresar con Google */}
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.googleButton}>
      <FcGoogle /> <span>Ingresa con Google</span>
    </motion.button>
    {/* Botón para ingresar con Facebook */}
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.facebookButton}>
      <FaFacebook /> <span>Ingresa con Facebook</span>
    </motion.button>
  </motion.div>
);

// Componente principal de la página de inicio de sesión
export default function LoginPage() {
  return (
    <div className={styles.bgLogin}>
      <div className={styles.overlay}></div> {/* Capa de fondo */}
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {/* Contenedor de imagen animada */}
          <div className={styles.imageContainer}>
            <motion.img 
              src="/Images/Javi.png"
              alt="Javi"
              className={styles.image}
              animate={{ y: [0, -10, 0] }} // Movimiento de arriba abajo
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Animación infinita
            />
          </div>
          <div className={styles.formContainer}>
            {/* Título */}
            <h2 className={styles.title}>Bienvenido a tu <br /><span>Banco de oportunidades</span></h2>
            {/* Botones de redes sociales */}
            <SocialButtons />
            {/* Separador */}
            <div className={styles.separator}><hr /><span>o</span><hr /></div>
            {/* Formulario de inicio de sesión */}
            <Form method="post" className={styles.form}>
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.icon} /> {/* Ícono de email */}
                <input type="email" name="email" placeholder="Correo Electrónico" required className={styles.input} />
              </div>
              <PasswordInput /> {/* Campo de contraseña */}
              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Recordarme</span>
                </label>
                <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
              </div>
              {/* Botón de inicio de sesión */}
              <motion.button type="submit" className={styles.loginButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Iniciar Sesión
              </motion.button>
            </Form>
            {/* Texto de registro */}
            <div className={styles.registerText}>
              ¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}