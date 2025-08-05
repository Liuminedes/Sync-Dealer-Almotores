import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { menuByRole } from "../constants/menuByRole";
import {
  Home,
  Users,
  Car,
  DollarSign,
  Store,
  Settings,
  User,
  Palette,
  LogOut,
  Clock,
  LayoutDashboard,
} from "lucide-react";

const icons = {
  home: <Home size={20} />,
  users: <Users size={20} />,
  car: <Car size={20} />,
  "dollar-sign": <DollarSign size={20} />,
  store: <Store size={20} />,
  settings: <Settings size={20} />,
  user: <User size={20} />,
  palette: <Palette size={20} />,
  "log-out": <LogOut size={20} />,
  clock: <Clock size={20} />,
};

export default function Sidebar() {
  const location = useLocation();
  const { authUser, logout } = useAuthStore();
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const configRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (configRef.current && !configRef.current.contains(e.target)) {
        setShowConfigPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleName = authUser?.Role?.name?.toLowerCase();
  const userMenu = menuByRole[roleName] || [];

  const handleLogout = () => logout();

  const mainMenuItems = userMenu.filter((item) => !item.children);
  const configMenu = userMenu.find((item) => item.name === "Configuración");

  return (
    <aside className="relative w-72 bg-base-200 min-h-screen flex flex-col justify-between border-r border-base-300 animate-slideInLeft">
      {/* 🔝 Top: Logo + Nombre */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6 animate-rotateIn">
          <LayoutDashboard size={26} className="text-primary" />
          <span className="text-xl font-semibold">Commission Maker</span>
        </div>

        <ul className="flex flex-col gap-1">
          {mainMenuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-300 transition ${
                  location.pathname === item.path
                    ? "bg-base-300 font-semibold"
                    : ""
                }`}
              >
                {icons[item.icon]} <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🧱 Línea divisoria */}
      <hr className="border-t border-base-300 my-1" />

      {/* ⚙️ Bottom: Configuración como panel flotante */}
      {configMenu && (
        <div className="p-4 border-t border-base-300 relative" ref={configRef}>
          <button
            onClick={() => setShowConfigPanel((prev) => !prev)}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-base-300 transition"
          >
            {icons[configMenu.icon]} {configMenu.name}
          </button>

          {showConfigPanel && (
            <div className="absolute left-full bottom-4 ml-2 bg-base-100 shadow-xl rounded-xl p-3 w-48 z-50 border border-base-300 animate-fadeIn">
              <ul className="flex flex-col gap-2">
                {/* Opciones normales */}
                {configMenu.children
                  .filter((child) => child.action !== "logout")
                  .map((child, idx) => (
                    <li key={idx}>
                      <Link
                        to={child.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-200 ${
                          location.pathname === child.path
                            ? "bg-base-200 font-semibold"
                            : ""
                        }`}
                      >
                        {icons[child.icon]} {child.name}
                      </Link>
                    </li>
                  ))}

                {/* Línea divisoria */}
                <hr className="border-t border-base-300 my-1" />

                {/* Botón de cerrar sesión */}
                {configMenu.children
                  .filter((child) => child.action === "logout")
                  .map((child, idx) => (
                    <li key={idx}>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-base-200 text-left text-red-500 hover:text-red-600"
                      >
                        {icons[child.icon]} {child.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
