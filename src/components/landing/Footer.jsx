const Footer = ({ logo }) => {
  return (
    <footer className="bg-[#050a14] border-t border-gray-800 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-500 p-2 rounded-xl">
                <img src={logo} alt="ANGULO" className="h-6 w-6 brightness-0 invert" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter font-outfit">ANGULO</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              El sistema que automatiza reservas, elimina inasistencias y controla tu inventario con IA.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Producto</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><a href="#soluciones" className="hover:text-rose-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#planes" className="hover:text-rose-400 transition-colors">Planes</a></li>
              <li><a href="#problemas" className="hover:text-rose-400 transition-colors">Diagnóstico</a></li>
              <li><a href="https://wa.me/584249313359" className="hover:text-rose-400 transition-colors">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Compañía</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#testimonios" className="hover:text-rose-400 transition-colors text-gray-500">Testimonios</a></li>
              <li><a href="#planes" className="hover:text-rose-400 transition-colors text-gray-500">Precios</a></li>
              <li><a href="https://wa.me/584249313359" className="hover:text-rose-400 transition-colors text-gray-500">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/privacidad" className="hover:text-rose-400 transition-colors text-gray-500">Privacidad</a></li>
              <li><a href="/terminos" className="hover:text-rose-400 transition-colors text-gray-500">Términos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Soporte</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#faq" className="hover:text-rose-400 transition-colors text-gray-500">FAQ</a></li>
              <li><a href="mailto:hola@angulosoftware.com" className="hover:text-rose-400 transition-colors text-gray-500">Email</a></li>
              <li><a href="https://wa.me/584249313359" className="hover:text-rose-400 transition-colors text-gray-500">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
          © 2026 ANGULO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
