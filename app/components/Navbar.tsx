import { Form, Link, useLocation } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Search, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";


interface NavbarProps {
  isAuthenticated: boolean;
}

interface UserData {
  email: string;
  avatarUrl?: string;
  name: string;
  role: string;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const location = useLocation();
  // Estados
  //estado que guarda los datos del usuario
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (!userMenuRef.current || !userButtonRef.current) return;

       const target = event.target as Node;
       const isClickInsideMenu = userMenuRef.current.contains(target);
       const isClickOnButton = userButtonRef.current.contains(target);

       if (!isClickInsideMenu && !isClickOnButton) {
         setIsUserMenuOpen(false);
       }
     };

     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const toggleTheme = () => {
     setIsDarkMode(!isDarkMode);
     document.documentElement.classList.toggle("dark");
   };

  // Obtener los datos del usuario al cargar la página
  useEffect(() => {
    setCurrentUser(getUserData());
  }, [location]);
  // Función para obtener los datos del usuario
  const getUserData = (): UserData | null => {
    if (typeof document === "undefined") return null;

    // Buscar el token en las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    try {
      // Decodificar el token
      //TODO: Guardar en env los decodificadores
      const decoded: any = jwtDecode(token);
      return {
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        // cambiar esto para que busque el avatar
        avatarUrl: decoded["avatarUrl"] || "https://api.dicebear.com/9.x/pixel-art/svg",
      };
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };
 

  console.log(currentUser)
  return (
    <nav className="bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:bg-[#172a41] text-white py-2 px-10 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="h-16 flex items-center pl-4">
        <img
          src="/public/images/logo.png"
          alt="Logo"
          className="max-h-20 w-auto object-contain"
        />
      </div>

      {/*Opciones pantallas grandes */}
      <ul className="hidden md:flex gap-16 font-bold text-lg">
        <li className="relative group">
          <Link
            to="/"
            className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
          >
            Inicio
          </Link>
        </li>

        <li className="relative group">
          <Link
            to="/services"
            className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
          >
            Servicios
          </Link>

        </li>

        <li className="relative group">
          <Link
            to="#oportunidades"
            className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
          >
            Oportunidades
          </Link>
        </li>

        <li className="relative group">
          <Link
            to="/novedades"
            className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
          >
            Novedades
          </Link>
        </li>
      </ul>

      {/*Iconos pantalla grande*/}
      <div className="hidden md:flex items-center space-x-4">
        {/* Búsqueda */}
        <button
          className="hover:text-yellow-300 transition"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="w-6 h-6" />
        </button>

        {isSearchOpen && (
          <input
            type="text"
            placeholder="Buscar"
            className="bg-white bg-opacity-20 text-white placeholder-gray-300 px-6 py-2 rounded-full outline-none"
          />
        )}

        {/* Modo oscuro */}
        <button
          onClick={toggleTheme}
          className="hover:text-yellow-300 transition"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* Menú usuario */}
        <div className="relative">
          <button
            className="hover:text-yellow-300 transition"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            {isAuthenticated ?
              <img
                src={currentUser?.avatarUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              :
              <User className="w-6 h-6" />
            }
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-10 bg-white bg-opacity-50 backdrop-blur-lg text-black shadow-md rounded-lg w-32 z-50">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-1.5 text-base text-right font-semibold">
                    {currentUser?.name}
                  </div>
                  <div className="px-3 py-1.5 text-base text-right font-semibold">
                    {currentUser?.email}
                  </div>
                  <div className="px-3 py-1.5 text-base text-right font-semibold">
                    {currentUser?.role}
                  </div>
                  <Form method="post" action="/logout" >
                    <button type="submit"
                      className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
                      Cerrar sesión
                    </button>
                  </Form>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Iconos pantalla pequeña */}
      < div className="flex md:hidden items-center gap-4" >
        <button onClick={toggleTheme}>
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* TODO falta implementar la autenticacion para pantallas pequeñas */}
        <div className="flex gap-4 w-full justify-center">
          <Link
            to="/login"
            className="bg-[#32526E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 hover:bg-[#233947]"
          >
            Login
          </Link>
        </div>

        {/* Botón del menú animado */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-6 w-6 focus:outline-none group"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
          ></span>

          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
              }`}
          ></span>

          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
          ></span>
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {
        isOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg flex flex-col items-center p-4 gap-4 md:hidden z-50">
            {/* Búsqueda */}
            <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md w-full max-w-xs">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent outline-none w-full"
              />
            </div>

            {/* Opcione menú */}
            <ul className="flex flex-col gap-4 w-full text-center text-lg">
              <li>
                <Link
                  to="/"
                  className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  to="/services" // Cambiamos el ancla por la ruta correcta
                  className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
                >
                  Servicios
                </Link>

              </li>

              <li>
                <Link
                  to="#oportunidades"
                  className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
                  onClick={() => setIsOpen(false)}
                >
                  Oportunidades
                </Link>
              </li>

              <li>
                <Link
                  to="/novedades"
                  className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
                  onClick={() => setIsOpen(false)}
                >
                  Novedades
                </Link>
              </li>
            </ul>

            {/* Boton register */}
            <div className="flex gap-4 w-full justify-center">
              <Link
                to="/register"
                className="bg-[#f0d437] text-white font-bold px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947] text-stroke-black"
              >
                Registrarme
              </Link>
            </div>
          </div>
        )
      }
    </nav >
  );
}