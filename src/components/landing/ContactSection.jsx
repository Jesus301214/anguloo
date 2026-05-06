const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 bg-white px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 font-outfit">
          ¿Tienes alguna duda?
        </h2>
        <p className="text-slate-600 mb-10 text-lg">
          Envíanos un mensaje y nuestro equipo se pondrá en contacto contigo.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Mensaje enviado correctamente a hola@angulosoftware.com')
          }}
          className="space-y-4 text-left bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Nombre
              </label>
              <input
                required
                placeholder="Tu nombre"
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Corporativo
              </label>
              <input
                required
                type="email"
                placeholder="tu@empresa.com"
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Mensaje o Consulta
            </label>
            <textarea
              required
              rows="4"
              placeholder="¿En qué podemos ayudarte?"
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:border-rose-500/50 outline-none transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
