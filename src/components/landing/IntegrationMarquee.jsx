const IntegrationMarquee = ({ integrations }) => {
  const tripled = [...integrations, ...integrations, ...integrations]

  return (
    <div className="bg-white py-10 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex items-center gap-16 text-slate-400 text-sm font-bold uppercase tracking-widest">
        <span className="shrink-0 pl-8 text-slate-300 text-xs">INTEGRACIONES</span>
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {tripled.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all duration-500 opacity-30 hover:opacity-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg font-black text-slate-600 group-hover:shadow-md transition-shadow">
                {item.name[0]}
              </div>
              <span className="text-base font-bold tracking-tight text-slate-400 group-hover:text-slate-900 transition-colors">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntegrationMarquee
