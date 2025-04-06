import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ShieldCheck, X } from "lucide-react";

const whatsappLink =
  "https://wa.me/573217066273?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios%20🤖";
const wompiLink = "https://checkout.wompi.co/l/FRfRVa";

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Efecto magnético
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;
      mouseX.set(x * 0.05);
      mouseY.set(y * 0.05);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const buttonVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 400, damping: 25 },
    }),
    exit: { y: 20, opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Botón WhatsApp */}
            <motion.a
              custom={1}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ x: springX, y: springY }}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveButton("whatsapp")}
              onMouseLeave={() => setActiveButton(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#25D366]"
              aria-label="Chatea con nosotros por WhatsApp"
            >
              <FaWhatsapp className="w-7 h-7 text-white" />

              {/* Tooltip WhatsApp */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: activeButton === "whatsapp" ? 1 : 0,
                  x: activeButton === "whatsapp" ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className="absolute right-full mr-4 px-3 py-1 text-sm font-medium rounded-lg whitespace-nowrap
                  bg-white text-gray-800 shadow-md hidden sm:block"
              >
                Chatea con nosotros
                <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 
                  border-t-4 border-l-4 border-b-4 border-transparent border-l-white"></span>
              </motion.div>
            </motion.a>

            {/* Botón Wompi */}
            <motion.a
              custom={2}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ x: springX, y: springY }}
              href={wompiLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveButton("wompi")}
              onMouseLeave={() => setActiveButton(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#FFE680]"

              aria-label="Haz tu donación con Wompi"
            >
              <img
                src="/Images/boton-wompi.png"
                alt="Donar con Wompi"
                className="w-[90%] h-[90%] object-contain"
              />

              {/* Tooltip Wompi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: activeButton === "wompi" ? 1 : 0,
                  x: activeButton === "wompi" ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className="absolute right-full mr-4 px-3 py-1 text-sm font-medium rounded-lg whitespace-nowrap
                  bg-white text-gray-800 shadow-md hidden sm:block"
              >
                ¡Haz tu donación!
                <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 
                  border-t-4 border-l-4 border-b-4 border-transparent border-l-white"></span>
              </motion.div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
        onClick={() => setIsVisible(!isVisible)}
        className={`relative rounded-full p-4 transition-all duration-300
          ${isVisible
            ? "bg-white text-blue-600 shadow-md hover:shadow-lg"
            : "bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg hover:shadow-xl pulse-animation"}`}
        aria-label="Alternar botones"
      >
        {isVisible ? <X className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
        {!isVisible && (
          <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-30"></span>
        )}
      </motion.button>

      {/* Estilo de animación personalizada */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse-animation {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            70% {
              box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
          }
          .pulse-animation {
            animation: pulse-animation 2s infinite;
          }
        `,
        }}
      />
    </div>
  );
};

export default FloatingButtons;
