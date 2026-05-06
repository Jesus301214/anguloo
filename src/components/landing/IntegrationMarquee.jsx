const IntegrationMarquee = ({ integrations }) => {
  return (
    <div className="bg-slate-900/30 py-12 border-y border-slate-800/50 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
        {[...integrations, ...integrations, ...integrations].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-white shadow-inner">
              {item.name[0]}
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-400 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IntegrationMarquee
