import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, ShieldAlert, LogOut } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      // 1. Detectar si estamos volviendo de un redirect (hay hash en la URL)
      const hasHash = window.location.hash.includes('access_token');
      
      // Si hay hash, esperamos un tiempo generoso para que Supabase lo procese
      if (hasHash) {
        console.log("Detectado callback de Google, procesando sesión...");
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (currentSession) {
          console.log("Sesión encontrada:", currentSession.user.email);
          setSession(currentSession);
          await verifyAdmin(currentSession.user.email);
        } else {
          // Si seguimos sin sesión después de esperar, damos un último margen antes de rendirnos
          console.log("No se encontró sesión inicial, esperando al listener...");
          setTimeout(() => {
            if (mounted && !currentSession) {
              setIsLoading(false);
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Error en checkAuth:", error);
        if (mounted) setIsLoading(false);
      }
    };

    checkAuth();

    // 2. Suscribirse a cambios (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      
      console.log("Evento Auth:", event);
      if (currentSession) {
        setSession(currentSession);
        await verifyAdmin(currentSession.user.email);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const verifyAdmin = async (email) => {
    try {
      // Búsqueda insensible a mayúsculas/minúsculas para evitar errores de tipeo
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .ilike('email', email.trim())
        .single();

      setIsAdmin(!!adminData);
    } catch (err) {
      console.error('Error en verifyAdmin:', err);
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
