import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'

const words = [
  { text: 'El', gradient: false },
  { text: 'sistema', gradient: false },
  { text: 'que', gradient: false },
  { text: 'hace', gradient: false },
  { text: 'crecer', gradient: true },
  { text: 'tu', gradient: false },
  { text: 'negocio', gradient: true },
  { text: 'y', gradient: false },
  { text: 'lo', gradient: false },
  { text: 'hace', gradient: false },
  { text: 'pasar', gradient: false },
  { text: 'al', gradient: false },
  { text: 'siguiente', gradient: true },
  { text: 'nivel.', gradient: false },
]

const stats = [
  { value: '2,500+', label: 'Negocios activos' },
  { value: '30%', label: 'Más reservas en 30 días' },
  { value: '0%', label: 'Inasistencias con IA' },
]

const HeroSection = ({ heroImage, setIsModalOpen }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.6 })
        .from('.hero-word', { y: 50, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power4.out' }, '-=0.3')
        .from('.hero-subtitle', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { y: 25, autoAlpha: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-stats', { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
      gsap.from('.hero-mockup', { y: 60, autoAlpha: 0, scale: 0.92, duration: 1, delay: 0.6, ease: 'power3.out' })
      gsap.to('.hero-glow', { scale: 1.05, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    },
    { scope: containerRef },
  )

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden px-6 py-20 bg-[#030712]">
      <div className="hero-glow absolute inset-0 -z-10 bg-gradient-to-br from-rose-500/20 via-purple-500/10 to-transparent blur-3xl" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm font-semibold text-rose-400 backdrop-blur-sm">
            <Sparkles size={16} className="text-rose-400" />
            CRM con Inteligencia Artificial
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl font-outfit leading-[1.05]">
            {words.map((word, i) => (
              <span
                key={i}
                className={`hero-word inline-block mr-[0.2em] ${word.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400' : 'text-white'}`}
              >
                {word.text}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle mb-8 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            La plataforma que automatiza reservas, elimina inasistencias y controla tu inventario con IA. Menos caos, más ganancias.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-8 py-4 text-base font-bold text-white hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              Prueba Gratis <ArrowRight size={20} />
            </button>
            <a
              href="https://wa.me/584249313359"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-700 bg-transparent px-8 py-4 text-base font-bold text-white hover:bg-white/5 hover:border-gray-500 transition-all w-full sm:w-auto"
            >
              Agendar Demo
            </a>
          </div>

          <div className="hero-stats mt-10 flex gap-10">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-white font-outfit">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-mockup relative flex items-center justify-center">
          <div className="absolute w-80 h-80 bg-rose-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute w-60 h-60 bg-purple-500/15 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative max-w-md"
          >
            <img
              src={heroImage}
              alt="ANGULO"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
