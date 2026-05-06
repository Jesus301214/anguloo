import { Link } from 'react-router-dom'

const Footer = ({ logo }) => {
  return (
    <footer className="bg-white py-20 text-center border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <img src={logo} alt="Logo" className="h-6 w-6 brightness-0 invert" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">ANGULO</span>
          </div>
          <div className="flex gap-8 text-slate-600 font-bold text-sm">
            <Link to="/privacidad" className="hover:text-rose-500 transition-colors">
              Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-rose-500 transition-colors">
              Términos
            </Link>
            <a
              href="mailto:hola@angulosoftware.com"
              className="hover:text-rose-500 transition-colors"
            >
              Soporte
            </a>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-400">
          © 2026 ANGULO. Auditorías operativas y automatización para empresas en crecimiento.
        </p>
      </div>
    </footer>
  )
}

export default Footer
