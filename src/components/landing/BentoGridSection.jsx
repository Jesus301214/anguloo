import { Calendar, Users, Package, Wallet, LineChart, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <Globe size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'Página Web para tu Marca',
    desc: 'Tu propio sitio web moderno, rápido y optimizado para Google. Catálogo interactivo, galería y reservas directas.',
  },
  {
    icon: <Calendar size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'Calendario Inteligente',
    desc: 'Gestiona reservas, reduce inasistencias y envía recordatorios automáticos por WhatsApp sincronizados con tu web.',
  },
  {
    icon: <Users size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'CRM y Clientes',
    desc: 'Conoce a tus clientes, su historial de visitas completo, preferencias y fidelización automatizada.',
  },
  {
    icon: <Package size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'Inventario Inteligente',
    desc: 'Controla tu inventario en tiempo real con descarga automática por servicio y alertas de stock bajo.',
  },
  {
    icon: <Wallet size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'Control Financiero y Caja',
    desc: 'Gestiona el flujo de caja diario, controla tus gastos y calcula comisiones de tus profesionales al instante.',
  },
  {
    icon: <LineChart size={24} className="text-cyan-400 group-hover:text-white transition-colors" />,
    title: 'Métricas en Tiempo Real',
    desc: 'Visualiza gráficas de ingresos, rentabilidad y estado de crecimiento de tu negocio desde cualquier lugar.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

const BentoGridSection = () => {
  return (
    <section id="funciones" className="py-24 bg-[#030712] px-6 relative border-b border-gray-800/30 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="feature-header mb-16 max-w-2xl"
        >
          <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-4">
            TODO LO QUE NECESITAS <span className="inline-block w-8 h-px bg-cyan-500/50 align-middle ml-2"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit leading-tight text-white">
            Tu página web y sistema de gestión en una sola plataforma
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <motion.div 
              variants={itemVariants}
              key={i} 
              className="feature-card group rounded-3xl bg-blue-950/10 backdrop-blur-xl border border-white/5 p-8 hover:bg-blue-900/20 transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)] hover:border-cyan-500/30 hover:-translate-y-1"
            >
              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-950/40 border border-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default BentoGridSection
