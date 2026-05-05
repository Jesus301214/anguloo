import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Play, Globe, Layout, Smartphone, Zap, MessageCircle } from 'lucide-react';

const PricingCardsSection = ({ onOpenModal }) => {
  return (
    <section id="planes" className="py-32 bg-slate-950 px-6 relative overflow-hidden">
      {/* Luces de fondo sutiles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Video (Sin textos) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-800 shadow-2xl bg-slate-900 ring-1 ring-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10 pointer-events-none" />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto object-cover aspect-video opacity-90 rounded-[3rem]"
              >
                <source src="/tu-video.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
            
            {/* Glow decorativo detrás del video */}
            <div className="absolute -inset-4 bg-rose-500/10 blur-3xl -z-10 rounded-[4rem] animate-pulse" />
          </motion.div>

          {/* Columna Derecha: Tarjetas de Plan */}
          <div className="space-y-8">
            
            {/* Tarjeta 1: Ecosistema ÁNGULO */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-slate-900/50 border-2 border-rose-500/20 shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/30">Recomendado</div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                  <Zap size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Ecosistema ÁNGULO</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Software + CRM + IA</p>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 mb-10">
                {[
                  "Dashboard Estratégico en tiempo real.",
                  "Prospección automática con LeadRadar y Guiones IA.",
                  "Gestión centralizada de agendas, reservas y servicios.",
                  "Control de finanzas, reportes e inventario.",
                  "Bases de datos en la nube y autenticación segura.",
                  "Integración de Inteligencia Artificial.",
                  "Migración y recuperación de datos.",
                  "Soporte técnico y actualizaciones."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenModal}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-5 rounded-2xl text-lg shadow-xl shadow-rose-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Agendar Auditoría Gratuita
                <ArrowRight size={20} />
              </button>
            </motion.div>

            {/* Tarjeta 2: Presencia Digital */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[3rem] bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <Layout size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Presencia Digital</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Solo Landing Page</p>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 mb-10">
                {[
                  "Diseño moderno y alineado a tu identidad visual.",
                  "Estructura estratégica enfocada en conversiones.",
                  "Integración de botones directos a WhatsApp/Redes.",
                  "Carga ultra rápida y 100% adaptable a celulares.",
                  "Alojamiento Premium y configuración de dominio.",
                  "SEO Básico (Optimización para motores de búsqueda).",
                  "Formularios inteligentes.",
                  "Mantenimiento mensual."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-slate-400 text-sm font-medium group-hover:text-slate-200 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenModal}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-2xl text-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Cotizar mi Landing Page
                <ArrowRight size={20} className="text-rose-500" />
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCardsSection;
