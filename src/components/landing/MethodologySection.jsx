import { motion } from 'framer-motion'

const steps = [
  {
    id: 1,
    title: 'Auditoría Operativa',
    color: 'rose',
    desc: 'Analizamos cada rincón de tu negocio: cómo vendes, cómo cobras y dónde pierdes dinero sin saberlo.',
  },
  {
    id: 2,
    title: 'Diseño de Automatización',
    color: 'blue',
    desc: 'Creamos un plan personalizado: eliminamos tareas repetitivas y conectamos tus herramientas.',
  },
  {
    id: 3,
    title: 'Implementación y Soporte',
    color: 'emerald',
    desc: 'Instalamos, entrenamos a tu equipo y te acompañamos. Tu operación crece con nosotros.',
  },
]

const MethodologySection = ({ teamImage }) => {
  return (
    <section id="metodologia" className="py-24 bg-slate-50 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-outfit mb-8">
              Nuestra Metodología: <br />
              <span className="text-rose-500 italic">Claridad Radical</span>
            </h2>
            <div className="relative space-y-12">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 hidden sm:block" />

              {steps.map((step) => (
                <div key={step.id} className="flex gap-6 group">
                  <div
                    className={`h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-${step.color}-500 font-black shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    {step.id}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-rose-500/5 blur-3xl rounded-full"></div>
            <img
              src={teamImage}
              alt="Team"
              className="relative rounded-[3rem] border border-slate-200 shadow-2xl transition-all duration-1000"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MethodologySection
