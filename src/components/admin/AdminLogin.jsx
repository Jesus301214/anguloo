import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogIn, Loader2, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Escuchar cambios de autenticación para redirigir si el usuario ya inició sesión
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/admin');
      }
    });

    // También verificar si ya hay una sesión activa al cargar el componente
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
          redirectTo: window.location.origin + '/admin'
        }
      });
      if (error) throw error;
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
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
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full group flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                Continuar con Google
              </>
            )}
          </button>

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
