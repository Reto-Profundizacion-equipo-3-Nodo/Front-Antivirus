import { useState } from "react";
import { LoaderFunction, useLoaderData } from "@remix-run/react";
import OportunitiesFilter from "~/components/OportunidadesFilter/OportunitiesFilter";

type LoaderData = {
  message: string;
  media: string[];
  items: Array<{
    heading: string;
    img: string;
    content: string;
  }>;
};

export const loader: LoaderFunction = () => {
  return {
    message: "Ultimas Novedades",
    media: [
      "/public/images/comfamalogo.png",
      "/public/images/LogoNodo.png",
      "/public/images/comfamalogo.png",
      "/public/images/LogoNodo.png",
    ],
    items: [
      {
        heading: "Alianza Empresarial - Comfama",
        img: "/public/images/comfamalogo.png",
        content:
          "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento...",
      },
      {
        heading: "Alianza Empresarial - Comfama",
        img: "/public/images/comfamalogo.png",
        content:
          "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento...",
      },
      {
        heading: "Alianza Empresarial - Comfama",
        img: "/public/images/comfamalogo.png",
        content:
          "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento...",
      },
      {
        heading: "Alianza Empresarial - Comfama",
        img: "/public/images/comfamalogo.png",
        content:
          "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento...",
      },
    ],
  };
};

export default function Novedades() {
  const data = useLoaderData<LoaderData>();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [expanded, setExpanded] = useState<boolean[]>(
    new Array(data.items.length).fill(false)
  );

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % data.media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + data.media.length) % data.media.length
    );
  };

  const toggleExpand = (index: number) => {
    setExpanded((prev) => prev.map((exp, i) => (i === index ? !exp : exp)));
  };

  return (
    <div className="p-8 bg-[#e2e8f0] min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[400] font-impact leading-tight tracking-wide text-[#1D1856] text-center mb-8">
        Novedades
      </h1>

      <p className="text-center text-lg text-gray-700 mb-4">{data.message}</p>

      <div className="flex flex-col items-center mb-12">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl">
          <div className="flex transition-transform duration-500 ease-out">
            <img
              src={data.media[currentMediaIndex]}
              alt="Carousel"
              className="w-full h-[500px] object-cover rounded-2xl transform transition-all duration-300 hover:scale-105"
            />
          </div>

          <button
            onClick={prevMedia}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white/95 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-[#1D1856]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextMedia}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white/95 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-[#1D1856]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {data.media.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentMediaIndex === index ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <OportunitiesFilter />

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-20px)] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.img}
              alt={item.heading}
              className="w-full h-48 object-cover transform transition-all duration-300 hover:scale-105"
            />

            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-[#1D1856]">
                  {item.heading}
                </h2>
                <button className="px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
                  GUARDAR
                </button>
              </div>

              <p className="text-gray-600">
                {expanded[index]
                  ? item.content
                  : `${item.content.substring(0, 70)}...`}

                {item.content.length > 70 && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {expanded[index] ? "ver menos" : "ver más"}
                  </button>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
