import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-lg shadow-blue-600/20">A</div>
          <h1 className="text-3xl font-black text-white font-outfit tracking-tight">Acceso Administrativo</h1>
          <p className="text-slate-400 mt-2 font-medium">Panel de Gestión ANGULO</p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
          <p className="text-amber-400 font-bold text-sm">🔧 Sistema de autenticación en configuración.</p>
          <p className="text-slate-500 text-xs mt-2">Se están configurando nuevas credenciales.</p>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 justify-center">
            <ShieldCheck size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Conexión Segura vía Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
