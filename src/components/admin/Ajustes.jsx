import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import {
  Settings,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
  Shield,
  Building2,
  User,
} from 'lucide-react'

const Ajustes = () => {
  const [admins, setAdmins] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [bizName, setBizName] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setCurrentUser(user)
      const { data: adm } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: true })
      setAdmins(adm || [])
      const { data: s1 } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'biz_name')
        .maybeSingle()
      if (s1) setBizName(s1.value)
      const { data: s2 } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'currency')
        .maybeSingle()
      if (s2) setCurrency(s2.value)
    }
    init()
  }, [])

  const addAdmin = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) return
    setSaving(true)
    await supabase
      .from('admin_users')
      .upsert({ email: newEmail.trim().toLowerCase() }, { onConflict: 'email' })
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: true })
    setAdmins(data || [])
    setNewEmail('')
    setSaving(false)
  }

  const removeAdmin = async (email) => {
    if (email === currentUser?.email) return
    await supabase.from('admin_users').delete().eq('email', email)
    setAdmins(admins.filter((a) => a.email !== email))
  }

  const saveSettings = async () => {
    setSaving(true)
    await supabase
      .from('settings')
      .upsert({ key: 'biz_name', value: bizName }, { onConflict: 'key' })
    await supabase
      .from('settings')
      .upsert({ key: 'currency', value: currency }, { onConflict: 'key' })
    setSaving(false)
    setSavedMsg('Guardado ✓')
    setTimeout(() => setSavedMsg(''), 2000)
  }

  return (
    <div className="space-y-8 bg-[#0F172A] p-8 rounded-3xl border border-slate-800/40 min-h-screen">
      <div>
        <h1 className="text-3xl font-black text-white font-outfit flex items-center gap-3">
          <Settings className="text-slate-400" /> Ajustes
        </h1>
        <p className="text-slate-400 mt-1 font-medium">
          Configuración del sistema y gestión de administradores.
        </p>
      </div>

      {/* Profile */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <User size={14} /> Tu Perfil
        </div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 font-black text-xl border border-blue-500/20">
            {currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-black text-white">{currentUser?.email}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Super Administrador
            </p>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <Building2 size={14} /> Datos del Negocio
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">
              Nombre del Negocio
            </label>
            <input
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50"
              placeholder="ANGULO"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">
              Moneda
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="VES">VES (Bs.)</option>
            </select>
          </div>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg transition-all"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}{' '}
          Guardar
          {savedMsg && <span className="text-emerald-400 ml-2">{savedMsg}</span>}
        </button>
      </div>

      {/* Admin Users Management */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <Shield size={14} className="text-rose-500" /> Gestión de Administradores
        </div>
        <p className="text-slate-400 text-xs mb-6">
          Solo los correos registrados aquí pueden acceder al panel administrativo.
        </p>

        {/* Add Admin */}
        <div className="flex gap-3 mb-6">
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm"
          />
          <button
            onClick={addAdmin}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
          >
            <Plus size={16} /> Agregar
          </button>
        </div>

        {/* Admin List */}
        <div className="divide-y divide-slate-800">
          {admins.map((a) => (
            <div key={a.email} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 font-bold text-sm border border-slate-700">
                  {a.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{a.email}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {a.email === currentUser?.email ? 'Tú • Super Admin' : 'Administrador'}
                  </p>
                </div>
              </div>
              {a.email !== currentUser?.email && (
                <button
                  onClick={() => removeAdmin(a.email)}
                  className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ajustes
