import OportunitiesFilter from "~/components/OportunidadesFilter/OportunitiesFilter";

export default function Novedades() {
    return (
        <div className="p-8 bg-[#e2e8f0] min-h-screen">
            <h1 className="text-4xl font-bold sm:text-4xl md:text-5xl lg:text-6xl font-impact leading-tight tracking-wide text-center text-[#1D1856] mb-8">Novedades</h1>
            <OportunitiesFilter />
        </div>
    );
}
