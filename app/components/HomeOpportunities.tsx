import { FC } from "react";

const opportunitiesData = [
  {
    id: 1,
    image: "/public/images/LogoNodo.png",
    title: "NODO EAFIT",
    description:
      "Participa en programas de formación y talleres en la Universidad EAFIT en la era de la tecnología para potenciar tus habilidades y conocimientos. ¡Inscríbete hoy!",
    link: "https://es.nodoeafit.com/",
  },
  {
    id: 2,
    image: "/public/images/BecasVelez.png",
    title: "VÉLEZ REYES +",
    description:
      "Ofrecen apoyo financiero a estudiantes destacados. Solicita tu beca y alcanza tus metas educativas.",
    link: "https://velezreyesmas.com/",
  },
  {
    id: 3,
    image: "/public/images/Comfama.png",
    title: "COMFAMA",
    description:
      "Accede a programas educativos y recreativos con Comfama. Encuentra la oportunidad perfecta para tu crecimiento personal y profesional.",
    link: "https://www.comfama.com/trabajo-con-proposito/empleo/centro-de-empleo-para-la-industria-digital/",
  },
];

const HomeOpportunities: FC = () => {
  return (
    <section className="bg-blue-100 py-16 px-6">
      {/* Título y sello */}
      <div className="flex items-center justify-center mb-8 gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1856] text-center">
          ¡Mira estas oportunidades!
        </h2>
        <img
          src="/public/images/SelloNodo.png"
          alt="Sello antivirus"
          className="w-20 md:w-24 lg:w-36"
        />
      </div>

      {/* Contenedor de oportunidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {opportunitiesData.map((opportunity) => (
          <div
            key={opportunity.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border-t-4 flex flex-col justify-between items-start min-h-[320px]"
            style={{ borderColor: "#32526E" }}
          >
            {/* Imagen con enlace */}
            <a
              href={opportunity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="h-20 object-contain mb-4 cursor-pointer"
              />
            </a>

            {/* Contenido */}
            <div className="text-left">
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <h3 className="text-xl font-bold text-[#292525]">
                  {opportunity.title}
                </h3>
              </a>
              <p className="text-[#252525] text-sm mt-2">
                {opportunity.description}
              </p>
            </div>

            {/* Enlace */}
            <a
              href={opportunity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold mt-auto no-underline hover:underline"
            >
              Leer más →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeOpportunities;
