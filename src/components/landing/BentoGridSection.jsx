import { useRef } from 'react'
import { CalendarDays, MessageCircle, BarChart3, Package } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const modules = [
  {
    title: 'Agenda Inteligente',
    desc: 'Reservas online 24/7 sin intervención humana. Tus clientes agendan, confirman y reprograman solos.',
    icon: <CalendarDays size={32} />,
    color: 'rose',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Marketing Automatizado',
    desc: 'Campañas de WhatsApp desde el panel. Recupera clientes inactivos y llena tu agenda sin esfuerzo.',
    icon: <MessageCircle size={28} />,
    color: 'emerald',
  },
  {
    title: 'Finanzas y POS',
    desc: 'Flujo de caja en tiempo real, comisiones automáticas y cierres de caja blindados.',
    icon: <BarChart3 size={28} />,
    color: 'purple',
  },
  {
    title: 'Inventario al Milímetro',
    desc: 'Cada servicio descuenta productos del stock. Alertas cuando el nivel está bajo. Cero sorpresas.',
    icon: <Package size={28} />,
    color: 'amber',
    span: 'lg:col-span-2',
  },
]

const colorMap = {
  rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-400',
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
}

const BentoGridSection = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.bento-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.bento-card', { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.bento-grid', start: 'top 80%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="soluciones" className="py-32 bg-[#030712] px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="bento-title text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">
            FUNCIONALIDADES
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit mb-4">
            <span className="text-white">Todo lo que necesitas. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">En un solo lugar.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sin módulos separados, sin integraciones complicadas. ANGULO funciona desde el minuto uno.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div key={i} className={`bento-card ${m.span || ''}`}>
              <div className={`h-full rounded-3xl border bg-gradient-to-br ${colorMap[m.color]} p-8 lg:p-10 hover:scale-[1.02] transition-transform duration-300`}>
                <div className={`w-14 h-14 rounded-2xl bg-${m.color}-500/10 border border-${m.color}-500/20 flex items-center justify-center mb-6`}>
                  {m.icon || m.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{m.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BentoGridSection
