// import { FC } from 'react';

// const WompiButton: FC = () => {
//     // Función para abrir la URL en una nueva ventana
//     const goToUrl = () => {
//         const url = 'https://checkout.wompi.co/l/FRfRVa';
//         window.open(url, '_blank');
//     };

//     return (
//         <button
//             onClick={goToUrl}
//             className="btnwompi flex items-center bg-[#FDC80A] text-white font-bold py-0 px-10 rounded-full hover:bg-[#FAA307] fixed right-5 bottom-0 mb-12 transform transition-transform hover:scale-105 z-200"
//         >
//             <img
//                 src="/public/images/boton-wompi.png"  // Cambia la ruta según sea necesario
//                 alt="Logo"
//                 className="w-20 h-20 mr-6"
//             />
//             Donate
//         </button>
//     );
// };

// export default WompiButton;

import { FC } from "react";

const WompiButton: FC = () => {
  const goToUrl = () => {
    const url = "https://checkout.wompi.co/l/FRfRVa";
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={goToUrl}
      className="group fixed right-6 bottom-6 z-50 flex items-center gap-4 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      aria-label="Realizar donación con Wompi"
    >
      <img
        src="/images/boton-wompi.png" // ✅ sin /public
        alt="Donar con Wompi"
        className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12"
      />
      <span className="text-lg">Donar</span>
    </button>
  );
};

export default WompiButton;

