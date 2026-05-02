import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ChevronLeft, ChevronRight, Video, Plus, Loader2 } from 'lucide-react';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchDemos = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .not('demo_date', 'is', null)
        .order('demo_date', { ascending: true });

      if (error) throw error;
      setEvents(data);
    } catch (error) {
      console.error('Error fetching demos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold">Sincronizando agenda con Supabase...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit">Calendario de Demos</h1>
          <p className="text-slate-500 mt-1">Reuniones agendadas para {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 text-sm font-bold text-slate-700 capitalize">
              {currentDate.toLocaleString('es-ES', { month: 'short' })}
            </span>
            <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all">
            <Plus size={18} />
            Agendar Manual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day) => (
          <div key={day} className="bg-slate-50 p-4 text-center border-b border-slate-200">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{day}</span>
          </div>
        ))}
        
        {Array.from({ length: 42 }).map((_, i) => {
          const dayNumber = i - firstDayOfMonth + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
          const isToday = dayNumber === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

          // Filtrar eventos para este día
          const dayEvents = events.filter(event => {
            const eventDate = new Date(event.demo_date);
            return eventDate.getDate() === dayNumber && 
                   eventDate.getMonth() === currentDate.getMonth() &&
                   eventDate.getFullYear() === currentDate.getFullYear();
          });

          return (
            <div key={i} className={`bg-white min-h-[120px] p-2 hover:bg-slate-50/50 transition-colors relative ${!isCurrentMonth ? 'bg-slate-50/30' : ''}`}>
              {isCurrentMonth && (
                <>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-bold ${isToday ? 'bg-rose-500 text-white h-6 w-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
                      {dayNumber}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map(event => (
                      <div key={event.id} className="p-1.5 bg-rose-50 border-l-2 border-rose-500 rounded-r text-[9px] font-bold text-rose-700 hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="flex items-center gap-1">
                          <Video size={8} />
                          {new Date(event.demo_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="truncate mt-0.5">{event.nombre}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
