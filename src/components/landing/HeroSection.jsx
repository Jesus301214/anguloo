import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'

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

const HeroSection = ({ heroImage, setIsModalOpen }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.6 })
        .from(
          '.hero-word',
          { y: 60, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: 'power4.out' },
          '-=0.3',
        )
        .from('.hero-subtitle', { y: 30, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { y: 30, autoAlpha: 0, duration: 0.7 }, '-=0.4')

      gsap.from('.hero-dashboard', {
        y: 40,
        autoAlpha: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      })

      gsap.to('.hero-glow-1', {
        x: '+=60',
        y: '-=30',
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-glow-2', {
        x: '-=40',
        y: '+=20',
        scale: 0.9,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-6 pt-40 pb-24 bg-white"
    >
      <div className="hero-glow-1 absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="hero-glow-2 absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:gap-16 md:grid-cols-2 relative z-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left relative z-20">
          <div className="hero-badge mb-8 inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-rose-600 backdrop-blur-sm">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-rose-500"></span>
            Auditorías Operativas + Automatización
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-8xl font-outfit leading-[1.1]">
            {words.map((word, i) => (
              <span
                key={i}
                className={`hero-word inline-block mr-[0.25em] ${word.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500' : ''}`}
              >
                {word.text}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle mb-10 max-w-xl text-base leading-relaxed text-slate-600 sm:text-xl">
            Hacemos una auditoría gratuita de tu operación, detectamos los procesos que te cuestan
            tiempo y dinero, y los convertimos en sistemas automáticos que trabajan por ti.
          </p>

          <div className="hero-cta flex flex-col w-full sm:w-auto gap-4 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto group"
            >
              Solicita tu Auditoría Gratis
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        <div className="hero-dashboard relative w-full">
          <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-800/50 to-slate-900/50 p-2 sm:p-4 backdrop-blur-md border border-slate-700/50 shadow-2xl">
            <img
              src={heroImage}
              alt="Dashboard"
              className="w-full h-auto object-cover opacity-90 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
