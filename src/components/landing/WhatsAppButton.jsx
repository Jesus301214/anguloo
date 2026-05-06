import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const WhatsAppButton = ({ whatsappLink }) => {
  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[70] bg-[#25D366] text-white p-5 rounded-full shadow-2xl shadow-emerald-500/20 group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-slate-100 pointer-events-none">
        ¿Hablamos por WhatsApp?
      </span>
    </motion.a>
  )
}

export default WhatsAppButton
