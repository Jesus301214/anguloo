import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const faqs = [
  { q: '¿La página web completa viene incluida con el software?', a: '¡Sí! Diseñamos la página web oficial y profesional de tu negocio, adaptada a tus colores, logo y fotos. Viene con catálogo de servicios, ubicación en Google Maps y motor de reservas 24/7 conectado directamente a tu calendario de Angulo y WhatsApp.' },
  { q: '¿Qué incluye la prueba gratis?', a: 'Acceso completo a todas las funcionalidades de ANGULO por 7 días. Sin tarjeta de crédito. Configuramos tu cuenta en menos de 10 minutos.' },
  { q: '¿Necesito conocimientos técnicos?', a: 'No. ANGULO está diseñado para que cualquier dueño de salón, clínica o barbería pueda usarlo desde el primer día. Nosotros nos encargamos de la parte técnica y te brindamos soporte 24/7.' },
  { q: '¿Cómo funcionan los recordatorios de WhatsApp?', a: 'Se envían automáticamente antes de cada cita para que el cliente confirme con un solo toque, reduciendo inasistencias en más del 80%.' },
  { q: '¿Puedo migrar mis datos de otro sistema?', a: 'Sí. Nuestro equipo te asiste importando tu base de clientes y catálogo sin costo adicional.' },
  { q: '¿Qué pasa si necesito cancelar?', a: 'Sin contratos forzosos ni permanencias. Mantienes el control total de tu negocio.' },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.faq-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.faq-item', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="faq" className="py-32 bg-[#050a14] px-6">
      <div className="mx-auto max-w-3xl">
        <div className="faq-title text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit mb-4">
            <span className="text-white">¿Tienes dudas? </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">Tenemos respuestas</span>
          </h2>
        </div>
        <div className="faq-list space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item bg-[#0a0f1a] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-bold text-white pr-4">{faq.q}</span>
                <ChevronDown size={20} className={`shrink-0 text-gray-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-rose-400' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
