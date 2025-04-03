// import { Form, Link, useLocation } from "@remix-run/react";
// import { useState, useEffect, useRef } from "react";
// import { Sun, Moon, Search, User } from "lucide-react";
// import { jwtDecode } from "jwt-decode";


// interface NavbarProps {
//   isAuthenticated: boolean;
// }

// interface UserData {
//   email: string;
//   avatarUrl?: string;
//   name: string;
//   role: string;
// }

// export default function Navbar({ isAuthenticated }: NavbarProps) {
//   const location = useLocation();
//   // Estados
//   //estado que guarda los datos del usuario
//   const [currentUser, setCurrentUser] = useState<UserData | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const userMenuRef = useRef<HTMLDivElement>(null);
//   const userButtonRef = useRef<HTMLButtonElement>(null);

//    useEffect(() => {
//      const handleClickOutside = (event: MouseEvent) => {
//        if (!userMenuRef.current || !userButtonRef.current) return;

//        const target = event.target as Node;
//        const isClickInsideMenu = userMenuRef.current.contains(target);
//        const isClickOnButton = userButtonRef.current.contains(target);

//        if (!isClickInsideMenu && !isClickOnButton) {
//          setIsUserMenuOpen(false);
//        }
//      };

//      document.addEventListener("mousedown", handleClickOutside);
//      return () => document.removeEventListener("mousedown", handleClickOutside);
//    }, []);

//    const toggleTheme = () => {
//      setIsDarkMode(!isDarkMode);
//      document.documentElement.classList.toggle("dark");
//    };

//   // Obtener los datos del usuario al cargar la página
//   useEffect(() => {
//     setCurrentUser(getUserData());
//   }, [location]);
//   // Función para obtener los datos del usuario
//   const getUserData = (): UserData | null => {
//     if (typeof document === "undefined") return null;

//     // Buscar el token en las cookies
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) return null;

//     try {
//       // Decodificar el token
//       //TODO: Guardar en env los decodificadores
//       const decoded: any = jwtDecode(token);
//       return {
//         name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
//         email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
//         role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
//         // cambiar esto para que busque el avatar
//         avatarUrl: decoded["avatarUrl"] || "https://api.dicebear.com/9.x/pixel-art/svg",
//       };
//     } catch (error) {
//       console.error("Error al decodificar el token", error);
//       return null;
//     }
//   };
 

//   console.log(currentUser)
//   return (
//     <nav className="bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:bg-[#172a41] text-white py-2 px-10 flex justify-between items-center relative z-50">
//       {/* Logo */}
//       <div className="h-16 flex items-center pl-4">
//         <img
//           src="/public/images/logo.png"
//           alt="Logo"
//           className="max-h-20 w-auto object-contain"
//         />
//       </div>

//       {/*Opciones pantallas grandes */}
//       <ul className="hidden md:flex gap-16 font-bold text-lg">
//         <li className="relative group">
//           <Link
//             to="/"
//             className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
//           >
//             Inicio
//           </Link>
//         </li>

//         <li className="relative group">
//           <Link
//             to="/services"
//             className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
//           >
//             Servicios
//           </Link>

//         </li>

//         <li className="relative group">
//           <Link
//             to="#oportunidades"
//             className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
//           >
//             Oportunidades
//           </Link>
//         </li>

//         <li className="relative group">
//           <Link
//             to="/novedades"
//             className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
//           >
//             Novedades
//           </Link>
//         </li>
//       </ul>

//       {/*Iconos pantalla grande*/}
//       <div className="hidden md:flex items-center space-x-4">
//         {/* Búsqueda */}
//         <button
//           className="hover:text-yellow-300 transition"
//           onClick={() => setIsSearchOpen(!isSearchOpen)}
//         >
//           <Search className="w-6 h-6" />
//         </button>

//         {isSearchOpen && (
//           <input
//             type="text"
//             placeholder="Buscar"
//             className="bg-white bg-opacity-20 text-white placeholder-gray-300 px-6 py-2 rounded-full outline-none"
//           />
//         )}

//         {/* Modo oscuro */}
//         <button
//           onClick={toggleTheme}
//           className="hover:text-yellow-300 transition"
//         >
//           {isDarkMode ? (
//             <Sun className="w-6 h-6" />
//           ) : (
//             <Moon className="w-6 h-6" />
//           )}
//         </button>

//         {/* Menú usuario */}
//         <div className="relative">
//           <button
//             className="hover:text-yellow-300 transition"
//             onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//           >
//             {isAuthenticated ?
//               <img
//                 src={currentUser?.avatarUrl}
//                 alt="Avatar"
//                 className="w-8 h-8 rounded-full border border-gray-300"
//               />
//               :
//               <User className="w-6 h-6" />
//             }
//           </button>

//           {isUserMenuOpen && (
//             <div className="absolute right-0 top-10 bg-white bg-opacity-50 backdrop-blur-lg text-black shadow-md rounded-lg w-32 z-50">
//               {isAuthenticated ? (
//                 <>
//                   <div className="px-3 py-1.5 text-base text-right font-semibold">
//                     {currentUser?.name}
//                   </div>
//                   <div className="px-3 py-1.5 text-base text-right font-semibold">
//                     {currentUser?.email}
//                   </div>
//                   <div className="px-3 py-1.5 text-base text-right font-semibold">
//                     {currentUser?.role}
//                   </div>
//                   <Form method="post" action="/logout" >
//                     <button type="submit"
//                       className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
//                       Cerrar sesión
//                     </button>
//                   </Form>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
//                     Login
//                   </Link>
//                   <Link to="/register" className="block px-3 py-1.5 text-base hover:bg-yellow-300/60 transition-colors text-right">
//                     Registrarme
//                   </Link>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Iconos pantalla pequeña */}
//       < div className="flex md:hidden items-center gap-4" >
//         <button onClick={toggleTheme}>
//           {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
//         </button>

//         {/* TODO falta implementar la autenticacion para pantallas pequeñas */}
//         <div className="flex gap-4 w-full justify-center">
//           <Link
//             to="/login"
//             className="bg-[#32526E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 hover:bg-[#233947]"
//           >
//             Login
//           </Link>
//         </div>

//         {/* Botón del menú animado */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="relative h-6 w-6 focus:outline-none group"
//           aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
//         >
//           <span
//             className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
//               }`}
//           ></span>

//           <span
//             className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
//               }`}
//           ></span>

//           <span
//             className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
//               }`}
//           ></span>
//         </button>
//       </div>

//       {/* Menú desplegable en móviles */}
//       {
//         isOpen && (
//           <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg flex flex-col items-center p-4 gap-4 md:hidden z-50">
//             {/* Búsqueda */}
//             <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md w-full max-w-xs">
//               <Search size={20} />
//               <input
//                 type="text"
//                 placeholder="Buscar"
//                 className="bg-transparent outline-none w-full"
//               />
//             </div>

//             {/* Opcione menú */}
//             <ul className="flex flex-col gap-4 w-full text-center text-lg">
//               <li>
//                 <Link
//                   to="/"
//                   className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Inicio
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/services" // Cambiamos el ancla por la ruta correcta
//                   className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
//                 >
//                   Servicios
//                 </Link>

//               </li>

//               <li>
//                 <Link
//                   to="#oportunidades"
//                   className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Oportunidades
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/novedades"
//                   className="block py-2 transition-colors duration-300 hover:text-[#708BC6]"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Novedades
//                 </Link>
//               </li>
//             </ul>

//             {/* Boton register */}
//             <div className="flex gap-4 w-full justify-center">
//               <Link
//                 to="/register"
//                 className="bg-[#f0d437] text-white font-bold px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947] text-stroke-black"
//               >
//                 Registrarme
//               </Link>
//             </div>
//           </div>
//         )
//       }
//     </nav >
//   );
// }
import { Form, Link, useLocation } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Search, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface NavbarProps {
  isAuthenticated?: boolean; // Opcional con valor predeterminado
}

interface UserData {
  email: string;
  avatarUrl?: string;
  name: string;
  role: string;
}

export default function Navbar({ isAuthenticated: propIsAuthenticated }: NavbarProps) {
  const location = useLocation();
  // Estados
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated || false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Inicializar el tema basado en la preferencia guardada
  useEffect(() => {
    if (typeof window === 'undefined') return; // Verificación SSR
    
    // Verificar si hay una preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Establecer el tema basado en la preferencia guardada o la preferencia del sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    // También verificamos la autenticación aquí
    checkAuthentication();
  }, []);

  // Verificar la autenticación cuando cambia la ubicación
  useEffect(() => {
    checkAuthentication();
  }, [location]);

  // Cerrar menú de usuario al hacer clic fuera
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

  // Función para verificar si el usuario está autenticado
  const checkAuthentication = () => {
    if (typeof document === "undefined") return;
    
    // Verificar si hay un token en las cookies
    const userData = getUserData();
    
    if (userData) {
      setCurrentUser(userData);
      setIsAuthenticated(true);
      console.log("Usuario autenticado:", userData);
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false || propIsAuthenticated || false);
      console.log("Usuario no autenticado");
    }
  };

  const toggleTheme = () => {
    if (typeof window === 'undefined') return; // Verificación SSR
    
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Actualizar las clases en el HTML
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    console.log("Tema cambiado a:", newDarkMode ? 'dark' : 'light');
  };
  
  // Función para obtener los datos del usuario
  const getUserData = (): UserData | null => {
    if (typeof document === "undefined") return null;

    // Buscar el token en las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.log("No se encontró token en las cookies");
      return null;
    }

    try {
      // Decodificar el token
      const decoded: any = jwtDecode(token);
      console.log("Token decodificado:", decoded);
      
      // Verificar que el token tenga los campos necesarios
      const userData = {
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "Usuario",
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "user",
        avatarUrl: decoded["avatarUrl"] || "https://api.dicebear.com/9.x/pixel-art/svg",
      };
      
      return userData;
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };

  // Función para cerrar sesión manualmente (por si acaso)
  const handleLogout = () => {
    console.log("Cerrando sesión manualmente");
    // Eliminar la cookie del token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    // Redirigir al inicio
    window.location.href = '/';
  };

  // Limpiar consola para depuración
  console.log("Estado de autenticación:", isAuthenticated);
  console.log("Usuario actual:", currentUser);
  console.log("Modo oscuro:", isDarkMode);

  return (
    <nav className="bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:from-[#172a41] dark:to-[#2c4260] text-white py-2 px-4 md:px-10 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="h-16 flex items-center pl-0 md:pl-4">
        <Link to="/">
          <img
            src="/public/images/logo.png" 
            alt="Logo"
            className="max-h-16 w-auto object-contain"
          />
        </Link>
      </div>

      {/*Opciones pantallas grandes */}
      <ul className="hidden md:flex gap-8 lg:gap-16 font-bold text-lg">
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
        
        {/* Si el usuario está autenticado, mostrar opciones adicionales */}
        {isAuthenticated && (
          <li className="relative group">
            <Link
              to="/dashboard"
              className="hover:text-yellow-300 block pb-2 transform transition-all duration-300 hover:scale-110 origin-bottom"
            >
              Dashboard
            </Link>
          </li>
        )}
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
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
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
            ref={userButtonRef}
            className="hover:text-yellow-300 transition flex items-center"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-label="Menú de usuario"
          >
            {isAuthenticated && currentUser?.avatarUrl ? (
              <>
                <span className="mr-2 text-sm hidden lg:inline">{currentUser.name}</span>
                <img
                  src={currentUser.avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              </>
            ) : (
              <User className="w-6 h-6" />
            )}
          </button>

          {isUserMenuOpen && (
            <div 
              ref={userMenuRef}
              className="absolute right-0 top-10 bg-white bg-opacity-50 backdrop-blur-lg text-black dark:bg-gray-800 dark:bg-opacity-80 dark:text-white shadow-md rounded-lg w-64 py-2 z-50"
            >
              {isAuthenticated && currentUser ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-base font-semibold truncate">{currentUser.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentUser.email}</div>
                    <div className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded mt-1 inline-block">{currentUser.role}</div>
                  </div>
                  
                  {/* Opciones de usuario */}
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Configuración
                    </Link>
                  </div>
                  
                  {/* Cerrar sesión */}
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                    <Form method="post" action="/logout" onSubmit={(e) => {
                      // Si por alguna razón el formulario no funciona, manejamos el logout manualmente
                      if (!document.querySelector('form[action="/logout"]')) {
                        e.preventDefault();
                        handleLogout();
                      }
                    }}>
                      <button 
                        type="submit"
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Cerrar sesión
                      </button>
                    </Form>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Iconos pantalla pequeña */}
      <div className="flex md:hidden items-center gap-3">
        {/* Botón de búsqueda */}
        <button 
          className="hover:text-yellow-300 transition"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="w-5 h-5" />
        </button>
        
        {/* Botón de modo oscuro */}
        <button 
          onClick={toggleTheme}
          className="hover:text-yellow-300 transition"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Autenticación para pantallas pequeñas */}
        <div className="flex gap-2">
          {isAuthenticated ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border border-gray-300"
                />
              ) : (
                <User size={20} />
              )}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-[#32526E] text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300 hover:bg-[#233947]"
            >
              Login
            </Link>
          )}
        </div>

        {/* Botón del menú animado */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-6 w-6 focus:outline-none"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          ></span>

          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
            }`}
          ></span>

          <span
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${
              isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          ></span>
        </button>
      </div>
      
      {/* Menú de búsqueda en móvil */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#3A5770] p-3 md:hidden z-50">
          <div className="flex items-center gap-2 bg-white/20 p-2 rounded-md">
            <Search size={18} className="text-white/70" />
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent outline-none w-full text-white placeholder-white/70"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Menú de usuario en móvil */}
      {isUserMenuOpen && isAuthenticated && (
        <div className="absolute top-full right-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg md:hidden z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {currentUser?.avatarUrl && (
                <img
                  src={currentUser.avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{currentUser?.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{currentUser?.email}</div>
              </div>
            </div>
          </div>
          <div className="py-2">
            <Link 
              to="/profile"
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Mi perfil
            </Link>
            <Link 
              to="/settings"
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Configuración
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 py-2">
            <Form method="post" action="/logout" onSubmit={(e) => {
              if (!document.querySelector('form[action="/logout"]')) {
                e.preventDefault();
                handleLogout();
              }
            }}>
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Cerrar sesión
              </button>
            </Form>
          </div>
        </div>
      )}

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg flex flex-col items-center p-4 gap-4 md:hidden z-40">
          {/* Opciones menú */}
          <ul className="flex flex-col gap-4 w-full text-center text-lg">
            <li>
              <Link
                to="/"
                className="block py-2 transition-colors duration-300 hover:text-[#708BC6] dark:hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="block py-2 transition-colors duration-300 hover:text-[#708BC6] dark:hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
            </li>

            <li>
              <Link
                to="#oportunidades"
                className="block py-2 transition-colors duration-300 hover:text-[#708BC6] dark:hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Oportunidades
              </Link>
            </li>

            <li>
              <Link
                to="/novedades"
                className="block py-2 transition-colors duration-300 hover:text-[#708BC6] dark:hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Novedades
              </Link>
            </li>
            
            {/* Si el usuario está autenticado, mostrar opciones adicionales */}
            {isAuthenticated && (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 transition-colors duration-300 hover:text-[#708BC6] dark:hover:text-yellow-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Botones de acción en móvil */}
          {!isAuthenticated ? (
            <div className="flex gap-4 w-full justify-center border-t border-gray-200 dark:border-gray-700 pt-4">
              <Link
                to="/login"
                className="bg-[#32526E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 hover:bg-[#233947] min-w-[100px] text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#f0d437] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors duration-300 hover:bg-yellow-500 min-w-[100px] text-center"
                onClick={() => setIsOpen(false)}
              >
                Registrarme
              </Link>
            </div>
          ) : (
            <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="font-medium">Tema:</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={16} /> 
                      <span className="text-sm">Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> 
                      <span className="text-sm">Oscuro</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}