import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  Wallet,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Menu,
  ChevronRight,
  X,
  MessageCircle,
  Clock,
  ArrowRight,
  Radar,
} from 'lucide-react'

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const activeTab =
    location.pathname.split('/').pop() === 'admin'
      ? 'dashboard'
      : location.pathname.split('/').pop()

  const handleTabChange = (id) => {
    if (id === 'dashboard') navigate('/admin')
    else navigate(`/admin/${id}`)
  }

  // Solicitar permiso para notificaciones de navegador
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission()
      }
    }
  }, [])

  // Suscripción Realtime a nuevos leads y reuniones
  useEffect(() => {
    const channel = supabase
      .channel('admin-notifications')
      .on('postgres_changes', { event: 'INSERT', table: 'leads' }, (payload) => {
        addNotification({
          id: Date.now(),
          title: 'Nuevo Lead Registrado',
          description: `${payload.new.nombre} de ${payload.new.compania || 'empresa desconocida'}`,
          type: 'lead',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        })
        showBrowserNotification('Nuevo Lead', `Se ha registrado ${payload.new.nombre}`)
      })
      .on('postgres_changes', { event: 'INSERT', table: 'meetings' }, (payload) => {
        addNotification({
          id: Date.now(),
          title: 'Nueva Reunión Agendada',
          description: `Se agendó una cita para el ${payload.new.fecha}`,
          type: 'meeting',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        })
        showBrowserNotification('Nueva Reunión', 'Se ha agendado una nueva demo en el sistema.')
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addNotification = (notif) => {
    setNotifications((prev) => [notif, ...prev].slice(0, 10)) // Guardar últimas 10
    setUnreadCount((prev) => prev + 1)
  }

  const showBrowserNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo192.png', // Asegúrate de tener un icono si quieres
      })
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'crm', label: 'CRM / Leads', icon: Users },
    { id: 'radar', label: 'LeadRadar', icon: Radar, badge: 'NUEVO' },
    { id: 'prospector', label: 'Prospector IA', icon: Search, badge: 'IA' },
    { id: 'inventario', label: 'Inventario', icon: Package },
    { id: 'finanzas', label: 'Finanzas', icon: Wallet },
    { id: 'ajustes', label: 'Ajustes', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-slate-400 transition-all duration-300 z-50 border-r border-slate-800 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
              A
            </div>
            {isSidebarOpen && (
              <span className="text-white font-black text-2xl tracking-tighter font-outfit">
                ANGULO
              </span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon
                  size={22}
                  className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                />

                {isSidebarOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-600 text-[8px] text-white px-1.5 py-0.5 rounded-full font-black animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {isActive && isSidebarOpen && (
                  <div className="ml-auto">
                    <ChevronRight size={16} className="opacity-50" />
                  </div>
                )}

                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-8 left-0 w-full px-4">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              navigate('/login-admin')
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-300"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}
      >
        {/* Header Navigation */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={22} />
            </button>

            <div className="relative hidden md:block w-96">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar en el sistema..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border border-transparent focus:bg-white focus:border-blue-500/30 rounded-xl text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  if (!isNotificationsOpen) setUnreadCount(0)
                }}
                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-4 w-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Panel de Notificaciones Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute top-14 right-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-black text-slate-900 text-sm">Notificaciones</h4>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell size={32} className="mx-auto text-slate-200 mb-2" />
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                          Sin notificaciones
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                          >
                            <div className="flex gap-3">
                              <div
                                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${notif.type === 'lead' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}
                              >
                                {notif.type === 'lead' ? (
                                  <Users size={16} />
                                ) : (
                                  <Calendar size={16} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-slate-900 truncate">
                                  {notif.title}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                                  {notif.description}
                                </p>
                                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-bold">
                                  <Clock size={12} />
                                  {notif.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button className="w-full py-3 bg-slate-50 border-t border-slate-200 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-white transition-colors">
                      Ver todo el historial
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-900 leading-none">
                  {user?.email ? user.email.split('@')[0] : 'Admin User'}
                </p>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                  {user?.email || 'Super Administrador'}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-600">
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="p-8 max-w-[1600px] mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
