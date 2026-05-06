import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const HeroSection = ({ heroImage, setIsModalOpen }) => {
  const words = [
    { text: 'Encontramos', gradient: false },
    { text: 'lo', gradient: false },
    { text: 'que', gradient: false },
    { text: 'tu', gradient: true },
    { text: 'empresa', gradient: true },
    { text: 'pierde', gradient: true },
    { text: 'y', gradient: false },
    { text: 'lo', gradient: false },
    { text: 'automatizamos.', gradient: false },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-40 pb-24 bg-white">
      <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:gap-16 md:grid-cols-2 relative z-10"
      >
        <div className="flex flex-col items-center text-center md:items-start md:text-left relative z-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-rose-600 backdrop-blur-sm"
          >
            <span className="mr-2 flex h-2 w-2 rounded-full bg-rose-500"></span>
            Auditorías Operativas + Automatización
          </motion.div>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-8xl font-outfit leading-[1.1]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: (i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 40),
                  x: (i % 3 === 0 ? -1 : 1) * (20 + Math.random() * 30),
                  filter: 'blur(12px)',
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: 'blur(0px)',
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`inline-block mr-[0.25em] ${word.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500' : ''}`}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10 max-w-xl text-base leading-relaxed text-slate-600 sm:text-xl"
          >
            Hacemos una auditoría gratuita de tu operación, detectamos los procesos que te cuestan
            tiempo y dinero, y los convertimos en sistemas automáticos que trabajan por ti.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col w-full sm:w-auto gap-4 sm:flex-row"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto"
            >
              Solicita tu Auditoría Gratis <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        <div className="relative w-full">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-800/50 to-slate-900/50 p-2 sm:p-4 backdrop-blur-md border border-slate-700/50 shadow-2xl"
          >
            <img
              src={heroImage}
              alt="Dashboard"
              className="w-full h-auto object-cover opacity-90 rounded-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
