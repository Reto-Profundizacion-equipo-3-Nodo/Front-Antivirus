// //Importamos los módulos necesarios
// import { useState } from "react";
// import { Form, Link } from "@remix-run/react";
// import { json } from "@remix-run/node";
// import { ActionFunction } from "@remix-run/node";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import styles from '../styles/login.module.css';
// import { createUserSession } from "~/utils/session.server";


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
// const SocialButtons = () => (
//   <motion.div 
//     className={styles.socialButtons} 
//     initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
//     animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
//     transition={{ duration: 0.5 }} // Duración de la animación
//   >
//     {/* Botón para ingresar con Google */}
//     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.googleButton}>
//       <FcGoogle /> <span>Ingresa con Google</span>
//     </motion.button>
//     {/* Botón para ingresar con Facebook */}
//     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={styles.facebookButton}>
//       <FaFacebook /> <span>Ingresa con Facebook</span>
//     </motion.button>
//   </motion.div>
// );

// // Componente principal de la página de inicio de sesión
// export default function LoginPage() {
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
//             {/* Botones de redes sociales */}
//             <SocialButtons />
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
//                   <input type="checkbox" className={styles.checkbox} />
//                   <span>Recordarme</span>
//                 </label>
//                 <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
//               </div>
//               {/* Botón de inicio de sesión */}
//               <motion.button type="submit" className={styles.loginButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 Iniciar Sesión
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


// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

// // Simulación de autentificación
//   if (email !== "admin@ejemplo.com" || password !== "123456") {
//     return json({ error: "Credenciales incorrectas" }, { status: 400 });
//   }

//   //Datos del usuario autentificado.
//   const user = { id: "1", email, role: "admin" };

//   return createUserSession({ request, user, redirectTo: "/dashboard" });
// };
//Importamos los módulos necesarios
import { useState, useEffect } from "react";
import { Form, Link, useActionData, useLoaderData, useNavigation, useLocation } from "@remix-run/react";
import { json, redirect, LoaderFunction, ActionFunction } from "@remix-run/node";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from '../styles/login.module.css';
import { createUserSession, getSession } from "~/utils/session.server";
import { loginUser, loginWithGoogle, loginWithFacebook } from "~/services/authService";

// Loader para verificar si el usuario ya está autenticado
export const loader: LoaderFunction = async ({ request }) => {
  // Obtener la sesión actual
  const session = await getSession(request);
  const user = session.get("user");
  
  // Si hay un usuario en sesión, redirigir al dashboard
  if (user) {
    return redirect("/dashboard");
  }
  
  // Obtener error de query params (útil para redirects desde OAuth)
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  
  return json({ error });
};

// Action para procesar el formulario de login
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "on";

  // Validación básica de campos
  if (!email || !password) {
    return json({ error: "El correo y la contraseña son obligatorios" }, { status: 400 });
  }

  try {
    // Usar el servicio de autenticación real
    const response = await loginUser(email, password);
    
    // Si la autenticación es exitosa, crear una sesión
    if (response.token) {
      // Extraer información del usuario desde la respuesta o token
      // Ajustar esto según tu API
      const user = response.user || { 
        id: "1", 
        email, 
        role: "admin" // Esto debería venir de tu backend
      };

      // Obtener URL de redirección desde query params (si existe)
      const url = new URL(request.url);
      const redirectTo = url.searchParams.get("redirectTo") || "/dashboard";

      // Crear sesión y guardar token
      return createUserSession({ 
        request, 
        user,
        redirectTo,
        token: response.token
      });
    }
    
    return json({ error: "Credenciales incorrectas" }, { status: 400 });
  } catch (error) {
    console.error("Error en login:", error);
    return json({ 
      error: error instanceof Error ? error.message : "Error al iniciar sesión" 
    }, { status: 500 });
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

// Componente para los botones de inicio de sesión con redes sociales
const SocialButtons = () => {
  // Manejadores para login con redes sociales
  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    loginWithGoogle();
  };
  
  const handleFacebookLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    loginWithFacebook();
  };
  
  return (
    <motion.div 
      className={styles.socialButtons} 
      initial={{ opacity: 0, y: 20 }} // Inicia con opacidad 0 y desplazamiento de 20px
      animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 y sin desplazamiento
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      {/* Botón para ingresar con Google */}
      <motion.button 
        type="button"
        onClick={handleGoogleLogin}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className={styles.googleButton}
      >
        <FcGoogle /> <span>Ingresa con Google</span>
      </motion.button>
      {/* Botón para ingresar con Facebook */}
      <motion.button 
        type="button"
        onClick={handleFacebookLogin}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className={styles.facebookButton}
      >
        <FaFacebook /> <span>Ingresa con Facebook</span>
      </motion.button>
    </motion.div>
  );
};

// Componente principal de la página de inicio de sesión
export default function LoginPage() {
  // Obtener datos de action y loader
  const actionData = useActionData<{ error?: string }>();
  const loaderData = useLoaderData<{ error?: string }>();
  const navigation = useNavigation();
  const location = useLocation();
  
  // Estado para mensajes de error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Determinar si está cargando
  const isLoading = navigation.state === "submitting";
  
  // Actualizar mensaje de error cuando cambian los datos
  useEffect(() => {
    // Priorizar error de action, luego de loader
    const error = actionData?.error || loaderData?.error;
    setErrorMessage(error || null);
    
    // Limpiar error después de 5 segundos
    if (error) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionData, loaderData]);
  
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
            
            {/* Mensaje de error (si existe) */}
            {errorMessage && (
              <motion.div 
                className={styles.errorMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errorMessage}
              </motion.div>
            )}
            
            {/* Botones de redes sociales */}
            <SocialButtons />
            {/* Separador */}
            <div className={styles.separator}><hr /><span>o</span><hr /></div>
            {/* Formulario de inicio de sesión */}
            <Form method="post" className={styles.form}>
              {/* Campo para preservar la URL de redirección */}
              {location.search.includes("redirectTo") && (
                <input 
                  type="hidden" 
                  name="redirectTo" 
                  value={new URLSearchParams(location.search).get("redirectTo") || "/dashboard"} 
                />
              )}
              
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.icon} /> {/* Ícono de email */}
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Correo Electrónico" 
                  required 
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
              <PasswordInput /> {/* Campo de contraseña */}
              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="remember" 
                    className={styles.checkbox} 
                    disabled={isLoading}
                  />
                  <span>Recordarme</span>
                </label>
                <Link to="/forgot-password" className={styles.link}>Olvidé mi contraseña</Link>
              </div>
              {/* Botón de inicio de sesión */}
              <motion.button 
                type="submit" 
                className={styles.loginButton} 
                whileHover={{ scale: isLoading ? 1 : 1.05 }} 
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
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