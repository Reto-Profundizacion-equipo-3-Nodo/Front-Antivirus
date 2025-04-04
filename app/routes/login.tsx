// //Importamos los módulos necesarios
// import { useState } from "react";
// import { Form, Link, useNavigate } from "@remix-run/react";
// import { FcGoogle } from "react-icons/fc";
// import {
//   FaFacebook,
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import styles from "../styles/login.module.css";
// import { loginUser } from "~/services/authService";

// // Componente para la entrada de contraseña con opción de mostrar u ocultar
// const PasswordInput = () => {
//   // Estado para controlar la visibilidad de la contraseña
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className={styles.inputContainer}>
//       {/* Ícono de candado */}
//       <FaLock className={styles.icon} />
//       {/* Input para la contraseña */}
//       <input
//         type={showPassword ? "text" : "password"} // Alterna entre texto y password
//         name="password"
//         placeholder="Contraseña"
//         required
//         className={styles.input}
//       />
//       {/* Botón para mostrar/ocultar la contraseña */}
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)} // Alternar estado
//         className={styles.togglePassword}
//         aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//       >
//         {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Ícono dinámico */}
//       </button>
//     </div>
//   );
// };

// // Define props interface for SocialButtons
// interface SocialButtonsProps {
//   onSocialLogin: (provider: SocialProvider) => void;
// }

// // Componente para los botones de inicio de sesión con redes sociales
// const SocialButtons = () => (
//   <motion.div
//     className={styles.socialButtons}
//     initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
//     animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
//     transition={{ duration: 0.5 }} // Duración de la animación
//   >
//     {/* Botón para ingresar con Google */}
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={styles.googleButton}
//     >
//       <FcGoogle /> <span>Ingresa con Google</span>
//     </motion.button>
//     {/* Botón para ingresar con Facebook */}
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={styles.facebookButton}
//     >
//       <FaFacebook /> <span>Ingresa con Facebook</span>
//     </motion.button>
//   </motion.div>
// );

// // Componente principal de la página de inicio de sesión
// export default function LoginPage() {
//   const navigate = useNavigate();
//   const onSubmit = async (event) => {
//     event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
//     const formData = new FormData(event.currentTarget); // Obtener los datos del formulario
//     const email = formData.get("email"); // Obtener el email
//     const password = formData.get("password"); // Obtener la contraseña

//     const response = await loginUser(email, password); // Llamar a la función de inicio de sesión

//     if (response.token) {
//       // setMessage({ text: "Usuario registrado correctamente", type: "success" });
//       document.cookie = `token=${response.token}; path=/`;
//       return navigate("/");
//     }
//   };
//   return (
//     <div className={styles.bgLogin}>
//       <div className={styles.overlay}></div> {/* Capa de fondo */}
//       <div className={styles.loginContainer}>
//         <div className={styles.loginCard}>
//           {/* Contenedor de imagen animada */}
//           <div className={styles.imageContainer}>
//             <motion.img
//               src="/Images/Javi.png"
//               alt="Javi"
//               className={styles.image}
//               animate={{ y: [0, -10, 0] }} // Movimiento de arriba abajo
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Animación infinita
//             />
//           </div>
//           <div className={styles.formContainer}>
//             {/* Título */}
//             <h2 className={styles.title}>
//               Bienvenido a tu <br />
//               <span>Banco de oportunidades</span>
//             </h2>
//             {/* Botones de redes sociales */}
//             <SocialButtons />
//             {/* Separador */}
//             <div className={styles.separator}>
//               <hr />
//               <span>o</span>
//               <hr />
//             </div>
//             {/* Formulario de inicio de sesión */}
//             <Form onSubmit={onSubmit} method="post" className={styles.form}>
//               <div className={styles.inputContainer}>
//                 <FaEnvelope className={styles.icon} /> {/* Ícono de email */}
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Correo Electrónico"
//                   required
//                   className={styles.input}
//                 />
//               </div>
//               <PasswordInput /> {/* Campo de contraseña */}
//               <div className={styles.options}>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" className={styles.checkbox} />
//                   <span>Recordarme</span>
//                 </label>
//                 <Link to="/forgot-password" className={styles.link}>
//                   Olvidé mi contraseña
//                 </Link>
//               </div>
//               {/* Botón de inicio de sesión */}
//               <motion.button
//                 type="submit"
//                 className={styles.loginButton}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Iniciar Sesión
//               </motion.button>
//             </Form>
//             {/* Texto de registro */}
//             <div className={styles.registerText}>
//               ¿No tienes una cuenta?{" "}
//               <Link to="/register" className={styles.link}>
//                 Regístrate
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// Importamos los módulos necesarios
import { useState, useEffect } from "react";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle
} from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../styles/login.module.css";
import { 
  loginUser, 
  loginWithGoogle, 
  loginWithFacebook, 
  saveAuthToken, 
  getAuthToken, 
  AuthResponse
} from "~/services/authService";

// Tipos para el manejo de errores y mensajes
interface Message {
  text: string;
  type: "error" | "success";
}

// Interfaz para window para añadir propiedades de Facebook y Google
interface WindowWithFB extends Window {
  fbAsyncInit?: () => void;
  FB?: any;
  google?: any;
}

// Respuesta de Google OAuth
interface GoogleAuthResponse {
  code?: string;
}

// Respuesta de Facebook OAuth
interface FacebookAuthResponse {
  authResponse?: {
    accessToken: string;
  };
}

// Componente para mostrar mensajes al usuario
const AlertMessage = ({ message }: { message: Message | null }) => {
  if (!message) return null;
  
  return (
    <motion.div
      className={`${styles.alert} ${
        message.type === "error" ? styles.alertError : styles.alertSuccess
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {message.type === "error" && <FaExclamationCircle />}
      <span>{message.text}</span>
    </motion.div>
  );
};

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
const SocialButtons = ({ onGoogleLogin, onFacebookLogin }: { 
  onGoogleLogin: () => void, 
  onFacebookLogin: () => void 
}) => (
  <motion.div
    className={styles.socialButtons}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Botón para ingresar con Google */}
    <motion.button
      type="button"
      onClick={onGoogleLogin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={styles.googleButton}
    >
      <FcGoogle /> <span>Ingresa con Google</span>
    </motion.button>
    {/* Botón para ingresar con Facebook */}
    <motion.button
      type="button"
      onClick={onFacebookLogin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={styles.facebookButton}
    >
      <FaFacebook /> <span>Ingresa con Facebook</span>
    </motion.button>
  </motion.div>
);

// Componente principal de la página de inicio de sesión
export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const actionData = useActionData<{ error?: string }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Verificar si ya está autenticado
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      console.log("Usuario ya autenticado, redirigiendo al dashboard...");
      navigate("/dashboard");
    }
  }, [navigate]);
  
  // Verificar si hay datos del formulario guardados
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setRememberMe(true);
      // Automáticamente rellenar el campo de email si existe
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      if (emailInput) {
        emailInput.value = savedEmail;
      }
    }
  }, []);
  
  // Mostrar mensajes de error del servidor
  useEffect(() => {
    if (actionData?.error) {
      setMessage({ text: actionData.error, type: "error" });
    }
  }, [actionData]);

  // Función para manejar el envío del formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setIsSubmitting(true);
    setMessage(null);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = rememberMe;
    
    // Validar formulario
    if (!email || !password) {
      setMessage({ text: "Por favor complete todos los campos", type: "error" });
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log("Iniciando sesión con email:", email);
      
      const response = await loginUser(email, password);
      
      if ('error' in response) {
        console.error("Error de login:", response.error);
        setMessage({ text: response.error, type: "error" });
        setIsSubmitting(false);
        return;
      }
      
      if (response.token) {
        console.log("Login exitoso, token recibido");
        
        // Usar la función centralizada para guardar el token
        saveAuthToken(response.token, remember ? 30 : 1);
        
        // Si el usuario quiere ser recordado, guardar el email
        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        setMessage({ text: "Inicio de sesión exitoso", type: "success" });
        
        // Redireccionar al dashboard sin retrasos
        console.log("Redirigiendo al dashboard...");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setMessage({ 
        text: "Ocurrió un error al iniciar sesión. Intente nuevamente.",
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Configuración de autenticación Google
  const handleGoogleLogin = async () => {
    try {
      // Cargar la API de Google
      await loadGoogleScript();
      
      const windowWithGoogle = window as WindowWithFB;
      
      if (windowWithGoogle.google?.accounts?.oauth2) {
        const auth2 = windowWithGoogle.google.accounts.oauth2.initCodeClient({
          client_id: 'TU_CLIENT_ID_DE_GOOGLE', // ¡Reemplazar con el ID real!
          scope: 'email profile',
          callback: async (response: GoogleAuthResponse) => {
            if (response.code) {
              console.log("Código de autorización de Google recibido");
              // Enviar el código de autorización al backend
              const authResponse = await loginWithGoogle(response.code);
              
              if ('error' in authResponse) {
                setMessage({ text: authResponse.error, type: "error" });
                return;
              }
              
              if (authResponse.token) {
                console.log("Login con Google exitoso");
                saveAuthToken(authResponse.token, rememberMe ? 30 : 1);
                setMessage({ text: "Inicio de sesión con Google exitoso", type: "success" });
                
                console.log("Redirigiendo al dashboard...");
                navigate("/dashboard", { replace: true });
              }
            }
          },
        });
        
        auth2.requestCode();
      } else {
        throw new Error('Google API not loaded correctly');
      }
    } catch (error) {
      console.error("Error en login con Google:", error);
      setMessage({ 
        text: "No se pudo iniciar sesión con Google. Intente nuevamente.",
        type: "error" 
      });
    }
  };
  
  // Configuración de autenticación Facebook
  const handleFacebookLogin = async () => {
    try {
      // Cargar la API de Facebook
      await loadFacebookScript();
      
      const windowWithFB = window as WindowWithFB;
      
      if (windowWithFB.FB) {
        windowWithFB.FB.login(async (response: FacebookAuthResponse) => {
          if (response.authResponse) {
            console.log("Token de Facebook recibido");
            const { accessToken } = response.authResponse;
            
            // Enviar el token de acceso al backend
            const authResponse = await loginWithFacebook(accessToken);
            
            if ('error' in authResponse) {
              setMessage({ text: authResponse.error, type: "error" });
              return;
            }
            
            if (authResponse.token) {
              console.log("Login con Facebook exitoso");
              saveAuthToken(authResponse.token, rememberMe ? 30 : 1);
              setMessage({ text: "Inicio de sesión con Facebook exitoso", type: "success" });
              
              console.log("Redirigiendo al dashboard...");
              navigate("/dashboard", { replace: true });
            }
          } else {
            setMessage({ 
              text: "Inicio de sesión con Facebook cancelado", 
              type: "error" 
            });
          }
        }, { scope: 'email,public_profile' });
      } else {
        throw new Error('Facebook SDK not loaded correctly');
      }
    } catch (error) {
      console.error("Error en login con Facebook:", error);
      setMessage({ 
        text: "No se pudo iniciar sesión con Facebook. Intente nuevamente.",
        type: "error" 
      });
    }
  };
  
  // Función para cargar el script de Google
  const loadGoogleScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.document) {
        const windowWithGoogle = window as WindowWithFB;
        // Si el script ya está cargado
        if (windowWithGoogle.google?.accounts) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        reject(new Error('Cannot load Google script outside browser environment'));
      }
    });
  };
  
  // Función para cargar el script de Facebook
  const loadFacebookScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.document) {
        const windowWithFB = window as WindowWithFB;
        // Si el script ya está cargado
        if (windowWithFB.FB) {
          resolve();
          return;
        }
        
        windowWithFB.fbAsyncInit = function() {
          if (windowWithFB.FB) {
            windowWithFB.FB.init({
              appId: 'TU_APP_ID_DE_FACEBOOK', // ¡Reemplazar con el ID real!
              cookie: true,
              xfbml: true,
              version: 'v16.0'
            });
            resolve();
          }
        };
        
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/es_LA/sdk.js';
        script.async = true;
        script.defer = true;
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        reject(new Error('Cannot load Facebook script outside browser environment'));
      }
    });
  };
  
  // Render de la página
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
          <div className={styles.formContainer}>
            <h2 className={styles.title}>
              Bienvenido a tu <br />
              <span>Banco de oportunidades</span>
            </h2>
            
            <AlertMessage message={message} />
            
            <SocialButtons 
              onGoogleLogin={handleGoogleLogin} 
              onFacebookLogin={handleFacebookLogin} 
            />
            
            <div className={styles.separator}>
              <hr />
              <span>o</span>
              <hr />
            </div>
            
            <Form onSubmit={onSubmit} method="post" className={styles.form}>
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.icon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  required
                  className={styles.input}
                />
              </div>
              <PasswordInput />
              
              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkbox} 
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </motion.button>
            </Form>
            
            <div className={styles.registerText}>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className={styles.link}>
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}