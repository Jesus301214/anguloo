import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const ResultsSection = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.results-text', { 
        x: -40, 
        autoAlpha: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
      })
      
      gsap.from('.results-image', { 
        x: 40, 
        autoAlpha: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
      })
    },
    { scope: sectionRef }
  )

  const benefits = [
    'Ahorra hasta 10 horas por semana en tareas administrativas',
    'Reduce inasistencias hasta en un 70%',
    'Aumenta la retención de clientes hasta en un 60%',
    'Toma el control total de tu negocio desde cualquier lugar'
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-[#030712] px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gray-800/20 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="results-text mb-6">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                RESULTADOS REALES <span className="inline-block w-8 h-px bg-gray-600 align-middle ml-2"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-outfit leading-tight text-white mb-8">
                Más tiempo, menos caos, <br className="hidden md:block"/>
                <span className="text-white border-b-2 border-gray-600 pb-1">más ganancias.</span>
              </h2>
            </div>
            
            <ul className="space-y-5">
              {benefits.map((benefit, i) => (
                <li key={i} className="results-text flex items-start gap-4">
                  <CheckCircle2 size={22} className="text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg font-medium leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="results-image order-1 lg:order-2 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent z-10"></div>
              <img 
                src="/results-section.png" 
                alt="Dueño de negocio usando Angulo" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Cards */}
              <div className="absolute bottom-6 left-6 z-20 bg-[#0a0f1a]/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="text-xs font-bold text-gray-400">Reserva confirmada</div>
                </div>
                <div className="text-sm font-bold text-white ml-11">Ana Martínez - 10:00 AM</div>
              </div>

              <div className="absolute top-6 right-6 z-20 bg-[#0a0f1a]/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-5 shadow-2xl">
                <div className="text-xs font-bold text-gray-400 mb-1">Ventas este mes</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-black text-white font-outfit">$12,450</div>
                  <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded">
                    ↑ 22%
                  </div>
                </div>
                <div className="flex items-end gap-1.5 mt-4 h-10">
                  {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <div key={i} className="w-2 rounded-t-sm bg-gray-600/50" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative dots pattern */}
            <svg className="absolute -bottom-10 -right-10 w-40 h-40 text-gray-800 -z-10" fill="currentColor" viewBox="0 0 100 100">
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ResultsSection
