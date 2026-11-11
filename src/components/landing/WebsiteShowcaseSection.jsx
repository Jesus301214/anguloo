import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  Smartphone, 
  Search, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  CalendarCheck,
  Scissors,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  ExternalLink
} from 'lucide-react'

const nichesWebsites = {
  salon: {
    id: 'salon',
    label: 'Salón de Belleza',
    icon: Sparkles,
    tagline: 'Cuidado profesional, estilo y bienestar',
    businessName: 'Lumière Salon',
    domain: 'app.angulosoftwares.com/salon/lumiere-salon',
    realLiveUrl: 'https://app.angulosoftwares.com/salon/lumiere-salon',
    heroBadge: '✨ Salón de Belleza & Estética Capilar',
    heroTitle: 'Bienvenido a Lumière Salon',
    heroSubtitle: 'Cuidado profesional, estilo y bienestar en un ambiente exclusivo. Agenda tu cita online en segundos las 24 horas del día.',
    rating: '5.0 (480+ reseñas en Google)',
    accentColor: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    services: [
      { name: 'Corte y Estilismo Signature', price: '$35', time: '45 min', popular: true },
      { name: 'Balayage & Colorimetría Premium', price: '$85', time: '120 min', popular: true },
      { name: 'Tratamiento Botox Capilar', price: '$45', time: '60 min', popular: false }
    ],
    features: [
      'Catálogo de servicios y precios en vivo',
      'Galería de fotos y módulo Antes/Después',
      'Botones directos de WhatsApp e Instagram',
      'Reserva 24/7 sincronizada con tu agenda'
    ]
  },
  barberia: {
    id: 'barberia',
    label: 'Barbería',
    icon: Scissors,
    tagline: 'Estilo clásico y cortes modernos',
    businessName: 'Imperio Barbershop',
    domain: 'app.angulosoftwares.com/salon/imperio-barber',
    realLiveUrl: 'https://app.angulosoftwares.com/salon/lumiere-salon',
    heroBadge: '💈 La Barbería #1 de la Ciudad',
    heroTitle: 'Tu mejor corte, sin esperas ni demoras',
    heroSubtitle: 'Reserva tu turno en segundos desde cualquier dispositivo y disfruta de una experiencia de primer nivel.',
    rating: '4.9 (320+ reseñas en Google)',
    accentColor: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    services: [
      { name: 'Corte Tradicional + Lavado', price: '$15', time: '40 min', popular: true },
      { name: 'Perfilado de Barba con Toalla Caliente', price: '$12', time: '30 min', popular: false },
      { name: 'Combo Completo Imperial', price: '$24', time: '60 min', popular: true }
    ],
    features: [
      'Selección de barbero preferido',
      'Galería de cortes y transformaciones',
      'Ubicación exacta con Google Maps',
      'Recordatorio automático por WhatsApp'
    ]
  },
  clinica: {
    id: 'clinica',
    label: 'Clínica & Spa',
    icon: Stethoscope,
    tagline: 'Medicina estética, salud y bienestar',
    businessName: 'Vitalis Medical Spa',
    domain: 'app.angulosoftwares.com/salon/vitalis-estetica',
    realLiveUrl: 'https://app.angulosoftwares.com/salon/lumiere-salon',
    heroBadge: '🩺 Médicos Especialistas Certificados',
    heroTitle: 'Cuidado estético médico seguro y avanzado',
    heroSubtitle: 'Fichas clínicas digitales, protocolos aprobados y reserva directa para valoración médica estética.',
    rating: '4.9 (510+ reseñas en Google)',
    accentColor: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    services: [
      { name: 'Valoración Facial & Diagnóstico', price: '$30', time: '45 min', popular: true },
      { name: 'Limpieza Facial Profunda con Hidrafacial', price: '$55', time: '60 min', popular: true },
      { name: 'Sesión Láser Diodo Rejuvenecedor', price: '$70', time: '40 min', popular: false }
    ],
    features: [
      'Perfil de médicos y certificaciones',
      'Ficha médica previa antes de asistir',
      'Políticas de privacidad y salud',
      'Recordatorios inteligentes para no perder citas'
    ]
  }
}

const keyBenefits = [
  {
    icon: Globe,
    title: 'Tu Propio Dominio y Marca',
    description: 'Nada de páginas genéricas ni subdominios feos. Creamos una presencia digital de clase mundial que transmite máxima confianza a tus clientes.'
  },
  {
    icon: CalendarCheck,
    title: 'Motor de Reservas 24/7 Integrado',
    description: 'Tus clientes reservan directamente en tu web a cualquier hora. La cita entra de forma automática a tu calendario Angulo sin que muevas un dedo.'
  },
  {
    icon: Search,
    title: 'Optimización para Google (SEO Local)',
    description: 'Estructurada para que cuando alguien busque tus servicios en tu ciudad, tu negocio aparezca en los primeros lugares de búsqueda.'
  },
  {
    icon: Smartphone,
    title: '100% Adaptada a Teléfonos Móviles',
    description: 'Más del 85% de las reservas provienen de smartphones. Tu web carga a la velocidad de la luz y se navega de forma fluida y placentera.'
  },
  {
    icon: Zap,
    title: 'Sincronizada con Precios e Inventario',
    description: 'Si cambias un precio, agregas un empleado o activas una promoción en Angulo, se actualiza en tiempo real en tu página web.'
  },
  {
    icon: ShieldCheck,
    title: 'Cero Dolores de Cabeza Técnicos',
    description: 'Olvídate de pagar miles de dólares a diseñadores, lidiar con servidores caídos o plugins rotos. Nosotros nos encargamos de todo.'
  }
]

const WebsiteShowcaseSection = ({ setIsModalOpen }) => {
  const [selectedNiche, setSelectedNiche] = useState('salon')
  const current = nichesWebsites[selectedNiche]

  return (
    <section id="pagina-web" className="py-28 bg-[#030712] relative overflow-hidden border-b border-gray-800/40">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-cyan-300">
              Gran Novedad • Presencia Digital Completa
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-outfit mb-6 text-white tracking-tight leading-[1.1]"
          >
            Ahora te entregamos <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              tu propia Página Web Completa
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium"
          >
            No solo te damos el software de administración interno. <strong className="text-white">Diseñamos la página web oficial de tu negocio</strong>, lista para convertir visitantes en clientes y conectada en tiempo real con tu agenda y WhatsApp.
          </motion.p>

          {/* Interactive Niche Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-3 mt-10"
          >
            {Object.values(nichesWebsites).map((niche) => {
              const Icon = niche.icon
              const isSelected = selectedNiche === niche.id
              return (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNiche(niche.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105' 
                      : 'bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  <span>Ver Web de {niche.label}</span>
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Website Interactive Browser Mockup */}
        <motion.div
          key={selectedNiche}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-gray-700/60 bg-gray-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden mb-20 group"
        >
          {/* Browser Chrome Header */}
          <div className="bg-gray-900/90 border-b border-gray-800 px-4 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>

            {/* Address bar */}
            <div className="flex-1 max-w-md mx-auto bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-1.5 flex items-center justify-between text-xs text-gray-300 font-mono">
              <div className="flex items-center gap-2 truncate">
                <span className="text-emerald-400">🔒 https://</span>
                <span className="text-white font-semibold truncate">{current.domain}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ONLINE
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs hidden sm:flex">
              <a
                href={current.realLiveUrl || 'https://app.angulosoftwares.com/salon/lumiere-salon'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-gray-950 border border-cyan-500/30 text-[11px] font-bold transition-all shadow-sm group/live"
              >
                <span>Ver Ejemplo en Vivo</span>
                <ExternalLink className="w-3 h-3 group-hover/live:translate-x-0.5 transition-transform" />
              </a>
              <span className="text-gray-600">|</span>
              <span className="text-cyan-400 font-bold font-sans">Powered by ANGULO</span>
            </div>
          </div>

          {/* Browser Content: High-converting Client Website Preview */}
          <div className="p-6 md:p-10 bg-gradient-to-b from-gray-950 via-[#050b18] to-gray-950">
            
            {/* Mock Website Navbar */}
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${current.accentColor} flex items-center justify-center text-gray-950 font-black shadow-lg`}>
                  <current.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{current.businessName}</h4>
                  <p className="text-xs text-gray-400">{current.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{current.rating}</span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${current.accentColor} shadow-md hover:opacity-95 transition-all`}
                >
                  Reservar Cita
                </button>
              </div>
            </div>

            {/* Mock Website Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
              <div className="lg:col-span-7 space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${current.badgeBg}`}>
                  <span>{current.heroBadge}</span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white font-outfit leading-tight">
                  {current.heroTitle}
                </h3>
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal">
                  {current.heroSubtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-950 font-bold text-xs md:text-sm hover:bg-gray-100 transition-all shadow-xl"
                  >
                    <span>Elegir Servicio & Horario</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Confirmación instantánea</span>
                  </div>
                </div>
              </div>

              {/* Mock Website Live Booking Widget Preview */}
              <div className="lg:col-span-5 bg-gray-900/90 border border-gray-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-cyan-400" />
                    Catálogo de Servicios
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    24/7 Disponible
                  </span>
                </div>

                <div className="space-y-3">
                  {current.services.map((srv, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        srv.popular 
                          ? 'bg-gray-800/60 border-cyan-500/40 shadow-sm' 
                          : 'bg-gray-950/50 border-gray-800/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{srv.name}</span>
                          {srv.popular && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                              Top
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-gray-500" /> {srv.time}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-white">{srv.price}</span>
                        <div className="mt-1">
                          <span className="text-[10px] font-bold text-cyan-400 hover:underline cursor-pointer">
                            Reservar →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> Av. Principal #102
                  </span>
                  <span className="text-emerald-400 font-semibold">Abierto Hoy</span>
                </div>
              </div>
            </div>

            {/* Bottom highlights inside mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-800/80">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Floating Pill on Mockup */}
          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none">
            <Sparkles className="w-4 h-4" />
            <span>Incluida con tu plan ANGULO</span>
          </div>
        </motion.div>

        {/* 6 Key Benefits of the Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {keyBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800/80 hover:border-cyan-500/40 hover:bg-gray-900/90 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(6,182,212,0.1)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-gray-950 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-outfit tracking-tight group-hover:text-cyan-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Banner Call To Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-blue-950/60 via-gray-950 to-cyan-950/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              Todo en un solo proveedor
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white font-outfit">
              ¿Listo para tener tu software de gestión y tu página web completa?
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Deja de perder clientes por no tener una presencia online seria. Nosotros nos encargamos del diseño, la programación y la sincronización con tu agenda.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="https://app.angulosoftwares.com/salon/lumiere-salon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-900/90 border border-cyan-500/30 text-cyan-300 font-bold text-sm hover:bg-cyan-500/10 hover:border-cyan-400 transition-all w-full sm:w-auto"
            >
              <span>Ver Ejemplo Real en Vivo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-950 font-black text-base shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <span>Quiero Mi Web + Software</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default WebsiteShowcaseSection

