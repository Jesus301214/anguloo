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
      name: 'Landing Pages Premium',
      desc: 'Tu carta de presentación digital de alta conversión.',
      features: [
        'Diseño UI/UX de Alta Conversión: Interfaces modernas diseñadas psicológicamente para maximizar ventas y captación.',
        'Arquitectura de Embudos (Funnels): Estructura persuasiva que guía al visitante paso a paso hacia la compra o registro.',
        'Rendimiento Extremo (Core Web Vitals): Código optimizado para cargar en milisegundos y evitar el abandono de usuarios.',
        'Analítica y Tracking Avanzado: Integración de Píxeles (Meta/Google), mapas de calor y eventos de conversión.',
        'Automatización de Leads: Formularios inteligentes conectados en tiempo real a tu CRM, Zoho o WhatsApp.',
        'SEO Técnico Inicial: Estructura de etiquetas y metadatos perfecta para el posicionamiento orgánico en Google.',
        'Seguridad y Alojamiento Premium: Certificados SSL, protección contra ataques y hosting de alta disponibilidad.',
      ],
      cta: 'Cotizar Landing Page',
      highlighted: false,
    },
    {
      name: 'Desarrollo de Software y Sistemas',
      desc: 'Digitalizamos y automatizamos la operación de tu empresa.',
      features: [
        'Auditoría y Arquitectura: Análisis profundo de tus procesos y diseño del ecosistema digital.',
        'Desarrollo Full-Stack a Medida: Frontend UI/UX premium y Backend robusto y escalable.',
        'Dashboards y BI: Paneles interactivos con métricas y reportes financieros en tiempo real.',
        'Gestión de Usuarios (RBAC): Sistema de roles, permisos, administradores y autenticación de alta seguridad.',
        'Automatización de Flujos: Conexión con Zapier, Make, y automatización de tareas repetitivas.',
        'Integraciones API: Conexión a pasarelas de pago (Stripe/PayPal), WhatsApp, correos o CRMs externos.',
        'Módulos Operativos: Bases de datos a medida para inventario, clientes, ventas o recursos humanos.',
        'Infraestructura Cloud: Alojamiento en servidores de alto rendimiento con copias de seguridad automáticas.',
        'Seguridad y Escalabilidad: Encriptación de datos de extremo a extremo y arquitectura preparada para el crecimiento.',
        'Soporte Dedicado: Acompañamiento, mantenimiento y soporte técnico especializado en horario laboral.',
      ],
      cta: 'Agendar Auditoría Gratuita',
      highlighted: true,
      highlightText: 'SERVICIO ESTRELLA',
    },
  ]

  return (
    <section ref={sectionRef} id="planes" className="py-24 bg-white px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">
            SERVICIOS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">
            Soluciones Tecnológicas <span className="text-rose-500">a Medida</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Desarrollamos el ecosistema digital exacto que tu operación necesita para escalar sin límites.
          </p>
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
                  {plan.highlightText || 'MÁS POPULAR'}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-3">{plan.name}</h3>
                <p className="text-slate-500">{plan.desc}</p>
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
