// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   useLoaderData,
// } from "@remix-run/react";
// import type { LinksFunction, LoaderFunction } from "@remix-run/node";

// import "./tailwind.css";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// // Removed incorrect import of 'request'
// import { verifyToken } from "./services/authService";


// export const loader: LoaderFunction = async ({ request }) => {
//   const isAuthenticated = await verifyToken(request);
//   return {
//     isAuthenticated,
//   };
// };

// export const links: LinksFunction = () => [
//   { rel: "preconnect", href: "https://fonts.googleapis.com" },
//   {
//     rel: "preconnect",
//     href: "https://fonts.gstatic.com",
//     crossOrigin: "anonymous",
//   },
//   {
//     rel: "stylesheet",
//     href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@100..900&family=Raleway:wght@100..900&family=Nunito:wght@100..900&family=Montserrat:wght@100..900&family=Reddit+Sans:wght@100..900&display=swap",
//   },
// ];

// export function Layout({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useLoaderData<{ isAuthenticated: boolean }>();
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <Navbar isAuthenticated={isAuthenticated} />
//         {children}
//         <Footer />
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

// export default function App() {
//   return <Outlet />;
// }
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useLocation
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useEffect } from "react";

import "./tailwind.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";


/**
 * Interfaces para los datos del loader
 */
interface LoaderData {
  isAuthenticated: boolean;
}

/**
 * Función para verificar el token en el servidor
 * @param request - Objeto Request de la petición HTTP
 * @returns Promise<boolean> indicando si el usuario está autenticado
 */
async function verifyToken(request: Request): Promise<boolean> {
  try {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return false;
    
    // Extraer cookies a un objeto
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    const authToken = cookies['authToken']; 
    if (!authToken) return false;
    
    // Opcional: Verificar el token con el backend
    try {
      const API_URL = 'http://localhost:5261/api';
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error("Error al verificar token con el backend:", error);
      return false;
    }
  } catch (error) {
    console.error("Error al verificar token:", error);
    return false;
  }
}

/**
 * Lista de rutas protegidas que requieren autenticación
 */
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'];

/**
 * Loader para verificar la autenticación y manejar redirecciones
 */
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const isAuthenticated = await verifyToken(request);
    
    // Verificar si es una ruta protegida
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
      url.pathname === route || url.pathname.startsWith(`${route}/`)
    );
    
    // Redirigir a login si es ruta protegida y no está autenticado
    if (isProtectedRoute && !isAuthenticated) {
      return redirect(`/login?redirect=${encodeURIComponent(url.pathname)}`);
    }
    
    // Redirigir al dashboard si ya está autenticado e intenta acceder a login/register
    if (isAuthenticated && (url.pathname === '/login' || url.pathname === '/register')) {
      return redirect('/dashboard');
    }
    
    return json<LoaderData>({ isAuthenticated });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return json<LoaderData>({ isAuthenticated: false });
  }
};

/**
 * Links para fuentes y estilos
 */
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@100..900&family=Raleway:wght@100..900&family=Nunito:wght@100..900&family=Montserrat:wght@100..900&family=Reddit+Sans:wght@100..900&display=swap",
  },
];

/**
 * Componente Layout que envuelve la aplicación
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Componente principal de la aplicación
 */
export default function App() {
  const { isAuthenticated } = useLoaderData<LoaderData>();
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para manejar redireccionamiento después de login
  useEffect(() => {
    if (location.pathname === '/login' && isAuthenticated) {
      const searchParams = new URLSearchParams(location.search);
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      navigate(redirectTo);
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <Layout>
      <AuthProvider>
        <Navbar isAuthenticated={isAuthenticated} />
        <Outlet />
        <Footer />
      </AuthProvider>
    </Layout>
  );
}