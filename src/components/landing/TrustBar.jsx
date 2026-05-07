import { useRef } from 'react'
import { useGSAP } from '../../lib/gsap'
import { gsap } from '../../lib/gsap'

const metrics = [
  { value: '120+', label: 'Empresas Auditadas' },
  { value: '89%', label: 'Reducción de Fugas' },
  { value: '4.8/5', label: 'Satisfacción' },
  { value: '48h', label: 'Diagnóstico Inicial' },
]

const TrustBar = () => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.trust-item', {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="py-16 px-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-y border-slate-100"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="trust-item text-center">
              <div className="text-3xl md:text-4xl font-black text-slate-900 font-outfit mb-1">
                {m.value}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBar
