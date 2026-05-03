import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, ShieldAlert, LogOut } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sesión inicial e hidratar estado
    const initAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession) {
        setSession(initialSession);
        await verifyAdmin(initialSession.user.email);
      } else {
        setIsLoading(false);
      }
    };

    initAuth();

    // 2. Suscribirse a cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession) {
        await verifyAdmin(currentSession.user.email);
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const verifyAdmin = async (email) => {
    try {
      // Consulta estricta a la tabla de lista blanca
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (adminData && !error) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error('Error verificando privilegios:', err);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Pantalla de Carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Verificando Privilegios...</p>
      </div>
    );
  }

  // Si no hay sesión, ir al login
  if (!session) {
    return <Navigate to="/login-admin" />;
  }

  // Si tiene sesión pero NO está en la lista blanca (Allowlist)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl text-center">
          <div className="h-20 w-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-8 border border-rose-500/20">
            <ShieldAlert size={40} />
          </div>
          
          <h2 className="text-2xl font-black text-white font-outfit mb-4">Acceso Denegado</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Tu cuenta <span className="text-slate-200 font-bold">({session.user.email})</span> no tiene privilegios de administrador en el sistema ANGULO.
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>

          <p className="mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Contacta al superadministrador para solicitar acceso
          </p>
        </div>
      </div>
    );
  }

  // Si todo es correcto, mostrar el panel
  return children;
};

export default ProtectedRoute;
