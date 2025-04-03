interface OpportunityCardProps {
    opportunity: {
        id: string;
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
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-[#2c3e50] dark:text-[#ecf0f1]" key={opportunity.id}>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-[#ecf0f1] mb-2">{opportunity.name}</h3>
            <p className="text-blue-600 font-medium mb-2 dark:text-blue-400">{opportunity.type}</p>
            <p className="text-gray-600 text-sm mb-4 dark:text-[#bdc3c7]">{opportunity.description}</p>
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
    );
};

export default OpportunityCard;
