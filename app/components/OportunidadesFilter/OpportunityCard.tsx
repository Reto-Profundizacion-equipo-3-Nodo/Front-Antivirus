import { useState } from "react";

interface OpportunityCardProps {
    opportunity: {
        id: string;
        img: string;
        name: string;
        type: string;
        description: string;
        requires: string;
        guide: string;
        additionalDates: string;
        serviceChannels: string;
        modality: string;
        manager: string;
    };
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
    const [expanded, setExpanded] = useState(false);
    const imagen = {
        heading: "Alianza Empresarial - Comfama",
        img: "/public/images/comfamalogo.png",
    }


    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };
    return (
        <div className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-20px)] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" key={opportunity.id}>
            <img
                src={imagen.img}
                alt={imagen.heading}
                className="w-full h-48 object-cover transform transition-all duration-300 hover:scale-105"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-[#1D1856]">{opportunity.name}</h3>
                    <button className="px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
                        GUARDAR
                    </button>
                </div>
                <p className="text-gray-600"><strong>Tipo:</strong> {opportunity.type}</p>

                <p className="text-gray-600">
                    <strong>Descripción:</strong> {opportunity.description}
                </p>

                {/* Información adicional que se muestra con "ver más" */}
                {expanded && (
                    <div className="mt-4 text-gray-600">
                        <p><strong>Requiere:</strong> {opportunity.requires}</p>
                        <p><strong>Guía:</strong> {opportunity.guide}</p>
                        <p><strong>Fechas adicionales:</strong> {opportunity.additionalDates}</p>
                        <p>
                            <strong>Canales de servicio:</strong>
                            <a href={opportunity.serviceChannels} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
                                {opportunity.serviceChannels}
                            </a>
                        </p>
                        <p><strong>Modalidad:</strong> {opportunity.modality}</p>
                        <p><strong>Responsable:</strong> {opportunity.manager}</p>
                    </div>
                )}
                <button
                    onClick={handleToggleDescription}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                    {expanded ? "ver menos" : "ver más"}
                </button>
            </div>
        </div>
    );
};

export default OpportunityCard;
