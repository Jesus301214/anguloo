import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCheck, ShieldAlert, Eye, Share2, Lock, Smartphone, FileText, Bell } from 'lucide-react';

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-rose-500 selection:text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors font-bold mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-white font-outfit mb-4 leading-tight">
          Política de <span className="text-rose-500">Privacidad</span>
        </h1>
        <p className="text-slate-500 mb-12 italic">Última actualización: Mayo 2026</p>
        
        <div className="space-y-12 leading-relaxed text-lg">
          {/* Punto 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">1. Responsable del Tratamiento</h2>
            </div>
            <p className="text-gray-400">
              ANGULO ("el Responsable") es el titular de la plataforma y responsable del tratamiento de los datos personales que usted nos proporcione. Nos comprometemos a garantizar que su privacidad esté protegida de acuerdo con los estándares internacionales de protección de datos personales y las leyes locales vigentes.
            </p>
          </section>

          {/* Punto 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">2. Datos que Recopilamos</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Recopilamos la información estrictamente necesaria para la prestación del servicio:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>Datos de identidad: Nombre y apellido.</li>
              <li>Datos de contacto: Email corporativo y número de WhatsApp.</li>
              <li>Datos del negocio: Nombre de la compañía y sector operativo.</li>
              <li>Datos técnicos: Dirección IP, tipo de navegador e identificadores de sesión.</li>
            </ul>
          </section>

          {/* Punto 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">3. Finalidad del Tratamiento</h2>
            </div>
            <p className="text-gray-400">
              Sus datos se utilizan para: (a) Crear y gestionar su cuenta de usuario; (b) Proveer el soporte técnico solicitado; (c) Enviar notificaciones críticas sobre el sistema y facturación; (d) Mejorar la experiencia de usuario mediante analítica interna; y (e) Garantizar la seguridad de la plataforma ante posibles ataques o fraudes.
            </p>
          </section>

          {/* Punto 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">4. Seguridad y Almacenamiento</h2>
            </div>
            <p className="text-gray-400">
              Implementamos protocolos de seguridad avanzados, incluyendo encriptación SSL/TLS, firewalls de aplicación y copias de seguridad automatizadas. Sus datos operativos se almacenan en infraestructuras de clase mundial (como Supabase/AWS) que cumplen con los más altos estándares de cumplimiento y seguridad física y lógica.
            </p>
          </section>

          {/* Punto 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Share2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">5. Transferencia a Terceros</h2>
            </div>
            <p className="text-gray-400">
              ANGULO no vende, alquila ni cede sus datos personales a terceros con fines comerciales. Compartimos información únicamente con proveedores de servicios esenciales que actúan como encargados del tratamiento (ej. pasarelas de pago, servicios de hosting, APIs de comunicación) y que están sujetos a estrictos acuerdos de confidencialidad.
            </p>
          </section>

          {/* Punto 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Smartphone size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">6. Cookies e Identificadores</h2>
            </div>
            <p className="text-gray-400">
              Utilizamos cookies esenciales para mantener su sesión activa y cookies de analítica interna para entender cómo se usa el software. Usted puede configurar su navegador para bloquearlas, pero esto podría inhabilitar ciertas funciones críticas del sistema.
            </p>
          </section>

          {/* Punto 7 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">7. Sus Derechos (ARCO)</h2>
            </div>
            <p className="text-gray-400">
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos en cualquier momento. Para ejercer estos derechos, puede enviar una solicitud formal a nuestro oficial de privacidad a través de <span className="text-rose-500">hola@angulosofware.com</span> adjuntando una prueba de identidad válida.
            </p>
          </section>

          {/* Punto 8 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Bell size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">8. Cambios en la Política</h2>
            </div>
            <p className="text-gray-400">
              Nos reservamos el derecho de modificar esta Política de Privacidad para adaptarla a novedades legislativas o mejoras en el servicio. Notificaremos cualquier cambio sustancial a través de la plataforma o vía correo electrónico antes de que los cambios entren en vigor.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Si tiene dudas sobre el tratamiento de sus datos, contáctenos en <span className="text-rose-500">hola@angulosofware.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacidad;
