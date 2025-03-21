import { Link } from "@remix-run/react";


export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:bg-[#172a41] text-white py-2 px-10 flex justify-between items-center relative">
      <div className="h-16 flex items-center pl-4">
        <img src="/images/logo.png" alt="Logo" className="max-h-20 w-auto object-contain"/>
      </div>

      {/* Menú en pantallas grandes */}
      <ul className="hidden md:flex gap-6 font-semibold">
        {["Servicios", "Oportunidades", "Quiénes Somos", "Novedades"].map(
          (item, index) => (
            <li key={index} className="relative group">
              <a
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-gray-300 block pb-2">
                {item}
              </a>
              <span className="absolute left-1/2 bottom-0 translate-x-[-50%] w-0 h-[3px] bg-[#bdbbb8] transition-all duration-300 group-hover:w-full"></span>
            </li>
          )
        )}
      </ul>

      <div className="flex space-x-4">
        <Link
          className="bg-white text-blue-900 rounded-md px-4 py-1"
          to={"/"}
        >
          Login
        </Link>
        <button className="bg-pink-500 rounded-md px-4 py-1">
          Registrate
        </button>
      </div>
    </nav>
  );
}
