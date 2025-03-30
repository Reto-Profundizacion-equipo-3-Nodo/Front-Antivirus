import { useState, useEffect } from "react";

export default function HomeServices() {
  const servicios = [
    {
      id: 1,
      titulo: "Pro-Vocación",
      descripcion:
        "Descubre tu verdadera vocación a través de nuestro programa Pro-Vocación. Te ayudamos a identificar tus fortalezas y a explorar las mejores opciones educativas y profesionales. ¡Da el primer paso hacia tu futuro hoy!",
      imagen: "/public/images/ProVocacion.png",
    },
    {
      id: 2,
      titulo: "Asesoría Sociopedagógica",
      descripcion:
        "Recibe orientación personalizada para superar los desafíos educativos. Nuestra asesoría sociopedagógica te ofrece herramientas y estrategias para mejorar tu rendimiento académico y bienestar personal.",
      imagen: "/public/images/AsesoriaSociopedagogica.png",
    },
    {
      id: 3,
      titulo: "Test Sociovocacional",
      descripcion:
        "¿No estás seguro de cuál es la mejor carrera para ti? Nuestro Test Sociovocacional te guiará en la elección de una carrera basada en tus intereses, habilidades y valores personales. ¡Descubre tu camino ideal!",
      imagen: "/public/images/TestSociovocacional.png",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % servicios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [servicios.length]);

  return (
    <section className="relative h-auto bg-gradient-to-b from-white to-blue-200 pb-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="pt-6 text-3xl md:text-4xl lg:text-4xl font-bold text-[#292525] text-center">SERVICIOS</h2>
        <div className="relative flex items-center justify-center overflow-hidden w-full ">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {servicios.map((servicio) => (
              <div key={servicio.id} className="w-full flex-shrink-0 px-4 flex justify-center">
                <div className="rounded-lg overflow-hidden flex flex-col items-center text-center p-6">
                  <img
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    className="rounded-lg w-[472px] h-[297px] object-contain"
                  />
                  <h3 className="pt-2 text-xl font-impact text-[#292525]">{servicio.titulo}</h3>
                  <p className="text-[#252525] font-reddit text-sm mt-2">{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
