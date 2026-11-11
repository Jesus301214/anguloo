import { useRef, useState, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = ({ isMenuOpen, setIsMenuOpen, setIsModalOpen, logo }) => {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${
        isMenuOpen
          ? 'bg-[#030712] h-screen md:h-auto'
          : scrolled
            ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40'
            : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="ANGULO"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-black tracking-tight text-white font-outfit">
            ANGULO
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          <a
            href="#pagina-web"
            className="px-4 py-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-cyan-500/10 transition-all flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Página Web
          </a>

          <a
            href="#funciones"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            Funciones
          </a>
          
          <a
            href="#motivacion"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            Motivación
          </a>

          {/* Recursos Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-1"
            >
              Recursos
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-blue-950/30 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden py-2"
                >
                  <a
                    href="#faq"
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Preguntas Frecuentes
                  </a>
                  <a
                    href="#testimonios"
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Testimonios
                  </a>
                  <a
                    href="https://wa.me/584249313359"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Contacto
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/login-admin"
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            Iniciar sesión
          </a>

          <div className="h-5 w-px bg-gray-800 mx-2" />

          <button
            onClick={() => setIsModalOpen(true)}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-95 hover:-translate-y-px group"
          >
            <span className="relative z-10">Comenzar Ahora →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-white rounded-full" />
              <div className="w-4 h-0.5 bg-white rounded-full" />
              <div className="w-6 h-0.5 bg-white rounded-full" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-8 space-y-1 overflow-y-auto max-h-[80vh]"
          >
            <a
              href="#pagina-web"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-lg font-bold text-cyan-400 py-3 px-4 rounded-xl hover:bg-cyan-500/10 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Página Web Completa
            </a>
            <a
              href="#funciones"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-bold text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              Funciones
            </a>
            <a
              href="#testimonios"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-bold text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              Testimonios
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-bold text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-gray-800 space-y-3 mt-4">
              <a
                href="/login-admin"
                className="block text-center text-base font-semibold text-gray-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                Iniciar sesión
              </a>
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-black text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
              >
                Comenzar Ahora →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
