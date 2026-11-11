import React from 'react'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, Scissors, Activity, Globe } from 'lucide-react'

const HeroMockup = ({ niche = 'general' }) => {
  
  // Custom texts based on niche
  const isBarber = niche === 'barberias'
  const isClinic = niche === 'clinicas'
  
  const businessName = isBarber ? "Barbería Classic" : isClinic ? "Clínica Estética" : "Salón & Spa"
  const service1 = isBarber ? "Corte Clásico" : isClinic ? "Limpieza Facial" : "Corte y Lavado"
  const service2 = isBarber ? "Arreglo de Barba" : isClinic ? "Sesión Láser" : "Manicura"
  const service3 = isBarber ? "Corte Premium" : isClinic ? "Botox Capilar" : "Tinte Completo"
  const iconBase = isBarber ? <Scissors className="w-5 h-5 text-amber-900" /> : isClinic ? <Activity className="w-5 h-5 text-blue-900" /> : <Scissors className="w-5 h-5 text-emerald-900" />

  return (
    <div className="relative w-full max-w-[800px] aspect-[4/5] mx-auto flex items-center justify-center pointer-events-none scale-90 md:scale-100">
      
      {/* Background Tablet Mockup (Dashboard Replica) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 0, x: -100 }}
        animate={{ opacity: 1, scale: 0.85, y: -20, x: -140 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-[760px] h-[460px] bg-[#f8fafc] rounded-2xl border-[6px] border-gray-800 shadow-2xl overflow-hidden z-0 hidden lg:flex flex-col ring-1 ring-white/10 opacity-90 origin-center"
      >
        <img src="/dashboard-mockup.png" alt="Dashboard de Angulo" className="w-full h-full object-cover object-left-top" />
      </motion.div>

      {/* Central Phone Mockup */}
      <motion.div 
        initial={{ y: 20, x: 120, opacity: 0 }}
        animate={{ y: 20, x: 100, opacity: 1, scale: 0.85 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative w-[280px] h-[580px] bg-gray-950 rounded-[40px] border-[8px] border-gray-800 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col ring-1 ring-white/10"
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-28 h-6 bg-gray-800 rounded-b-3xl"></div>
        </div>

        <img src="/mobile-mockup.png" alt="App Móvil Angulo" className="absolute inset-0 w-full h-full object-cover object-top" />
      </motion.div>

      {/* Floating Pill Top Right: Website Status */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute right-[-100px] md:right-[-120px] top-[10%] bg-gray-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-3.5 shadow-[0_15px_35px_rgba(6,182,212,0.3)] z-30 flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
          <Globe className="w-5 h-5" />
        </div>
        <div className="text-left pr-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-black text-white uppercase tracking-wider">Tu Web Oficial</span>
          </div>
          <span className="text-[10px] text-cyan-300 font-mono font-medium">www.tunegocio.com</span>
        </div>
      </motion.div>

      {/* Floating Card Left: Ticket/Reserva */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute left-[80px] md:left-[40px] top-[18%] w-[220px] bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20"
      >
        <div className="flex items-center justify-between mb-3 border-b border-gray-800/50 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Cita #4287</span>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">18:24</span>
        </div>
        
        <div className="space-y-2.5 mb-4">
          <div className="flex justify-between text-xs items-center">
            <span className="text-gray-200 font-medium">1x {service1}</span>
            <span className="text-white font-bold">$15</span>
          </div>
          <div className="flex justify-between text-xs items-center">
            <span className="text-gray-200 font-medium">1x Producto Extra</span>
            <span className="text-white font-bold">$20</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
            <Clock className="w-3 h-3" />
            <span>En sala</span>
          </div>
          <span className="text-gray-500 text-[10px] font-medium">Hace 12 min</span>
        </div>
      </motion.div>

      {/* Floating Card Right: Sales Graph */}
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute right-[-150px] md:right-[-180px] bottom-[15%] w-[240px] bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 shadow-[0_30px_50px_rgba(0,0,0,0.6)] z-20"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ventas Hoy</h4>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            <TrendingUp className="w-3 h-3" />
            <span>+18%</span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-3xl font-black text-white tracking-tight">$8,942</span>
        </div>

        {/* Faux SVG Graph */}
        <div className="w-full h-14 mb-4">
          <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
            <path 
              d="M0 40 L 30 35 L 60 45 L 90 25 L 120 30 L 150 15 L 180 20 L 200 5" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="drop-shadow-[0_4px_6px_rgba(16,185,129,0.4)]"
            />
            <path 
              d="M0 40 L 30 35 L 60 45 L 90 25 L 120 30 L 150 15 L 180 20 L 200 5 L 200 60 L 0 60 Z" 
              fill="url(#fade)" 
              opacity="0.4"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex items-center justify-between border-t border-gray-800/50 pt-3">
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Tickets</p>
            <p className="text-sm font-black text-white">38</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Ticket Prom.</p>
            <p className="text-sm font-black text-white">$235</p>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default HeroMockup
