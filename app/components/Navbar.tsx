import { Link } from "@remix-run/react";

export default function Navbar (){
   return (
    <nav className="bg-blue-900 text-white flex justify-between items-center px-6 py-3">
        <div className="flex space-x-6">
            <Link className="hover: underline" to={"/"}>Inicio</Link>
            <Link className="hover: underline" to={"/"}>Servicios</Link>
            <Link className="hover: underline" to={"/"}>Oportunidades</Link>    
        </div>
        <div className="flex space-x-4">
            <Link className="bg-white text-blue-900 rounded-full px-4 py-1" to={"/"}>Login</Link>
            <button className="bg-pink-500 rounded-full px-4 py-1">Registrate</button>            
        </div>
    </nav>
   );
}