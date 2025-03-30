import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { motion } from "framer-motion";
import styles from '../styles/login.module.css';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.inputContainer}>
      <FaLock className={styles.icon} />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Contraseña"
        required
        className={styles.input}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={styles.togglePassword}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

const SocialButtons = () => (
  <motion.div className={styles.socialButtons} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.googleButton}>
      <FcGoogle /> <span>Ingresa con Google</span>
    </motion.button>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.facebookButton}>
      <FaFacebook /> <span>Ingresa con Facebook</span>
    </motion.button>
  </motion.div>
);

export default function LoginPage() {
  return (
    <div className={styles.bgLogin}>
      <div className={styles.overlay}></div>
      <Navbar />
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.imageContainer}>
            <motion.img
              src="/Images/Javi.png"
              alt="Javi"
              className={styles.image}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Bienvenido a tu <br /><span>Banco de oportunidades</span></h2>
            <SocialButtons />
            <div className={styles.separator}><hr /><span>o</span><hr /></div>
            <Form method="post" className={styles.form}>
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.icon} />
                <input type="email" name="email" placeholder="Correo Electrónico" required className={styles.input} />
              </div>
              <PasswordInput />
              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Recordarme</span>
                </label>
                <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
              </div>
              <motion.button type="submit" className={styles.loginButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Iniciar Sesión
              </motion.button>
            </Form>
            <div className={styles.registerText}>
              ¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
