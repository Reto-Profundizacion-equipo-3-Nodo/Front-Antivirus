// Archivo: routes/forgot-password.tsx
import { useState, useEffect } from "react";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import styles from '../styles/forgot-password.module.css';

// Define el tipo para los datos de la acción
type ActionData = {
  success?: boolean;
  error?: string;
} | undefined;

export default function ForgotPassword() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [messageSent, setMessageSent] = useState(false);
  
  // Usando useEffect para actualizar el estado basado en actionData
  useEffect(() => {
    // Si la acción fue exitosa, mostrar mensaje de éxito
    if (actionData?.success && !messageSent) {
      setMessageSent(true);
    }
  }, [actionData, messageSent]);
  
  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordCard}>
        <Link to="/login" className={styles.backLink}>
          <FaArrowLeft /> Volver al login
        </Link>
        
        <h2 className={styles.title}>Recupera tu contraseña</h2>
        
        {messageSent ? (
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>¡Correo enviado!</h3>
            <p>Hemos enviado un enlace a tu correo electrónico para restablecer tu contraseña.</p>
            <p>Por favor revisa tu bandeja de entrada y sigue las instrucciones.</p>
            
            <Link to="/login" className={styles.loginLink}>
              Volver al inicio de sesión
            </Link>
          </motion.div>
        ) : (
          <>
            <p className={styles.instructions}>
              Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
            </p>
            
            {actionData?.error && (
              <div className={styles.errorMessage}>
                {actionData.error}
              </div>
            )}
            
            <Form method="post" className={styles.form}>
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
              
              <motion.button 
                type="submit" 
                className={styles.submitButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting" 
                  ? "Enviando..." 
                  : "Enviar instrucciones"}
              </motion.button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}