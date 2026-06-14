import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

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
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

const imageVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      delay: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.6
    }
  }
}

const overlayCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

const ResultsSection = () => {
  const benefits = [
    'Ahorra hasta 10 horas por semana en tareas administrativas',
    'Reduce inasistencias hasta en un 70%',
    'Aumenta la retención de clientes hasta en un 60%',
    'Toma el control total de tu negocio desde cualquier lugar'
  ]

  return (
    <section className="py-24 bg-[#030712] px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-cyan-900/10 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-4">
                RESULTADOS REALES <span className="inline-block w-8 h-px bg-cyan-500/50 align-middle ml-2"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-outfit leading-tight text-white mb-8">
                Más tiempo, menos caos, <br className="hidden md:block"/>
                <span className="text-white border-b-2 border-cyan-500/30 pb-1">más ganancias.</span>
              </h2>
            </motion.div>
            
            <ul className="space-y-5">
              {benefits.map((benefit, i) => (
                <motion.li variants={itemVariants} key={i} className="flex items-start gap-4">
                  <CheckCircle2 size={22} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg font-medium leading-snug">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
              <img 
                src="/results-section.png" 
                alt="Dueño de negocio usando Angulo" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Cards - Glassmorphism update */}
              <motion.div variants={overlayCardVariants} className="absolute bottom-6 left-6 z-20 bg-blue-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="text-xs font-bold text-cyan-200">Reserva confirmada</div>
                </div>
                <div className="text-sm font-bold text-white ml-11">Ana Martínez - 10:00 AM</div>
              </motion.div>

              <motion.div variants={overlayCardVariants} className="absolute top-6 right-6 z-20 bg-blue-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                <div className="text-xs font-bold text-gray-300 mb-1">Ventas este mes</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-black text-white font-outfit">$12,450</div>
                  <div className="text-xs font-bold text-cyan-400 mb-1 flex items-center bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    ↑ 22%
                  </div>
                </div>
                <div className="flex items-end gap-1.5 mt-4 h-10">
                  {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.8 + (i * 0.05), ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="w-2 rounded-t-sm bg-cyan-500/30" 
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Decorative dots pattern */}
            <svg className="absolute -bottom-10 -right-10 w-40 h-40 text-cyan-900/20 -z-10" fill="currentColor" viewBox="0 0 100 100">
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ResultsSection
