import React from 'react'
import { CheckCircle2, Zap, BarChart3, Users, Shield, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Automatización de Ventas',
    description: 'Nuestros agentes de IA califican leads y cierran ventas 24/7 sin intervención humana.',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10'
  },
  {
    title: 'CRM Inteligente',
    description: 'Centraliza todos tus clientes y prospectos con herramientas avanzadas de seguimiento.',
    icon: Users,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  {
    title: 'Análisis de Datos',
    description: 'Toma decisiones basadas en datos reales con nuestros dashboards interactivos.',
    icon: BarChart3,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  }
]

const advantages = [
  'Ahorra hasta un 80% del tiempo operativo.',
  'Atención al cliente instantánea y sin esperas.',
  'Aumento garantizado en la tasa de conversión.',
  'Integración perfecta con WhatsApp, IG y FB.',
  'Soporte técnico dedicado las 24 horas.',
  'Escalabilidad inmediata sin contratar más personal.'
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
                className="group flex gap-6 p-6 rounded-2xl glass-card hover-3d transition-all cursor-pointer"
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
