import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, Lightbulb, Rocket } from 'lucide-react'

const MotivationSection = () => {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden" id="motivacion">
      {/* Elementos de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-6">
            <Heart size={16} />
            <span className="text-sm font-bold uppercase tracking-wider">Nuestro Propósito</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-outfit mb-6 text-white tracking-tight">
            Lo que nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Motiva</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            No solo creamos software; construimos el motor que impulsa el crecimiento de los negocios. Creemos en un futuro donde la tecnología trabaja para ti, no al revés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Impacto Real",
              desc: "Queremos ver negocios crecer, multiplicar sus ventas y alcanzar metas que parecían imposibles.",
              color: "text-rose-400",
              bg: "bg-rose-400/10",
              border: "border-rose-500/20"
            },
            {
              icon: Lightbulb,
              title: "Innovación Constante",
              desc: "Nos apasiona usar la última tecnología en Inteligencia Artificial para resolver problemas cotidianos de manera brillante.",
              color: "text-amber-400",
              bg: "bg-amber-400/10",
              border: "border-amber-500/20"
            },
            {
              icon: Rocket,
              title: "Liberar tu Tiempo",
              desc: "Sabemos que tu tiempo es invaluable. Trabajamos para automatizar lo tedioso, para que puedas enfocarte en lo que realmente importa.",
              color: "text-orange-400",
              bg: "bg-orange-400/10",
              border: "border-orange-500/20"
            }
          ].map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              key={index}
              className={`p-8 rounded-3xl bg-[#0a0f1a] border ${item.border} hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(244,63,94,0.15)] transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MotivationSection
