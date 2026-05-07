import { useRef } from 'react'
import { ArrowRight, AlertCircle, UserX, TrendingDown } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'
import SpotlightCard from './SpotlightCard'

const cards = [
  {
    icon: <AlertCircle className="w-8 h-8" />,
    title: 'Crecer duele sin procesos',
    desc: 'Cada nueva venta trae más presión y más errores. En la auditoría detectamos exactamente dónde se rompe tu operación y diseñamos la automatización precisa.',
  },
  {
    icon: <UserX className="w-8 h-8" />,
    title: 'Dueño atrapado en la operación',
    desc: 'Vives apagando incendios. Identificamos esas tareas repetitivas, las eliminamos con automatización y te devolvemos las horas que pierdes cada semana.',
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: 'Pérdida invisible de dinero',
    desc: 'Inventario sin registrar, horas no cobradas. Te mostramos con números exactos cuánto estás perdiendo — y cómo recuperarlo con sistemas blindados.',
  },
]

const ProblemsSection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.problems-title', {
        y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
      gsap.from('.problems-card', {
        y: 50, autoAlpha: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.problems-grid', start: 'top 80%', toggleActions: 'play none none none' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="problemas" className="py-32 bg-slate-50 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="problems-title flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-rose-500" />
              <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase">— TU DIAGNÓSTICO GRATUITO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-outfit mb-6 leading-[1.1]">
              ¿Qué hace que tu empresa tenga que <span className="text-rose-500">vivir en urgencias?</span>
            </h2>
            <p className="text-slate-600 text-xl">
              Evaluamos tu operación gratis. Estos son los dolores que encontramos en el 90% de los negocios que auditamos.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 hover:text-rose-500 hover:border-rose-500/50 shadow-sm hover:shadow-md transition-all font-bold"
          >
            Solicitar auditoría gratuita
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="problems-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="problems-card">
              <SpotlightCard className="h-full shadow-md bg-white border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-rose-500 mb-8 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemsSection
