import { Link } from "@remix-run/react";

export default function Home() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Texto */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[400] font-impact leading-tight tracking-wide text-[#1D1856]">
            ¡Tu futuro inicia aquí!
          </h1>
          <p className="text-lg md:text-xl font-[400] font-reddit leading-relaxed tracking-wide text-justify text-[#252525]">
            En la Fundación Antivirus para la Deserción creemos que cada persona merece acceso a las mejores oportunidades. Por eso, ofrecemos una plataforma personalizada donde puedes explorar becas, cursos y programas adaptados a tus intereses y necesidades.
          </p>
          {/* Botones */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-4">
            <Link to="/contacto"
              className="px-5 py-3 text-white rounded-full shadow-lg transition text-lg font-[400] font-impact tracking-wide text-center"
              style={{ background: "#32526E", minWidth: "180px" }}>
                Contáctanos
            </Link>
            <Link to="/sobre-nosotros"
              className="px-5 py-3 border border-gray-300 bg-transparent rounded-full transition text-lg font-[400] font-impact tracking-wide text-center underline" style={{ color: "#32526E", minWidth: "180px" }}>Conoce sobre nosotros
            </Link>
          </div>
        </div>
        {/* Imagen */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/public/images/Analyse.png"
            alt="Ilustración"
            className="w-[130%] max-w-[700px] md:max-w-[850px] lg:max-w-[900px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
