import React from 'react'
import { Target, BookOpen, Star, LineChart, Eye, Heart, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: <Target />,
    title: 'Foco en el objetivo',
    desc: 'Todo parte por entender qué se quiere lograr. El objetivo ordena la conversación.',
  },
  {
    icon: <BookOpen />,
    title: 'Claridad para decidir',
    desc: 'La gestión debe entregar claridad, no enredos. Ordenamos lo relevante.',
  },
  {
    icon: <Star />,
    title: 'Excelencia real',
    desc: 'Software construido desde la trinchera de tu propia operación.',
  },
  {
    icon: <LineChart />,
    title: 'Aprendizaje continuo',
    desc: 'Se observa, se entiende y se transforma. Evolucionamos con cada dato.',
  },
  {
    icon: <Eye />,
    title: 'Transparencia',
    desc: 'Somos claros con los alcances y los tiempos. La confianza es nuestro activo.',
  },
  {
    icon: <Heart />,
    title: 'Impacto positivo',
    desc: 'El crecimiento real significa menos estrés, más orden y más vida propia.',
  },
  {
    icon: <Users />,
    title: 'Responsabilidad',
    desc: 'Hacemos lo que dijimos que íbamos a hacer. Sin excusas.',
  },
  {
    icon: <Zap />,
    title: 'Proactividad',
    desc: 'Anticipamos necesidades y entregamos soluciones antes de que sean urgencias.',
  },
]

const ValuesSection = () => {
  return (
    <section id="valores" className="py-24 bg-slate-50 px-6 border-t border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Nuestros <span className="text-rose-500">8 Valores</span> Fundamentales
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            Lo que guía cada decisión y cada conversación con nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-rose-500/30 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="mb-6 text-rose-500 w-10 h-10 flex items-center justify-center bg-rose-50 rounded-xl">
                {React.cloneElement(v.icon, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
