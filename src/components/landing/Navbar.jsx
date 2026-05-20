import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import NavItem from './NavItem'

const Navbar = ({ isMenuOpen, setIsMenuOpen, setIsModalOpen, logo, menuData }) => {
  const navRef = useRef(null)

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${isMenuOpen ? 'bg-[#030712] h-screen md:h-auto' : 'bg-[#030712]/80 backdrop-blur-xl border-b border-gray-800/50'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ANGULO" className="h-10 w-10 rounded-full object-cover ring-2 ring-rose-500/20 shadow-sm" />
          <span className="text-2xl font-black tracking-tighter text-white font-outfit">ANGULO</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#problemas" className="text-sm font-semibold text-gray-400 hover:text-rose-400 transition-colors">Problema</a>
          <a href="#soluciones" className="text-sm font-semibold text-gray-400 hover:text-rose-400 transition-colors">Funcionalidades</a>
          <a href="#planes" className="text-sm font-semibold text-gray-400 hover:text-rose-400 transition-colors">Precios</a>
          <div className="h-6 w-px bg-gray-800" />
          <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95">
            Prueba Gratis
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <div className="space-y-1"><div className="w-6 h-0.5 bg-white" /><div className="w-6 h-0.5 bg-white" /><div className="w-6 h-0.5 bg-white" /></div>}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#030712] border-t border-gray-800 px-6 py-8 space-y-6 overflow-y-auto max-h-[80vh]">
            <a href="#problemas" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white">Problema</a>
            <a href="#soluciones" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white">Funcionalidades</a>
            <a href="#planes" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white">Precios</a>
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false) }} className="w-full bg-rose-500 py-4 rounded-2xl font-black text-white">Prueba Gratis</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
