import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Helmet } from 'react-helmet-async'

// Secciones
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import TrustBar from '../components/landing/TrustBar'
import BentoGridSection from '../components/landing/BentoGridSection'
import ResultsSection from '../components/landing/ResultsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FinalCTASection from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import ServicesSection from '../components/landing/ServicesSection'
import MotivationSection from '../components/landing/MotivationSection'
import TargetAudienceSection from '../components/landing/TargetAudienceSection'
import WebsiteShowcaseSection from '../components/landing/WebsiteShowcaseSection'
import FAQSection from '../components/landing/FAQSection'

// Modals/Float
import DemoModal from '../components/landing/DemoModal'
import WhatsAppButton from '../components/landing/WhatsAppButton'

const LandingPage = ({ setIsModalOpen, isModalOpen, setIsMenuOpen, isMenuOpen, logo, heroImage, niche = 'general' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const [n8nResult, setN8nResult] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', email: '', whatsapp: '', compania: '', notas: '' })

  const whatsappLink = 'https://wa.me/584249313359'

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

      const zapierUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL
      if (zapierUrl) {
        fetch(zapierUrl, { method: 'POST', body: JSON.stringify(formData) }).catch(() => {})
      }

      const n8nUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      if (n8nUrl && data?.id) {
        try {
          const n8nRes = await fetch(n8nUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, lead_id: data.id }) })
          if (n8nRes.ok) {
            const n8nData = await n8nRes.json()
            setN8nResult(n8nData)
          }
        } catch (e) { console.error('[N8N]', e) }
      }

      setFormStatus('success')
      setFormData({ nombre: '', email: '', whatsapp: '', compania: '', notas: '' })
      setTimeout(() => { setIsModalOpen(false); setFormStatus(null); setN8nResult(null) }, 4000)
    } catch (_error) {
      setFormStatus('error')
      console.error(_error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSEO = () => {
    switch (niche) {
      case 'barberias':
        return {
          title: 'Software de Gestión y Página Web para Barberías | ANGULO',
          description: 'ANGULO te entrega tu página web profesional completa y el software de gestión ideal para barberías. Controla comisiones, reservas online 24/7 e inventario fácilmente.',
          keywords: 'pagina web para barberias, software para barberias, sistema reservas barberia, control de caja barberia, software gestion barberos'
        }
      case 'clinicas':
        return {
          title: 'Software Médico, Gestión y Página Web para Clínicas Estéticas | ANGULO',
          description: 'ANGULO te entrega tu página web médica completa y el software ideal para clínicas estéticas y consultorios. Fichas de pacientes, agenda médica e inventario.',
          keywords: 'pagina web clinicas esteticas, software clinicas esteticas, software consultorios medicos, sistema agenda medica, fichas pacientes'
        }
      default:
        return {
          title: 'Software de Gestión + Tu Página Web Completa | ANGULO',
          description: 'ANGULO te entrega tu página web completa profesional y el software de gestión todo-en-uno para barberías, salones de belleza, spas y clínicas. Control de caja, reservas online e inventario.',
          keywords: 'pagina web para salones de belleza, pagina web para barberias, pagina web para clinicas, software para barberias, software salones de belleza, software spa, software clinicas esteticas, software consultorios medicos, sistema de reservas online, control de caja, control de inventario'
        }
    }
  }

  const seo = getSEO()

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://angulosoftwares.com/" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://angulosoftwares.com/logo-angulo-este-si.jpeg" />
      </Helmet>
      <div className="min-h-screen bg-[#030712] font-sans text-white selection:bg-gray-700 selection:text-white overflow-x-hidden">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setIsModalOpen={setIsModalOpen} logo={logo} />
      
      <main>
        <HeroSection heroImage={heroImage} setIsModalOpen={setIsModalOpen} niche={niche} />
        <WebsiteShowcaseSection setIsModalOpen={setIsModalOpen} />
        <TargetAudienceSection />
        <ServicesSection />
        <MotivationSection />
        <BentoGridSection />
        <ResultsSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection setIsModalOpen={setIsModalOpen} />
      </main>

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
    </>
  )
}

export default LandingPage
