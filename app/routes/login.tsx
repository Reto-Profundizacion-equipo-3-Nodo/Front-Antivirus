// // Importamos los módulos necesarios
// import { useState, useEffect } from "react";
// import { Form, Link, useActionData, useSubmit, useTransition, useNavigate } from "@remix-run/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import styles from '../styles/login.module.css';

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

// // Componente para los botones de inicio de sesión con redes sociales
// const SocialButtons = ({ onSocialLogin }) => (
//   <motion.div 
//     className={styles.socialButtons} 
//     initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
//     animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
//     transition={{ duration: 0.5 }} // Duración de la animación
//   >
//     {/* Botón para ingresar con Google */}
//     <motion.button 
//       type="button"
//       onClick={() => onSocialLogin('google')} 
//       whileHover={{ scale: 1.05 }} 
//       whileTap={{ scale: 0.95 }} 
//       className={styles.googleButton}
//     >
//       <FcGoogle /> <span>Ingresa con Google</span>
//     </motion.button>
//     {/* Botón para ingresar con Facebook */}
//     <motion.button 
//       type="button"
//       onClick={() => onSocialLogin('facebook')} 
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
//   const actionData = useActionData();
//   const transition = useTransition();
//   const navigate = useNavigate();
//   const submit = useSubmit();
  
//   const [errorMessage, setErrorMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
  
//   // Efecto para manejar errores de la acción
//   useEffect(() => {
//     if (actionData?.error) {
//       setErrorMessage(actionData.error);
//     }
    
//     // Si hay un token en la respuesta, el login fue exitoso
//     if (actionData?.token) {
//       // Guardar el token en localStorage o sessionStorage según rememberMe
//       if (rememberMe) {
//         localStorage.setItem('authToken', actionData.token);
//         localStorage.setItem('userName', actionData.userName || '');
//       } else {
//         sessionStorage.setItem('authToken', actionData.token);
//         sessionStorage.setItem('userName', actionData.userName || '');
//       }
      
//       // Redirigir al dashboard
//       navigate('/dashboard');
//     }
//   }, [actionData, navigate, rememberMe]);
  
//   // Manejar login con redes sociales
//   const handleSocialLogin = async (provider) => {
//     try {
//       // Iniciar el flujo de autenticación según el proveedor
//       let authUrl;
      
//       if (provider === 'google') {
//         authUrl = '/auth/google';
//       } else if (provider === 'facebook') {
//         authUrl = '/auth/facebook';
//       }
      
//       // Aquí normalmente se redirige al endpoint de autenticación
//       // Pero para Remix, podemos usar submit para enviar la petición por POST
//       submit({ provider }, { method: 'post', action: authUrl });
      
//     } catch (error) {
//       setErrorMessage(`Error al iniciar sesión con ${provider}: ${error.message}`);
//     }
//   };
  
//   // Manejar recuperación de contraseña
//   const handleForgotPassword = () => {
//     navigate('/forgot-password');
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
//             <h2 className={styles.title}>Bienvenido a tu <br /><span>Banco de oportunidades</span></h2>
            
//             {/* Mostrar mensaje de error si existe */}
//             {errorMessage && (
//               <div className={styles.errorMessage}>
//                 {errorMessage}
//               </div>
//             )}
            
//             {/* Botones de redes sociales */}
//             <SocialButtons onSocialLogin={handleSocialLogin} />
            
//             {/* Separador */}
//             <div className={styles.separator}><hr /><span>o</span><hr /></div>
            
//             {/* Formulario de inicio de sesión */}
//             <Form method="post" className={styles.form}>
//               <div className={styles.inputContainer}>
//                 <FaEnvelope className={styles.icon} /> {/* Ícono de email */}
//                 <input type="email" name="email" placeholder="Correo Electrónico" required className={styles.input} />
//               </div>
//               <PasswordInput /> {/* Campo de contraseña */}
//               <div className={styles.options}>
//                 <label className={styles.checkboxLabel}>
//                   <input 
//                     type="checkbox" 
//                     name="rememberMe"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     className={styles.checkbox} 
//                   />
//                   <span>Recordarme</span>
//                 </label>
//                 <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
//               </div>
              
//               {/* Botón de inicio de sesión */}
//               <motion.button 
//                 type="submit" 
//                 className={styles.loginButton} 
//                 whileHover={{ scale: 1.05 }} 
//                 whileTap={{ scale: 0.95 }}
//                 disabled={transition.state === "submitting"}
//               >
//                 {transition.state === "submitting" 
//                   ? "Iniciando sesión..." 
//                   : "Iniciar Sesión"}
//               </motion.button>
//             </Form>
            
//             {/* Texto de registro */}
//             <div className={styles.registerText}>
//               ¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Form, Link, useActionData, useSubmit, useNavigation, useNavigate } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // Importamos json para respuestas tipadas
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from '../styles/login.module.css';

// Define types for our action data
type ActionData = {
  error?: string;
  token?: string;
  userName?: string;
} | undefined;

// Define type for social provider
type SocialProvider = 'google' | 'facebook';

// Definir la función action para manejar el envío del formulario
export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";
    
    // Validación básica
    if (!email || !password) {
      return json({ error: "Email y contraseña son requeridos" });
    }
    
    // Simulación de llamada a API (reemplaza con tu lógica real)
    // En lugar de usar fetch directamente, simulamos la respuesta
    // para evitar problemas de BodyStreamBuffer
    
    // Simular procesamiento (validación del servidor, etc.)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular respuesta exitosa
    return json({
      token: "mock-jwt-token-example",
      userName: email.split('@')[0]
    });
    
  } catch (error) {
    console.error("Error en action:", error);
    return json({ 
      error: error instanceof Error 
        ? error.message 
        : "Error al iniciar sesión. Por favor intenta de nuevo." 
    });
  }
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

// Define props interface for SocialButtons
interface SocialButtonsProps {
  onSocialLogin: (provider: SocialProvider) => void;
}

// Componente para los botones de inicio de sesión con redes sociales
const SocialButtons = ({ onSocialLogin }: SocialButtonsProps) => (
  <motion.div 
    className={styles.socialButtons} 
    initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
    animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
    transition={{ duration: 0.5 }} // Duración de la animación
  >
    {/* Botón para ingresar con Google */}
    <motion.button 
      type="button"
      onClick={() => onSocialLogin('google')} 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      className={styles.googleButton}
    >
      <FcGoogle /> <span>Ingresa con Google</span>
    </motion.button>
    {/* Botón para ingresar con Facebook */}
    <motion.button 
      type="button"
      onClick={() => onSocialLogin('facebook')} 
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
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Efecto para manejar errores de la acción y redirección
  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(actionData.error);
    }
    
    // Si hay un token en la respuesta, el login fue exitoso
    if (actionData?.token) {
      // Guardar el token en localStorage o sessionStorage según rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('authToken', actionData.token);
      storage.setItem('userName', actionData.userName || '');
      
      // Usar setTimeout para evitar problemas de navegación durante la renderización
      setTimeout(() => {
        navigate('/dashboard');
      }, 0);
    }
  }, [actionData, navigate, rememberMe]);
  
  // Manejar login con redes sociales
  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      // Iniciar el flujo de autenticación según el proveedor
      let authUrl;
      
      if (provider === 'google') {
        authUrl = '/auth/google';
      } else if (provider === 'facebook') {
        authUrl = '/auth/facebook';
      } else {
        throw new Error('Proveedor de autenticación no soportado');
      }
      
      // Enviar la petición usando submit para prevenir problemas de navegación
      submit({ provider }, { method: 'post', action: authUrl });
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setErrorMessage(`Error al iniciar sesión con ${provider}: ${errorMessage}`);
    }
  };

  return (
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
          
          {/* Mostrar mensaje de error si existe */}
          {errorMessage && (
            <div className={styles.errorMessage}>
              {errorMessage}
            </div>
          )}
          
          {/* Botones de redes sociales */}
          <SocialButtons onSocialLogin={handleSocialLogin} />
          
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
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className={styles.checkbox} 
                />
                <span>Recordarme</span>
              </label>
              <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
            </div>
            
            {/* Botón de inicio de sesión */}
            <motion.button 
              type="submit" 
              className={styles.loginButton} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" 
                ? "Iniciando sesión..." 
                : "Iniciar Sesión"}
            </motion.button>
          </Form>
          
          {/* Texto de registro */}
          <div className={styles.registerText}>
            ¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}