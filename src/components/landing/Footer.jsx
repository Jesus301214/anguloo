import { Link } from 'react-router-dom'

const Footer = ({ logo }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <img src={logo} alt="ANGULO" className="h-6 w-6 brightness-0" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">ANGULO</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Auditorías operativas y automatización para empresas en crecimiento.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Producto
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#soluciones" className="hover:text-white transition-colors">Ecosistema</a></li>
              <li><a href="#planes" className="hover:text-white transition-colors">Planes</a></li>
              <li><a href="#soluciones" className="hover:text-white transition-colors">CRM y Leads</a></li>
              <li><a href="#soluciones" className="hover:text-white transition-colors">Dashboards BI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Compañía
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
              <li><a href="#metodologia" className="hover:text-white transition-colors">Metodología</a></li>
              <li><a href="#valores" className="hover:text-white transition-colors">Valores</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacidad" className="hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Términos</Link></li>
              <li><a href="mailto:hola@angulosoftware.com" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Soporte</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="mailto:hola@angulosoftware.com" className="hover:text-white transition-colors">Email</a></li>
              <li><a href="https://wa.me/584249313359" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Consulta</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-600">
          © 2026 ANGULO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
