import React from 'react'
import { motion } from 'framer-motion'
import { Scissors, Stethoscope, HeartPulse, Sparkles } from 'lucide-react'

const audiences = [
  {
    title: 'Salones de Belleza',
    description: 'Tu propia web elegante para mostrar trabajos de color y corte, reservas directas a tus estilistas y cero inasistencias.',
    icon: Sparkles,
    image: '/beauty_salon_photo.png',
    gradient: 'from-pink-500/20 to-rose-500/5',
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10'
  },
  {
    title: 'Barberías',
    description: 'Una web con estilo masculino y moderno, reserva de turnos en 3 clics, comisiones de barberos y control total de caja.',
    icon: Scissors,
    image: '/barbershop_photo.png',
    gradient: 'from-amber-500/20 to-orange-500/5',
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    title: 'Centros Estéticos y Spas',
    description: 'Web de alto nivel con catálogo de tratamientos, fichas detalladas de clientes y venta de paquetes o servicios online.',
    icon: HeartPulse,
    image: '/spa_photo.png',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'Clínicas y Consultorios',
    description: 'Portal web médico profesional con perfil de especialistas, agenda de consultas y fichas clínicas seguras.',
    icon: Stethoscope,
    image: '/clinic_photo.png',
    gradient: 'from-blue-500/20 to-indigo-500/5',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  }
]

const TargetAudienceSection = () => {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden" id="audiencia">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">¿Para quién es Angulo?</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-outfit mb-6 text-white tracking-tight"
          >
            Diseñado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">potenciar tu sector</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            No somos un software genérico. Entendemos las necesidades específicas de los negocios de belleza y salud para ayudarte a crecer de verdad.
          </motion.p>
        </div>

        <div className="space-y-12 lg:space-y-24">
          {audiences.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-1/2 flex justify-center items-center">
                <div className="w-[85%] glass-card p-2 rounded-3xl overflow-hidden relative group shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50`}></div>
                  <img 
                    src={item.image} 
                    alt={`Software de gestión para ${item.title.toLowerCase()}`}
                    className="w-full h-auto object-cover rounded-2xl relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl z-20 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bgColor} border border-white/5`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">{item.description}</p>
                <div className="pt-4">
                  <a href="#" className={`inline-flex items-center gap-2 font-semibold ${item.iconColor} hover:text-white transition-colors group`}>
                    Ver cómo funciona
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TargetAudienceSection
