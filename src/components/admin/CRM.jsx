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
  Clock,
  Globe,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Trash2,
  RotateCcw
} from 'lucide-react';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Estados de formularios
  const [newLead, setNewLead] = useState({ 
    nombre: '', 
    email: '', 
    whatsapp: '', 
    compania: '', 
    website: '',
    instagram: '',
    facebook: '',
    status: 'new' 
  });
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
      // Auto-purge: try to delete old trash (silently ignore if deleted_at column missing)
      await supabase.from('leads').delete().eq('status', 'trash').lt('deleted_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
      // Fallback: fetch without auto-purge if deleted_at doesn't exist
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      setLeads(data || []);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrashLead = async (id) => {
    // Try with deleted_at first
    const { error } = await supabase.from('leads').update({ status: 'trash', deleted_at: new Date().toISOString() }).eq('id', id);
    if (error) {
      // Fallback: update only status
      await supabase.from('leads').update({ status: 'trash' }).eq('id', id);
    }
    fetchLeads();
  };

  const handleRestoreLead = async (id) => {
    const { error } = await supabase.from('leads').update({ status: 'new', deleted_at: null }).eq('id', id);
    if (error) {
      await supabase.from('leads').update({ status: 'new' }).eq('id', id);
    }
    fetchLeads();
  };

  const handleDeletePermanent = async (id) => {
    await supabase.from('leads').delete().eq('id', id);
    fetchLeads();
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
      
      // Ya no hay alert() por petición del usuario
      setIsModalOpen(false);
      setNewLead({ 
        nombre: '', 
        email: '', 
        whatsapp: '', 
        compania: '', 
        website: '',
        instagram: '',
        facebook: '',
        status: 'new' 
      });
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
      const { error: meetingError } = await supabase
        .from('meetings')
        .insert([{
          lead_id: selectedLead.id,
          fecha: meetingData.fecha,
          hora: meetingData.hora
        }]);

      if (meetingError) throw meetingError;

      const { error: leadError } = await supabase
        .from('leads')
        .update({ status: 'demo' })
        .eq('id', selectedLead.id);

      if (leadError) throw leadError;

      // Ya no hay alert() por petición del usuario
      setIsScheduleModalOpen(false);
      setMeetingData({ fecha: '', hora: '' });
      fetchLeads();
    } catch (error) {
      alert('Error al agendar: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const isTrash = lead.status === 'trash';
    if (showTrash !== isTrash) return false;
    return (lead.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (lead.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (lead.compania?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  // Lógica de Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen shadow-xl shadow-black/20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white font-outfit">Pipeline Comercial</h1>
        <p className="text-slate-400 mt-1 font-medium">Gestión avanzada de prospectos y agendamiento.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder={showTrash ? "Buscar en papelera..." : "Buscar prospectos..."}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-4 py-4 bg-slate-800/40 border border-slate-700/50 focus:bg-slate-800/60 focus:border-blue-500/30 rounded-2xl text-slate-200 outline-none transition-all placeholder:text-slate-500/50 font-medium"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => { setShowTrash(!showTrash); setCurrentPage(1); }} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-black transition-all ${
              showTrash 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Trash2 size={18} /> 
            {showTrash ? 'Ver Pipeline' : `Papelera (${leads.filter(l => l.status === 'trash').length})`}
          </button>
          {!showTrash && (
            <button onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
              <Plus size={20} /> Nuevo
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-800/20 rounded-2xl border border-slate-800/50 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500"><Loader2 className="animate-spin mb-4" size={40} /><p className="font-bold tracking-widest uppercase text-[10px]">Sincronizando con Supabase...</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-700/50">
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Prospecto</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Compañía / Web</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Pipeline / Estado</th>
                  <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Gestión Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {currentLeads.map((lead) => (
                  <tr key={lead.id} onClick={() => { setSelectedLead(lead); setIsDetailOpen(true); }} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 font-bold border border-slate-700/50 shadow-inner">{lead.nombre?.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="text-sm font-black text-slate-100">{lead.nombre}</p>
                          <p className="text-xs text-slate-500 mt-1">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 text-slate-400">
                          <Building2 size={14} className="text-slate-600" />
                          <span className="text-sm font-bold">{lead.compania || 'Independiente'}</span>
                        </div>
                        {lead.website && (
                          <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-blue-500 hover:text-blue-400 text-xs font-medium">
                            <Globe size={12} />
                            {lead.website.replace(/^https?:\/\//, '')}
                          </a>
                        )}
                      </div>
                    </td>
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
                        {showTrash ? (
                          <React.Fragment>
                            <button onClick={(e) => { e.stopPropagation(); handleRestoreLead(lead.id); }} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20" title="Restaurar"><RotateCcw size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeletePermanent(lead.id); }} className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20" title="Eliminar permanentemente"><Trash2 size={16} /></button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <a href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20" title="WhatsApp"><MessageCircle size={16} /></a>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setIsScheduleModalOpen(true); }} className="p-2 bg-purple-500/10 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20" title="Agendar"><CalendarIcon size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleTrashLead(lead.id); }} className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20" title="Eliminar"><Trash2 size={16} /></button>
                          </React.Fragment>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginador */}
        {!isLoading && totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-900/20 border-t border-slate-800/50 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Mostrando <span className="text-slate-300">{indexOfFirstItem + 1}</span> a <span className="text-slate-300">{Math.min(indexOfLastItem, filteredLeads.length)}</span> de <span className="text-slate-300">{filteredLeads.length}</span> leads
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`h-8 w-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Nuevo Lead */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-white mb-2 font-outfit">Nuevo Lead Estratégico</h2>
            <p className="text-slate-500 text-sm mb-8 font-medium">Completa la mayor cantidad de información para preparar la reunión.</p>
            
            <form onSubmit={handleCreateLead} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <input required type="text" value={newLead.nombre} onChange={(e) => setNewLead({...newLead, nombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="Ej: Juan Pérez" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Compañía / Marca</label>
                  <input type="text" value={newLead.compania} onChange={(e) => setNewLead({...newLead, compania: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="Ej: Servicios Integrales S.A." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                  <input required type="email" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="ejemplo@empresa.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp de Contacto</label>
                  <input required type="tel" value={newLead.whatsapp} onChange={(e) => setNewLead({...newLead, whatsapp: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="+58..." />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Presencia Digital e Inteligencia</h3>
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Globe size={12} className="text-blue-500" /> Sitio Web Oficial
                    </label>
                    <input type="text" value={newLead.website} onChange={(e) => setNewLead({...newLead, website: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="www.ejemplo.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        Instagram (@usuario)
                      </label>
                      <input type="text" value={newLead.instagram} onChange={(e) => setNewLead({...newLead, instagram: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="@usuario" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        Perfil / Fanpage Facebook
                      </label>
                      <input type="text" value={newLead.facebook} onChange={(e) => setNewLead({...newLead, facebook: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 transition-all" placeholder="facebook.com/pagina" />
                    </div>
                  </div>
                </div>
              </div>

              <button disabled={isProcessing} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs">
                {isProcessing ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />} Crear Lead e Iniciar Pipeline
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
                <h2 className="text-xl font-black text-white font-outfit">Agendar Demo</h2>
                <p className="text-xs text-slate-400">Preparando sesión para: <span className="text-purple-400 font-bold">{selectedLead.nombre}</span></p>
              </div>
            </div>
            
            <form onSubmit={handleScheduleMeeting} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Fecha de la Reunión</label>
                <input required type="date" value={meetingData.fecha} onChange={(e) => setMeetingData({...meetingData, fecha: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Hora Sugerida</label>
                <input required type="time" value={meetingData.hora} onChange={(e) => setMeetingData({...meetingData, hora: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <button disabled={isProcessing} type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs">
                {isProcessing ? <Loader2 className="animate-spin" /> : <Clock size={18} />} Confirmar y Sincronizar Agenda
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalle de Lead */}
      {isDetailOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsDetailOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 font-black text-xl border border-blue-500/20">
                {selectedLead.nombre?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-black text-white font-outfit">{selectedLead.nombre}</h2>
                <p className="text-slate-500 text-sm">{selectedLead.compania || 'Independiente'}</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedLead.email && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <Mail size={18} className="text-slate-500 shrink-0" />
                  <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Email</p><a href={`mailto:${selectedLead.email}`} className="text-sm text-blue-400 hover:underline">{selectedLead.email}</a></div>
                </div>
              )}
              {selectedLead.whatsapp && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <Phone size={18} className="text-emerald-500 shrink-0" />
                  <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">WhatsApp</p><a href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sm text-emerald-400 hover:underline">{selectedLead.whatsapp}</a></div>
                </div>
              )}
              {selectedLead.website && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <Globe size={18} className="text-slate-500 shrink-0" />
                  <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sitio Web</p><a href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">{selectedLead.website}</a></div>
                </div>
              )}
              {selectedLead.instagram && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <ExternalLink size={18} className="text-pink-500 shrink-0" />
                  <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Instagram</p><p className="text-sm text-pink-400">{selectedLead.instagram}</p></div>
                </div>
              )}
              {selectedLead.facebook && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <ExternalLink size={18} className="text-blue-500 shrink-0" />
                  <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Facebook</p><p className="text-sm text-blue-400">{selectedLead.facebook}</p></div>
                </div>
              )}
              {selectedLead.notas && (
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Notas</p>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{selectedLead.notas}</p>
                </div>
              )}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Estado</p><p className={`text-sm font-bold ${statusOptions.find(o => o.value === (selectedLead.status || 'new'))?.color}`}>{statusOptions.find(o => o.value === (selectedLead.status || 'new'))?.label}</p></div>
                <div className="text-right"><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Creado</p><p className="text-sm text-slate-400">{new Date(selectedLead.created_at).toLocaleDateString()}</p></div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {selectedLead.whatsapp && (
                <a href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl transition-all text-xs uppercase tracking-widest">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              )}
              <button onClick={() => { setIsDetailOpen(false); setIsScheduleModalOpen(true); }} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-black py-3 rounded-xl transition-all text-xs uppercase tracking-widest">
                <CalendarIcon size={16} /> Agendar Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
