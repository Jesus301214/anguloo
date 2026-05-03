import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Plus, 
  Loader2, 
  Download, 
  Upload,
  MessageCircle,
  Building2,
  Trash2,
  ExternalLink
} from 'lucide-react';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const statusOptions = [
    { value: 'new', label: 'Nuevo', color: 'text-blue-400' },
    { value: 'contacted', label: 'Contactado', color: 'text-amber-400' },
    { value: 'demo', label: 'Demo Agendada', color: 'text-purple-400' },
    { value: 'won', label: 'Ganado', color: 'text-emerald-400' },
    { value: 'lost', label: 'Perdido', color: 'text-rose-400' }
  ];

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
      console.error('Error fetching leads:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (error) {
      alert('Error al actualizar estado');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert('No hay datos para exportar');
    
    const headers = ['Nombre', 'Email', 'Telefono', 'Empresa', 'Estado', 'Fecha'];
    const rows = leads.map(l => [
      l.nombre,
      l.email,
      l.whatsapp,
      l.compania,
      l.status,
      new Date(l.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_angulo_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        // Omitir cabecera si existe
        const dataRows = lines.slice(1);

        const newLeads = dataRows.map(line => {
          const [nombre, email, telefono, empresa] = line.split(',').map(item => item?.trim());
          return {
            nombre,
            email,
            whatsapp: telefono,
            compania: empresa,
            status: 'new',
            created_at: new Date().toISOString()
          };
        }).filter(l => l.nombre && l.email);

        if (newLeads.length === 0) throw new Error('No se encontraron datos válidos');

        const { error } = await supabase.from('leads').insert(newLeads);
        if (error) throw error;

        alert(`¡Éxito! Se importaron ${newLeads.length} leads.`);
        fetchLeads();
      } catch (error) {
        alert('Error al importar CSV: ' + error.message);
      } finally {
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const filteredLeads = leads.filter(lead => 
    lead.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.compania?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-slate-950 p-6 rounded-3xl border border-slate-800/50">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit">Pipeline Comercial</h1>
          <p className="text-slate-400 mt-1 font-medium">Gestión avanzada de leads y prospectos.</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportCSV} 
            className="hidden" 
            accept=".csv" 
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            Importar
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={18} />
            Nuevo Lead
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Buscar prospectos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 focus:border-blue-500/50 rounded-2xl text-slate-200 outline-none transition-all"
        />
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold">Sincronizando con Supabase...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800">
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Prospecto</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Compañía</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Pipeline / Estado</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Acciones Directas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-blue-400 font-bold border border-slate-700/50 shadow-inner">
                          {lead.nombre?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-100">{lead.nombre}</p>
                          <p className="text-xs text-slate-500 mt-1 font-medium">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5 text-slate-400">
                        <Building2 size={16} className="text-slate-600" />
                        <span className="text-sm font-bold">{lead.compania || 'Independiente'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <select 
                        value={lead.status || 'new'}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className={`bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider outline-none cursor-pointer hover:border-slate-700 transition-all ${
                          statusOptions.find(opt => opt.value === (lead.status || 'new'))?.color
                        }`}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-slate-950 text-slate-300">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                          title="WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                          title="Enviar Email"
                        >
                          <Mail size={18} />
                        </a>
                        <button className="p-2.5 bg-slate-800/50 text-slate-500 rounded-xl hover:bg-slate-800 hover:text-white transition-all">
                          <ExternalLink size={18} />
                        </button>
                      </div>
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
