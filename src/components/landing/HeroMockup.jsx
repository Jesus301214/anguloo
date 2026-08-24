import React from 'react'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, Scissors, Activity } from 'lucide-react'

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
    <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto flex items-center justify-center pointer-events-none scale-90 md:scale-100">
      
      {/* Central Phone Mockup */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[280px] h-[580px] bg-gray-950 rounded-[40px] border-[8px] border-gray-800 shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden z-10 flex flex-col ring-1 ring-white/10"
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-28 h-6 bg-gray-800 rounded-b-3xl"></div>
        </div>

        {/* Header */}
        <div className="pt-10 px-6 pb-5 border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg">
              {iconBase}
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide">{businessName}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Abierto ahora</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1 p-5 space-y-3 bg-[#0a0f1c]">
          <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Servicios Frecuentes</h4>
          
          {[
            { name: service1, price: "$15", color: "bg-emerald-500/10 text-emerald-400", time: "30 min" },
            { name: service2, price: "$25", color: "bg-blue-500/10 text-blue-400", time: "45 min" },
            { name: service3, price: "$40", color: "bg-purple-500/10 text-purple-400", time: "60 min" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-900 border border-gray-800/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <span className="font-bold text-sm">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <span className="text-gray-200 text-sm font-bold block leading-none mb-1.5">{item.name}</span>
                  <span className="text-gray-500 text-[10px] flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                </div>
              </div>
              <span className="text-white font-bold text-sm">{item.price}</span>
            </div>
          ))}

          {/* Action Button */}
          <div className="absolute bottom-6 left-5 right-5">
            <div className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm text-center shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
              Nueva Reserva
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card Left: Ticket/Reserva */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute left-[-40px] md:left-[-80px] top-[18%] w-[220px] bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20"
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
        className="absolute right-[-30px] md:right-[-60px] bottom-[15%] w-[240px] bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 shadow-[0_30px_50px_rgba(0,0,0,0.6)] z-20"
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
