import { useRef } from 'react'
import { ArrowRight, BarChart, Users, Layers, CreditCard, Activity, Zap } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'
import SpotlightCard from './SpotlightCard'

const SolutionsSection = ({ setIsModalOpen }) => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.solutions-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.solutions-card', { y: 50, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.solutions-grid', start: 'top 80%', toggleActions: 'play none none none' } })
      gsap.from('.solutions-cta-bottom', { y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.solutions-cta-bottom', start: 'top 90%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="soluciones" className="py-32 bg-white px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[150px]" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="solutions-title text-center mb-20">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">SOLUCIONES A MEDIDA</div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-outfit mb-6">Lo que <span className="text-rose-500">automatizamos</span> para ti.</h2>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto">Después de la auditoría, implementamos solo los módulos que tu negocio necesita. Sin paquetes genéricos.</p>
        </div>

        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="solutions-card lg:col-span-2">
            <SpotlightCard className="h-full bg-slate-50/50 p-10 border-slate-200 shadow-md hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-rose-500 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform"><BarChart size={36} /></div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] text-rose-600 uppercase mb-2">ANALÍTICA · DECISIONES</p>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Dashboards de Inteligencia</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">Visualiza en tiempo real cuánto vendes y dónde están las fugas. Datos que se actualizan solos para que tomes decisiones con números.</p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          <div className="solutions-card">
            <SpotlightCard className="h-full bg-white p-10 border-slate-100 shadow-md hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100"><Users size={28} /></div>
              <p className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase mb-2">CRM · PROSPECTOS</p>
              <h3 className="text-xl font-black text-slate-900 mb-3">CRM y Gestión</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Captura y clasifica cada prospecto. Automatiza los recordatorios y nunca pierdas un cierre.</p>
            </SpotlightCard>
          </div>

          <div className="solutions-card">
            <SpotlightCard className="h-full bg-white p-10 border-slate-100 shadow-md hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100"><Layers size={28} /></div>
              <p className="text-[10px] font-black tracking-[0.3em] text-emerald-600 uppercase mb-2">CONTROL · STOCK</p>
              <h3 className="text-xl font-black text-slate-900 mb-3">Inventario Inteligente</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Sabe exactamente qué tienes y qué falta. Alertas automáticas — cero sorpresas.</p>
            </SpotlightCard>
          </div>

          <div className="solutions-card">
            <SpotlightCard className="h-full bg-white p-10 border-slate-100 shadow-md hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-100"><CreditCard size={28} /></div>
              <p className="text-[10px] font-black tracking-[0.3em] text-amber-600 uppercase mb-2">FINANZAS · CAJAS</p>
              <h3 className="text-xl font-black text-slate-900 mb-3">Control Financiero</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Registra ingresos y márgenes en tiempo real. Sabes al instante si el mes fue rentable.</p>
            </SpotlightCard>
          </div>

          <div className="solutions-card">
            <SpotlightCard className="h-full bg-white p-10 border-slate-100 shadow-md hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6 border border-cyan-100"><Activity size={28} /></div>
              <p className="text-[10px] font-black tracking-[0.3em] text-cyan-600 uppercase mb-2">BÚSQUEDA · EXPANSIÓN</p>
              <h3 className="text-xl font-black text-slate-900 mb-3">Radar de Prospectos</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Descubre nuevos clientes en tu zona. Extrae datos en tiempo real para tu CRM.</p>
            </SpotlightCard>
          </div>

          <div className="solutions-card lg:col-span-2">
            <SpotlightCard className="h-full bg-slate-50/50 p-10 border-slate-200 shadow-md hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-purple-600 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform"><Zap size={36} /></div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] text-purple-600 uppercase mb-2">AUTOMATIZACIÓN · INTEGRACIONES</p>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">WhatsApp y Zapier</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">Conectamos tus herramientas. Recordatorios por WhatsApp, sincronización con Calendar y más.</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        <div className="solutions-cta-bottom text-center mt-16">
          <p className="text-slate-500 text-sm font-bold mb-6">¿No ves tu necesidad aquí? En la auditoría diseñamos la solución exacta para tu caso.</p>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black px-10 py-4 rounded-2xl text-base shadow-xl shadow-rose-500/20 transition-all transform hover:-translate-y-1 active:scale-95">
            Solicita tu Auditoría Gratis <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
