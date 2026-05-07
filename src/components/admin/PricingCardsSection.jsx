import { useRef, useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const PricingCardsSection = ({ onOpenModal }) => {
  const [isAnnual, setIsAnnual] = useState(true)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.pricing-card', {
        y: 20,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  const plans = [
    {
      name: 'Presencia Digital',
      price: isAnnual ? 197 : 247,
      period: '/mes',
      desc: 'Landing page profesional para tu negocio.',
      features: [
        'Landing page optimizada',
        'Formulario de captura de leads',
        'Hosting y dominio incluidos',
        'Soporte por email',
        'Actualizaciones mensuales',
      ],
      cta: 'Comenzar Ahora',
      highlighted: false,
    },
    {
      name: 'Ecosistema ANGULO',
      price: isAnnual ? 397 : 497,
      period: '/mes',
      desc: 'Software + CRM + IA. La solución completa.',
      features: [
        'Todo lo de Presencia Digital',
        'CRM con pipeline de ventas',
        'Agenda inteligente',
        'Dashboard de BI Analytics',
        'Inventario y finanzas',
        'Radar de prospectos IA',
        'Recordatorios WhatsApp',
        'Soporte prioritario 24/7',
        'Auditoría operativa incluida',
      ],
      cta: 'Solicitar Auditoría Gratis',
      highlighted: true,
    },
  ]

  return (
    <section ref={sectionRef} id="planes" className="py-24 bg-white px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">
            PLANES
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">
            Inversión <span className="text-rose-500">transparente</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Sin costos ocultos. Sin sorpresas. Solo resultados.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <span
            className={`text-sm font-bold transition-colors ${
              !isAnnual ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isAnnual ? 'bg-rose-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-bold transition-colors flex items-center gap-2 ${
              isAnnual ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            Anual
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full">
              -20%
            </span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative rounded-[2.5rem] p-8 md:p-10 border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-rose-500/5 to-white border-rose-500/30 shadow-xl shadow-rose-500/5 scale-[1.02]'
                  : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/20">
                  Más Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900 font-outfit">
                  ${plan.price}
                </span>
                <span className="text-slate-400 font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={plan.highlighted ? onOpenModal : () => onOpenModal()}
                className={`w-full flex items-center justify-center gap-2 font-black py-4 rounded-2xl transition-all text-sm ${
                  plan.highlighted
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-xl shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-1'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 hover:-translate-y-1'
                }`}
              >
                {plan.cta}
                {plan.highlighted ? (
                  <Zap size={16} />
                ) : (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingCardsSection
