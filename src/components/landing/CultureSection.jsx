import { useRef } from 'react'
import { Target, TrendingDown, Handshake, Zap } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'
import SpotlightCard from './SpotlightCard'

const cards = [
  { icon: <Target className="w-6 h-6" />, title: 'Claridad Operacional', phrase: 'Saber qué hacer y cuándo hacerlo.', bad: 'Operas a ciegas apagando incendios.', good: 'ANGULO te da un mapa claro cada mañana.' },
  { icon: <TrendingDown className="w-6 h-6" />, title: 'Rentabilidad Real', phrase: 'Ganar más eliminando fugas.', bad: 'El desorden te cuesta dinero todos los días.', good: 'Cada proceso controlado es ganancia.' },
  { icon: <Handshake className="w-6 h-6" />, title: 'Sin Juicio', phrase: 'El error es parte del camino.', bad: 'Tu operación actual tiene fallas.', good: 'Construimos el sistema para resolverlas.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Transformación', phrase: 'Del caos al control total.', bad: 'Improvisación constante y estrés.', good: 'Una empresa que opera sola mientras creces.' },
]

const CultureSection = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.culture-title', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } })
      gsap.from('.culture-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="cultura" className="py-24 bg-white px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="culture-title text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">NUESTRA CULTURA</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Lo que nos <span className="text-rose-500">mueve</span></h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">Guiamos a empresas a descubrir sus pérdidas ocultas y construir una operación que funcione sola.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-rose-500" />
              <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase">— NUESTRA VISIÓN</span>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">No vendemos software genérico. Primero auditamos tu operación, detectamos los procesos que te cuestan tiempo y dinero, y luego diseñamos la automatización exacta que necesitas.</p>
          </div>
          <div className="culture-grid lg:col-span-2 grid md:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <SpotlightCard key={idx} className="culture-card bg-white p-10 border-slate-100 shadow-md hover:shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-rose-500 mb-6 border border-slate-100">{card.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm font-medium text-rose-500 mb-4">{card.phrase}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-slate-400"><span className="text-rose-500 mt-0.5 shrink-0">✕</span><span>{card.bad}</span></div>
                  <div className="flex items-start gap-3 text-sm text-slate-700 font-bold"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span><span>{card.good}</span></div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CultureSection
