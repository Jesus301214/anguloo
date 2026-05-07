import { useRef } from 'react'
import { useGSAP, gsap } from '../../lib/gsap'

const Methodologysteps = [
  { id: 1, title: 'Auditoría Operativa', color: 'rose', desc: 'Analizamos cada rincón de tu negocio: cómo vendes, cómo cobras y dónde pierdes dinero sin saberlo.' },
  { id: 2, title: 'Diseño de Automatización', color: 'blue', desc: 'Creamos un plan personalizado: eliminamos tareas repetitivas y conectamos tus herramientas.' },
  { id: 3, title: 'Implementación y Soporte', color: 'emerald', desc: 'Instalamos, entrenamos a tu equipo y te acompañamos. Tu operación crece con nosotros.' },
]

const MethodologySection = ({ teamImage }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.method-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.method-step', { x: -30, autoAlpha: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.method-steps', start: 'top 80%', toggleActions: 'play none none none' } })
      gsap.from('.method-image', { scale: 0.92, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="metodologia" className="py-24 bg-slate-50 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="method-title text-4xl md:text-6xl font-black text-slate-900 font-outfit mb-8">
              Nuestra Metodología: <br />
              <span className="text-rose-500 italic">Claridad Radical</span>
            </h2>
            <div className="method-steps relative space-y-12">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 hidden sm:block" />
              {Methodologysteps.map((step) => (
                <div key={step.id} className="method-step flex gap-6 group">
                  <div className={`h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-${step.color}-500 font-black shrink-0 group-hover:scale-110 transition-transform`}>{step.id}</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="method-image relative">
            <div className="absolute inset-0 bg-rose-500/5 blur-3xl rounded-full"></div>
            <img src={teamImage} alt="Team" className="relative rounded-[3rem] border border-slate-200 shadow-2xl transition-all duration-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MethodologySection
