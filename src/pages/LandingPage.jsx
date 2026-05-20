import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import PricingSection from '../components/landing/PricingSection'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import PainPointsSection from '../components/landing/PainPointsSection'
import BentoGridSection from '../components/landing/BentoGridSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FAQSection from '../components/landing/FAQSection'
import FinalCTASection from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import DemoModal from '../components/landing/DemoModal'
import WhatsAppButton from '../components/landing/WhatsAppButton'

const LandingPage = ({ setIsModalOpen, isModalOpen, setIsMenuOpen, isMenuOpen, logo, heroImage }) => {
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

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-white selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setIsModalOpen={setIsModalOpen} logo={logo} />
      <HeroSection heroImage={heroImage} setIsModalOpen={setIsModalOpen} />
      <PainPointsSection setIsModalOpen={setIsModalOpen} />
      <BentoGridSection />
      <TestimonialsSection />
      <PricingSection onOpenModal={() => setIsModalOpen(true)} />
      <FAQSection />
      <FinalCTASection setIsModalOpen={setIsModalOpen} />
      <Footer logo={logo} />
      <DemoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formData={formData} isSubmitting={isSubmitting} formStatus={formStatus} n8nResult={n8nResult} handleInputChange={handleInputChange} handleReservaSubmit={handleReservaSubmit} />
      <WhatsAppButton whatsappLink={whatsappLink} />
    </div>
  )
}

export default LandingPage
