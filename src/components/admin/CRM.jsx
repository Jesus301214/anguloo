import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Kanban as KanbanIcon, MessageCircle, DollarSign, User, Loader2, RefreshCw, ChevronRight, Calendar } from 'lucide-react';

const columns = [
  { id: 'new', title: 'Nuevos Leads', color: 'bg-blue-500' },
  { id: 'discovery', title: 'Descubrimiento (SPIN)', color: 'bg-amber-500' },
  { id: 'demo', title: 'Demo Agendada', color: 'bg-rose-500' },
  { id: 'negotiation', title: 'Negociación', color: 'bg-indigo-500' },
  { id: 'won', title: 'Cerrado/Ganado', color: 'bg-emerald-500' },
];

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const processedData = data.map(lead => ({
        ...lead,
        status: lead.status || 'new',
        value: lead.value || 0
      }));
      
      setLeads(processedData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (leadId, newStatus) => {
    let updateData = { status: newStatus };
    
    // Si se mueve a demo, pedir fecha
    if (newStatus === 'demo') {
      const dateInput = prompt("Introduce la fecha y hora de la Demo (Ej: 2026-05-10 10:00):");
      if (!dateInput) return; // Cancelar movimiento
      updateData.demo_date = new Date(dateInput).toISOString();
    }

    try {
      const { error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId);

      if (error) throw error;
      
      setLeads(leads.map(l => l.id === leadId ? { ...l, ...updateData } : l));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al mover el lead. Asegúrate de que el formato de fecha sea correcto.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold">Cargando pipeline de ventas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit">Pipeline de Ventas</h1>
          <p className="text-slate-500 mt-1">Gestiona el flujo de cierre de negocios.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchLeads} className="p-2 text-slate-400 hover:text-rose-500 rounded-xl border border-transparent hover:border-slate-200 transition-all">
            <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all">
            <KanbanIcon size={18} />
            Nuevo Negocio
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className={`h-2 w-2 rounded-full ${column.color}`}></div>
              <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{column.title}</h3>
              <span className="ml-auto bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                {leads.filter(l => l.status === column.id).length}
              </span>
            </div>
            
            <div className="bg-slate-100/50 p-3 rounded-2xl border border-slate-200/60 min-h-[600px] space-y-3">
              {leads.filter(l => l.status === column.id).map((lead) => (
                <div key={lead.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-200 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{lead.nombre}</p>
                      <p className="text-xs text-slate-500">{lead.compania || 'Independiente'}</p>
                    </div>
                    <a href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-500 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors">
                      <MessageCircle size={16} fill="currentColor" fillOpacity={0.1} />
                    </a>
                  </div>

                  {lead.demo_date && (
                    <div className="flex items-center gap-2 mb-3 py-1 px-2 bg-rose-50 rounded-lg text-[10px] text-rose-600 font-bold border border-rose-100">
                      <Calendar size={12} />
                      {new Date(lead.demo_date).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <DollarSign size={14} className="text-slate-400" />
                      <span className="text-xs font-black">{lead.value?.toLocaleString() || '0'}</span>
                    </div>
                    
                    {column.id !== 'won' && (
                      <button 
                        onClick={() => {
                          const nextIdx = columns.findIndex(c => c.id === column.id) + 1;
                          updateLeadStatus(lead.id, columns[nextIdx].id);
                        }}
                        className="flex items-center gap-1 text-[10px] font-black text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-lg transition-all"
                      >
                        AVANZAR <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-xs font-bold hover:border-rose-300 hover:text-rose-400 transition-all">
                + Añadir Manualmente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRM;
