import { motion } from "framer-motion";
import React from "react";
import styles from "../styles/services.module.css";

/**
 * Componente para filtrar y buscar servicios.
 * Proporciona una interfaz visual para filtrado sin funcionalidad activa.
 * Este componente actúa como placeholder para futura implementación de funcionalidad.
 */
const ServiceSearchFilters = () => {
  // Categorías de ejemplo para los filtros (solo visuales)
  const categories = ["Todos", "Educación", "Prevención", "Apoyo", "Investigación"];
  const locations = ["Todas", "En línea", "Presencial", "Híbrido"];
  
  return (
    <motion.div 
      className={styles.filterContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.filterTitle}>Filtrar Servicios</h2>
      
      {/* Barra de búsqueda */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <input 
            type="text"
            placeholder="Buscar servicios..."
            className={styles.searchInput}
            aria-label="Buscar servicios"
          />
          <div className={styles.searchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className={styles.filterGroups}>
        {/* Filtro por categoría */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Categoría</label>
          <div className={styles.filterOptions}>
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`${styles.filterPill} ${index === 0 ? styles.filterPillActive : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={index === 0}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Filtro por ubicación */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Modalidad</label>
          <div className={styles.filterOptions}>
            {locations.map((location, index) => (
              <motion.button
                key={index}
                className={`${styles.filterPill} ${index === 0 ? styles.filterPillActive : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={index === 0}
              >
                {location}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Filtro por año (range slider) */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="yearRange">
            Año de lanzamiento
          </label>
          <input
            id="yearRange"
            type="range"
            className={styles.rangeSlider}
            min="2018"
            max="2025"
            defaultValue="2025"
            aria-valuemin="2018"
            aria-valuemax="2025"
            aria-valuenow="2025"
          />
          <div className={styles.rangeValues}>
            <span>2018</span>
            <span>2025</span>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className={styles.actionButtons}>
        <motion.button 
          className={styles.resetButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Limpiar todos los filtros"
        >
          Limpiar filtros
        </motion.button>
        <motion.button 
          className={styles.applyButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Aplicar los filtros seleccionados"
        >
          Aplicar filtros
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceSearchFilters;