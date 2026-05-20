import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const FinalCTASection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.final-card', { y: 60, autoAlpha: 0, scale: 0.95, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-28 bg-[#030712] px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-500/5 via-transparent to-purple-500/5" />
      <div className="final-card mx-auto max-w-4xl bg-gradient-to-br from-[#0a0f1a] to-[#0d122a] border border-gray-800 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <div className="bg-rose-500/20 text-rose-400 text-[10px] font-black px-4 py-2 rounded-full animate-pulse uppercase tracking-wider border border-rose-500/30">
            Cupos Limitados
          </div>
        </div>
        <h2 className="text-3xl md:text-6xl font-black font-outfit mb-6 leading-tight">
          <span className="text-white">¿Listo para transformar </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">tu negocio?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Únete a más de 2,500 negocios de belleza que ya operan con ANGULO. Tu primera semana es gratis.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-black px-10 py-4 rounded-2xl text-base shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-0.5"
          >
            Prueba Gratis <ArrowRight size={18} className="inline ml-2" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-gray-600 bg-transparent hover:bg-white/5 text-white font-black px-10 py-4 rounded-2xl text-base transition-all hover:-translate-y-0.5"
          >
            Agendar Demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
