import React from 'react';
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
  ChevronRight
} from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'crm', label: 'CRM / Leads', icon: Users },
    { id: 'inventario', label: 'Inventario', icon: Package },
    { id: 'finanzas', label: 'Finanzas', icon: Wallet },
    { id: 'ajustes', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-[#0F172A] text-slate-400 transition-all duration-300 z-50 border-r border-slate-800/50 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
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
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]' 
                    : 'hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon 
                  size={22} 
                  className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                
                {isSidebarOpen && (
                  <span className="font-bold text-sm tracking-wide">
                    {item.label}
                  </span>
                )}

                {isActive && isSidebarOpen && (
                  <div className="ml-auto">
                    <ChevronRight size={16} className="opacity-50" />
                  </div>
                )}

                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-8 left-0 w-full px-4">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-all duration-300">
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar en el sistema..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border border-transparent focus:bg-white focus:border-blue-500/30 rounded-xl text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-900 leading-none">Admin User</p>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Super Administrador</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-600">
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
