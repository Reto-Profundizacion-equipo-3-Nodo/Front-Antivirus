import { FC, useState } from 'react';
import WhatsAppSupportButton from './WhatsAppButton';
import { FaWhatsapp } from 'react-icons/fa';

const WompiButton: FC = () => {
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    // Función para abrir la URL en una nueva ventana
    const goToUrl = () => {
        const url = 'https://checkout.wompi.co/l/FRfRVa';
        window.open(url, '_blank');
    };

    return (
        <div className="fixed right-5 bottom-0 mb-12 z-50 flex items-center gap-4">
            <WhatsAppSupportButton />
            <button
                onClick={goToUrl}
                className="btnwompi flex items-center bg-[#FDC80A] text-white font-bold py-0 px-10 rounded-full hover:bg-[#FAA307] fixed right-5 bottom-0 mb-12 transform transition-transform hover:scale-105 z-200"
            >
                <img
                    src="/public/Images/boton-wompi.png"
                    alt="Logo"
                    className="w-20 h-20 mr-6"
                />
                Donate
            </button>

        </div>
    );
};

export default WompiButton;
