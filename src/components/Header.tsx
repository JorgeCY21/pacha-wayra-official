// components/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Mountain, Sparkles, Heart, Home } from "lucide-react";
import { motion } from "framer-motion";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Fondo con gradiente y efecto glassmorphism */}
      <div className="bg-gradient-to-r from-emerald-600/95 via-teal-600/95 to-cyan-600/95 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo Mejorado */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-gradient-to-br from-white to-emerald-100 p-2 rounded-2xl shadow-lg">
                  <Mountain className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent tracking-tight">
                  PachaWayra
                </span>
                <div className="flex items-center gap-1">
                  <Sparkles size={10} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-xs text-emerald-200 font-medium">Explore Peru</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Navegación Mejorada */}
          <nav className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/20">
            <Link
              to="/"
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                location.pathname === "/" 
                  ? "bg-white/20 text-white shadow-inner" 
                  : "text-emerald-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Home size={18} className={location.pathname === "/" ? "text-yellow-300" : ""} />
              <span>Home</span>
              {location.pathname === "/" && (
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-300/50 rounded-xl"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            <Link
              to="/favorites"
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                location.pathname === "/favorites"
                  ? "bg-white/20 text-white shadow-inner" 
                  : "text-emerald-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Heart 
                size={18} 
                className={location.pathname === "/favorites" ? "text-red-300 fill-red-300" : ""} 
              />
              <span>Favorites</span>
              {location.pathname === "/favorites" && (
                <motion.div
                  className="absolute inset-0 border-2 border-red-300/50 rounded-xl"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </nav>
        </div>

        {/* Efecto de partículas decorativas */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
      </div>

      {/* Efecto de brillo superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-300/50 via-yellow-200/30 to-emerald-300/50" />
    </header>
  );
}

export default Header;