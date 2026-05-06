import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Loader2, ShieldAlert, LogOut } from 'lucide-react'

const ProtectedRoute = ({ children }) => {
  const [state, setState] = useState('loading')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    let handled = false

    const checkAdmin = async (email) => {
      if (handled) return
      handled = true
      setUserEmail(email)
      const { data } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle()
      setState(data ? 'authorized' : 'denied')
    }

    // Primary: listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setState('unauthenticated')
        return
      }
      checkAdmin(session.user.email)
    })

    // Fallback: if onAuthStateChange doesn't fire within 2s, check manually
    const timeout = setTimeout(async () => {
      if (handled) return
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        setState('unauthenticated')
        return
      }
      checkAdmin(session.user.email)
    }, 2000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">
          Verificando acceso...
        </p>
      </div>
    )
  }

  if (state === 'unauthenticated') return <Navigate to="/login-admin" replace />

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-3xl p-10 shadow-2xl text-center">
          <div className="h-16 w-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
            <ShieldAlert className="text-rose-500" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Acceso Denegado</h1>
          <p className="text-slate-400 text-sm mb-2">
            Tu cuenta (<span className="text-rose-400 font-bold">{userEmail}</span>) no tiene
            privilegios.
          </p>
          <p className="text-slate-600 text-xs mb-8">Contacta al superadministrador.</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              setState('unauthenticated')
            }}
            className="flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors font-bold text-sm"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
