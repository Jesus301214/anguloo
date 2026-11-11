import { useRef, useState, useEffect } from 'react'
import { Sparkles, Play, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'
import HeroMockup from './HeroMockup'

const HeroSection = ({ setIsModalOpen, niche = 'general' }) => {
  const containerRef = useRef(null)
  const mockupRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.6 })
        .from('.hero-title-line', { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: 'power4.out' }, '-=0.3')
        .from('.hero-subtitle', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 25, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      
      gsap.to('.hero-glow-1', { scale: 1.05, opacity: 0.6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.hero-glow-2', { scale: 1.1, opacity: 0.4, duration: 5, delay: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    },
    { scope: containerRef }
  )

  return (
    <section 
      ref={containerRef} 
      className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden px-6 bg-[#030712] min-h-[90vh] flex items-center justify-center cursor-crosshair"
    >
      {/* 1. Base Blurred Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/office-bg.png" 
          alt="Fondo de oficina de administración para software de salones y clínicas" 
          className="absolute inset-0 w-full h-full object-cover filter blur-[8px] brightness-[0.3] scale-105"
        />
      </div>

      {/* 2. Spotlight Clear Image */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          WebkitMaskImage: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
          maskImage: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <img 
          src="/office-bg.png" 
          alt="Software de gestión de clínica estética y barbería" 
          className="absolute inset-0 w-full h-full object-cover scale-105 brightness-110"
        />
      </div>
      
      {/* 3. Global Gradients for Text Readability (Above images, but mostly on the left) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#030712] via-[#030712]/70 to-transparent pointer-events-none w-full md:w-3/4"></div>
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none h-full"></div>

      {/* 4. Ambient Glows */}
      <div className="hero-glow-1 absolute top-0 left-1/4 z-20 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="hero-glow-2 absolute bottom-0 right-1/4 z-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen pointer-events-none" />

      {/* 5. Main Content */}
      <div className="mx-auto max-w-7xl w-full relative z-30 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full pointer-events-auto">
          
          <div className="flex flex-col items-start text-left max-w-3xl">
            
            <div className="hero-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#0a0f1a]/90 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Software de Gestión + Tu Propia Página Web Completa</span>
            </div>

            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl font-outfit leading-[1.05] drop-shadow-2xl">
              {niche === 'barberias' && (
                <>
                  <div className="hero-title-line text-white">Software de gestión para</div>
                  <div className="hero-title-line">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-glow-cyan pb-1 inline-block">Barberías</span>
                  </div>
                  <div className="hero-title-line text-white">que automatiza tu</div>
                  <div className="hero-title-line text-white">negocio.</div>
                </>
              )}
              {niche === 'clinicas' && (
                <>
                  <div className="hero-title-line text-white">Software de gestión para</div>
                  <div className="hero-title-line">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-glow-cyan pb-1 inline-block">Clínicas Estéticas</span>
                  </div>
                  <div className="hero-title-line text-white">que automatiza tu</div>
                  <div className="hero-title-line text-white">negocio.</div>
                </>
              )}
              {niche === 'general' && (
                <>
                  <div className="hero-title-line text-white">Software de gestión para</div>
                  <div className="hero-title-line">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-glow-cyan pb-1 inline-block">Salones, Clínicas</span>
                  </div>
                  <div className="hero-title-line text-white">y Barberías que</div>
                  <div className="hero-title-line text-white">automatiza tu</div>
                  <div className="hero-title-line text-white">negocio.</div>
                </>
              )}
            </h1>

            <p className="hero-subtitle mb-10 max-w-xl text-lg leading-relaxed text-gray-300 font-medium drop-shadow-md">
              Obtén <strong className="text-white font-semibold">tu propia página web completa</strong> con reservas online 24/7, elimina inasistencias por WhatsApp y controla tu negocio con IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <a
                href="https://app.angulosoftwares.com"
                className="hero-cta relative overflow-hidden flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover-3d w-full sm:w-auto group"
              >
                <span className="relative z-10">Comenzar Ahora →</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a
                href="https://wa.me/584249313359"
                target="_blank"
                rel="noreferrer"
                className="hero-cta flex items-center justify-center gap-3 rounded-2xl glass hover-3d px-8 py-4 text-base font-bold text-white transition-all w-full sm:w-auto group border border-gray-600 bg-gray-900/50"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                </div>
                Ver Demo
              </a>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2, delayChildren: 1 }}
              className="hero-stats flex flex-wrap justify-start gap-x-10 gap-y-6 pt-8 border-t border-gray-700/60 w-full"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center backdrop-blur-md">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Página Web Incluida</div>
                  <div className="text-xs font-medium text-cyan-300">100% personalizada</div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-900/80 border border-gray-700 flex items-center justify-center backdrop-blur-md">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Reservas Online 24/7</div>
                  <div className="text-xs font-medium text-gray-400">Directo a WhatsApp</div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-900/80 border border-gray-700 flex items-center justify-center backdrop-blur-md">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Soporte 24/7</div>
                  <div className="text-xs font-medium text-gray-400">Te ayudamos siempre</div>
                </div>
              </motion.div>
            </motion.div>
            
          </div>

          {/* Right Column: Logo with dramatic entrance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateY: 90, z: -200 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 40, 
              damping: 18, 
              delay: 0.6,
              mass: 2
            }}
            className="hidden lg:flex justify-center items-center relative lg:-mt-40"
          >
            <div className="relative group perspective-[1000px]">
              {/* Pulse glow behind the logo */}
              <div className="absolute inset-0 bg-cyan-500/30 blur-[100px] rounded-full scale-150 animate-pulse" />
              
              <HeroMockup niche={niche} />
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 hidden md:flex z-20 pointer-events-none">
        <span className="text-xs font-medium text-gray-300 tracking-widest uppercase">Descubre Más</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-gray-400 to-transparent rounded-full"></div>
      </div>
    </section>
  )
}

export default HeroSection
