import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const FinalCTA = ({ setIsModalOpen, whatsappLink }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.final-cta-card', { y: 60, autoAlpha: 0, scale: 0.95, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-rose-500/5" />
      <div className="final-cta-card mx-auto max-w-5xl bg-slate-50 rounded-[4rem] p-12 md:p-24 text-center border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <div className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full animate-pulse uppercase tracking-widest shadow-lg shadow-rose-500/20">Cupos Limitados</div>
        </div>
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 font-outfit mb-8 leading-[1.1]">
          ¿Estás listo para que tu empresa pase al <span className="text-rose-500">siguiente nivel?</span>
        </h2>
        <p className="text-slate-600 text-xl mb-12 max-w-2xl mx-auto">
          Solicita tu auditoría gratuita. Te mostramos exactamente dónde pierdes tiempo y dinero — y cómo automatizarlo.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button onClick={() => setIsModalOpen(true)} className="bg-rose-500 hover:bg-rose-600 text-white font-black px-12 py-5 rounded-2xl text-lg shadow-2xl shadow-rose-500/20 transition-all transform hover:-translate-y-1 active:scale-95">
            Solicitar Auditoría Gratis
          </button>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black px-12 py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
            <MessageCircle size={24} className="text-rose-500" /> Hablar con un Experto
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
