import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Terminos = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-white font-outfit mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-12">
          Última actualización: Mayo 2026
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Aceptación y Naturaleza del Servicio
            </h2>
            <p className="text-gray-400">
              Al acceder y utilizar la plataforma ANGULO, usted acepta quedar vinculado por estos
              Términos y Condiciones. ANGULO es una plataforma SaaS (Software como Servicio) de
              gestión empresarial B2B que incluye módulos de CRM, agenda, inventario y finanzas. El
              software se proporciona "tal cual" (as is) y "según disponibilidad". Nos reservamos el
              derecho de modificar, suspender o discontinuar cualquier funcionalidad con previo
              aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Uso de la Plataforma y Cuentas
            </h2>
            <p className="text-gray-400">
              El usuario es responsable de mantener la confidencialidad de sus credenciales de
              acceso y de toda actividad que ocurra bajo su cuenta. Queda estrictamente prohibido:
              utilizar la plataforma para fines ilícitos o no autorizados, intentar realizar
              ingeniería inversa del software, compartir credenciales de acceso con terceros no
              autorizados, sobrecargar intencionalmente la infraestructura del servicio, y utilizar
              bots o scripts automatizados sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Pagos, Suscripciones y Cancelación
            </h2>
            <p className="text-gray-400">
              El acceso a ANGULO se cobra mediante suscripción recurrente pagada por adelantado. Los
              precios están sujetos a cambios con notificación previa de al menos 30 días. El
              usuario puede cancelar su suscripción en cualquier momento; sin embargo, no se
              otorgarán reembolsos por períodos parciales no utilizados. La falta de pago resultará
              en la suspensión del acceso a la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propiedad Intelectual</h2>
            <p className="text-gray-400">
              Todo el contenido de la plataforma ANGULO, incluyendo pero no limitado a: código
              fuente, diseño, logotipos, marcas, textos, gráficos e interfaces, es propiedad
              exclusiva de ANGULO y está protegido por las leyes de propiedad intelectual
              aplicables. La suscripción otorga una licencia de uso limitada, no exclusiva y no
              transferible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Datos del Usuario</h2>
            <p className="text-gray-400">
              Los datos que el usuario cargue en la plataforma (información de clientes,
              transacciones, inventario) son propiedad del usuario. ANGULO actuará únicamente como
              procesador de dichos datos conforme a nuestra Política de Privacidad. Nos reservamos
              el derecho de utilizar datos anonimizados y agregados para mejorar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-gray-400">
              ANGULO no será responsable por daños indirectos, incidentales, especiales o
              consecuentes que resulten del uso o la imposibilidad de uso de la plataforma. Nuestra
              responsabilidad total acumulada no excederá el monto pagado por el usuario en los
              últimos 12 meses de suscripción. No garantizamos que el servicio será ininterrumpido o
              libre de errores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disponibilidad y SLA</h2>
            <p className="text-gray-400">
              Nos esforzamos por mantener una disponibilidad del 99.5% mensual. Las ventanas de
              mantenimiento programado serán notificadas con al menos 24 horas de anticipación. En
              caso de interrupciones no programadas, trabajaremos diligentemente para restaurar el
              servicio en el menor tiempo posible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Legislación Aplicable</h2>
            <p className="text-gray-400">
              Estos términos se regirán e interpretarán de conformidad con las leyes de la República
              Bolivariana de Venezuela. Cualquier controversia derivada de estos términos será
              resuelta ante los tribunales competentes de la jurisdicción correspondiente. Las
              partes acuerdan agotar los mecanismos de mediación y conciliación antes de acudir a la
              vía judicial.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Si tiene dudas sobre estos términos, contáctenos en{' '}
            <span className="text-rose-500">hola@angulosoftwares.com</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terminos
