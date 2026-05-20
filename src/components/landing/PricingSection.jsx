import { useRef, useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const PricingSection = ({ onOpenModal }) => {
  const [isAnnual, setIsAnnual] = useState(true)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.pricing-card', { y: 50, autoAlpha: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? 49 : 59,
      desc: 'Para profesionales independientes.',
      features: ['Agenda online 24/7', 'Recordatorios WhatsApp', 'Hasta 3 empleados', 'Soporte por chat', 'Dashboard básico'],
      cta: 'Prueba Gratis',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: isAnnual ? 97 : 127,
      desc: 'Para salones y spas en crecimiento.',
      features: ['Todo lo de Starter', 'Marketing automatizado', 'Control financiero y POS', 'Inventario inteligente', 'Hasta 15 empleados', 'CRM con IA', 'Soporte prioritario', 'Gerente de cuenta'],
      cta: 'Prueba Gratis',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 197 : 247,
      desc: 'Para cadenas multi-sede.',
      features: ['Todo lo de Pro', 'Multi-sucursal ilimitada', 'API de integración', 'Personalización white-label', 'SLA 99.9%', 'Capacitación presencial', 'Reportes avanzados de BI'],
      cta: 'Agendar Demo',
      highlighted: false,
    },
  ]

  return (
    <section ref={sectionRef} id="planes" className="py-32 bg-[#030712] px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">PLANES</div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit mb-4">
            <span className="text-white">Crece con el plan </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">que mejor se adapte</span>
          </h2>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Mensual</span>
          <button onClick={() => setIsAnnual(!isAnnual)} className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-rose-500' : 'bg-gray-700'}`}>
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-bold flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
            Anual <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full">-15%</span>
          </span>
        </div>

        <div className="pricing-card grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-[2.5rem] p-8 md:p-10 border transition-all ${plan.highlighted ? 'bg-gradient-to-b from-[#0a0f1a] to-[#0d122a] border-rose-500/40 shadow-xl shadow-rose-500/10 scale-[1.03]' : 'bg-[#0a0f1a] border-gray-800'}`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-rose-500/20">
                  Más Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-white font-outfit">${plan.price}</span>
                <span className="text-gray-500 font-medium">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-rose-400' : 'text-emerald-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className={`w-full flex items-center justify-center gap-2 font-black py-4 rounded-2xl transition-all text-sm ${plan.highlighted ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-xl shadow-rose-500/20 hover:-translate-y-0.5' : 'bg-transparent border border-gray-700 text-white hover:bg-white/5 hover:-translate-y-0.5'}`}
              >
                {plan.cta}
                {plan.highlighted ? <Zap size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
