import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";
import styles from "~/styles/services.module.css";

export default function Servicios() {
  return (
    <section className={styles.background}>
      <div className={styles.overlay}></div>

      {/* Contenido principal */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.glassBox}>
            {/* Sección de título y botón de regreso */}
            <section className="text-center space-y-6">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.2 }}
              >
                <Link to="/" className={styles.button}>⬅ Volver al Inicio</Link>
              </motion.div>

              <motion.h1 
                className={styles.title}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Nuestros Servicios
              </motion.h1>

              <p className={styles.text}>
                Conoce los programas y recursos que ofrecemos para mejorar la seguridad digital y el bienestar en línea.
              </p>
            </section>

            {/* Tarjetas de servicios */}
            <section className={styles.serviceContainer}>
              {servicesData.map((service) => (
                <ServiceCard 
                  key={service.id}
                  title={service.title} 
                  description={service.description} 
                  imageUrl={service.image} 
                />
              ))}
            </section>

            {/* Sección de llamado a la acción */}
            <motion.div 
              className="text-center py-12 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className={styles.title}>¿Quieres ser parte del cambio?</h2>

              <p className={styles.text}>
                Únete a nuestra comunidad y ayuda a crear un mundo digital más seguro.
              </p>

              <div className="mt-8">
                <Link to="/voluntariado" className={styles.button}>Únete Ahora</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

