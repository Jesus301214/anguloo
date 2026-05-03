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
  Calendar as CalendarIcon,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Estados de formularios
  const [newLead, setNewLead] = useState({ nombre: '', email: '', whatsapp: '', compania: '', status: 'new' });
  const [selectedLead, setSelectedLead] = useState(null);
  const [meetingData, setMeetingData] = useState({ fecha: '', hora: '' });
  
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

  const handleCreateLead = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ ...newLead, created_at: new Date().toISOString() }]);

      if (error) throw error;
      alert('Lead creado con éxito');
      setIsModalOpen(false);
      setNewLead({ nombre: '', email: '', whatsapp: '', compania: '', status: 'new' });
      fetchLeads();
    } catch (error) {
      alert('Error al crear lead: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

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

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;
    setIsProcessing(true);
    
    try {
      // 1. Insertar reunión
      const { error: meetingError } = await supabase
        .from('meetings')
        .insert([{
          lead_id: selectedLead.id,
          fecha: meetingData.fecha,
          hora: meetingData.hora
        }]);

      if (meetingError) throw meetingError;

      // 2. Actualizar estado del lead
      const { error: leadError } = await supabase
        .from('leads')
        .update({ status: 'demo' })
        .eq('id', selectedLead.id);

      if (leadError) throw leadError;

      alert(`Reunión agendada con éxito para ${selectedLead.nombre}`);
      setIsScheduleModalOpen(false);
      setMeetingData({ fecha: '', hora: '' });
      fetchLeads(); // Recargar para ver cambio de estado
    } catch (error) {
      alert('Error al agendar: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert('No hay datos para exportar');
    const headers = ['Nombre', 'Email', 'Telefono', 'Empresa', 'Estado', 'Fecha'];
    const rows = leads.map(l => [l.nombre, l.email, l.whatsapp, l.compania, l.status, new Date(l.created_at).toLocaleDateString()]);
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
        const dataRows = lines.slice(1);
        const newLeads = dataRows.map(line => {
          const [nombre, email, telefono, empresa] = line.split(',').map(item => item?.trim());
          return { nombre, email, whatsapp: telefono, compania: empresa, status: 'new', created_at: new Date().toISOString() };
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
    (lead.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lead.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lead.compania?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-slate-950 p-6 rounded-3xl border border-slate-800/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit">Pipeline Comercial</h1>
          <p className="text-slate-400 mt-1 font-medium">Gestión avanzada de prospectos y agendamiento.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input type="file" ref={fileInputRef} onChange={handleImportCSV} className="hidden" accept=".csv" />
          <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all"><Upload size={18} /> Importar</button>
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all"><Download size={18} /> Exportar</button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"><Plus size={18} /> Nuevo Lead</button>
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
          className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 focus:border-blue-500/50 rounded-2xl text-slate-200 outline-none transition-all placeholder:text-slate-600 font-medium"
        />
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500"><Loader2 className="animate-spin mb-4" size={40} /><p className="font-bold tracking-widest uppercase text-[10px]">Sincronizando con Supabase...</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800">
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Prospecto</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Compañía</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Pipeline / Estado</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Gestión Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 font-bold border border-slate-700/50 shadow-inner">{lead.nombre?.charAt(0).toUpperCase()}</div>
                        <div><p className="text-sm font-black text-slate-100">{lead.nombre}</p><p className="text-xs text-slate-500 mt-1">{lead.email}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-5"><div className="flex items-center gap-2.5 text-slate-400"><Building2 size={16} className="text-slate-600" /><span className="text-sm font-bold">{lead.compania || 'Independiente'}</span></div></td>
                    <td className="px-6 py-5">
                      <select 
                        value={lead.status || 'new'}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className={`bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer hover:border-slate-700 transition-all ${statusOptions.find(opt => opt.value === (lead.status || 'new'))?.color}`}
                      >
                        {statusOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-slate-950 text-slate-300">{opt.label}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20" title="WhatsApp"><MessageCircle size={18} /></a>
                        <a href={`mailto:${lead.email}`} className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20" title="Email"><Mail size={18} /></a>
                        <button 
                          onClick={() => { setSelectedLead(lead); setIsScheduleModalOpen(true); }}
                          className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20" 
                          title="Agendar Reunión"
                        >
                          <CalendarIcon size={18} />
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

      {/* Modal Nuevo Lead */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-white mb-6 font-outfit">Crear Nuevo Lead</h2>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Nombre</label>
                <input required type="text" value={newLead.nombre} onChange={(e) => setNewLead({...newLead, nombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Email</label>
                  <input required type="email" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                </div>
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">WhatsApp</label>
                  <input required type="tel" value={newLead.whatsapp} onChange={(e) => setNewLead({...newLead, whatsapp: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                </div>
              </div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Compañía</label>
                <input type="text" value={newLead.compania} onChange={(e) => setNewLead({...newLead, compania: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <button disabled={isProcessing} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4">
                {isProcessing ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />} Crear Lead
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agendar Reunión (Meetings) */}
      {isScheduleModalOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setIsScheduleModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400"><CalendarIcon size={24} /></div>
              <div>
                <h2 className="text-xl font-black text-white font-outfit">Agendar Reunión</h2>
                <p className="text-xs text-slate-400">Prospecto: <span className="text-purple-400 font-bold">{selectedLead.nombre}</span></p>
              </div>
            </div>
            
            <form onSubmit={handleScheduleMeeting} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Fecha de la Reunión</label>
                <input 
                  required 
                  type="date" 
                  value={meetingData.fecha} 
                  onChange={(e) => setMeetingData({...meetingData, fecha: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-all" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Hora Sugerida</label>
                <input 
                  required 
                  type="time" 
                  value={meetingData.hora} 
                  onChange={(e) => setMeetingData({...meetingData, hora: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-all" 
                />
              </div>
              <button 
                disabled={isProcessing} 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? <Loader2 className="animate-spin" /> : <Clock size={20} />} Confirmar y Agendar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
