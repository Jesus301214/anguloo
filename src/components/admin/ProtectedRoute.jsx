import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, Lock, ShieldAlert, KeyRound, CheckCircle2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // 1. Verificar sesión inicial
    const initAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession) {
        setSession(initialSession);
        await verifyAdmin(initialSession.user.email);
      }
      setIsLoading(false);
    };

    initAuth();

    // 2. Escuchar cambios (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession) {
        await verifyAdmin(currentSession.user.email);
      } else {
        setIsAdmin(false);
        setShowPinInput(false);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const verifyAdmin = async (email) => {
    try {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (adminData) {
        setIsAdmin(true);
        setShowPinInput(false);
      } else {
        setIsAdmin(false);
        setShowPinInput(true);
      }
    } catch (error) {
      setIsAdmin(false);
      setShowPinInput(true);
    }
  };

  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setPinError('');
    setIsRegistering(true);

    const secretPin = import.meta.env.VITE_ADMIN_PIN;

    if (pin === secretPin) {
      try {
        const { error } = await supabase
          .from('admin_users')
          .insert([{ 
            user_id: session.user.id,
            email: session.user.email 
          }]);

        if (error) throw error;
        
        setIsAdmin(true);
        setShowPinInput(false);
      } catch (error) {
        setPinError('Error al registrar administrador: ' + error.message);
      }
    } else {
      setPinError('Código de autorización incorrecto. Acceso denegado.');
    }
    setIsRegistering(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Verificando Credenciales...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login-admin" />;
  }

  if (showPinInput) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-6 border border-amber-500/20">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-black text-white font-outfit">Usuario No Autorizado</h2>
            <p className="text-slate-400 mt-2 text-sm">Tu cuenta ({session.user.email}) no tiene permisos de administrador.</p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Código de Invitación</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  required
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white font-black tracking-[1em] text-center outline-none focus:border-blue-500/50 transition-all"
                  placeholder="******"
                  maxLength={6}
                />
              </div>
            </div>

            {pinError && (
              <p className="text-rose-500 text-xs font-bold text-center bg-rose-500/10 py-3 rounded-xl border border-rose-500/20">
                {pinError}
              </p>
            )}

            <button
              disabled={isRegistering}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isRegistering ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
              Validar Acceso
            </button>
          </form>

          <p className="text-center text-slate-500 text-[10px] mt-8 uppercase font-bold tracking-widest">
            Contacta al soporte para obtener un código
          </p>
        </div>
      </div>
    );
  }

  return isAdmin ? children : null;
};

export default ProtectedRoute;
