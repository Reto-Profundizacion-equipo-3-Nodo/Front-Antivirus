// import { motion } from "framer-motion";
// import { Link } from "@remix-run/react";
// import ServiceCard from "../components/ServiceCard";
// import { servicesData } from "../data/servicesData";
// import styles from "~/styles/services.module.css";

// /**
//  * Componente principal para la página de servicios.
//  * Muestra una lista de tarjetas de servicios y un llamado a la acción.
//  */
// export default function Servicios() {
//   return (
//     <section className={styles.background}>
//       <div className={styles.overlay}></div>

//       <div className={styles.content}>
//         <div className={styles.container}>
//           <div className={styles.glassBox}>
//             {/* Sección de título y botón de regreso */}
//             <section className="text-center space-y-6">
//               {/* Botón para volver al inicio */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Link to="/" className={styles.button}>
//                   ⬅ Volver al Inicio
//                 </Link>
//               </motion.div>

//               {/* Título principal de la sección */}
//               <motion.h1
//                 className={styles.title}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 Nuestros Servicios
//               </motion.h1>

//               {/* Descripción de los servicios */}
//               <p className={styles.text}>
//                 Conoce los programas y recursos que ofrecemos para mejorar la
//                 seguridad digital y el bienestar en línea.
//               </p>
//             </section>

//             {/* Contenedor de tarjetas de servicios */}
//             <section className={styles.serviceContainer}>
//               {/* Mapeo de los datos de servicios para renderizar las tarjetas */}
//               {servicesData.map((service) => (
//                 <ServiceCard
//                   key={service.id}
//                   title={service.title}
//                   description={service.description}
//                   imageUrl={service.image}
//                 />
//               ))}
//             </section>

//             {/* Llamado a la acción para unirse */}
//             <motion.div
//               className={styles.callToAction}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//             >
//               <h2 className={styles.title}>¿Quieres ser parte del cambio?</h2>

//               <p className={styles.text}>
//                 Únete a nuestra comunidad y ayuda a crear un mundo digital más seguro.
//               </p>

//               <div className={styles.buttonContainer}>
//                 <Link to="/voluntariado" className={styles.button}>
//                   Únete Ahora
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// app/routes/servicios.jsx
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import ServiceSearchFilters from "../components/ServiceSearchFilters";
import { servicesData } from "../data/servicesData";
import styles from "../styles/services.module.css";

/**
 * Componente principal para la página de servicios.
 * Muestra una lista de tarjetas de servicios filtradas según los criterios del usuario.
 */
export default function Servicios() {
  // Estado para almacenar los servicios filtrados
  const [filteredServices, setFilteredServices] = useState(servicesData);
  
  // Manejar cambio en los servicios filtrados
  const handleFilteredServicesChange = (services) => {
    setFilteredServices(services);
  };
  
  return (
    <section className={styles.background}>
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.glassBox}>
            {/* Sección de título y botón de regreso */}
            <section className="text-center space-y-6">
              {/* Botón para volver al inicio */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/" className={styles.button}>
                  ⬅ Volver al Inicio
                </Link>
              </motion.div>
              
              {/* Título principal de la sección */}
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Nuestros Servicios
              </motion.h1>
              
              {/* Descripción de los servicios */}
              <p className={styles.text}>
                Conoce los programas y recursos que ofrecemos para mejorar la
                seguridad digital y el bienestar en línea.
              </p>
            </section>
            
            {/* Componente de filtros y búsqueda con funcionalidad */}
            <ServiceSearchFilters 
              services={servicesData} 
              onFilteredServicesChange={handleFilteredServicesChange} 
            />
            
            {/* Contenedor de tarjetas de servicios */}
            <section className={styles.serviceContainer}>
              {/* Mensaje cuando no hay resultados */}
              {filteredServices.length === 0 ? (
                <div className={styles.noResults}>
                  <h3>No se encontraron servicios</h3>
                  <p>Intenta con otros filtros o términos de búsqueda.</p>
                </div>
              ) : (
                // Mapeo de los servicios filtrados para renderizar las tarjetas
                filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    imageUrl={service.image}
                  />
                ))
              )}
            </section>
            
            {/* Llamado a la acción para unirse */}
            <motion.div
              className={styles.callToAction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className={styles.title}>¿Quieres ser parte del cambio?</h2>
              
              <p className={styles.text}>
                Únete a nuestra comunidad y ayuda a crear un mundo digital más seguro.
              </p>
              
              <div className={styles.buttonContainer}>
                <Link to="/voluntariado" className={styles.button}>
                  Únete Ahora
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}