import { useRef } from 'react'
import { ArrowRight, AlertCircle, UserX, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const cards = [
  {
    icon: <AlertCircle className="w-8 h-8" />,
    title: 'Crecer duele sin procesos',
    desc: 'Cada nueva venta trae más presión y más errores. En la auditoría detectamos exactamente dónde se rompe tu operación y diseñamos la automatización precisa.',
  },
  {
    icon: <UserX className="w-8 h-8" />,
    title: 'Dueño atrapado en la operación',
    desc: 'Vives apagando incendios. Identificamos esas tareas repetitivas, las eliminamos con automatización y te devolvemos las horas que pierdes cada semana.',
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: 'Pérdida invisible de dinero',
    desc: 'Inventario sin registrar, horas no cobradas. Te mostramos con números exactos cuánto estás perdiendo — y cómo recuperarlo con sistemas blindados.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const ProblemsSection = ({ setIsModalOpen }) => {
  return (
    <section id="problemas" className="py-32 bg-[#030712] px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-cyan-500" />
              <span className="text-xs font-black tracking-[0.3em] text-gray-400 uppercase">— TU DIAGNÓSTICO GRATUITO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white font-outfit mb-6 leading-[1.1]">
              ¿Qué hace que tu empresa tenga que <span className="text-cyan-400">vivir en urgencias?</span>
            </h2>
            <p className="text-gray-400 text-xl">
              Evaluamos tu operación gratis. Estos son los dolores que encontramos en el 90% de los negocios que auditamos.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 shadow-lg transition-all duration-300 font-bold"
          >
            Solicitar auditoría gratuita
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => (
            <motion.div variants={itemVariants} key={i} className="group hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 ease-out rounded-3xl h-full">
              <SpotlightCard className="h-full bg-blue-950/20 backdrop-blur-xl border-white/5 border overflow-hidden relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-900/30 border border-white/5 flex items-center justify-center text-cyan-400 mb-8 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-50 transition-colors">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{card.desc}</p>
                
                {/* Subtle glass reflection effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemsSection
