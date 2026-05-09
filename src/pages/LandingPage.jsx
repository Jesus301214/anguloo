import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  AlertCircle,
  Rocket,
  Activity,
  Users,
  Layers,
  BarChart,
  Settings,
  Zap,
  LayoutGrid,
} from 'lucide-react'
import PricingCardsSection from '../components/admin/PricingCardsSection'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import TrustBar from '../components/landing/TrustBar'
import ProblemsSection from '../components/landing/ProblemsSection'
import IntegrationMarquee from '../components/landing/IntegrationMarquee'
import ComparisonSection from '../components/landing/ComparisonSection'
import SolutionsSection from '../components/landing/SolutionsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import MethodologySection from '../components/landing/MethodologySection'
import CultureSection from '../components/landing/CultureSection'
import ValuesSection from '../components/landing/ValuesSection'
import FAQSection from '../components/landing/FAQSection'
import FinalCTA from '../components/landing/FinalCTA'
import ContactSection from '../components/landing/ContactSection'
import Footer from '../components/landing/Footer'
import DemoModal from '../components/landing/DemoModal'
import WhatsAppButton from '../components/landing/WhatsAppButton'

const LandingPage = ({
  setIsModalOpen,
  isModalOpen,
  setIsMenuOpen,
  isMenuOpen,
  logo,
  heroImage,
  sadImage: _sadImage,
  happyImage: _happyImage,
  teamImage,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const [n8nResult, setN8nResult] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    compania: '',
    notas: '',
  })

  const whatsappLink = 'https://wa.me/584249313359'

  const menuData = {
    ecosistema: [
      { title: 'Diagnóstico', desc: 'Identifica los síntomas de una gestión manual.', icon: <AlertCircle size={18} />, href: '#problemas' },
      { title: 'Agenda Pro', desc: 'Gestión inteligente de citas y personal.', icon: <LayoutGrid size={18} />, href: '#soluciones' },
      { title: 'CRM & Leads', desc: 'Control total de tus clientes y prospectos.', icon: <Users size={18} />, href: '#soluciones' },
      { title: 'BI Analytics', desc: 'Dashboards en tiempo real de tu rentabilidad.', icon: <BarChart size={18} />, href: '#soluciones' },
    ],
    soluciones: [
      { title: 'Para Spas & Centros', desc: 'Optimización operativa para el sector belleza.', icon: <Zap size={18} />, href: '#soluciones' },
      { title: 'Para Consultorios', desc: 'Orden y claridad para servicios profesionales.', icon: <Activity size={18} />, href: '#soluciones' },
      { title: 'Multi-Sede', desc: 'Escala tu negocio a múltiples ubicaciones.', icon: <Layers size={18} />, href: '#soluciones' },
    ],
    compania: [
      { title: 'Nuestra Misión', desc: 'Por qué hacemos lo que hacemos.', icon: <Rocket size={18} />, href: '#nosotros' },
      { title: 'Metodología', desc: 'El sistema de claridad radical.', icon: <Settings size={18} />, href: '#metodologia' },
    ],
  }

  const integrations = [
    { name: 'Stripe', color: '#635BFF' },
    { name: 'WhatsApp', color: '#25D366' },
    { name: 'Google', color: '#4285F4' },
    { name: 'Zapier', color: '#FF4F00' },
    { name: 'Mercado Pago', color: '#009EE3' },
    { name: 'Meta', color: '#0668E1' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReservaSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...formData, status: 'new', created_at: new Date().toISOString() }])
        .select('id')
        .single()

      if (error) throw error

      // Enviar a Zapier (legado)
      const zapierUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL
      if (zapierUrl) {
        fetch(zapierUrl, { method: 'POST', body: JSON.stringify(formData) }).catch(() => {})
      }

      // Enviar a n8n para clasificacion con IA
      const n8nUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      if (n8nUrl && data?.id) {
        try {
          const n8nRes = await fetch(n8nUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, lead_id: data.id }),
          })
          if (n8nRes.ok) {
            const n8nData = await n8nRes.json()
            setN8nResult(n8nData)
          }
        } catch (e) {
          console.error('[N8N] Error al clasificar lead:', e)
        }
      }

      setFormStatus('success')
      setFormData({ nombre: '', email: '', whatsapp: '', compania: '', notas: '' })

      setTimeout(() => {
        setIsModalOpen(false)
        setFormStatus(null)
        setN8nResult(null)
      }, 4000)
    } catch (_error) {
      setFormStatus('error')
      console.error(_error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsModalOpen={setIsModalOpen}
        logo={logo}
        menuData={menuData}
      />
      <HeroSection heroImage={heroImage} setIsModalOpen={setIsModalOpen} />
      <TrustBar />
      <ProblemsSection setIsModalOpen={setIsModalOpen} />
      <IntegrationMarquee integrations={integrations} />
      <ComparisonSection setIsModalOpen={setIsModalOpen} />
      <SolutionsSection setIsModalOpen={setIsModalOpen} />
      <TestimonialsSection />
      <PricingCardsSection onOpenModal={() => setIsModalOpen(true)} />
      <MethodologySection teamImage={teamImage} />
      <CultureSection />
      <ValuesSection />
      <FAQSection />
      <FinalCTA setIsModalOpen={setIsModalOpen} whatsappLink={whatsappLink} />
      <ContactSection />
      <Footer logo={logo} />
      <DemoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        isSubmitting={isSubmitting}
        formStatus={formStatus}
        n8nResult={n8nResult}
        handleInputChange={handleInputChange}
        handleReservaSubmit={handleReservaSubmit}
      />
      <WhatsAppButton whatsappLink={whatsappLink} />
    </div>
  )
}

export default LandingPage
