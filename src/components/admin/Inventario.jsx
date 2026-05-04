import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, Search, Plus, Loader2, X, CheckCircle2, AlertTriangle, Trash2, Edit3 } from 'lucide-react';

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', stock: '' });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('inventory').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = { nombre: form.nombre, categoria: form.categoria, precio: parseFloat(form.precio) || 0, stock: parseInt(form.stock) || 0 };
    if (editItem) {
      await supabase.from('inventory').update(payload).eq('id', editItem.id);
    } else {
      await supabase.from('inventory').insert([payload]);
    }
    setSaving(false); setIsModalOpen(false); setEditItem(null);
    setForm({ nombre: '', categoria: '', precio: '', stock: '' });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await supabase.from('inventory').delete().eq('id', id);
    fetchItems();
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ nombre: item.nombre, categoria: item.categoria || '', precio: item.precio?.toString() || '', stock: item.stock?.toString() || '' });
    setIsModalOpen(true);
  };

  const filtered = items.filter(i => (i.nombre||'').toLowerCase().includes(search.toLowerCase()) || (i.categoria||'').toLowerCase().includes(search.toLowerCase()));
  const totalValue = items.reduce((s, i) => s + (i.precio || 0) * (i.stock || 0), 0);
  const lowStock = items.filter(i => (i.stock || 0) <= 5).length;

  return (
    <div className="space-y-8 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit flex items-center gap-3"><Package className="text-amber-500" /> Inventario</h1>
          <p className="text-slate-400 mt-1 font-medium">Control de productos y servicios.</p>
        </div>
        <button onClick={() => { setEditItem(null); setForm({ nombre: '', categoria: '', precio: '', stock: '' }); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 shadow-lg transition-all"><Plus size={18} /> Nuevo Producto</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"><p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Productos</p><p className="text-3xl font-black text-white mt-2">{items.length}</p></div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"><p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Valor del Inventario</p><p className="text-3xl font-black text-emerald-400 mt-2">${totalValue.toLocaleString()}</p></div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"><p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Stock Bajo (≤5)</p><p className="text-3xl font-black text-rose-400 mt-2">{lowStock}</p></div>
      </div>

      {/* Search */}
      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." className="w-full pl-12 pr-4 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-slate-200 outline-none focus:border-amber-500/30 transition-all placeholder:text-slate-500/50 font-medium" /></div>

      {/* Table */}
      <div className="bg-slate-800/20 rounded-2xl border border-slate-800/50 overflow-hidden">
        {isLoading ? <div className="flex items-center justify-center py-24"><Loader2 className="animate-spin text-slate-500" size={40} /></div> : (
          <table className="w-full text-left">
            <thead><tr className="bg-slate-800/40 border-b border-slate-700/50">
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Producto</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Categoría</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Precio</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Stock</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Acciones</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5"><p className="text-sm font-black text-white">{item.nombre}</p></td>
                  <td className="px-6 py-5"><span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-lg font-bold">{item.categoria || '—'}</span></td>
                  <td className="px-6 py-5 text-sm font-bold text-emerald-400">${item.precio?.toLocaleString() || '0'}</td>
                  <td className="px-6 py-5"><span className={`text-sm font-black ${(item.stock||0) <= 5 ? 'text-rose-400' : 'text-white'}`}>{item.stock || 0} {(item.stock||0) <= 5 && <AlertTriangle size={12} className="inline ml-1" />}</span></td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && !filtered.length && <div className="py-16 text-center text-slate-500 text-sm font-bold">No hay productos registrados.</div>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-xl font-black text-white mb-6 font-outfit">{editItem ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Nombre</label><input required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-amber-500/50" /></div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Categoría</label><input value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-amber-500/50" placeholder="Ej: Servicios, Productos" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Precio ($)</label><input type="number" step="0.01" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-amber-500/50" /></div>
                <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Stock</label><input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-amber-500/50" /></div>
              </div>
              <button disabled={saving} type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
                {saving ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />} {editItem ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
