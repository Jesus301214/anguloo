import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Plus, 
  Loader2, 
  ArrowUpDown,
  Download,
  Calendar,
  Building2
} from 'lucide-react';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads from Supabase:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.compania?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-50 text-blue-600 border-blue-100',
      discovery: 'bg-amber-50 text-amber-600 border-amber-100',
      demo: 'bg-purple-50 text-purple-600 border-purple-100',
      negotiation: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      won: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      lost: 'bg-rose-50 text-rose-600 border-rose-100',
    };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${styles[status] || styles.new}`}>
        {status || 'new'}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit">Gestión de Leads</h1>
          <p className="text-slate-500 mt-1 font-medium">Visualiza y gestiona tu pipeline comercial desde una tabla centralizada.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={18} />
            Nuevo Lead
          </button>
        </div>
      </div>

      {/* Table Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o empresa..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500/30 rounded-xl text-sm transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
            <Filter size={18} />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
            <ArrowUpDown size={18} />
            Ordenar
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold tracking-wide">Cargando datos de Supabase...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 text-center">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Users size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No se encontraron leads</h3>
            <p className="text-sm mt-1">Intenta ajustar tu búsqueda o añade uno nuevo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Contacto</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Empresa</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">WhatsApp</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Fecha Registro</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-tr from-blue-500 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                          {lead.nombre?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">{lead.nombre}</p>
                          <div className="flex items-center gap-1.5 mt-1.5 text-slate-400">
                            <Mail size={12} />
                            <p className="text-xs font-medium">{lead.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 size={16} className="text-slate-400" />
                        <p className="text-sm font-bold">{lead.compania || 'Independiente'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-5">
                      <a 
                        href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100"
                      >
                        <Phone size={14} />
                        Chat
                      </a>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <p className="text-xs font-medium">
                          {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRM;
