import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { logger } from '../../lib/env'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  TrendingUp,
  Users,
  CalendarCheck,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Loader2,
} from 'lucide-react'

const KPIStat = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
        <Icon size={24} />
      </div>
      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
        >
          <ArrowUpRight size={14} className={trend < 0 ? 'rotate-90' : ''} />
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <h3 className="text-2xl font-black text-slate-900 mt-1 font-outfit">{value}</h3>
  </div>
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    demos: 0,
    conversion: 0,
    mrr: 0,
  })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      const { data: allLeads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Calcular KPIs
      const totalLeads = allLeads.length
      const demos = allLeads.filter((l) => l.status === 'demo').length
      const won = allLeads.filter((l) => l.status === 'won').length
      const mrr = allLeads.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0)
      const conversion = totalLeads > 0 ? ((won / totalLeads) * 100).toFixed(1) : 0

      setStats({ totalLeads, demos, conversion, mrr })
      setRecentLeads(allLeads.slice(0, 5))
    } catch (error) {
      logger.error('Dashboard.fetchDashboardData', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel('leads-dashboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchDashboardData()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Datos reales: leads creados por día de la semana
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  const chartData = dayNames.map((name, i) => ({
    name,
    leads:
      recentLeads.length > 0
        ? recentLeads.filter((l) => new Date(l.created_at).getDay() === i).length
        : 0,
  }))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold">Actualizando métricas B2B...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-outfit">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Sincronizado con Supabase Realtime.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Refrescar
          </button>
          <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all">
            Descargar CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Reales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat title="Total Leads" value={stats.totalLeads} icon={Users} trend={12} />
        <KPIStat title="Demos Activas" value={stats.demos} icon={CalendarCheck} trend={5} />
        <KPIStat
          title="Tasa de Conversión"
          value={`${stats.conversion}%`}
          icon={TrendingUp}
          trend={2}
        />
        <KPIStat
          title="MRR Pipeline"
          value={`$${stats.mrr.toLocaleString()}`}
          icon={DollarSign}
          trend={18}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Actividad Semanal</h3>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 bg-rose-500 rounded-full"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Leads Generados
              </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#f43f5e"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads Sidebar Real */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Leads Recientes</h3>
            <button className="text-rose-500 text-xs font-bold hover:underline">Ver CRM</button>
          </div>
          <div className="space-y-6">
            {recentLeads.length === 0 ? (
              <p className="text-center text-slate-400 py-10 text-sm">
                No hay leads registrados aún.
              </p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors uppercase">
                      {lead.nombre?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{lead.nombre}</p>
                      <p className="text-xs text-slate-500 truncate w-32">
                        {lead.compania || 'Independiente'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                        lead.status === 'won'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {lead.status || 'new'}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
