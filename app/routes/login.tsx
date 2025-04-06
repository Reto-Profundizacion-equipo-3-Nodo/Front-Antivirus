// Importamos los módulos necesarios
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "@remix-run/react";
import BtnGoogle from "~/components/BtnGoogle";
import FacebookLogin from "~/components/FacebookLogin";



import {
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle
} from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../styles/login.module.css";
import { loginUser } from "~/services/authService";

// Props para componentes
interface PasswordInputProps {
  error?: boolean;
}

interface ErrorMessageProps {
  message: string | null;
}

// Componente para la entrada de contraseña con opción de mostrar u ocultar
const PasswordInput: React.FC<PasswordInputProps> = ({ error }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={`${styles.inputContainer} ${error ? styles.inputError : ""}`}>
      <FaLock className={styles.icon} />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Contraseña"
        required
        className={styles.input}
        aria-invalid={error}
        aria-describedby={error ? "password-error" : undefined}
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

// Componente para los botones de inicio de sesión con redes sociales
const SocialButtons: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google"; // Ruta del backend
  };

  const handleFacebookLogin = () => {
    window.location.href = "/auth/facebook";
  };

  return (
    <motion.div
      className={styles.socialButtons}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} 
    >
      <BtnGoogle />
      <FacebookLogin />
    </motion.div>
  );
};

// Componente para mostrar mensajes de error
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <motion.div
      id="form-error"
      className={styles.errorMessage}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaExclamationTriangle className={styles.errorIcon} />
      <span>{message}</span>
    </motion.div>
  );
};

// Componente principal de la página de inicio de sesión
export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Función que determina si un campo tiene error
  const isFieldError = (fieldName: string): boolean => {
    if (!error) return false;

    const fieldTerms: { [key: string]: string[] } = {
      correo: ["correo", "email", "usuario", "registrado"],
      contraseña: ["contraseña", "clave", "password", "incorrecta"]
    };

    return fieldTerms[fieldName.toLowerCase()]?.some(term =>
      error.toLowerCase().includes(term)
    ) || false;
  };

  // Función para enviar el formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(email, password);

      if (response.token) {
        // ⚠️ Solo para desarrollo. Considera manejar esto en backend con HttpOnly cookies
        document.cookie = `token=${response.token}; path=/`;

        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        localStorage.setItem("userData", JSON.stringify({ email }));
        navigate("/dashboard");
      } else {
        setError("Error inesperado al iniciar sesión. Inténtalo de nuevo.");
      }
    } catch (error: any) {
      // Manejo de errores con base en el status de respuesta
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        switch (status) {
          case 400:
            setError("Los datos enviados no son válidos.");
            break;
          case 401:
            setError("Contraseña incorrecta. Por favor, intenta de nuevo.");
            break;
          case 404:
            setError("Este correo no está registrado. Por favor, regístrate primero.");
            break;
          case 500:
            setError("Hubo un problema en el servidor. Inténtalo más tarde.");
            break;
          default:
            setError(message || "Ocurrió un error inesperado.");
            break;
        }
      } else {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.bgLogin}>
      <div className={styles.overlay}></div>
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
          <motion.div
            className={styles.formContainer}
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <h2 className={styles.title}>
              Bienvenido a tu <br />
              <span>Banco de oportunidades</span>
            </h2>

            <SocialButtons />

            <div className={styles.separator}>
              <hr />
              <span>o</span>
              <hr />
            </div>

            {error && <ErrorMessage message={error} />}

            <Form onSubmit={onSubmit} method="post" className={styles.form}>
              <div className={`${styles.inputContainer} ${isFieldError("correo") ? styles.inputError : ""}`}>
                <FaEnvelope className={styles.icon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  required
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={isFieldError("correo")}
                  aria-describedby={isFieldError("correo") ? "email-error" : undefined}
                />
              </div>

              <PasswordInput error={isFieldError("contraseña")} />

              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Recordarme</span>
                </label>
                <Link to="/forgot-password" className={styles.link}>
                  Olvidé mi contraseña
                </Link>
              </div>

              <motion.button
                type="submit"
                className={styles.loginButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </motion.button>
            </Form>

            <div className={styles.registerText}>
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className={`${styles.link} ${error?.includes("no está registrado") ? styles.highlightLink : ""}`}
              >
                Regístrate
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
