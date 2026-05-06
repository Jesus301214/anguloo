import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NavItem = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-all py-2 group">
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 group-hover:text-rose-500 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full -left-4 mt-2 w-72 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl z-[100]"
          >
            <div className="grid gap-2">
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group/item"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-rose-500 group-hover/item:bg-rose-500/10 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover/item:text-rose-500 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavItem
