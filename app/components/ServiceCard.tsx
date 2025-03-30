import { motion } from "framer-motion";

/**
 * Interfaz para las propiedades del componente ServiceCard.
 */
interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * Componente para mostrar una tarjeta de servicio individual.
 */
export default function ServiceCard({
  title,
  description,
  imageUrl,
}: ServiceCardProps) {
  return (
    <motion.div
      className="relative bg-white/80 shadow-lg rounded-lg overflow-hidden p-4 min-h-[320px] flex flex-col justify-between border-2 border-transparent transition duration-300 items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(76, 154, 255, 0.5)"
      }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      {/* Imagen del servicio */}
      <div className="relative w-full h-40 mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          style={{ maxHeight: "160px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
      </div>

      {/* Contenido del servicio */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#212d55]">{title}</h3>
        <p className="text-gray-700 text-sm mt-2">{description}</p>
      </div>
    </motion.div>
  );
}