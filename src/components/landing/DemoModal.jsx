import { X, CheckCircle, Zap, Clock, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const categoryConfig = {
  caliente: { emoji: '🔥', title: '¡Lead Caliente!', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', desc: 'Te contactaremos en las próximas horas.', icon: Zap },
  tibio: { emoji: '💡', title: 'Interesante Prospecto', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Un consultor te escribirá pronto.', icon: Clock },
  frio: { emoji: '🌱', title: 'Registro Completado', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Gracias por tu interés en ANGULO.', icon: Heart },
}

const DemoModal = ({ isModalOpen, setIsModalOpen, formData, isSubmitting, formStatus, n8nResult, handleInputChange, handleReservaSubmit }) => {
  const showResult = formStatus === 'success' && n8nResult
  const cfg = categoryConfig[n8nResult?.category] || categoryConfig.frio
  const Icon = cfg?.icon || Heart

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
            className="relative w-full max-w-md rounded-[2.5rem] bg-white border border-slate-200 p-10 shadow-2xl text-center"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-8 top-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>

            {showResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className={`w-20 h-20 rounded-full ${cfg.bg} flex items-center justify-center mb-6`}>
                  <Icon size={40} className={cfg.color} />
                </div>
                <span className="text-6xl mb-4">{cfg.emoji}</span>
                <h2 className="text-2xl font-black text-slate-900 font-outfit mb-2">{cfg.title}</h2>
                <p className="text-slate-600 mb-2">{cfg.desc}</p>
                <p className="text-sm text-slate-400 italic mb-6">&ldquo;{n8nResult.insight || 'Gracias por confiar en ANGULO'}&rdquo;</p>
                <div className="flex gap-2 mb-6">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <div
                      key={n}
                      className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center transition-all ${
                        n <= n8nResult.score
                          ? n8nResult.score >= 7 ? 'bg-rose-500 text-white scale-110' : n8nResult.score >= 4 ? 'bg-amber-400 text-white scale-110' : 'bg-slate-200 text-slate-400'
                          : 'bg-slate-100 text-slate-300'
                      }`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
                {n8nResult.recommendation && (
                  <p className="text-xs text-slate-400 font-medium mb-6">{n8nResult.recommendation}</p>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-900 text-white font-black px-8 py-3 rounded-2xl text-sm hover:bg-slate-800 transition-all"
                >
                  Entendido
                </button>
              </motion.div>
            ) : formStatus === 'error' ? (
              <div className="py-8">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Algo salió mal</h2>
                <p className="text-slate-600 text-sm mb-6">Intenta de nuevo o escríbenos directamente por WhatsApp.</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-rose-500 text-white font-black px-8 py-3 rounded-2xl text-sm hover:bg-rose-600 transition-all"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-slate-900 mb-2 font-outfit">Comienza el Cambio</h2>
                <p className="text-slate-600 mb-8 text-sm">Déjanos tus datos y un consultor senior se pondrá en contacto contigo.</p>

                <form onSubmit={handleReservaSubmit} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre</label>
                    <input required name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre completo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ejemplo@empresa.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Empresa</label>
                    <input required type="text" name="compania" value={formData.compania} onChange={handleInputChange} placeholder="Nombre de tu empresa" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                    <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="+58..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 transition-all outline-none" />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full bg-rose-600 py-5 rounded-2xl font-black text-white shadow-xl shadow-rose-600/20 hover:bg-rose-500 transition-all transform hover:-translate-y-1 active:scale-95 mt-4">
                    {isSubmitting ? 'Enviando...' : 'Agendar Ahora'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DemoModal
