import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin', { replace: true });
      } else {
        setChecking(false);
      }
    });

    // Listen for auth changes (handles OAuth redirect callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/admin', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login-admin'
        }
      });
      if (error) throw error;
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Cuenta creada. Revisa tu correo para confirmar.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      const msg = error.message === 'Invalid login credentials'
        ? 'Credenciales incorrectas. Verifica tu email y contraseña.'
        : error.message;
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking existing session
  if (checking) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-lg shadow-blue-600/20">A</div>
          <h1 className="text-3xl font-black text-white font-outfit tracking-tight">Acceso Administrativo</h1>
          <p className="text-slate-400 mt-2 font-medium">Panel de Gestión ANGULO</p>
        </div>

        <div className="space-y-6">
          {message && (
            <div className={`rounded-2xl p-4 text-sm font-bold text-center ${message.type === 'error' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
              {message.text}
            </div>
          )}

          <button onClick={handleGoogleLogin} disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-6 rounded-2xl transition-all shadow-xl disabled:opacity-50">
            {isLoading ? <Loader2 className="animate-spin" /> : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                Continuar con Google
              </>
            )}
          </button>

          <div className="relative flex items-center gap-4 py-2">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">O con correo</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña" minLength={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-12 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" disabled={isLoading || !email || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50">
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(null); }}
              className="text-blue-400 font-bold hover:underline">
              {mode === 'login' ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>

          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 text-slate-500 justify-center">
              <ShieldCheck size={18} />
              <p className="text-xs font-bold uppercase tracking-widest">Conexión Segura vía Supabase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
