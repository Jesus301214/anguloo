import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DemoModal = ({ isModalOpen, setIsModalOpen, formData, isSubmitting, formStatus, handleInputChange, handleSubmit }) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md rounded-[2.5rem] bg-white border border-slate-200 p-10 shadow-2xl"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-8 top-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-2 font-outfit">
              Comienza el Cambio
            </h2>
            <p className="text-slate-600 mb-8 text-sm">
              Déjanos tus datos y un consultor senior se pondrá en contacto contigo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Nombre
                </label>
                <input
                  required
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email Corporativo
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@empresa.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  WhatsApp
                </label>
                <input
                  required
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+58..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-rose-600 py-5 rounded-2xl font-black text-white shadow-xl shadow-rose-600/20 hover:bg-rose-500 transition-all transform hover:-translate-y-1 active:scale-95 mt-4"
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Ahora'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DemoModal
