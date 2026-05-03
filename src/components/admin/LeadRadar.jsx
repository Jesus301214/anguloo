import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, MapPin, Globe, Phone, Mail, ExternalLink, Plus, Loader2, CheckCircle2, AlertCircle, Radar } from 'lucide-react';

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

    setIsLoading(true);
    setError(null);
    setResults([]);

    const apiKey = import.meta.env.VITE_OUTSCRAPER_KEY;

    try {
      // Usando el endpoint de búsqueda v2 con enriquecimiento de contactos
      const response = await fetch(`https://api.app.outscraper.com/maps/search-v2?query=${encodeURIComponent(query)}&limit=10&async=false`, {
        headers: {
          'X-API-KEY': apiKey
        }
      });

      if (!response.ok) throw new Error('Error al conectar con la API de Outscraper');

      const data = await response.json();
      
      // La API devuelve un array de arrays en la v2 asíncrona/síncrona a veces, 
      // normalizamos el resultado.
      const rawResults = data.data?.[0] || [];
      setResults(rawResults);
    } catch (err) {
      setError('Hubo un problema al buscar prospectos. Verifica tu API Key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCRM = async (business) => {
    setSavingId(business.place_id || business.name);
    
    try {
      // Mapeo de datos de Outscraper a nuestra tabla de Leads
      const newLead = {
        nombre: business.name || 'Sin nombre',
        email: business.emails?.[0] || business.external_emails?.[0] || '',
        whatsapp: business.phone || '',
        compania: business.name || '',
        website: business.site || '',
        instagram: business.socials?.find(s => s.type === 'instagram')?.link || '',
        facebook: business.socials?.find(s => s.type === 'facebook')?.link || '',
        notas: `Prospectado vía LeadRadar. Categoría: ${business.type || 'N/A'}. Dirección: ${business.full_address || ''}`,
        status: 'new',
        created_at: new Date().toISOString()
      };

      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([newLead]);

      if (supabaseError) throw supabaseError;

      setSavedIds(prev => new Set([...prev, business.place_id || business.name]));
    } catch (err) {
      console.error('Error guardando lead:', err);
      alert('Error al guardar en el CRM');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit flex items-center gap-3">
            <Radar className="text-blue-500 animate-pulse" />
            LeadRadar B2B
          </h1>
          <p className="text-slate-400 mt-1 font-medium">Encuentra y extrae prospectos calificados directamente de Google Maps.</p>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Salones de belleza en Vila Andrade, São Paulo"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Radar size={20} />}
            Buscar Prospectos
          </button>
        </form>
      </div>

      {/* Mensajes de Error */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-500 font-bold text-sm">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800/50 h-64 rounded-2xl animate-pulse"></div>
          ))
        ) : (
          results.map((biz) => {
            const isSaved = savedIds.has(biz.place_id || biz.name);
            const isSaving = savingId === (biz.place_id || biz.name);

            return (
              <div key={biz.place_id || biz.name} className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                      <MapPin size={20} />
                    </div>
                    {biz.rating && (
                      <div className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg text-[10px] font-black border border-amber-500/20">
                        ⭐ {biz.rating} ({biz.reviews_cnt})
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors">{biz.name}</h3>
                  <p className="text-slate-500 text-xs font-bold mb-4 line-clamp-1">{biz.full_address}</p>

                  <div className="space-y-2 mb-6">
                    {biz.phone && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Phone size={14} className="text-slate-500" />
                        <span>{biz.phone}</span>
                      </div>
                    )}
                    {biz.site && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Globe size={14} className="text-slate-500" />
                        <a href={biz.site} target="_blank" rel="noreferrer" className="truncate hover:text-blue-400 transition-colors">{biz.site.replace('https://', '')}</a>
                      </div>
                    )}
                    {(biz.emails?.[0] || biz.external_emails?.[0]) && (
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Mail size={14} className="text-slate-500" />
                        <span className="truncate">{biz.emails?.[0] || biz.external_emails?.[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex gap-2">
                    {biz.socials?.find(s => s.type === 'instagram') && (
                      <a 
                        href={biz.socials.find(s => s.type === 'instagram').link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 bg-slate-800 text-pink-500 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCRM(biz)}
                    disabled={isSaved || isSaving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      isSaved 
                      ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    }`}
                  >
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
        </div>
      )}
    </div>
  );
};

export default LeadRadar;
