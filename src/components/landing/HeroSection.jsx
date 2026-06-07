import { useRef, useState } from 'react'
import { Sparkles, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'

const HeroSection = ({ setIsModalOpen }) => {
  const containerRef = useRef(null)
  const mockupRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!mockupRef.current) return
    const rect = mockupRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

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
                hace <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-glow-emerald pb-1 inline-block">crecer tu</span>
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
                className="hero-cta relative overflow-hidden flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-500 px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] hover-3d w-full sm:w-auto group"
              >
                <span className="relative z-10">Prueba Gratis →</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <a
                href="https://wa.me/584249313359"
                target="_blank"
                rel="noreferrer"
                className="hero-cta flex items-center justify-center gap-3 rounded-2xl glass hover-3d px-8 py-4 text-base font-bold text-white transition-all w-full sm:w-auto group"
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

          {/* Right Content - Mockup (Spotlight Effect) */}
          <div className="hero-mockup relative flex items-center justify-center lg:justify-end">
            <div 
              ref={mockupRef}
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] group cursor-crosshair mt-12 lg:mt-0"
            >
              {/* Background Image (Blurred & Darkened) */}
              <img 
                src="/office-bg.png" 
                alt="Agente Inteligente" 
                className="absolute inset-0 w-full h-full object-cover filter blur-[6px] brightness-[0.25] scale-105 transition-all duration-700 group-hover:blur-[10px] group-hover:brightness-[0.15]"
              />
              
              {/* Foreground Image (Clear, revealed by mask) */}
              <div 
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 100%)`
                }}
              >
                <img 
                  src="/office-bg.png" 
                  alt="Agente Inteligente Claro" 
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                />
              </div>

              {/* Inner Text overlay for style */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 pointer-events-none">
                 <h3 className="text-4xl sm:text-5xl font-black text-white/10 group-hover:text-white/90 transition-colors duration-500 font-outfit drop-shadow-xl">Angulo AI</h3>
                 <p className="text-xs sm:text-sm font-bold tracking-widest text-emerald-400/30 group-hover:text-emerald-400 transition-colors duration-500 uppercase mt-2">Tecnología que ilumina tu negocio</p>
              </div>
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
