import { Mountain } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white border-t border-white/20">
      {/* Efecto de brillo superior */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-300/50 via-yellow-200/30 to-emerald-300/30" />
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          {/* Logo y nombre */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-xl">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
              PachaWayra
            </span>
          </motion.div>

          {/* Texto central */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-emerald-100/90"
            whileHover={{ scale: 1.02 }}
          >
            <span>Discover Peru with</span>
            <span className="font-semibold text-white">PachaWayra</span>
          </motion.div>

          {/* Créditos */}
          <motion.div 
            className="flex items-center gap-2 text-xs text-emerald-100/80"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
            </motion.div>
            <span>by</span>
            <span className="font-semibold text-cyan-200">Los Desorbitados</span>
            <span>• 2025</span>
          </motion.div>

        </motion.div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-300/20 via-cyan-300/30 to-teal-300/20" />
    </footer>
  );
}

export default Footer;