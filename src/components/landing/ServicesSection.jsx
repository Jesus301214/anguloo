import React from 'react'
import { CheckCircle2, Calendar, FileText, BellRing, Package, Shield, Target, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Página Web Completa',
    description: 'Diseñamos la web oficial de tu negocio con tu marca, catálogo de servicios, ubicación y motor de reservas integrado.',
    icon: Globe,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10'
  },
  {
    title: 'Agenda Online 24/7',
    description: 'Digitaliza tu agenda y organiza tu día a día. Facilita las reservas de tus clientes en cualquier momento.',
    icon: Calendar,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    title: 'Ficha Clínica y Estética',
    description: 'Toda la información de tus pacientes o clientes en la nube de forma segura y accesible.',
    icon: FileText,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  {
    title: 'Recordatorios Automáticos',
    description: 'Reduce inasistencias recordando las citas por WhatsApp de forma automática.',
    icon: BellRing,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10'
  },
  {
    title: 'Inventario y Caja',
    description: 'Controla tu inventario con uso automático de productos y visualiza tu flujo de caja en tiempo real.',
    icon: Package,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  }
]

const advantages = [
  'Tu propia página web profesional lista para recibir clientes.',
  'Ahorra hasta un 80% de trabajo administrativo.',
  'Aumenta reservas con facilidad y presencia en Google.',
  'Reduce inasistencias en un 60% vía WhatsApp.',
  'Historiales centralizados y organizados.',
  'Soporte técnico dedicado las 24 horas.',
  'Cálculo de comisiones automático.'
]

const ServicesSection = () => {
  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden" id="servicios">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-outfit mb-6 text-white tracking-tight">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Servicios</span> y Ventajas
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Descubre por qué las mejores empresas confían en nosotros para escalar sus operaciones, automatizar procesos y multiplicar sus ingresos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Servicios */}
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="group flex gap-6 p-6 rounded-2xl glass-card hover-3d hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${service.bgColor}`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glow transition-all">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ventajas */}
          <div className="glass-card p-8 md:p-10 rounded-3xl relative hover-3d transition-all">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-[40px] opacity-20"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">¿Por qué elegirnos?</h3>
            </div>

            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={index}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-gray-300 font-medium">{advantage}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl border border-blue-500/20 flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-200 mb-1">Garantía de Satisfacción</div>
                <div className="text-xl font-bold text-white">100% Asegurado</div>
              </div>
              <Target className="w-10 h-10 text-blue-400 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
