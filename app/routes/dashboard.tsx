// import { useEffect } from "react";
// import { useNavigate } from "@remix-run/react";
// import type { LoaderFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";

// // Función loader para verificar autenticación
// export const loader: LoaderFunction = async ({ request }) => {
//   // Aquí normalmente verificarías la autenticación del usuario
//   // usando headers, cookies o algo similar
//   // Este es un ejemplo básico, deberías adaptarlo a tu sistema de autenticación

//   // Por ahora, simplemente retornamos datos simulados
//   return json({
//     user: {
//       name: "Usuario de ejemplo",
//       role: "user"
//     },
//     // Otros datos que necesites en el dashboard
//   });
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Usuario';
//   const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

//   // Efecto para verificar si hay un token en localStorage o sessionStorage
//   useEffect(() => {
//     const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
//     if (!token) {
//       // Si no hay token, redirigir al login
//       navigate('/login');
//     }
//   }, [navigate]);

//   // Función para cerrar sesión
//   const handleLogout = () => {
//     // Limpiar tokens al cerrar sesión
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userName');
//     sessionStorage.removeItem('authToken');
//     sessionStorage.removeItem('userName');
//     navigate('/login');
//   };

//   return (
//     <div className="bg-slate-50 text-slate-700 leading-relaxed font-sans">
//       <div className="max-w-7xl mx-auto p-8">
//         <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-base">
//               TB
//             </div>
//             <div className="text-xl font-semibold text-slate-800">
//               Tu Banco de Oportunidades
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="cursor-pointer">🔔</span>
//             <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 font-semibold">
//               {userInitials}
//             </div>
//           </div>
//         </header>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <div className="text-sm text-slate-500 mb-2">Usuarios activos</div>
//             <div className="text-2xl font-semibold text-slate-800 mb-3 flex items-baseline gap-2">
//               156
//               <span className="text-sm flex items-center gap-1 text-green-500">
//                 <span>↑</span>
//                 <span>5%</span>
//               </span>
//             </div>
//             <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full bg-blue-500 w-[70%]"></div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <div className="text-sm text-slate-500 mb-2">Servicios utilizados</div>
//             <div className="text-2xl font-semibold text-slate-800 mb-3">
//               4
//             </div>
//             <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full bg-blue-500 w-[40%]"></div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <div className="text-sm text-slate-500 mb-2">Tasa de satisfacción</div>
//             <div className="text-2xl font-semibold text-slate-800 mb-3 flex items-baseline gap-2">
//               82%
//               <span className="text-sm flex items-center gap-1 text-green-500">
//                 <span>↑</span>
//                 <span>3%</span>
//               </span>
//             </div>
//             <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full bg-blue-500 w-[82%]"></div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <div className="text-sm text-slate-500 mb-2">Aprovechamiento</div>
//             <div className="text-2xl font-semibold text-slate-800 mb-3 flex items-baseline gap-2">
//               68%
//               <span className="text-sm flex items-center gap-1 text-amber-500">
//                 <span>↓</span>
//                 <span>2%</span>
//               </span>
//             </div>
//             <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full bg-blue-500 w-[68%]"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mb-8">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-slate-800 mb-4">Bienvenido, {userName}</h2>
//             <p>Esta es tu página de dashboard. Aquí podrás ver toda la información relevante.</p>
//           </div>
//         </div>
        
//         <div className="mb-8">
//           <div className="flex border-b border-slate-200 mb-6">
//             <div className="px-4 py-3 mr-4 text-blue-500 font-medium relative cursor-pointer border-b-2 border-blue-500">
//               Servicios disponibles
//             </div>
//             <div className="px-4 py-3 mr-4 text-slate-500 cursor-pointer">
//               Historial
//             </div>
//             <div className="px-4 py-3 mr-4 text-slate-500 cursor-pointer">
//               Configuración
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white rounded-lg p-4 border border-slate-200">
//               <div className="font-semibold mb-2">Estadísticas personales</div>
//               <div className="flex justify-between text-sm text-slate-500">
//                 <div>Actualizado: Hoy</div>
//                 <div>5 reportes</div>
//               </div>
//               <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-[75%]"></div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg p-4 border border-slate-200">
//               <div className="font-semibold mb-2">Actividad reciente</div>
//               <div className="flex justify-between text-sm text-slate-500">
//                 <div>Actualizado: Ayer</div>
//                 <div>10 actividades</div>
//               </div>
//               <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-[60%]"></div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg p-4 border border-slate-200">
//               <div className="font-semibold mb-2">Configuración de cuenta</div>
//               <div className="flex justify-between text-sm text-slate-500">
//                 <div>Seguridad: Buena</div>
//                 <div>2 opciones pendientes</div>
//               </div>
//               <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-[80%]"></div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg p-4 border border-slate-200">
//               <div className="font-semibold mb-2">Recursos adicionales</div>
//               <div className="flex justify-between text-sm text-slate-500">
//                 <div>12 documentos</div>
//                 <div>4 videos</div>
//               </div>
//               <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-[50%]"></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="mb-8">
//             <div className="text-lg font-semibold text-slate-800 mb-4">Actividad reciente</div>
//             <div className="border border-slate-200 rounded-lg overflow-hidden">
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   📝
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Has actualizado tu perfil de usuario</div>
//                   <div className="text-sm text-slate-500">Hoy, 09:45</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   👤
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Solicitud de servicio procesada correctamente</div>
//                   <div className="text-sm text-slate-500">Ayer, 15:20</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   🔐
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Cambio de contraseña realizado</div>
//                   <div className="text-sm text-slate-500">02/04/2025</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   📊
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Informe mensual generado</div>
//                   <div className="text-sm text-slate-500">01/04/2025</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mb-8">
//             <div className="text-lg font-semibold text-slate-800 mb-4">Próximos eventos</div>
//             <div className="border border-slate-200 rounded-lg overflow-hidden">
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   📆
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Webinar: "Optimiza tus recursos"</div>
//                   <div className="text-sm text-slate-500">10/04/2025, 16:00 - 17:30</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   👥
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Sesión de orientación personalizada</div>
//                   <div className="text-sm text-slate-500">15/04/2025, 10:00 - 11:00</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex border-b border-slate-200 gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   🎓
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Taller: "Herramientas para el éxito"</div>
//                   <div className="text-sm text-slate-500">22/04/2025, 15:00 - 17:00</div>
//                 </div>
//               </div>
              
//               <div className="p-4 flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0">
//                   📱
//                 </div>
//                 <div className="flex-1">
//                   <div className="mb-1">Lanzamiento de nueva funcionalidad</div>
//                   <div className="text-sm text-slate-500">30/04/2025, 09:00</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <footer className="mt-8 pt-4 border-t border-slate-200 text-center">
//           <button 
//             onClick={handleLogout}
//             className="px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer text-sm mb-4"
//           >
//             Cerrar Sesión
//           </button>
//           <p className="text-sm text-slate-500">© 2025 - Tu Banco de Oportunidades</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

// Tipos
interface User {
  name: string;
  role: string;
}

interface LoaderData {
  user: User;
}

interface ChartData {
  usuarios: number[];
  satisfaccion: number[];
  aprovechamiento: number[];
}

interface Notification {
  id: number;
  text: string;
  read: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: "up" | "down";
  percentage: string | number;
  color?: string;
  icon: string;
}

interface LineChartProps {
  data: number[];
  color?: string;
  label?: string;
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
}

// Función loader para verificar autenticación
export const loader: LoaderFunction = async ({ request }) => {
  // Aquí normalmente verificarías la autenticación del usuario
  // usando headers, cookies o algo similar
  return json<LoaderData>({
    user: {
      name: "Usuario de ejemplo",
      role: "user"
    },
  });
};

// Datos simulados para gráficos
const simulateData = (): ChartData => {
  return {
    usuarios: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 130),
    satisfaccion: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 70),
    aprovechamiento: Array.from({ length: 7 }, () => Math.floor(Math.random() * 25) + 60),
  };
};

// Componente para gráficos de línea simples
const LineChart: React.FC<LineChartProps> = ({ data, color = "#3b82f6", label = "Datos" }) => {
  const maxValue = Math.max(...data) * 1.2;
  const points: string = data.map((value, index) => 
    `${(index * 100) / (data.length - 1)},${100 - (value / maxValue) * 100}`
  ).join(" ");

  return (
    <div className="h-32 w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-label={`Gráfico de línea: ${label}`}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, index) => (
          <circle
            key={index}
            cx={(index * 100) / (data.length - 1)}
            cy={100 - (value / maxValue) * 100}
            r="2"
            fill={color}
          />
        ))}
        <text x="0" y="10" fontSize="8" fill="currentColor" className="font-medium">
          {label}: {data[data.length - 1]}
        </text>
      </svg>
    </div>
  );
};

// Componente para tarjetas de estadísticas
const StatCard: React.FC<StatCardProps> = ({ title, value, change, percentage = 70, color = "blue", icon }) => {
  const isPositive = change === "up";
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-${color}-500`} style={{ backgroundColor: `var(--${color}-100)` }}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-slate-800 dark:text-white mb-3 flex items-baseline gap-2">
        {value}
        {change && (
          <span className={`text-sm flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-amber-500'}`}>
            <span>{isPositive ? '↑' : '↓'}</span>
            <span>{percentage}</span>
          </span>
        )}
      </div>
      <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full`} 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: `var(--${color}-500)`
          }}
        ></div>
      </div>
    </div>
  );
};

// Componente para mostrar actividades recientes
const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, date }) => {
  return (
    <div className="p-4 flex border-b border-slate-200 dark:border-slate-700 gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="mb-1 dark:text-white">{title}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{date}</div>
      </div>
    </div>
  );
};
// Componente principal Dashboard
export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('Usuario');
  const [userInitials, setUserInitials] = useState<string>('TB');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>(simulateData());
  const [activeTab, setActiveTab] = useState<'servicios' | 'historial' | 'config'>('servicios');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "Nueva funcionalidad disponible", read: false },
    { id: 2, text: "Actualización de seguridad pendiente", read: false },
  ]);
  const [showNotifs, setShowNotifs] = useState<boolean>(false);
  
  // Efecto para verificar autenticación
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Usuario';
    setUserName(savedName);
    setUserInitials(savedName.split(' ').map(n => n[0]).join('').toUpperCase() || 'TB');
    
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
    
    // Verificar preferencia de tema oscuro
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Simular datos cambiantes para los gráficos
    const interval = setInterval(() => {
      setChartData(simulateData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [navigate]);
  
  // Efecto para aplicar tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Función para cerrar sesión
  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userName');
    navigate('/login');
  };
  
  // Función para cambiar tema
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };
  
  // Función para marcar notificaciones como leídas
  const markAsRead = (id: number): void => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  // Número de notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handler de teclado para elementos interactivos
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 leading-relaxed font-sans min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-base">
              {userInitials}
            </div>
            <div className="text-xl font-semibold text-slate-800 dark:text-white">
              Tu Banco de Oportunidades
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Botón de tema */}
            <button 
              onClick={toggleDarkMode} 
              onKeyDown={(e) => handleKeyPress(e, toggleDarkMode)}
              className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Notificaciones */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)} 
                onKeyDown={(e) => handleKeyPress(e, () => setShowNotifs(!showNotifs))}
                className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Ver notificaciones"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-white">
                    Notificaciones
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id}
                          className={`p-3 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                          onKeyDown={(e) => handleKeyPress(e, () => markAsRead(notif.id))}
                          tabIndex={0}
                          role="button"
                          aria-label={`Notificación: ${notif.text}. ${!notif.read ? 'No leída' : 'Leída'}`}
                        >
                          <div className="text-sm font-medium text-slate-800 dark:text-white">{notif.text}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ahora</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-sm text-slate-500 dark:text-slate-400">
                        No hay notificaciones
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <button className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                      Ver todas
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Avatar del usuario */}
            <div className="w-9 h-9 rounded-full bg-blue-200 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 font-semibold">
              {userInitials}
            </div>
          </div>
        </header>
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Usuarios activos" 
            value={chartData.usuarios[chartData.usuarios.length - 1]} 
            change="up" 
            percentage="5%" 
            icon="👥"
          />
          
          <StatCard 
            title="Servicios utilizados" 
            value="4" 
            percentage="40%" 
            icon="🛠️"
          />
          
          <StatCard 
            title="Tasa de satisfacción" 
            value={`${chartData.satisfaccion[chartData.satisfaccion.length - 1]}%`} 
            change="up" 
            percentage="82%" 
            color="green" 
            icon="😊"
          />
          
          <StatCard 
            title="Aprovechamiento" 
            value={`${chartData.aprovechamiento[chartData.aprovechamiento.length - 1]}%`} 
            change="down" 
            percentage="68%" 
            color="amber" 
            icon="📊"
          />
        </div>
        
        {/* Gráficos */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Usuarios Activos</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Últimos 7 días</p>
            <LineChart data={chartData.usuarios} color="#3b82f6" label="Usuarios" />
          </div>
          
          <div className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Satisfacción</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Porcentaje diario</p>
            <LineChart data={chartData.satisfaccion} color="#10b981" label="%" />
          </div>
          
          <div className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Aprovechamiento</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Porcentaje diario</p>
            <LineChart data={chartData.aprovechamiento} color="#f59e0b" label="%" />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Bienvenido, {userName}</h2>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-200 mb-4">
              <div className="flex items-start gap-3">
                <div>ℹ️</div>
                <div>
                  <p className="font-medium mb-1">Dashboard actualizado en tiempo real</p>
                  <p className="text-sm">Los datos mostrados se actualizan cada 5 segundos para simular datos en tiempo real.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pestañas */}
        <div className="mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
            <button 
              className={`px-4 py-3 mr-4 font-medium relative cursor-pointer whitespace-nowrap ${
                activeTab === 'servicios' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
              onClick={() => setActiveTab('servicios')}
              onKeyDown={(e) => handleKeyPress(e, () => setActiveTab('servicios'))}
              aria-selected={activeTab === 'servicios'}
              role="tab"
            >
              Servicios disponibles
            </button>
            <button 
              className={`px-4 py-3 mr-4 font-medium relative cursor-pointer whitespace-nowrap ${
                activeTab === 'historial' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
              onClick={() => setActiveTab('historial')}
              onKeyDown={(e) => handleKeyPress(e, () => setActiveTab('historial'))}
              aria-selected={activeTab === 'historial'}
              role="tab"
            >
              Historial
            </button>
            <button 
              className={`px-4 py-3 mr-4 font-medium relative cursor-pointer whitespace-nowrap ${
                activeTab === 'config' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
              onClick={() => setActiveTab('config')}
              onKeyDown={(e) => handleKeyPress(e, () => setActiveTab('config'))}
              aria-selected={activeTab === 'config'}
              role="tab"
            >
              Configuración
            </button>
          </div>
          
          {/* Contenido de las pestañas */}
          {activeTab === 'servicios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="tabpanel">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label="Estadísticas personales"
                onKeyDown={(e) => handleKeyPress(e, () => {})}
              >
                <div className="font-semibold mb-2 dark:text-white">Estadísticas personales</div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div>Actualizado: Hoy</div>
                  <div>5 reportes</div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label="Actividad reciente"
                onKeyDown={(e) => handleKeyPress(e, () => {})}
              >
                <div className="font-semibold mb-2 dark:text-white">Actividad reciente</div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div>Actualizado: Hoy</div>
                  <div>10 actividades</div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/5"></div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label="Configuración de cuenta"
                onKeyDown={(e) => handleKeyPress(e, () => {})}
              >
                <div className="font-semibold mb-2 dark:text-white">Configuración de cuenta</div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div>Seguridad: Buena</div>
                  <div>2 opciones pendientes</div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-4/5"></div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label="Recursos adicionales"
                onKeyDown={(e) => handleKeyPress(e, () => {})}
              >
                <div className="font-semibold mb-2 dark:text-white">Recursos adicionales</div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div>12 documentos</div>
                  <div>4 videos</div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2"></div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'historial' && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4" role="tabpanel">
              <h3 className="font-medium mb-4 text-slate-800 dark:text-white">Historial de actividades</h3>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium dark:text-white">Actividad {5-i}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{`0${i+1}/04/2025`}</span>
                    </div>
                    <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                      {["Informe completado", "Servicio solicitado", "Perfil actualizado", "Documento generado", "Sesión iniciada"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'config' && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4" role="tabpanel">
              <h3 className="font-medium mb-4 text-slate-800 dark:text-white">Configuración de usuario</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nombre de usuario
                  </label>
                  <input 
                    id="username"
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label id="theme-label" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tema
                  </label>
                  <div className="flex items-center gap-2" role="radiogroup" aria-labelledby="theme-label">
                    <button 
                      onClick={() => setDarkMode(false)}
                      onKeyDown={(e) => handleKeyPress(e, () => setDarkMode(false))}
                      className={`px-3 py-1 rounded ${!darkMode ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}
                      role="radio"
                      aria-checked={!darkMode}
                    >
                      Claro
                    </button>
                    <button 
                      onClick={() => setDarkMode(true)}
                      onKeyDown={(e) => handleKeyPress(e, () => setDarkMode(true))}
                      className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}
                      role="radio"
                      aria-checked={darkMode}
                    >
                      Oscuro
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notifications" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Notificaciones
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      id="notifications" 
                      type="checkbox" 
                      defaultChecked 
                      className="rounded text-blue-500" 
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Recibir notificaciones</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    aria-label="Guardar cambios de configuración"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Actividad reciente y próximos eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="mb-8">
            <div className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Actividad reciente</div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
              <ActivityItem 
                icon="📝"
                title="Has actualizado tu perfil de usuario"
                date="Hoy, 09:45"
              />
  
              
              <ActivityItem 
                icon="👤"
                title="Solicitud de servicio procesada correctamente"
                date="Ayer, 15:20"
              />
              
              <ActivityItem 
                icon="🔐"
                title="Cambio de contraseña realizado"
                date="02/04/2025"
              />
              
              <ActivityItem 
                icon="📊"
                title="Informe mensual generado"
                date="01/04/2025"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <div className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Próximos eventos</div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                    <ActivityItem 
                    icon="📆"
                    title='Webinar: "Optimiza tus recursos"'
                    date="10/04/2025, 16:00 - 17:30"
                    />
                    
                    <ActivityItem 
                    icon="👥"
                    title="Sesión de orientación personalizada"
                    date="15/04/2025, 10:00 - 11:00"
                    />
                    
                    <ActivityItem 
                    icon="🎓"
                    title='Taller: "Herramientas para el éxito"'
                    date="22/04/2025, 15:00 - 17:00"
                    />
                    
                    <ActivityItem 
                    icon="📱"
                    title="Lanzamiento de nueva funcionalidad"
                    date="30/04/2025, 09:00"
                    />
                </div>
            </div>
          </div>
        
        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer text-sm mb-4 hover:bg-blue-600 transition-colors"
          >
            Cerrar Sesión
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2025 - Tu Banco de Oportunidades</p>
        </footer>
      </div>
    </div>
  );
}
