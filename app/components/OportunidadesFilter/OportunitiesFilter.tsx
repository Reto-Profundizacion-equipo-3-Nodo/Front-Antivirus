import { useState, useEffect } from 'react';
import { fetchOpportunities } from '~/services/fetchOpportunities ';
import OpportunityCard from './OpportunityCard';

const FiltroOportunidades = () => {
    const [query, setQuery] = useState('');
    const [oportunidades, setOportunidades] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [modalityFilter, setModalityFilter] = useState('');
    const [managerFilter, setManagerFilter] = useState('');

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query);
        fetchFilteredOpportunities(query);
    };

    const handleFilterChange = async () => {
        // Actualiza la búsqueda según los filtros seleccionados
        fetchFilteredOpportunities(query);
    };

    const fetchFilteredOpportunities = async (query: string) => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        try {
            const data = await fetchOpportunities(query, token || '');

            // Filtrar las oportunidades según los filtros seleccionados
            const filteredData = data.filter((opportunity: any) => {
                const matchesType = typeFilter ? opportunity.type === typeFilter : true;
                const matchesModality = modalityFilter ? opportunity.modality === modalityFilter : true;
                const matchesManager = managerFilter ? opportunity.manager === managerFilter : true;

                return matchesType && matchesModality && matchesManager;
            });

            setOportunidades(filteredData);
        } catch (error) {
            setError('Hubo un error al obtener las oportunidades');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFilteredOpportunities(query); // Cargar las oportunidades cuando el componente se monte
    }, [query]);

    return (
        <div className="p-6">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Buscar oportunidades..."
                className="p-2 border border-gray-300 rounded-md w-full mb-6 bg-slate-600"
            />

            {/* Filtros */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Tipo</label>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-slate-600"
                        >
                            <option value="">Selecciona Tipo</option>
                            <option value="Beca">Beca</option>
                            <option value="Curso">Curso</option>
                            <option value="Subsidio">Subsidio</option>
                            <option value="Bootcamp">Bootcamp</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Modalidad</label>
                        <select
                            value={modalityFilter}
                            onChange={(e) => setModalityFilter(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-slate-600"
                        >
                            <option value="">Selecciona Modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Online">Online</option>
                            <option value="Mixto">Mixto</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Responsable</label>
                        <select
                            value={managerFilter}
                            onChange={(e) => setManagerFilter(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-slate-600"
                        >
                            <option value="">Selecciona Responsable</option>
                            {/* Asegúrate de que los nombres de los managers estén disponibles aquí */}
                            <option value="Juan Pérez">Juan Pérez</option>
                            <option value="María Gómez">María Gómez</option>
                            <option value="Carlos Martínez">Carlos Martínez</option>
                            <option value="Lucía González">Lucía González</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleFilterChange}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Aplicar Filtros
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 pt-10 pb-10 text-[#1D1856]">
                ¡Oportunidades para estudiar!
            </h2>

            {/* Mostrar las oportunidades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {oportunidades.length > 0 ? (
                    oportunidades.map((opportunity) => (
                        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                    ))
                ) : (
                    <p className="text-gray-500">No se encontraron oportunidades.</p>
                )}
            </div>
        </div>
    );
};

export default FiltroOportunidades;
