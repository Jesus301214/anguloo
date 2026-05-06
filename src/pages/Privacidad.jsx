import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Privacidad = () => {
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
          Política de Privacidad
        </h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-12">
          Última actualización: Mayo 2026
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-gray-400">
              ANGULO ("nosotros", "nuestro") es el responsable del tratamiento de los datos
              personales que usted proporciona a través de nuestra plataforma SaaS de gestión
              empresarial. Nos comprometemos a proteger su información de acuerdo con las leyes
              aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Datos que Recopilamos</h2>
            <p className="text-gray-400 mb-3">
              Recopilamos los siguientes tipos de datos personales:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>
                <strong className="text-white">Datos de Identificación:</strong> Nombre completo,
                correo electrónico, número de teléfono/WhatsApp, nombre de la empresa.
              </li>
              <li>
                <strong className="text-white">Datos de Uso:</strong> Información sobre cómo
                interactúa con la plataforma, módulos utilizados, frecuencia de acceso.
              </li>
              <li>
                <strong className="text-white">Datos Técnicos:</strong> Dirección IP, tipo de
                navegador, sistema operativo, cookies de sesión.
              </li>
              <li>
                <strong className="text-white">Datos Comerciales:</strong> Información de
                facturación, historial de transacciones, plan de suscripción.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Finalidad del Tratamiento</h2>
            <p className="text-gray-400">
              Sus datos personales serán tratados para: provisión y mantenimiento del servicio SaaS,
              gestión de su cuenta de usuario, comunicaciones relacionadas con el servicio, mejora
              continua de la plataforma, cumplimiento de obligaciones legales y fiscales, y
              prevención de fraude y seguridad informática.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Base Legal</h2>
            <p className="text-gray-400">
              El tratamiento de sus datos se fundamenta en: la ejecución del contrato de servicio
              (Términos y Condiciones), su consentimiento expreso otorgado al registrarse, nuestro
              interés legítimo en mejorar el servicio, y el cumplimiento de obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Compartición de Datos</h2>
            <p className="text-gray-400">
              No vendemos ni alquilamos sus datos personales a terceros. Únicamente compartimos
              información con: proveedores de infraestructura tecnológica (Supabase, Vercel),
              procesadores de pago autorizados, y autoridades competentes cuando la ley lo exija.
              Todos nuestros proveedores están sujetos a acuerdos de confidencialidad y protección
              de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Seguridad de los Datos</h2>
            <p className="text-gray-400">
              Implementamos medidas técnicas y organizativas para proteger sus datos: cifrado en
              tránsito (TLS/SSL), cifrado en reposo de bases de datos, controles de acceso basados
              en roles, auditorías periódicas de seguridad, y copias de seguridad automatizadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Sus Derechos (ARCO)</h2>
            <p className="text-gray-400">
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus
              datos en cualquier momento. Para ejercer estos derechos, puede enviar una solicitud
              formal a nuestro oficial de privacidad a través de{' '}
              <span className="text-rose-500">hola@angulosoftwares.com</span> adjuntando una prueba
              de identidad válida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Retención de Datos</h2>
            <p className="text-gray-400">
              Conservaremos sus datos personales mientras su cuenta esté activa o según sea
              necesario para prestarle servicios. Tras la cancelación de su cuenta, los datos serán
              eliminados en un plazo máximo de 90 días, salvo obligación legal de conservación.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Si tiene dudas sobre el tratamiento de sus datos, contáctenos en{' '}
            <span className="text-rose-500">hola@angulosoftwares.com</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacidad
