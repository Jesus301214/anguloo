import { Calendar, Users, Package, ClipboardList, Wallet, LineChart } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <Calendar size={24} className="text-gray-300" />,
    title: 'Calendario Inteligente',
    desc: 'Gestiona reservas, reduce inasistencias y envía recordatorios automáticos por WhatsApp.',
  },
  {
    icon: <Users size={24} className="text-gray-300" />,
    title: 'CRM Avanzado',
    desc: 'Conoce a tus clientes, su historial, preferencias y aumenta su fidelización.',
  },
  {
    icon: <Package size={24} className="text-gray-300" />,
    title: 'Inventario Inteligente',
    desc: 'Controla tu inventario en tiempo real y recibe alertas de stock bajo.',
  },
  {
    icon: <ClipboardList size={24} className="text-gray-300" />,
    title: 'Seguimiento de Clientes',
    desc: 'Conoce exactamente cuándo fue su última cita, su historial de visitas completo y servicios más utilizados.',
  },
  {
    icon: <Wallet size={24} className="text-gray-300" />,
    title: 'Control Financiero',
    desc: 'Gestiona el flujo de caja diario, controla tus gastos y calcula comisiones automáticamente.',
  },
  {
    icon: <LineChart size={24} className="text-gray-300" />,
    title: 'Métricas en Tiempo Real',
    desc: 'Visualiza gráficas de ingresos, rentabilidad y estado financiero de tu negocio al instante.',
  },
]

const BentoGridSection = () => {
  return (
    <section id="funciones" className="py-24 bg-[#050a14] px-6 relative border-b border-gray-800/30">
      <div className="mx-auto max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="feature-header mb-16 max-w-2xl"
        >
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
            TODO LO QUE NECESITAS <span className="inline-block w-8 h-px bg-gray-600 align-middle ml-2"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit leading-tight text-white">
            Una plataforma completa para gestionar tu negocio
          </h2>
        </motion.div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              key={i} 
              className="feature-card group rounded-3xl bg-[#0a0f1a] border border-gray-800/60 p-8 hover:bg-[#0d1222] hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)] hover:border-gray-700/60 transition-all duration-300"
            >
              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BentoGridSection
