import { useRef } from 'react'
import { Shield, CheckCircle } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const painPoints = [
  { icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', title: 'Fuga de Clientes', desc: 'No sabes quién dejó de ir ni por qué.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Pérdida de Tiempo', desc: 'Agendas manuales y reportes lentos.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Cero Claridad', desc: 'No conoces tu rentabilidad real.' },
]

const ComparisonSection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.compare-header', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } })
      gsap.from('.pain-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      gsap.from('.compare-panels', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="comparativa" className="py-24 bg-slate-50 px-6 relative">
      <div className="mx-auto max-w-7xl">
        <div className="compare-header text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">¿Tu empresa se siente así?</h2>
          <p className="text-slate-600 text-lg">La falta de sistemas no solo quita tiempo, quita vida. Identifica tu estado actual.</p>
        </div>

        <div className="pain-grid grid md:grid-cols-3 gap-6 mb-20">
          {painPoints.map((p, i) => (
            <div key={i} className="pain-card p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-rose-500/30 transition-all group shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/5 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform border border-rose-500/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">Diagnóstico de Realidad</h2>
          <p className="text-slate-600 text-lg">¿Sigues operando en el pasado o estás listo para el futuro?</p>
        </div>

        <div className="compare-panels grid md:grid-cols-2 gap-0 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
          <div className="p-12 bg-slate-50/50 border-r border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500"><Shield size={24} /></div>
              <h3 className="text-2xl font-black text-slate-900">Gestión Tradicional</h3>
            </div>
            <ul className="space-y-6">
              {['Agendas en papel o Excel desactualizados.', 'Fuga de dinero por falta de control en cajas.', 'Personal desmotivado por falta de transparencia.', 'Clientes que olvidan sus citas (No-Show).', 'Cero datos para decisiones estratégicas.'].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500 font-bold group">
                  <span className="text-rose-500 mt-1 shrink-0 group-hover:scale-125 transition-transform text-xl">✕</span>
                  <span className="group-hover:text-slate-900 transition-colors">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-12 bg-rose-500/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><CheckCircle size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900">Ecosistema ANGULO</h3>
              </div>
              <ul className="space-y-6">
                {['Agenda inteligente sincronizada en la nube.', 'Control de finanzas y cajas blindadas.', 'Cálculo automático de comisiones y KPIs.', 'Recordatorios automáticos vía WhatsApp.', 'Dashboards de BI con visión 360°.'].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-700 font-black group">
                    <span className="text-emerald-500 mt-1 shrink-0 group-hover:scale-125 transition-transform text-xl">✓</span>
                    <span className="group-hover:text-slate-900 transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-rose-500 transition-all shadow-xl shadow-slate-900/10">
                  Hacer el Cambio Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection
