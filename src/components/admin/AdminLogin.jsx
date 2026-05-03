import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogIn, Loader2, ShieldCheck, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const navigate = useNavigate();

  // Escuchar cambios de autenticación
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        navigate('/admin');
      }
    });

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/admin');
    };
    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login-admin'
        }
      });
      if (error) throw error;
    } catch (error) {
      alert('Error: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/login-admin'
        }
      });
      if (error) throw error;
      setMagicLinkSent(true);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-lg shadow-blue-600/20">
            A
          </div>
          <h1 className="text-3xl font-black text-white font-outfit tracking-tight">Acceso Administrativo</h1>
          <p className="text-slate-400 mt-2 font-medium">Panel de Gestión ANGULO</p>
        </div>

        <div className="space-y-6">
          {magicLinkSent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-2">
              <Mail className="mx-auto text-emerald-500 mb-4" size={40} />
              <h3 className="text-white font-bold text-lg">¡Enlace Enviado!</h3>
              <p className="text-slate-400 text-sm mt-2">Revisa tu correo <span className="text-emerald-400">{email}</span> para entrar al panel.</p>
              <button onClick={() => setMagicLinkSent(false)} className="mt-6 text-emerald-500 text-xs font-bold uppercase tracking-widest hover:underline">Usar otro método</button>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full group flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                    Continuar con Google
                  </>
                )}
              </button>

              <div className="relative flex items-center gap-4 py-4">
                <div className="h-px bg-slate-800 flex-1"></div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">O entrar con email</span>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              <form onSubmit={handleMagicLink} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Mail size={18} />}
                  Enviar Enlace Mágico
                </button>
              </form>
            </>
          )}

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
