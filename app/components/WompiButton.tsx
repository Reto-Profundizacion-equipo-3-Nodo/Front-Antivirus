import { FC } from "react";
import WhatsAppSupportButton from "./WhatsAppButton";

const WompiButton: FC = () => {
    const goToUrl = () => {
        const url = "https://checkout.wompi.co/l/FRfRVa";
        window.open(url, "_blank");
    };

    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4 items-center">
            {/* Botón Wompi */}
            <button
                onClick={goToUrl}
                className="group flex items-center gap-4 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                aria-label="Realizar donación con Wompi"
            >
                <img
                    src="/Images/boton-wompi.png"
                    alt="Donar con Wompi"
                    className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12"
                />
                <span className="text-lg">Donar</span>
            </button>
            {/* Botón WhatsApp */}
            <WhatsAppSupportButton />
        </div>
    );
};

export default WompiButton;

