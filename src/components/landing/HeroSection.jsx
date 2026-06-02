import { useRef } from 'react'
import { Sparkles, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'

const HeroSection = ({ setIsModalOpen }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.6 })
        .from('.hero-title-line', { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: 'power4.out' }, '-=0.3')
        .from('.hero-subtitle', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 25, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-stats', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3')
      
      gsap.from('.hero-mockup', { 
        y: 80, 
        autoAlpha: 0, 
        scale: 0.95, 
        duration: 1.2, 
        delay: 0.5, 
        ease: 'power3.out' 
      })
      
      gsap.to('.hero-glow-1', { scale: 1.05, opacity: 0.6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.hero-glow-2', { scale: 1.1, opacity: 0.4, duration: 5, delay: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden px-6 bg-[#030712] min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#030712] to-[#030712]"></div>
      
      {/* Ambient Glows */}
      <div className="hero-glow-1 absolute top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-rose-500/10 blur-[120px] mix-blend-screen" />
      <div className="hero-glow-2 absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px] mix-blend-screen" />

      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10">
            
            <div className="hero-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-gray-800 bg-[#0a0f1a]/80 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-gray-300 shadow-xl">
              <Sparkles size={16} className="text-gray-400" />
              <span>CRM con Inteligencia Artificial</span>
            </div>

            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl font-outfit leading-[1.05]">
              <div className="hero-title-line text-white">El sistema que</div>
              <div className="hero-title-line">
                hace <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 border-b-4 border-gray-600/50 pb-1 inline-block">crecer tu</span>
              </div>
              <div className="hero-title-line text-white">negocio y lo hace</div>
              <div className="hero-title-line text-white">pasar al siguiente</div>
              <div className="hero-title-line text-white">nivel.</div>
            </h1>

            <p className="hero-subtitle mb-10 max-w-xl text-lg leading-relaxed text-gray-400 font-medium">
              Automatiza reservas, elimina inasistencias y controla tu inventario con IA. Menos caos, más ganancias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="hero-cta relative overflow-hidden flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto group"
              >
                <span className="relative z-10">Prueba Gratis →</span>
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <a
                href="https://wa.me/584249313359"
                target="_blank"
                rel="noreferrer"
                className="hero-cta flex items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-[#0a0f1a]/50 backdrop-blur-md px-8 py-4 text-base font-bold text-white hover:bg-white/5 hover:border-gray-700 transition-all w-full sm:w-auto group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                </div>
                Ver Demo
              </a>
            </div>

            <div className="hero-stats flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 pt-8 border-t border-gray-800/60 w-full max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f1a] border border-gray-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Sin tarjeta de crédito</div>
                  <div className="text-xs font-medium text-gray-500">Empieza gratis</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f1a] border border-gray-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Configuración en 5 min</div>
                  <div className="text-xs font-medium text-gray-500">Fácil e intuitiva</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f1a] border border-gray-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Soporte 24/7</div>
                  <div className="text-xs font-medium text-gray-500">Te ayudamos siempre</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Mockup */}
          <div className="hero-mockup relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[800px] lg:scale-[1.1] origin-right lg:translate-x-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl transform translate-y-4 translate-x-4 opacity-50 blur-xl"></div>
              <img
                src="/dashboard-mockup.png"
                alt="ANGULO Dashboard Preview"
                className="relative w-full h-auto rounded-xl border border-gray-800 shadow-2xl object-cover z-10"
              />
              {/* Floating element for depth */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 z-20 bg-[#0a0f1a]/90 backdrop-blur-xl border border-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nueva Reserva</div>
                  <div className="text-sm font-bold text-white">Ana Martínez - 10:00 AM</div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 hidden md:flex">
        <span className="text-xs font-medium text-gray-500 tracking-widest uppercase">Descubre Más</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-gray-500 to-transparent rounded-full"></div>
      </div>
    </section>
  )
}

export default HeroSection
