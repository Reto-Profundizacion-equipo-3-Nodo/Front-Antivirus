import { FC } from 'react';

const WompiButton: FC = () => {
    // Función para abrir la URL en una nueva ventana
    const goToUrl = () => {
        const url = 'https://checkout.wompi.co/l/FRfRVa';
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={goToUrl}
            className="btnwompi flex items-center bg-[#FDC80A] text-white font-bold py-0 px-10 rounded-full hover:bg-[#FAA307] fixed right-5 bottom-0 mb-12 transform transition-transform hover:scale-105 z-200"
        >
            <img
                src="/public/images/boton-wompi.png"  // Cambia la ruta según sea necesario
                alt="Logo"
                className="w-20 h-20 mr-6"
            />
            Donate
        </button>
    );
};

export default WompiButton;
