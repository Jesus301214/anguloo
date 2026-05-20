import { useRef } from 'react'
import { Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'
import SpotlightCard from './SpotlightCard'

const pains = [
  {
    icon: <Calendar size={28} />,
    before: '"La agenda de papel es mi infierno diario."',
    after: 'Reservas online 24/7. Tus clientes agendan solos mientras duermes.',
    stat: '40% más reservas',
  },
  {
    icon: <Clock size={28} />,
    before: '"Cada inasistencia me cuesta dinero real."',
    after: 'Confirmaciones y recordatorios automáticos por WhatsApp. Inasistencias a cero.',
    stat: '0% no-shows',
  },
  {
    icon: <DollarSign size={28} />,
    before: '"No sé cuánto gasto en productos ni cuánto gano."',
    after: 'Inventario al milímetro. Cada shampoo, cada cera, descontado del stock automáticamente.',
    stat: 'Visibilidad total',
  },
]

const PainPointsSection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.pains-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.pains-card', { y: 50, autoAlpha: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.pains-grid', start: 'top 80%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="problemas" className="py-32 bg-[#050a14] px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="pains-title text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">
            EL PROBLEMA
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit mb-4">
            <span className="text-white">Tu operación te está </span>
            <span className="text-rose-400">costando dinero</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estos son los 3 problemas que encontramos en el 90% de los salones y spas que auditamos.
          </p>
        </div>

        <div className="pains-grid grid gap-8 lg:grid-cols-3">
          {pains.map((card, i) => (
            <div key={i} className="pains-card">
              <SpotlightCard className="h-full bg-[#0a0f1a] border-gray-800 p-8">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                  {card.icon}
                </div>
                <p className="text-gray-500 line-through text-sm mb-3 italic">{card.before}</p>
                <h3 className="text-lg font-bold text-white mb-3 leading-relaxed">{card.after}</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mt-4 pt-4 border-t border-gray-800">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  {card.stat}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black px-8 py-4 rounded-2xl text-sm shadow-xl shadow-rose-500/10 transition-all hover:-translate-y-0.5"
          >
            Quiero mi auditoría gratuita <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PainPointsSection
