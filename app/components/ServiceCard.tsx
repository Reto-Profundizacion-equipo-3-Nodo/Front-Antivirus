import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <motion.div 
      className="relative bg-white/80 shadow-lg rounded-lg overflow-hidden p-4 w-[300px] h-[300px] flex flex-col justify-between border-2 border-transparent transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 10px 20px rgba(76, 154, 255, 0.5)"
      }}
      transition={{ duration: 0.15, ease: "easeInOut" }} // Más fluido y sin retraso
    >

      {/* Imagen con gradiente */}
      <div className="relative w-full h-40">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
      </div>

      {/* Contenido */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#212d55]">{title}</h3>
        <p className="text-gray-700 text-sm mt-2">{description}</p>
      </div>
    </motion.div>
  );
}