import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Play, Globe, Layout, Smartphone, Zap, MessageCircle } from 'lucide-react';

const PricingCardsSection = ({ onOpenModal }) => {
  return (
    <section id="planes" className="py-32 bg-slate-950 px-6 relative overflow-hidden">
      {/* Luces de fondo sutiles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Columna Izquierda: Video / Demo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-rose-500" />
              <span className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase">— DEMO EN VIVO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-outfit mb-8 leading-[1.1]">
              Mira cómo <span className="text-rose-500">ÁNGULO</span> transforma tu día a día.
            </h2>
            
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10 opacity-60" />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto object-cover aspect-video opacity-90 group-hover:scale-105 transition-transform duration-1000"
              >
                <source src="/tu-video.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
              
              {/* Overlay de interacción visual */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/50 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-2xl shadow-rose-500/20">
                  <Play fill="currentColor" size={32} className="ml-1" />
                </div>
              </div>
            </div>

            <p className="mt-8 text-slate-400 text-lg leading-relaxed italic">
              "Buscamos que tu única preocupación sea atender a tus clientes, del orden y los datos nos encargamos nosotros."
            </p>
          </motion.div>

          {/* Columna Derecha: Tarjetas de Plan */}
          <div className="space-y-8">
            
            {/* Tarjeta 1: Ecosistema ÁNGULO */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-slate-900/50 border-2 border-rose-500/20 shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/30 animate-pulse">Recomendado</div>
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

              <ul className="space-y-5 mb-10">
                {[
                  "Dashboard Estratégico en tiempo real.",
                  "Prospección automática con LeadRadar y Guiones IA.",
                  "Gestión centralizada de agendas, reservas y servicios.",
                  "Control total de finanzas, reportes e inventario."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{item}</span>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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

              <ul className="space-y-5 mb-10">
                {[
                  { text: "Diseño moderno y alineado a tu identidad visual.", icon: <Globe size={14}/> },
                  { text: "Estructura estratégica enfocada en conversiones.", icon: <Zap size={14}/> },
                  { text: "Integración de botones directos a WhatsApp/Redes.", icon: <MessageCircle size={14} className="hidden" /> }, // Use lucide icons
                  { text: "Carga ultra rápida y 100% adaptable a celulares.", icon: <Smartphone size={14}/> }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 group-hover:text-rose-500 transition-colors">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-slate-400 font-medium group-hover:text-slate-200 transition-colors">{item.text}</span>
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
