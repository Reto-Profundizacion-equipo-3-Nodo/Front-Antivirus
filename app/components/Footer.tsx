import logo from "../assets/images/logo.png";
import iconFacebook from "../assets/icons/iconFacebook.svg";
import iconLinkedin from "../assets/icons/iconLinkedin.svg";
import iconIg from "../assets/icons/iconIg.svg";
import iconEmail from "../assets/icons/iconEmail.svg";
import iconTel from "../assets/icons/iconTel.svg";
import iconWhatsapp from "../assets/icons/iconWhatswapp.svg";

const Footer = () => {
  return (
    <div className="bg-[#1B1550]">
      <div className="flex">
        <div className="py-5 relative w-3/12">
          <div className="absolute bg-black w-full h-full top-0 left-0 bg-[linear-gradient(76.87deg,#1D1856_30.7%,#5A4995_153.04%)] z-0"></div>
          <div className="z-10 relative flex justify-center">
            <img className="w-72" src={logo} alt="logo antivirus" />
          </div>
          <div className="text-white text text-center z-10 relative space-y-5">
            <p>También puedes encontrarnos en:</p>
            <div className="flex justify-evenly">
              <img className="w-8" src={iconFacebook} alt="logo facebook" />
              <img className="w-9" src={iconLinkedin} alt="logo linkedin" />
              <img className="w-8" src={iconIg} alt="logo instagram" />
              <img className="w-8" src={iconWhatsapp} alt="logo whatsapp" />
            </div>
          </div>
        </div>
        <div className="w-9/12 flex flex-col items-center text-white pt-2 ">
          <div className="flex flex-col w-2/6 justify-center items-center pb-5">
            <h2 className="text-center text-3xl font-bold">
              ¿Quieres saber más de nosotros?
            </h2>
            <h4 className="text-center text-xl">Contáctanos hoy mismo.</h4>
          </div>
          <div>
            <div className="flex space-x-2 pb-3">
              <img className="w-14" src={iconEmail} alt="logo email" />
              <div>
                <h4 className="text-xl font-bold pt-3">Por e-mail</h4>
                <p>contactenos@fundacionantivirusparaladesercion.org</p>
              </div>
            </div>
            <div className="flex pb-5 space-x-2">
              <img className="w-14" src={iconTel} alt="logo telefono" />
              <div>
                <h4 className="text-xl font-bold pt-3">Por WhatsApp</h4>
                <p>+57 3226367781</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-2xl">Banco de Oportunidades</h3>
          <div className="flex space-x-5">
            <p>Términos y condiciones</p>
            <p>Política de privacidad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
