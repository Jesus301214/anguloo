const Footer = ({ logo }) => {
  return (
    <footer className="bg-[#030712] border-t border-gray-800/50 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-20">
          
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="ANGULO" className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              <span className="text-2xl font-black text-white tracking-tighter font-outfit">ANGULO</span>
            </div>
            <p className="text-base text-gray-400 leading-relaxed max-w-sm">
              El sistema inteligente que automatiza tus reservas, elimina inasistencias y controla tu inventario con IA.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#funciones" className="text-gray-400 hover:text-white transition-colors">Funciones</a></li>
              <li><a href="#testimonios" className="text-gray-400 hover:text-white transition-colors">Testimonios</a></li>
              <li><a href="https://wa.me/584249313359" className="text-gray-400 hover:text-white transition-colors">Agendar Demo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Soporte</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="mailto:hola@angulosoftware.com" className="text-gray-400 hover:text-white transition-colors">Email</a></li>
              <li><a href="https://wa.me/584249313359" className="text-gray-400 hover:text-white transition-colors">WhatsApp 24/7</a></li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-800/50 pt-8">
          <div className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} ANGULO. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="/privacidad" className="text-gray-500 hover:text-white transition-colors">Privacidad</a>
            <a href="/terminos" className="text-gray-500 hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
