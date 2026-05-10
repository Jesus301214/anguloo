import { useState } from 'react'
import { Search, Loader2, Building2, MapPin, CheckCircle2, XCircle, ExternalLink } from 'lucide-react'

const AIAgentProspector = () => {
  const [niche, setNiche] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!niche || !ubicacion) return

    setIsSearching(true)
    setStatus('searching')
    setError(null)
    setResults([])

    try {
      const webhookUrl = import.meta.env.VITE_N8N_PROSPECTOR_WEBHOOK_URL
      if (!webhookUrl) {
        setError('Webhook URL no configurada. Agrega VITE_N8N_PROSPECTOR_WEBHOOK_URL en tu .env')
        setStatus('error')
        setIsSearching(false)
        return
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, ubicacion }),
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)

      const data = await res.json()

      if (data.empresas && data.empresas.length > 0) {
        setResults(data.empresas)
        setStatus('success')
      } else {
        setStatus('empty')
        setError('No se encontraron empresas. Prueba con otro nicho o ubicacion.')
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el agente de prospeccion')
      setStatus('error')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 font-outfit mb-2">Agente de Prospeccion IA</h1>
        <p className="text-slate-500">Busca empresas por nicho y ubicacion. La IA las encuentra, clasifica y guarda en tu CRM automaticamente.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nicho / Tipo de Negocio</label>
            <input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ej: Clinicas dentales, Gimnasios, Restaurantes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-rose-500/50 outline-none transition-all"
              disabled={isSearching}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ubicacion</label>
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Ej: Bogota, Colombia, Vila Andrade Sao Paulo..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-rose-500/50 outline-none transition-all"
              disabled={isSearching}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={isSearching || !niche || !ubicacion}
          className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:transform-none shadow-lg shadow-rose-500/20"
        >
          {isSearching ? (
            <><Loader2 size={20} className="animate-spin" /> Buscando empresas...</>
          ) : (
            <><Search size={20} /> Iniciar Prospeccion</>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex items-start gap-4">
          <XCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-rose-700 mb-1">Error en la busqueda</h4>
            <p className="text-rose-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <CheckCircle2 size={18} />
            Se encontraron {results.length} empresas y se guardaron en el CRM
          </div>

          <div className="grid gap-3">
            {results.map((emp, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-rose-500/20 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 size={16} className="text-slate-400 shrink-0" />
                      <h4 className="font-bold text-slate-900 truncate">{emp.nombre || 'Sin nombre'}</h4>
                    </div>
                    {emp.descripcion && (
                      <p className="text-sm text-slate-500 mb-2 line-clamp-2">{emp.descripcion}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {emp.ubicacion && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin size={12} /> {emp.ubicacion}
                        </span>
                      )}
                      {emp.website && (
                        <a href={emp.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium">
                          <ExternalLink size={12} /> Web
                        </a>
                      )}
                      {emp.telefono && (
                        <span className="text-slate-400">{emp.telefono}</span>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 bg-rose-100 text-rose-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                    IA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIAgentProspector
