import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Scale, CreditCard, Lock, Database, AlertTriangle, Clock, Ban } from 'lucide-react';

const Terminos = () => {
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
          Términos y <span className="text-rose-500">Condiciones</span> de Servicio
        </h1>
        <p className="text-slate-500 mb-12 italic">Última actualización: Mayo 2026</p>
        
        <div className="space-y-12 leading-relaxed text-lg">
          {/* Punto 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">1. Aceptación y Naturaleza del Servicio</h2>
            </div>
            <p className="text-gray-400">
              El acceso y uso de la plataforma ANGULO ("el Servicio") constituye la aceptación plena y sin reservas de los presentes términos. ANGULO proporciona un software de gestión empresarial B2B bajo un modelo de Software como Servicio (SaaS). El software se proporciona "tal cual" y según disponibilidad, sin garantías expresas o implícitas de idoneidad para un propósito específico más allá de sus funcionalidades estándar documentadas.
            </p>
          </section>

          {/* Punto 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">2. Uso de la Plataforma y Cuentas</h2>
            </div>
            <p className="text-gray-400">
              El usuario es el único responsable de mantener la confidencialidad de sus credenciales de acceso y de toda la actividad que ocurra bajo su cuenta. Queda estrictamente prohibido el uso de la plataforma para fines ilícitos, así como cualquier intento de ingeniería inversa, descompilación o vulneración de las medidas de seguridad del software. El usuario se compromete a proporcionar información veraz y actualizada en todo momento.
            </p>
          </section>

          {/* Punto 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">3. Pagos, Suscripciones y Cancelación</h2>
            </div>
            <p className="text-gray-400">
              El Servicio opera bajo un modelo de suscripción pagada por adelantado. Las tarifas son finales y no reembolsables por periodos parciales o meses ya facturados tras la cancelación. El usuario puede cancelar su suscripción en cualquier momento a través del panel de configuración, manteniendo el acceso hasta el final del ciclo de facturación vigente. Nos reservamos el derecho de ajustar las tarifas previa notificación de 30 días.
            </p>
          </section>

          {/* Punto 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Scale size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">4. Propiedad Intelectual</h2>
            </div>
            <p className="text-gray-400">
              La marca ANGULO, su código fuente, interfaces de usuario, logotipos, algoritmos y documentación son propiedad exclusiva de los desarrolladores originales. El registro y pago de la suscripción otorga al usuario una licencia de uso limitada, temporal, no exclusiva y no transferible. Ninguna disposición de estos términos transfiere derechos de propiedad intelectual sobre la tecnología de ANGULO al usuario.
            </p>
          </section>

          {/* Punto 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Database size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">5. Privacidad y Propiedad de los Datos</h2>
            </div>
            <p className="text-gray-400">
              Todos los datos ingresados por el usuario (información de clientes, ventas, inventarios) son propiedad exclusiva del usuario. ANGULO actúa únicamente como procesador de datos bajo las instrucciones del usuario. Nos comprometemos a implementar medidas de seguridad estándar de la industria para proteger dicha información. No obstante, el usuario es el único responsable legal del cumplimiento de las leyes de protección de datos aplicables a sus propios clientes finales.
            </p>
          </section>

          {/* Punto 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">6. Limitación de Responsabilidad</h2>
            </div>
            <p className="text-gray-400">
              En la máxima medida permitida por la ley, ANGULO no será responsable por pérdida de datos, lucro cesante, interrupciones del negocio, daños indirectos o consecuentes derivados del uso o la imposibilidad de usar la plataforma. El usuario reconoce que las interrupciones en los servicios de infraestructura de terceros (caídas de servidores, fallas de internet) están fuera del control de ANGULO y no generan responsabilidad indemnizatoria.
            </p>
          </section>

          {/* Punto 7 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">7. Disponibilidad y Mantenimiento</h2>
            </div>
            <p className="text-gray-400">
              Aunque nuestro objetivo es la máxima disponibilidad, no garantizamos un uptime del 100%. Nos reservamos el derecho de suspender el acceso de forma temporal para realizar tareas de mantenimiento, actualizaciones o mejoras de seguridad. Siempre que sea posible, dichas tareas se notificarán con antelación y se realizarán en horarios de baja demanda.
            </p>
          </section>

          {/* Punto 8 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                <Ban size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">8. Suspensión y Terminación</h2>
            </div>
            <p className="text-gray-400">
              Nos reservamos el derecho de suspender o eliminar definitivamente la cuenta de cualquier usuario que incumpla los presentes términos, presente atrasos en sus pagos superiores a 5 días, o realice actividades que pongan en riesgo la estabilidad y seguridad de la plataforma para otros usuarios. La terminación por incumplimiento no dará derecho a reembolsos de ningún tipo.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Si tiene dudas sobre estos términos, contáctenos en <span className="text-rose-500">hola@angulosofware.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terminos;
