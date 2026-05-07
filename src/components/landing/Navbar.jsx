import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP, gsap } from '../../lib/gsap'
import NavItem from './NavItem'

const Navbar = ({ isMenuOpen, setIsMenuOpen, setIsModalOpen, logo, menuData }) => {
  const navRef = useRef(null)

  useGSAP(
    () => {
      gsap.to('.glass-navbar', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top -80px',
          end: 'bottom top',
          toggleClass: { targets: '.glass-navbar', className: '!bg-white/95 !shadow-lg !shadow-slate-200/20' },
          onLeaveBack: () => {
            document.querySelector('.glass-navbar')?.classList.remove('!bg-white/95', '!shadow-lg', '!shadow-slate-200/20')
          },
        },
      })
    },
    { scope: navRef },
  )

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${
        isMenuOpen
          ? 'bg-white h-screen md:h-auto'
          : 'glass-navbar bg-white/70 backdrop-blur-xl border-b border-white/20'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-rose-500/10 shadow-sm"
          />
          <div className="text-2xl font-black tracking-tighter text-slate-900 font-outfit">
            ANGULO
          </div>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#problemas"
            className="text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors"
          >
            Problemas
          </a>
          <NavItem label="Ecosistema" items={menuData.ecosistema} />
          <NavItem label="Soluciones" items={menuData.soluciones} />
          <NavItem label="Compañía" items={menuData.compania} />

          <div className="h-6 w-px bg-slate-200 mx-2" />

          <a
            href="/login-admin"
            className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors"
          >
            Admin
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 hover:shadow-rose-500/30 transition-all active:scale-95 transform hover:-translate-y-0.5"
          >
            Agenda una Demo
          </button>
        </div>

        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-slate-900"></div>
              <div className="w-6 h-0.5 bg-slate-900"></div>
              <div className="w-6 h-0.5 bg-slate-900"></div>
            </div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 px-6 py-8 space-y-8 overflow-y-auto max-h-[80vh]"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Ecosistema</p>
              {menuData.ecosistema.map((m, idx) => (
                <a key={idx} href={m.href} onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-slate-900">{m.title}</a>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Soluciones</p>
              {menuData.soluciones.map((m, idx) => (
                <a key={idx} href={m.href} onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-slate-900">{m.title}</a>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-6">
              <a href="/login-admin" className="block text-lg font-bold text-slate-600">Panel Admin</a>
              <button
                onClick={() => { setIsModalOpen(true); setIsMenuOpen(false) }}
                className="w-full bg-rose-500 py-4 rounded-2xl font-black text-white shadow-xl shadow-rose-500/20"
              >
                Agenda una Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
