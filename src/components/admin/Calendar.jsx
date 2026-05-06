import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { logger } from '../../lib/env'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Building2,
  MessageCircle,
  Loader2,
  ChevronRight,
  Filter,
  X,
  Globe,
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react'

const Calendar = () => {
  const [meetings, setMeetings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMeeting, setSelectedMeeting] = useState(null)

  const fetchMeetings = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select(
          `
          *,
          leads (*)
        `,
        )
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true })

      if (error) throw error
      setMeetings(data || [])
    } catch (error) {
      logger.error('Calendar.fetchMeetings', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' }
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', options)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit">Agenda Estratégica</h1>
          <p className="text-slate-400 mt-1 font-medium">
            Visualiza tus próximas demos y reuniones de cierre.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <CalendarIcon size={24} />
          </div>
        </div>
      </div>

      {/* Grid de Reuniones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-24 text-center">
            <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={40} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              Cargando agenda...
            </p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <CalendarIcon size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-300">No hay reuniones agendadas</h3>
            <p className="text-slate-500 mt-2">Agenda tu primera demo desde la sección CRM.</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
            >
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
                    <h3 className="text-lg font-black text-white leading-tight">
                      {meeting.leads?.nombre}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1 font-bold">
                      <Building2 size={12} />
                      {meeting.leads?.compania || 'Independiente'}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-all">
                      <User size={16} />
                    </button>
                    <a
                      href={`https://wa.me/${meeting.leads?.whatsapp?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-800 text-emerald-500 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedMeeting(meeting)}
                    className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest group-hover:gap-2 transition-all"
                  >
                    Ver Detalles <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Detalles de la Reunión */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedMeeting(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
                <CalendarIcon size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white font-outfit">Detalles de la Demo</h2>
                <p className="text-slate-400">Reunión estratégica programada</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Fecha
                </p>
                <p className="text-white font-bold">{formatDate(selectedMeeting.fecha)}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Hora
                </p>
                <p className="text-white font-bold">{selectedMeeting.hora.substring(0, 5)} HS</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                  Información del Lead
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl text-blue-400 font-black border border-slate-700">
                    {selectedMeeting.leads?.nombre?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">{selectedMeeting.leads?.nombre}</p>
                    <p className="text-slate-500 font-bold">
                      {selectedMeeting.leads?.compania || 'Independiente'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${selectedMeeting.leads?.email}`}
                    className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 text-slate-300"
                  >
                    <Mail size={18} className="text-blue-500" />
                    <span className="text-sm truncate">{selectedMeeting.leads?.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedMeeting.leads?.whatsapp?.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 text-slate-300"
                  >
                    <Phone size={18} className="text-emerald-500" />
                    <span className="text-sm truncate">{selectedMeeting.leads?.whatsapp}</span>
                  </a>
                </div>

                <div className="flex gap-4 mt-4">
                  {selectedMeeting.leads?.website && (
                    <a
                      href={
                        selectedMeeting.leads.website.startsWith('http')
                          ? selectedMeeting.leads.website
                          : `https://${selectedMeeting.leads.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 text-slate-300"
                    >
                      <Globe size={18} className="text-blue-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Web</span>
                    </a>
                  )}
                  {selectedMeeting.leads?.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMeeting.leads.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 text-slate-300"
                    >
                      <ExternalLink size={18} className="text-pink-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
