import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, MapPin, Globe, Phone, Mail, Plus, Loader2, CheckCircle2, AlertCircle, Radar, Clock, ExternalLink } from 'lucide-react';

const OSM_TAGS = {
  'salon': ['shop=beauty', 'shop=hairdresser'], 'belleza': ['shop=beauty', 'shop=hairdresser'],
  'peluqueria': ['shop=hairdresser'], 'barberia': ['shop=hairdresser'],
  'spa': ['leisure=spa'], 'restaurante': ['amenity=restaurant'],
  'hotel': ['tourism=hotel'], 'farmacia': ['amenity=pharmacy'],
  'gimnasio': ['leisure=fitness_centre'], 'gym': ['leisure=fitness_centre'],
  'cafe': ['amenity=cafe'], 'bar': ['amenity=bar'],
  'clinica': ['amenity=clinic'], 'dentista': ['amenity=dentist'],
  'veterinaria': ['amenity=veterinary'], 'taller': ['shop=car_repair'],
  'panaderia': ['shop=bakery'], 'supermercado': ['shop=supermarket'],
  'tienda': ['shop=convenience'], 'consultorio': ['amenity=doctors'],
};

const parseQuery = (q) => {
  for (const sep of [' en ', ' in ', ' cerca de ']) {
    const i = q.toLowerCase().indexOf(sep);
    if (i !== -1) return { biz: q.substring(0, i).trim(), loc: q.substring(i + sep.length).trim() };
  }
  return { biz: q, loc: q };
};

const getFilters = (biz) => {
  const t = biz.toLowerCase();
  const f = [];
  for (const [k, tags] of Object.entries(OSM_TAGS)) {
    if (t.includes(k)) tags.forEach(tag => { if (!f.includes(tag)) f.push(tag); });
  }
  return f;
};

const buildQuery = (lat, lon, filters) => {
  const r = 5000;
  if (!filters.length) {
    return `[out:json][timeout:25];(node(around:${r},${lat},${lon})["name"]["shop"];node(around:${r},${lat},${lon})["name"]["amenity"];way(around:${r},${lat},${lon})["name"]["shop"];);out center body 20;`;
  }
  const parts = filters.flatMap(f => {
    const [k, v] = f.split('=');
    return [`node(around:${r},${lat},${lon})["${k}"="${v}"];`, `way(around:${r},${lat},${lon})["${k}"="${v}"];`];
  });
  return `[out:json][timeout:25];(${parts.join('')});out center body 20;`;
};

const LeadRadar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true); setError(null); setResults([]);

    try {
      const { biz, loc } = parseQuery(query);

      // Step 1: Geocode location with Nominatim (free)
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(loc)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'ANGULO-LeadRadar/1.0' } }
      );
      const geoData = await geoRes.json();
      if (!geoData.length) { setError('LOCATION'); setIsLoading(false); return; }

      const { lat, lon } = geoData[0];
      const filters = getFilters(biz);

      // Step 2: Search businesses with Overpass API (free)
      const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(buildQuery(lat, lon, filters))}`
      });
      if (!overpassRes.ok) throw new Error('Overpass error');
      const overpassData = await overpassRes.json();

      // Step 3: Transform results
      const businesses = overpassData.elements.filter(el => el.tags?.name).map(el => ({
        id: el.id,
        name: el.tags.name,
        phone: el.tags.phone || el.tags['contact:phone'] || '',
        website: el.tags.website || el.tags['contact:website'] || '',
        email: el.tags.email || el.tags['contact:email'] || '',
        full_address: [el.tags['addr:street'], el.tags['addr:housenumber'], el.tags['addr:city']].filter(Boolean).join(', ') || '',
        type: el.tags.shop || el.tags.amenity || el.tags.leisure || '',
        opening_hours: el.tags.opening_hours || '',
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon
      }));

      setResults(businesses);
      if (!businesses.length) setError('EMPTY');
    } catch (err) {
      setError('NETWORK'); console.error(err);
    } finally { setIsLoading(false); }
  };

  const handleAddToCRM = async (biz) => {
    setSavingId(biz.id);
    try {
      const leadData = {
        nombre: biz.name || 'Sin nombre',
        email: biz.email || '',
        whatsapp: biz.phone || '',
        compania: biz.name || '',
        website: biz.website || '',
        notas: [
          `Prospectado vía LeadRadar (OpenStreetMap).`,
          biz.type ? `Categoría: ${biz.type}` : '',
          biz.full_address ? `Dirección: ${biz.full_address}` : '',
          biz.opening_hours ? `Horario: ${biz.opening_hours}` : '',
          biz.lat && biz.lon ? `Maps: https://www.google.com/maps?q=${biz.lat},${biz.lon}` : ''
        ].filter(Boolean).join('\n'),
        status: 'new',
        created_at: new Date().toISOString()
      };

      const { error: err } = await supabase.from('leads').insert([leadData]);
      if (err) throw err;
      setSavedIds(prev => new Set([...prev, biz.id]));
    } catch (err) {
      console.error('Error guardando lead:', err);
      setError('SAVE');
    } finally { setSavingId(null); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit flex items-center gap-3">
            <Radar className="text-blue-500 animate-pulse" /> LeadRadar B2B
          </h1>
          <p className="text-slate-400 mt-1 font-medium">Encuentra prospectos calificados con OpenStreetMap — 100% gratuito.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Gratis • Sin API Key</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Salones de belleza en Caracas, Venezuela"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600 font-medium"
            />
          </div>
          <button type="submit" disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <Loader2 className="animate-spin" /> : <Radar size={20} />} Buscar Prospectos
          </button>
        </form>
        <p className="text-slate-600 text-xs mt-3">💡 Tip: Usa el formato "<span className="text-slate-400">tipo de negocio</span> en <span className="text-slate-400">ciudad</span>" para mejores resultados.</p>
      </div>

      {/* Errors */}
      {error === 'LOCATION' && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-500 font-bold text-sm">
          <AlertCircle size={20} /> No pudimos encontrar esa ubicación. Intenta con una ciudad o país más específico.
        </div>
      )}
      {error === 'NETWORK' && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-500 font-bold text-sm">
          <AlertCircle size={20} /> Error de conexión. Los servidores de OpenStreetMap podrían estar ocupados, intenta de nuevo.
        </div>
      )}
      {error === 'EMPTY' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3 text-blue-400 font-bold text-sm">
          <Search size={20} /> No se encontraron negocios. Intenta con otro término o amplía la zona de búsqueda.
        </div>
      )}
      {error === 'SAVE' && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-500 font-bold text-sm">
          <AlertCircle size={20} /> Error al guardar en el CRM. Verifica la conexión con Supabase.
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800/50 h-64 rounded-2xl animate-pulse" />
          ))
        ) : (
          results.map((biz) => {
            const isSaved = savedIds.has(biz.id);
            const isSaving = savingId === biz.id;
            const mapsUrl = `https://www.google.com/maps?q=${biz.lat},${biz.lon}`;

            return (
              <div key={biz.id} className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                      <MapPin size={20} />
                    </div>
                    {biz.type && (
                      <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-slate-700">
                        {biz.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors">{biz.name}</h3>
                  {biz.full_address && <p className="text-slate-500 text-xs font-bold mb-4 line-clamp-1">{biz.full_address}</p>}

                  <div className="space-y-2 mb-6">
                    {biz.phone && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Phone size={14} className="text-slate-500" /> <span>{biz.phone}</span>
                      </div>
                    )}
                    {biz.website && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Globe size={14} className="text-slate-500" />
                        <a href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`} target="_blank" rel="noreferrer" className="truncate hover:text-blue-400 transition-colors">{biz.website.replace(/^https?:\/\//, '')}</a>
                      </div>
                    )}
                    {biz.email && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Mail size={14} className="text-slate-500" /> <span className="truncate">{biz.email}</span>
                      </div>
                    )}
                    {biz.opening_hours && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Clock size={14} className="text-slate-500" /> <span className="truncate text-xs">{biz.opening_hours}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all" title="Ver en Google Maps">
                    <ExternalLink size={16} />
                  </a>
                  <button onClick={() => handleAddToCRM(biz)} disabled={isSaved || isSaving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      isSaved ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    }`}>
                    {isSaving ? <Loader2 className="animate-spin" size={14} /> : isSaved ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                    {isSaved ? 'Guardado ✓' : 'Agregar al CRM'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!isLoading && results.length === 0 && !error && (
        <div className="py-24 text-center bg-slate-900/40 rounded-[2.5rem] border border-dashed border-slate-800">
          <Radar size={64} className="mx-auto text-slate-800 mb-6" />
          <h3 className="text-2xl font-black text-slate-300">Radar en espera</h3>
          <p className="text-slate-500 mt-2 font-medium">Ingresa una ubicación y rubro para detectar nuevos negocios.</p>
          <p className="text-slate-600 mt-4 text-xs">Powered by OpenStreetMap • 100% Gratuito</p>
        </div>
      )}

      {results.length > 0 && (
        <p className="text-center text-slate-600 text-xs">Datos de OpenStreetMap © colaboradores • {results.length} resultados encontrados</p>
      )}
    </div>
  );
};

export default LeadRadar;
