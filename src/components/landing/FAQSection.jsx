import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const faqs = [
  {
    q: '¿Qué incluye la auditoría gratuita?',
    a: 'Analizamos tu operación completa: procesos de ventas, gestión de citas, control de inventario, finanzas y atención al cliente. Recibirás un informe detallado con las fugas detectadas y un plan de automatización personalizado.',
  },
  },
  {
    q: '¿Necesito conocimientos técnicos para usar el sistema?',
    a: 'No. ANGULO está diseñado para ser intuitivo. Incluye entrenamiento para tu equipo y soporte continuo. Si sabes usar WhatsApp, sabes usar ANGULO.',
  },
  {
    q: '¿Qué integraciones tienen?',
    a: 'Nos integramos con WhatsApp, Google Calendar, Stripe, Mercado Pago, Zapier, Meta Ads y más. Si necesitas una integración específica, la desarrollamos durante la implementación.',
  },
  {
    q: '¿Tienen soporte en español?',
    a: 'Sí, todo nuestro equipo habla español. El soporte se da vía WhatsApp, email y videollamada. Tiempo de respuesta promedio: menos de 2 horas en horario laboral.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí, no hay permanencia forzosa. Puedes cancelar en cualquier momento. Además, la auditoría inicial es completamente gratuita y sin compromiso.',
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.faq-title', {
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('.faq-item', {
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="faq-title text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">
            Preguntas <span className="text-rose-500">Frecuentes</span>
          </h2>
        </div>

        <div className="faq-list space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-rose-500' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
