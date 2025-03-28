// app/components/WhatsAppSupportButton.jsx
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@remix-run/react";

const WhatsAppSupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="fixed right-4 bottom-4 z-50 flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        className={`transition-all duration-300 ease-in-out bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 cursor-pointer 
        ${isOpen ? "w-auto opacity-100" : "w-12 opacity-90"}`}
      >
        <FaWhatsapp className="text-2xl" />
        {isOpen && <span className="whitespace-nowrap font-medium">WhatsApp</span>}
      </div>
      <Link
        to="https://wa.me/573217066273"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Soporte por WhatsApp"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default WhatsAppSupportButton;
