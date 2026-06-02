import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const FinalCTASection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.cta-content', { 
        y: 40, 
        autoAlpha: 0, 
        duration: 0.8, 
        ease: 'power3.out', 
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
      })
      gsap.to('.cta-glow', {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="py-32 bg-[#030712] px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="cta-content bg-[#0a0f1a] border border-gray-800/80 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
          
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-gray-400" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black font-outfit mb-6 leading-[1.1]">
            <span className="text-white">Empieza a crecer </span><br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">hoy mismo.</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Únete a los miles de negocios que ya automatizaron sus reservas y tomaron el control de su crecimiento con ANGULO.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-base font-bold text-gray-900 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto group"
            >
              <span className="relative z-10">Prueba Gratis</span>
              <ArrowRight size={18} className="relative z-10 ml-1 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <a
              href="https://wa.me/584249313359"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 bg-[#0a0f1a]/50 px-10 py-5 text-base font-bold text-white hover:bg-white/5 hover:border-gray-700 transition-all w-full sm:w-auto group"
            >
              Agendar Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
