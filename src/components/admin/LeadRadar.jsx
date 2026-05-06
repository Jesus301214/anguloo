import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import {
  Search,
  MapPin,
  Globe,
  Phone,
  Mail,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Radar,
  Clock,
  ExternalLink,
} from 'lucide-react'

const OSM_TAGS = {
  salon: ['shop=beauty', 'shop=hairdresser'],
  belleza: ['shop=beauty', 'shop=hairdresser'],
  peluqueria: ['shop=hairdresser'],
  barberia: ['shop=hairdresser'],
  spa: ['leisure=spa'],
  restaurante: ['amenity=restaurant'],
  hotel: ['tourism=hotel'],
  farmacia: ['amenity=pharmacy'],
  gimnasio: ['leisure=fitness_centre'],
  gym: ['leisure=fitness_centre'],
  cafe: ['amenity=cafe'],
  bar: ['amenity=bar'],
  clinica: ['amenity=clinic'],
  dentista: ['amenity=dentist'],
  veterinaria: ['amenity=veterinary'],
  taller: ['shop=car_repair'],
  panaderia: ['shop=bakery'],
  supermercado: ['shop=supermarket'],
  tienda: ['shop=convenience'],
  consultorio: ['amenity=doctors'],
}

const parseQuery = (q) => {
  for (const sep of [' en ', ' in ', ' cerca de ']) {
    const i = q.toLowerCase().indexOf(sep)
    if (i !== -1) return { biz: q.substring(0, i).trim(), loc: q.substring(i + sep.length).trim() }
  }
  return { biz: q, loc: q }
}

const getFilters = (biz) => {
  const t = biz.toLowerCase()
  const f = []
  for (const [k, tags] of Object.entries(OSM_TAGS)) {
    if (t.includes(k))
      tags.forEach((tag) => {
        if (!f.includes(tag)) f.push(tag)
      })
  }
  return f
}

const buildQuery = (lat, lon, filters) => {
  const r = 5000
  if (!filters.length)
    return `[out:json][timeout:25];(node(around:${r},${lat},${lon})["name"]["shop"];node(around:${r},${lat},${lon})["name"]["amenity"];way(around:${r},${lat},${lon})["name"]["shop"];);out center body 20;`
  const parts = filters.flatMap((f) => {
    const [k, v] = f.split('=')
    return [
      `node(around:${r},${lat},${lon})["${k}"="${v}"];`,
      `way(around:${r},${lat},${lon})["${k}"="${v}"];`,
    ]
  })
  return `[out:json][timeout:25];(${parts.join('')});out center body 20;`
}

const SK = 'angulo_lr_cache'

const LeadRadar = () => {
  const c = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(SK)) || {}
    } catch {
      return {}
    }
  })()
  const [query, setQuery] = useState(c.query || '')
  const [results, setResults] = useState(c.results || [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [savingId, setSavingId] = useState(null)
  const [savedIds, setSavedIds] = useState(new Set(c.savedIds || []))
  const [engine, setEngine] = useState(c.engine || 'osm')
  const [webResults, setWebResults] = useState(c.webResults || [])

  useEffect(() => {
    sessionStorage.setItem(
      SK,
      JSON.stringify({ query, results, savedIds: [...savedIds], engine, webResults }),
    )
  }, [query, results, savedIds, engine, webResults])

  const searchOSM = async () => {
    setIsLoading(true)
    setError(null)
    setResults([])
    try {
      const { biz, loc } = parseQuery(query)
      const gR = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(loc)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'ANGULO/1.0' } },
      )
      const gD = await gR.json()
      if (!gD.length) {
        setError('LOCATION')
        return
      }
      const { lat, lon } = gD[0]
      const oR = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(buildQuery(lat, lon, getFilters(biz)))}`,
      })
      if (!oR.ok) throw new Error()
      const oD = await oR.json()
      const bz = oD.elements
        .filter((e) => e.tags?.name)
        .map((e) => ({
          id: e.id,
          name: e.tags.name,
          phone: e.tags.phone || e.tags['contact:phone'] || '',
          website: e.tags.website || e.tags['contact:website'] || '',
          email: e.tags.email || e.tags['contact:email'] || '',
          full_address:
            [e.tags['addr:street'], e.tags['addr:housenumber'], e.tags['addr:city']]
              .filter(Boolean)
              .join(', ') || '',
          type: e.tags.shop || e.tags.amenity || e.tags.leisure || '',
          opening_hours: e.tags.opening_hours || '',
          lat: e.lat || e.center?.lat,
          lon: e.lon || e.center?.lon,
        }))
      setResults(bz)
      if (!bz.length) setError('EMPTY')
    } catch {
      setError('NETWORK')
    } finally {
      setIsLoading(false)
    }
  }

  const searchWeb = async () => {
    setIsLoading(true)
    setError(null)
    setWebResults([])
    try {
      const r = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      )
      const d = await r.json()
      const items = []
      if (d.AbstractText)
        items.push({
          id: 'abs',
          name: d.Heading || query,
          description: d.AbstractText,
          url: d.AbstractURL,
          source: d.AbstractSource,
        })
      ;(d.RelatedTopics || []).forEach((t, i) => {
        if (t.Text && t.FirstURL)
          items.push({
            id: `r${i}`,
            name: t.Text.split(' - ')[0]?.substring(0, 80),
            description: t.Text,
            url: t.FirstURL,
            source: 'DuckDuckGo',
          })
        ;(t.Topics || []).forEach((s, j) => {
          if (s.Text && s.FirstURL)
            items.push({
              id: `s${i}${j}`,
              name: s.Text.split(' - ')[0]?.substring(0, 80),
              description: s.Text,
              url: s.FirstURL,
              source: 'DuckDuckGo',
            })
        })
      })
      setWebResults(items)
      if (!items.length) setError('EMPTY')
    } catch {
      setError('NETWORK')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    engine === 'osm' ? searchOSM() : searchWeb()
  }

  const addToCRM = async (biz) => {
    setSavingId(biz.id)
    try {
      const ld = {
        nombre: biz.name || '',
        email: biz.email || '',
        whatsapp: biz.phone || '',
        compania: biz.name || '',
        website: biz.website || biz.url || '',
        notas: [
          `Via LeadRadar (${engine === 'osm' ? 'OSM' : 'Web'})`,
          biz.type ? `Cat: ${biz.type}` : '',
          biz.full_address ? `Dir: ${biz.full_address}` : '',
          biz.description ? `Info: ${biz.description.substring(0, 200)}` : '',
          biz.opening_hours ? `Horario: ${biz.opening_hours}` : '',
          biz.lat && biz.lon ? `Maps: https://www.google.com/maps?q=${biz.lat},${biz.lon}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        status: 'new',
        created_at: new Date().toISOString(),
      }
      const { error: e } = await supabase.from('leads').insert([ld])
      if (e) throw e
      setSavedIds((prev) => new Set([...prev, biz.id]))
    } catch {
      setError('SAVE')
    } finally {
      setSavingId(null)
    }
  }

  const list = engine === 'osm' ? results : webResults

  return (
    <div className="space-y-8 bg-[#F8FAFC] p-8 rounded-3xl min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit flex items-center gap-3">
            <Radar className="text-blue-600 animate-pulse" /> LeadRadar B2B
          </h1>
          <p className="text-slate-500 mt-1 font-bold uppercase tracking-widest text-[10px]">
            Doble motor de prospección — 100% gratuito.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            Gratis • Sin API Key
          </span>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
        <button
          onClick={() => setEngine('osm')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${engine === 'osm' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <MapPin size={14} /> Geolocalización
        </button>
        <button
          onClick={() => setEngine('web')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${engine === 'web' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <Globe size={14} /> Web Search
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                engine === 'osm'
                  ? 'Ej: Salones de belleza en Caracas'
                  : 'Ej: Spas premium Caracas contacto'
              }
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500/30 transition-all placeholder:text-slate-400 font-bold text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`${engine === 'osm' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'} text-white font-black px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Radar size={20} />} Buscar ahora
          </button>
        </form>
      </div>

      {error === 'LOCATION' && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-500 font-bold text-sm">
          <AlertCircle size={20} /> Ubicación no encontrada.
        </div>
      )}
      {error === 'NETWORK' && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-500 font-bold text-sm">
          <AlertCircle size={20} /> Error de conexión.
        </div>
      )}
      {error === 'EMPTY' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3 text-blue-400 font-bold text-sm">
          <Search size={20} /> Sin resultados.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900/30 border border-slate-800/50 h-64 rounded-2xl animate-pulse"
                />
              ))
          : list.map((biz) => {
              const saved = savedIds.has(biz.id),
                saving = savingId === biz.id
              return (
                <div
                  key={biz.id}
                  className="group bg-white border border-slate-200 hover:border-blue-500/30 rounded-[2rem] p-7 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`h-10 w-10 ${engine === 'osm' ? 'bg-blue-600/10 text-blue-500' : 'bg-purple-600/10 text-purple-500'} rounded-xl flex items-center justify-center`}
                      >
                        {engine === 'osm' ? <MapPin size={20} /> : <Globe size={20} />}
                      </div>
                      {biz.type && (
                        <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-700">
                          {biz.type}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">
                      {biz.name}
                    </h3>
                    {biz.full_address && (
                      <p className="text-slate-500 text-[11px] font-bold mb-3 line-clamp-1 flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-300" /> {biz.full_address}
                      </p>
                    )}
                    {biz.description && (
                      <p className="text-slate-500 text-xs mb-3 line-clamp-3 leading-relaxed font-medium">
                        {biz.description}
                      </p>
                    )}
                    <div className="space-y-2 mb-6">
                      {biz.phone && (
                        <div className="flex items-center gap-2 text-slate-600 text-xs font-bold bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Phone size={14} className="text-slate-400" />
                          {biz.phone}
                        </div>
                      )}
                      {(biz.website || biz.url) && (
                        <div className="flex items-center gap-2 text-xs font-bold bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Globe size={14} className="text-slate-400" />
                          <a
                            href={
                              (biz.website || biz.url).startsWith('http')
                                ? biz.website || biz.url
                                : `https://${biz.website || biz.url}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-blue-600 hover:underline"
                          >
                            {(biz.website || biz.url).replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {biz.lat && (
                      <a
                        href={`https://www.google.com/maps?q=${biz.lat},${biz.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {biz.url && !biz.lat && (
                      <a
                        href={biz.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all border border-slate-100"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => addToCRM(biz)}
                      disabled={saved || saving}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${saved ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : `${engine === 'osm' ? 'bg-blue-600' : 'bg-purple-600'} text-white shadow-lg`}`}
                    >
                      {saving ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : saved ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Plus size={14} />
                      )}{' '}
                      {saved ? 'Guardado ✓' : 'Al CRM'}
                    </button>
                  </div>
                </div>
              )
            })}
      </div>

      {!isLoading && !list.length && !error && (
        <div className="py-24 text-center bg-slate-900/40 rounded-[2.5rem] border border-dashed border-slate-800">
          <Radar size={64} className="mx-auto text-slate-800 mb-6" />
          <h3 className="text-2xl font-black text-slate-300">Radar en espera</h3>
          <p className="text-slate-500 mt-2">
            📍 OSM + 🌐 DuckDuckGo — Selecciona un motor y busca.
          </p>
        </div>
      )}
      {list.length > 0 && (
        <p className="text-center text-slate-600 text-xs">
          {engine === 'osm' ? 'OpenStreetMap ©' : 'DuckDuckGo'} • {list.length} resultados
        </p>
      )}
    </div>
  )
}

export default LeadRadar
