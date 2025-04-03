interface Opportunity {
    name: string;
    // Add other fields of the opportunity object if needed
}

export const fetchOpportunities = async (query: string, token: string): Promise<Opportunity[]> => {
    try {
        if (!token) {
            throw new Error('No hay token disponible');
        }

        const response = await fetch(`http://localhost:5261/api/Opportunity?query=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
        }

        const data: Opportunity[] = await response.json();

        // Filtrar oportunidades por 'Nombre' que contengan el término de búsqueda
        if (query) {
            return data.filter(opportunity =>
                opportunity.name.toLowerCase().includes(query.toLowerCase())
            );
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
