import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { 
  FaHome, 
  FaChartBar, 
  FaUser, 
  FaCog, 
  FaBell, 
  FaSignOutAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaTasks,
  FaClock,
  FaWallet,
  FaShieldAlt,
  FaRegLightbulb
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dashboardStyles from "~/styles/dashboard.module.css";

// Interfaces para los tipos de datos
interface UserData {
  name: string;
  role: string;
  initials: string;
}

interface StatsData {
  activeUsers: number;
  activeUsersTrend: number;
  servicesUsed: number;
  satisfactionRate: number;
  satisfactionTrend: number;
  utilizationRate: number;
  utilizationTrend: number;
}

interface LoaderData {
  user: UserData;
  stats: StatsData;
}

// Función auxiliar para verificar token
const verifyToken = (cookieHeader: string | null): boolean => {
  if (!cookieHeader) return false;
  
  // Verificar que el token existe y no está vacío
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) return false;
  
  const token = tokenMatch[1];
  
  // Asegúrate de que el token no está vacío
  return token.trim() !== '';
};

// Loader para verificar autenticación del lado del servidor
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Obtener cookies del request
  const cookieHeader = request.headers.get("Cookie");
  
  // Verificar token usando la función auxiliar
  if (!verifyToken(cookieHeader)) {
    // Redirigir al login si no hay token válido
    return redirect('/login');
  }
  
  // En un caso real, aquí harías una petición al backend para validar el token
  // y obtener datos del usuario autenticado
  try {
    // Simular verificación del token con el backend
    // En una implementación real, esto sería una llamada a tu API
    
    return json<LoaderData>({
      user: {
        name: "María González",
        role: "usuario premium",
        initials: "MG"
      },
      stats: {
        activeUsers: 156,
        activeUsersTrend: 5,
        servicesUsed: 4,
        satisfactionRate: 82,
        satisfactionTrend: 3,
        utilizationRate: 68,
        utilizationTrend: -2
      }
    });
  } catch (error) {
    console.error("Error al verificar token:", error);
    // Si hay un error en la verificación del token, redirigir al login
    return redirect('/login');
  }
};

// Interfaces para los props de los componentes
interface StatCardProps {
  title: string;
  value: number | string;
  trend?: number | null;
  percentage?: number | null;
  icon?: React.ReactNode;
  delay?: number;
}

// Componente para mostrar una tarjeta de estadísticas
const StatCard: React.FC<StatCardProps> = ({ title, value, trend = null, percentage = null, icon, delay = 0 }) => (
  <motion.div 
    className={dashboardStyles.statCard}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
  >
    <div className={dashboardStyles.statHeader}>
      {icon && <div className={dashboardStyles.statIcon}>{icon}</div>}
      <div className={dashboardStyles.statTitle}>{title}</div>
    </div>
    <div className={dashboardStyles.statValue}>
      {value}
      {trend !== null && (
        <span className={`${dashboardStyles.statTrend} ${trend >= 0 ? dashboardStyles.positive : dashboardStyles.negative}`}>
          <span>{trend >= 0 ? "↑" : "↓"}</span>
          <span>{Math.abs(trend)}%</span>
        </span>
      )}
    </div>
    <div className={dashboardStyles.progressBarContainer}>
      <div className={dashboardStyles.progressBar}>
        <motion.div 
          className={dashboardStyles.progressFill} 
          initial={{ width: 0 }}
          animate={{ width: `${percentage !== null ? percentage : 70}%` }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        ></motion.div>
      </div>
      <span className={dashboardStyles.progressText}>{percentage}%</span>
    </div>
  </motion.div>
);

interface ServiceCardProps {
  title: string;
  stats: string;
  percentage: number;
  icon?: React.ReactNode;
  delay?: number;
}

// Componente para la tarjeta de servicios
const ServiceCard: React.FC<ServiceCardProps> = ({ title, stats, percentage, icon, delay = 0 }) => (
  <motion.div 
    className={dashboardStyles.serviceCard}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
  >
    <div className={dashboardStyles.serviceHeader}>
      {icon && <div className={dashboardStyles.serviceIcon}>{icon}</div>}
      <div className={dashboardStyles.serviceTitle}>{title}</div>
    </div>
    <div className={dashboardStyles.serviceStats}>{stats}</div>
    <div className={dashboardStyles.serviceProgressContainer}>
      <div className={dashboardStyles.serviceProgress}>
        <motion.div 
          className={dashboardStyles.serviceProgressFill} 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        ></motion.div>
      </div>
      <span className={dashboardStyles.servicePercentage}>{percentage}%</span>
    </div>
  </motion.div>
);

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  index?: number;
}

// Componente para mostrar actividades o eventos
const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, date, index = 0 }) => (
  <motion.div 
    className={dashboardStyles.activityItem}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
  >
    <div className={dashboardStyles.activityIcon}>
      {icon}
    </div>
    <div className={dashboardStyles.activityContent}>
      <div className={dashboardStyles.activityTitle}>{title}</div>
      <div className={dashboardStyles.activityDate}>{date}</div>
    </div>
  </motion.div>
);

// Componente para mostrar el saludo según la hora del día
const TimeGreeting: React.FC<{ userName: string }> = ({ userName }) => {
  const [greeting, setGreeting] = useState("Bienvenido");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("¡Buenos días");
    } else if (hour >= 12 && hour < 19) {
      setGreeting("¡Buenas tardes");
    } else {
      setGreeting("¡Buenas noches");
    }
  }, []);
  
  return (
    <span className={dashboardStyles.greeting}>{greeting}, <span className={dashboardStyles.userName}>{userName}</span>!</span>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  // Fix: Properly type the return value from useLoaderData
  const data = useLoaderData<typeof loader>() as LoaderData;
  const [activeTab, setActiveTab] = useState<"services" | "history" | "settings">("services");
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Reference for the stats grid to trigger animations when it comes into view
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Formatear la fecha y hora actuales
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentTime);
  
  const formattedTime = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(currentTime);
  
  // Efecto para ocultar el mensaje de bienvenida después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para verificar token en el cliente
  useEffect(() => {
    // Verificar si hay token en las cookies del cliente
    const hasToken = document.cookie.includes('token=');
    if (!hasToken) {
      navigate('/login');
    }
  }, [navigate]);
  
  // Función para cerrar sesión
  const handleLogout = (): void => {
    // Eliminar el token de cookies (usar un formato más seguro)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict';
    navigate('/login');
  };

  return (
    <div className={dashboardStyles.dashboardContainer}>
      {/* Overlay de bienvenida */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className={dashboardStyles.welcomeOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={dashboardStyles.welcomeOverlayContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={dashboardStyles.welcomeLogo}>
                <img src="/Images/Javi.png" alt="Logo" />
              </div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Bienvenido, {data.user.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Cargando tu experiencia personalizada...
              </motion.p>
              <motion.div 
                className={dashboardStyles.loadingBar}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={dashboardStyles.sidebar}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={dashboardStyles.logoContainer}>
          <img src="/Images/Javi.png" alt="Logo" className={dashboardStyles.logo} />
          <div className={dashboardStyles.logoText}>Banco de<br />Oportunidades</div>
        </div>
        
        <div className={dashboardStyles.userProfileSidebar}>
          <div className={dashboardStyles.userAvatarLarge}>
            {data.user.initials}
          </div>
          <div className={dashboardStyles.userInfo}>
            <div className={dashboardStyles.userName}>{data.user.name}</div>
            <div className={dashboardStyles.userRole}>{data.user.role}</div>
          </div>
        </div>
        
        <nav className={dashboardStyles.navigation}>
          <Link to="/dashboard" className={dashboardStyles.navItem + " " + dashboardStyles.active}>
            <FaHome /> <span>Inicio</span>
          </Link>
          <Link to="/dashboard/statistics" className={dashboardStyles.navItem}>
            <FaChartBar /> <span>Estadísticas</span>
          </Link>
          <Link to="/dashboard/profile" className={dashboardStyles.navItem}>
            <FaUser /> <span>Perfil</span>
          </Link>
          <Link to="/dashboard/settings" className={dashboardStyles.navItem}>
            <FaCog /> <span>Configuración</span>
          </Link>
        </nav>
        
        <div className={dashboardStyles.sidebarFooter}>
          <div className={dashboardStyles.dateTimeInfo}>
            <div className={dashboardStyles.currentTime}>{formattedTime}</div>
            <div className={dashboardStyles.currentDate}>{formattedDate}</div>
          </div>
          <button onClick={handleLogout} className={dashboardStyles.logoutButton}>
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </button>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className={dashboardStyles.mainContent}>
        {/* Header */}
        <motion.header 
          className={dashboardStyles.header}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={dashboardStyles.pageTitle}>
            <FaHome className={dashboardStyles.pageTitleIcon} />
            Dashboard
          </div>
          <div className={dashboardStyles.userArea}>
            <div className={dashboardStyles.searchBox}>
              <input type="text" placeholder="Buscar..." />
            </div>
            <div className={dashboardStyles.notificationIcon}>
              <FaBell />
              <span className={dashboardStyles.notificationBadge}>3</span>
            </div>
            <div className={dashboardStyles.userAvatar}>
              {data.user.initials}
            </div>
          </div>
        </motion.header>

        {/* Contenido */}
        <div className={dashboardStyles.content}>
          {/* Mensaje de bienvenida */}
          <motion.div 
            className={dashboardStyles.welcomeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className={dashboardStyles.welcomeHeader}>
              <motion.h2 
                className={dashboardStyles.welcomeTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TimeGreeting userName={data.user.name} />
              </motion.h2>
              <motion.div 
                className={dashboardStyles.welcomeDate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {formattedDate}
              </motion.div>
            </div>
            <motion.p 
              className={dashboardStyles.welcomeText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Le damos la bienvenida a su espacio personal. Aquí encontrará toda la información relevante sobre sus servicios, actividades y oportunidades disponibles para usted.
            </motion.p>
          </motion.div>

          {/* Tarjetas de estadísticas */}
          <div className={dashboardStyles.statsGrid} ref={statsRef}>
            <StatCard 
              title="Usuarios activos" 
              value={data.stats.activeUsers} 
              trend={data.stats.activeUsersTrend} 
              percentage={70}
              icon={<FaUser />}
              delay={0.1}
            />
            <StatCard 
              title="Servicios utilizados" 
              value={data.stats.servicesUsed} 
              percentage={40}
              icon={<FaWallet />}
              delay={0.2}
            />
            <StatCard 
              title="Tasa de satisfacción" 
              value={`${data.stats.satisfactionRate}%`} 
              trend={data.stats.satisfactionTrend} 
              percentage={data.stats.satisfactionRate}
              icon={<FaShieldAlt />}
              delay={0.3}
            />
            <StatCard 
              title="Aprovechamiento" 
              value={`${data.stats.utilizationRate}%`} 
              trend={data.stats.utilizationTrend} 
              percentage={data.stats.utilizationRate}
              icon={<FaRegLightbulb />}
              delay={0.4}
            />
          </div>

          {/* Pestañas */}
          <motion.div 
            className={dashboardStyles.tabsContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className={dashboardStyles.tabs}>
              <button 
                className={`${dashboardStyles.tab} ${activeTab === 'services' && dashboardStyles.activeTab}`}
                onClick={() => setActiveTab('services')}
              >
                Servicios disponibles
              </button>
              <button 
                className={`${dashboardStyles.tab} ${activeTab === 'history' && dashboardStyles.activeTab}`}
                onClick={() => setActiveTab('history')}
              >
                Historial
              </button>
              <button 
                className={`${dashboardStyles.tab} ${activeTab === 'settings' && dashboardStyles.activeTab}`}
                onClick={() => setActiveTab('settings')}
              >
                Configuración
              </button>
            </div>

            {/* Contenido de las pestañas */}
            <div className={dashboardStyles.tabContent}>
              <AnimatePresence mode="wait">
                {activeTab === 'services' && (
                  <motion.div 
                    key="services"
                    className={dashboardStyles.servicesGrid}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ServiceCard 
                      title="Estadísticas personales" 
                      stats="Actualizado: Hoy • 5 reportes" 
                      percentage={75} 
                      icon={<FaChartBar />}
                      delay={0.1}
                    />
                    <ServiceCard 
                      title="Actividad reciente" 
                      stats="Actualizado: Ayer • 10 actividades" 
                      percentage={60} 
                      icon={<FaFileAlt />}
                      delay={0.2}
                    />
                    <ServiceCard 
                      title="Configuración de cuenta" 
                      stats="Seguridad: Buena • 2 opciones pendientes" 
                      percentage={80} 
                      icon={<FaCog />}
                      delay={0.3}
                    />
                    <ServiceCard 
                      title="Recursos adicionales" 
                      stats="12 documentos • 4 videos" 
                      percentage={50} 
                      icon={<FaRegLightbulb />}
                      delay={0.4}
                    />
                  </motion.div>
                )}
                
                {activeTab === 'history' && (
                  <motion.div 
                    key="history"
                    className={dashboardStyles.historyContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Historial de actividades y transacciones...</p>
                  </motion.div>
                )}
                
                {activeTab === 'settings' && (
                  <motion.div 
                    key="settings"
                    className={dashboardStyles.settingsContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Opciones de configuración y preferencias...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sección de actividades y eventos */}
          <motion.div 
            className={dashboardStyles.activitySection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className={dashboardStyles.recentActivity}>
              <h3 className={dashboardStyles.sectionTitle}>
                <FaFileAlt className={dashboardStyles.sectionIcon} />
                Actividad reciente
              </h3>
              <div className={dashboardStyles.activityList}>
                <ActivityItem 
                  icon={<FaFileAlt />} 
                  title="Has actualizado tu perfil de usuario" 
                  date="Hoy, 09:45" 
                  index={0}
                />
                <ActivityItem 
                  icon={<FaUser />} 
                  title="Solicitud de servicio procesada correctamente" 
                  date="Ayer, 15:20" 
                  index={1}
                />
                <ActivityItem 
                  icon={<FaCog />} 
                  title="Cambio de contraseña realizado" 
                  date="02/04/2025" 
                  index={2}
                />
                <ActivityItem 
                  icon={<FaChartBar />} 
                  title="Informe mensual generado" 
                  date="01/04/2025" 
                  index={3}
                />
              </div>
            </div>

            <div className={dashboardStyles.upcomingEvents}>
              <h3 className={dashboardStyles.sectionTitle}>
                <FaCalendarAlt className={dashboardStyles.sectionIcon} />
                Próximos eventos
              </h3>
              <div className={dashboardStyles.eventsList}>
                <ActivityItem 
                  icon={<FaCalendarAlt />} 
                  title="Webinar: 'Optimiza tus recursos'" 
                  date="10/04/2025, 16:00 - 17:30" 
                  index={0}
                />
                <ActivityItem 
                  icon={<FaUser />} 
                  title="Sesión de orientación personalizada" 
                  date="15/04/2025, 10:00 - 11:00" 
                  index={1}
                />
                <ActivityItem 
                  icon={<FaTasks />} 
                  title="Taller: 'Herramientas para el éxito'" 
                  date="22/04/2025, 15:00 - 17:00" 
                  index={2}
                />
                <ActivityItem 
                  icon={<FaClock />} 
                  title="Lanzamiento de nueva funcionalidad" 
                  date="30/04/2025, 09:00" 
                  index={3}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className={dashboardStyles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>© 2025 - Tu Banco de Oportunidades</p>
        </motion.footer>
      </div>
    </div>
  );
}