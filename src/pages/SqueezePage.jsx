import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, ShieldCheck, CalendarX2, LineChart, MessageSquare } from 'lucide-react'

const SqueezePage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    tipoNegocio: '',
    telefono: '',
    email: ''
  })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Construir el mensaje de WhatsApp con todos los datos
    const phone = "584249313359" // Número del cliente
    const text = `Hola, mi nombre es *${formData.nombre}*.
Quiero más información sobre el software Angulo y mi página web completa.

*Mis datos:*
- Negocio: ${formData.negocio}
- Tipo: ${formData.tipoNegocio}
- Teléfono: ${formData.telefono}
- Correo: ${formData.email}`
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    
    // Abrir WhatsApp en una nueva pestaña (redirigir al usuario)
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#030712] font-inter text-gray-200">
      
      {/* 1. Header Minimalista */}
      <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-center md:justify-start md:px-12">
        <div className="flex items-center gap-2">
          <img src="/logo-angulo-sin-fondo.png" alt="Angulo Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold font-outfit text-white tracking-wide">ANGULO</span>
        </div>
      </header>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 z-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 z-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen pointer-events-none" />

      {/* 2. Hero Section (Above the Fold) */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-40 lg:pb-32 z-10 flex min-h-screen items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Hook & Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 mb-6 self-center md:self-start">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-sm font-bold text-cyan-300">Software Todo-en-Uno + Página Web Completa</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-white leading-[1.1] tracking-tight mb-6">
              Automatiza tu Negocio y <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ten Tu Propia Web</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
              El único sistema inteligente para salones, clínicas y barberías que te entrega <strong className="text-white">tu propia página web completa</strong> y agenda, cobra y envía recordatorios por ti.
            </p>

            <ul className="space-y-4 mb-6 text-left inline-block mx-auto md:mx-0">
              {[
                'Tu propia página web completa y profesional incluida.',
                'Agenda online y reservas 24/7 conectadas a tu web.',
                'Reduce inasistencias en un 80% con recordatorios WhatsApp.',
                'Control exacto de tu caja, comisiones e inventario.'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8">
              <a 
                href="https://app.angulosoftwares.com/salon/lumiere-salon" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-3.5 py-1.5 rounded-full border border-cyan-500/30 transition-all"
              >
                <span>🌐 Ver ejemplo real en vivo (Lumière Salon)</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Lead Capture Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto relative"
          >
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-30 animate-pulse"></div>
            
            <div className="relative bg-gray-900 border border-gray-700/50 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
              
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2 font-outfit">Solicita tu Acceso</h3>
                    <p className="text-sm text-gray-400">Déjanos tus datos y nos comunicaremos contigo de inmediato.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Tu Nombre</label>
                      <input 
                        type="text" 
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                        placeholder="Ej. Carlos Martínez"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Teléfono (WhatsApp)</label>
                        <input 
                          type="tel" 
                          name="telefono"
                          required
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                          placeholder="+58 412..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Tipo de Negocio</label>
                        <select 
                          name="tipoNegocio"
                          required
                          value={formData.tipoNegocio}
                          onChange={handleChange}
                          className="w-full bg-gray-950 border border-gray-800 text-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                        >
                          <option value="">Selecciona...</option>
                          <option value="Barbería">Barbería</option>
                          <option value="Salón de Belleza">Salón de Belleza</option>
                          <option value="Clínica/Spa">Clínica Estética o Spa</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Nombre del Negocio</label>
                      <input 
                        type="text" 
                        name="negocio"
                        required
                        value={formData.negocio}
                        onChange={handleChange}
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                        placeholder="Ej. Carlos Barber Shop"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                        placeholder="tucorreo@ejemplo.com"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-4 relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-base rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                    >
                      <span className="relative z-10">Enviar mis datos a WhatsApp</span>
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                    <span>Tus datos están 100% seguros con nosotros.</span>
                  </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Agitación de Dolor vs Solución */}
      <section className="py-20 bg-gray-950 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-outfit text-white mb-12">¿Por qué cambiar a Angulo?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Problema */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <CalendarX2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-red-300 mb-2">La Antigua Forma</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500/50" />
                  No tienes página web propia o pagas fortunas a agencias sin resultados
                </li>
                <li className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500/50" />
                  Pierdes dinero por clientes que olvidan su cita
                </li>
                <li className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500/50" />
                  No sabes exactamente cuánto ganó cada empleado
                </li>
                <li className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500/50" />
                  Dependes de una libreta de papel o mensajes desordenados
                </li>
              </ul>
            </div>

            {/* Solución */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-300 mb-2">Con Angulo</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500/50" />
                  Tu propia página web completa, moderna y conectada a tus reservas
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500/50" />
                  Recordatorios automáticos por WhatsApp que aseguran asistencias
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500/50" />
                  Cálculo automático de comisiones y cierres de caja
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500/50" />
                  Agenda digital y catálogo online sincronizados 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer Minimalista */}
      <footer className="py-8 bg-[#030712] border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Angulo Software. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-600">
          <a href="/privacidad" className="hover:text-gray-400 transition-colors">Política de Privacidad</a>
          <a href="/terminos" className="hover:text-gray-400 transition-colors">Términos de Servicio</a>
        </div>
      </footer>

    </div>
  )
}

export default SqueezePage
