import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Building2, 
  MessageCircle,
  Loader2,
  ChevronRight,
  Filter
} from 'lucide-react';

const Calendar = () => {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      // Consulta con JOIN a la tabla leads para traer información del cliente
      const { data, error } = await supabase
        .from('meetings')
        .select(`
          *,
          leads (
            nombre,
            email,
            whatsapp,
            compania
          )
        `)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (error) throw error;
      setMeetings(data || []);
    } catch (error) {
      console.error('Error fetching meetings:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Formatear fecha para el display
  const formatDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', options);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-slate-950 p-6 rounded-3xl border border-slate-800/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit">Agenda Estratégica</h1>
          <p className="text-slate-400 mt-1 font-medium">Visualiza tus próximas demos y reuniones de cierre.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm">
            <Filter size={18} />
            Filtrar
          </button>
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <CalendarIcon size={20} />
          </div>
        </div>
      </div>

      {/* Grid de Reuniones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-24 text-center">
            <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={40} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Cargando agenda...</p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <CalendarIcon size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-300">No hay reuniones agendadas</h3>
            <p className="text-slate-500 mt-2">Agenda tu primera demo desde la sección CRM.</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.id} className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5">
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-[10px] font-black uppercase tracking-wider">
                  {formatDate(meeting.fecha)}
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 font-black text-sm">
                  <Clock size={16} className="text-blue-500" />
                  {meeting.hora.substring(0, 5)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold border border-slate-700 shadow-inner">
                    {meeting.leads?.nombre?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">{meeting.leads?.nombre}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1 font-bold">
                      <Building2 size={12} />
                      {meeting.leads?.compania || 'Independiente'}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex gap-2">
                    <a 
                      href={`mailto:${meeting.leads?.email}`}
                      className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <User size={16} />
                    </a>
                    <a 
                      href={`https://wa.me/${meeting.leads?.whatsapp?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-800 text-emerald-500 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest group-hover:gap-2 transition-all">
                    Ver Detalles <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
