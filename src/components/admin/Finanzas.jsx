import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Wallet, Plus, Loader2, X, CheckCircle2, TrendingUp, TrendingDown, DollarSign, Search, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Finanzas = () => {
  const [txns, setTxns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | ingreso | gasto
  const [form, setForm] = useState({ tipo: 'ingreso', monto: '', descripcion: '', categoria: '', fecha: new Date().toISOString().split('T')[0] });
  const [saving, setSaving] = useState(false);

  const fetchTxns = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('transactions').select('*').order('fecha', { ascending: false });
    setTxns(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchTxns(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    await supabase.from('transactions').insert([{ ...form, monto: parseFloat(form.monto) || 0 }]);
    setSaving(false); setIsModalOpen(false);
    setForm({ tipo: 'ingreso', monto: '', descripcion: '', categoria: '', fecha: new Date().toISOString().split('T')[0] });
    fetchTxns();
  };

  const handleDelete = async (id) => {
    await supabase.from('transactions').delete().eq('id', id);
    fetchTxns();
  };

  const ingresos = txns.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + (t.monto || 0), 0);
  const gastos = txns.filter(t => t.tipo === 'gasto').reduce((s, t) => s + (t.monto || 0), 0);
  const balance = ingresos - gastos;

  const filtered = txns.filter(t => {
    const matchSearch = (t.descripcion||'').toLowerCase().includes(search.toLowerCase()) || (t.categoria||'').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.tipo === filter;
    return matchSearch && matchFilter;
  });

  // Monthly chart data (last 6 months)
  const monthData = (() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      const label = d.toLocaleDateString('es', { month: 'short' });
      const mIn = txns.filter(t => t.tipo === 'ingreso' && t.fecha?.startsWith(key)).reduce((s,t) => s + (t.monto||0), 0);
      const mOut = txns.filter(t => t.tipo === 'gasto' && t.fecha?.startsWith(key)).reduce((s,t) => s + (t.monto||0), 0);
      months.push({ label, ingreso: mIn, gasto: mOut });
    }
    return months;
  })();
  const maxVal = Math.max(...monthData.map(m => Math.max(m.ingreso, m.gasto)), 1);

  return (
    <div className="space-y-8 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit flex items-center gap-3"><Wallet className="text-emerald-500" /> Finanzas</h1>
          <p className="text-slate-400 mt-1 font-medium">Control de ingresos y gastos.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 shadow-lg transition-all"><Plus size={18} /> Nueva Transacción</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest"><TrendingUp size={14} className="text-emerald-500" /> Ingresos</div>
          <p className="text-3xl font-black text-emerald-400 mt-2">${ingresos.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest"><TrendingDown size={14} className="text-rose-500" /> Gastos</div>
          <p className="text-3xl font-black text-rose-400 mt-2">${gastos.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest"><DollarSign size={14} className={balance >= 0 ? 'text-emerald-500' : 'text-rose-500'} /> Balance</div>
          <p className={`text-3xl font-black mt-2 ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Tendencia (6 meses)</p>
        <div className="flex items-end gap-3 h-32">
          {monthData.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end justify-center" style={{ height: '100px' }}>
                <div className="w-3 bg-emerald-500/60 rounded-t transition-all" style={{ height: `${(m.ingreso / maxVal) * 100}%`, minHeight: '4px' }} title={`Ingreso: $${m.ingreso}`} />
                <div className="w-3 bg-rose-500/60 rounded-t transition-all" style={{ height: `${(m.gasto / maxVal) * 100}%`, minHeight: '4px' }} title={`Gasto: $${m.gasto}`} />
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-slate-500 font-bold">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-500" /> Ingresos</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-rose-500" /> Gastos</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar transacción..." className="w-full pl-12 pr-4 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-slate-200 outline-none focus:border-emerald-500/30 transition-all placeholder:text-slate-500/50 font-medium" /></div>
        <div className="flex gap-2">
          {['all','ingreso','gasto'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter===f?'bg-blue-600 text-white':'bg-slate-800/40 text-slate-500 hover:text-white border border-slate-700/50'}`}>{f==='all'?'Todos':f==='ingreso'?'Ingresos':'Gastos'}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/20 rounded-2xl border border-slate-800/50 overflow-hidden">
        {isLoading ? <div className="flex items-center justify-center py-24"><Loader2 className="animate-spin text-slate-500" size={40} /></div> : (
          <table className="w-full text-left">
            <thead><tr className="bg-slate-800/40 border-b border-slate-700/50">
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Tipo</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Descripción</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Categoría</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Fecha</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Monto</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">—</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5"><div className={`flex items-center gap-2 ${t.tipo==='ingreso'?'text-emerald-400':'text-rose-400'} text-xs font-black uppercase`}>{t.tipo==='ingreso'?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>}{t.tipo}</div></td>
                  <td className="px-6 py-5 text-sm text-white font-bold">{t.descripcion || '—'}</td>
                  <td className="px-6 py-5"><span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-lg font-bold">{t.categoria || '—'}</span></td>
                  <td className="px-6 py-5 text-sm text-slate-400">{t.fecha}</td>
                  <td className={`px-6 py-5 text-right text-sm font-black ${t.tipo==='ingreso'?'text-emerald-400':'text-rose-400'}`}>{t.tipo==='ingreso'?'+':'-'}${(t.monto||0).toLocaleString()}</td>
                  <td className="px-6 py-5 text-right"><button onClick={() => handleDelete(t.id)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && !filtered.length && <div className="py-16 text-center text-slate-500 text-sm font-bold">Sin transacciones registradas.</div>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-xl font-black text-white mb-6 font-outfit">Nueva Transacción</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex gap-2">
                {['ingreso','gasto'].map(t => (
                  <button key={t} type="button" onClick={() => setForm({...form, tipo: t})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.tipo===t?(t==='ingreso'?'bg-emerald-500 text-white':'bg-rose-500 text-white'):'bg-slate-800 text-slate-500 border border-slate-700'}`}>{t}</button>
                ))}
              </div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Monto ($)</label><input required type="number" step="0.01" value={form.monto} onChange={e => setForm({...form, monto: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 text-2xl font-black" placeholder="0.00" /></div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Descripción</label><input value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50" placeholder="Ej: Pago de nómina" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Categoría</label><input value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50" placeholder="Operativo" /></div>
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Fecha</label><input required type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50" /></div>
              </div>
              <button disabled={saving} type="submit" className={`w-full ${form.tipo==='ingreso'?'bg-emerald-500 hover:bg-emerald-600':'bg-rose-500 hover:bg-rose-600'} text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2`}>
                {saving ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />} Registrar {form.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finanzas;
