
interface TimelineStep {
    number: string;
    title: string;
    description: string;
}
export default function FooterRegister() {
    const steps: TimelineStep[] = [
        {
            number: "1",
            title: "Registro y creación del perfil personal",
            description:
                "In order for us at daCode to know that we are a good fit for your project we always start with screening questions in order to make sure that we are a suitable match for your company.",
        },
        {
            number: "2",
            title: "Recomendaciones personalizadas",
            description:
                "This meeting will be a meeting where we together go over our proposed strategy on how we can reach your website goals. Here we will establish a project update system where you will be able to follow the whole process from start to finish.",
        },
        {
            number: "3",
            title: "Guardar oportunidades",
            description:
                "In this step we will have a team meeting with the project manager and the lead developer and designer. Then we will be working using and agile and scrum framework in order to make sure to deliver your project on time and within budget.",
        },
        {
            number: "4",
            title: "Contenido exclusivo",
            description:
                "The final checks of the website will happen, we will make sure that all tracking pixels, links and user interface is compatible with all different devices. We will also perform a few different tests to make sure that the website is optimised for user experience.",
        },
    ];
    return (
        <section className="flex flex-col md:flex-row bg-white p-6 mt-6 rounded-lg shadow-md z-10">
            <div className="from-blue-50 to-gray-100 py-16 md:py-0 px-4 sm:px-6 lg:px-8 md:w-1/2">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative pb-12 last:pb-0">
                                {index !== steps.length - 1 && (
                                    <div className="absolute left-8 top-14 bottom-0 w-0.5 bg-blue-200"></div>
                                )}
                                <div className="relative flex items-start group">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-blue-500 z-10">
                                        <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                                    </div>
                                    <div className="ml-6 pt-2">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {step.title}
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Imagen Footer*/}
            <div className="md:w-1/2 w-full flex justify-center mt-0 md:mt-52">
                <div className="w-full max-w-lg">
                    <img
                        src="/registerImg.png"
                        alt="registerImg"
                        className="w-full h-auto rounded-lg shadow"
                    />
                </div>
            </div>
        </section>
    )
}