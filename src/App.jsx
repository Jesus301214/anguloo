import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import CRM from './components/admin/CRM';
import Calendar from './components/admin/Calendar';

// Assets from public folder
const heroImage = '/Gemini_Generated_Image_cb7f6xcb7f6xcb7f.png';
const logo = '/logo.png';
const teamImage = '/happy-business-team-with-raised-hands-celebrating-their-success-in-the-office_1.jpg';
const sadImage = '/teenager-suffering-from-hangover.webp';
const happyImage = '/low-angle-happy-modern-man.webp';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null
  
  // Admin States
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  useEffect(() => {
    // Basic route handling for /admin
    if (window.location.pathname === '/admin') {
      setIsAdminView(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    compania: '',
    notas: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      // 1. Guardar en Supabase
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            nombre: formData.nombre, 
            email: formData.email, 
            whatsapp: formData.whatsapp, 
            compania: formData.compania, 
            notas: formData.notas,
            status: 'new',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // 2. Enviar a Zapier en segundo plano
      fetch('https://hooks.zapier.com/hooks/catch/27454979/uve695f/', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          whatsapp: formData.whatsapp,
          compania: formData.compania,
          notas: formData.notas
        })
      }).catch(err => console.log('Error enviando a Zapier:', err));

      // 3. Mostrar éxito y limpiar
      setFormStatus('success');
      setFormData({ nombre: '', email: '', whatsapp: '', compania: '', notas: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error enviando datos:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const values = [
    { title: "Foco en el objetivo", sub: "¿Para qué hacemos esto?", desc: "Todo parte por entender qué se quiere lograr. El objetivo ordena la conversación.", icon: "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" },
    { title: "Claridad para decidir", sub: "Menos complejidad, mejores decisiones", desc: "La gestión debe entregar claridad, no complejidad. Ordenamos lo relevante.", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
    { title: "Excelencia real", sub: "Soluciones de tu operación, no genéricas", desc: "No somos genéricos. Soluciones construidas desde la operación real.", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
    { title: "Aprendizaje continuo", sub: "El error es maestro, no enemigo", desc: "El error es parte del crecimiento. Se observa, entiende y transforma.", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
    { title: "Transparencia", sub: "Sin letra chica, sin sorpresas", desc: "La confianza es un activo. Somos claros con alcances y tiempos.", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { title: "Impacto positivo", sub: "Crecer debe mejorar tu vida, no complicarla", desc: "El crecimiento debe mejorar la vida: menos estrés, más orden.", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
    { title: "Responsabilidad", sub: "Hacemos lo que dijimos que íbamos a hacer", desc: "No nos detenemos en excusas. Decimos la verdad y avanzamos.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
    { title: "Proactividad", sub: "No esperamos que explote para actuar", desc: "Hacemos que las cosas ocurran. Anticipamos necesidades y soluciones.", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" }
  ];

  const modules = [
    { icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", title: "Reservas", sub: "AGENDA" },
    { icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z", title: "Clientes", sub: "CRM" },
    { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", title: "Inventario", sub: "CONTROL" },
    { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z", title: "Cajas", sub: "FINANZAS" },
    { icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75", title: "Ajustes", sub: "SISTEMA" },
    { icon: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z", title: "Facturas", sub: "PAGOS" },
    { icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Comisiones", sub: "STAFF" },
    { icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", title: "Personal", sub: "RRHH" }
  ];

  // --- ADMIN RENDER ---
  if (isAdminView) {
    return (
      <AdminLayout activeTab={activeAdminTab} setActiveTab={setActiveAdminTab}>
        {activeAdminTab === 'dashboard' && <Dashboard />}
        {activeAdminTab === 'agenda' && <Calendar />}
        {activeAdminTab === 'crm' && <CRM />}
        
        {['inventario', 'finanzas', 'ajustes'].includes(activeAdminTab) && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-5xl">
              🏗️
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tight">Sección en Construcción</h2>
            <p className="text-slate-500 mt-2 max-w-sm font-medium">Estamos trabajando para habilitar el módulo de <span className="text-blue-600 font-bold">{activeAdminTab}</span> muy pronto.</p>
            <button 
              onClick={() => setActiveAdminTab('dashboard')}
              className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
            >
              Volver al Dashboard
            </button>
          </div>
        )}
      </AdminLayout>
    );
  }

  // --- LANDING RENDER ---
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* 1. Navbar Flotante */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-300 ${isMenuOpen ? 'bg-slate-950 h-screen md:h-auto' : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-rose-500/20" />
            <div className="text-2xl font-black tracking-tighter text-white font-outfit">
              ANGULO
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#metodologia" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Metodología</a>
            <a href="#soluciones" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Soluciones</a>
            <a href="#nosotros" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Nosotros</a>
            
            {/* Admin Toggle Button */}
            <button 
              onClick={() => setIsAdminView(true)}
              className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all flex items-center gap-2 border border-slate-800"
              title="Acceso Admin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span className="text-xs font-bold">Admin</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95"
            >
              Agenda una Demo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="flex flex-col items-center justify-center gap-8 pt-12 md:hidden">
            <a href="#problemas" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white">Problemas</a>
            <a href="#soluciones" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white">Soluciones</a>
            <a href="#metodologia" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white">Metodología</a>
            <a href="#cultura" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white">Qué nos mueve</a>
            <button 
              onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}
              className="mt-4 rounded-xl bg-rose-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-rose-500/20"
            >
              Agendar Demo
            </button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          
          {/* Columna Izquierda: Texto */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-8 inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-rose-400 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-rose-500"></span>
              Resultados tangibles en 1 a 3 meses
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl font-outfit leading-[1.1]">
              Deja de perder tiempo y dinero <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500">en tu operación.</span>
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">
              No es solo software. Es un sistema integral para que tu empresa de servicios venda más, opere mejor y crezca sin caos.
            </p>
            <div className="flex flex-col w-full sm:w-auto gap-4 sm:flex-row">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto"
              >
                Comenzar Ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <a 
                href="#metodologia"
                className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 w-full sm:w-auto"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Columna Derecha: Elemento Visual Abstracto */}
          <div className="relative w-full animate-float transition-all duration-1000 ease-in-out hover:scale-[1.02]">
            {/* Resplandor detrás del componente */}
            <div className="absolute inset-0 -z-10 scale-110 transform rounded-full bg-rose-500/20 blur-3xl" />
            
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-800/50 to-slate-900/50 p-2 sm:p-4 backdrop-blur-md border border-slate-700/50 shadow-2xl transition-all duration-700">
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-950 shadow-inner group">
                <img 
                  src={heroImage} 
                  alt="ANGULO Software Dashboard" 
                  className="w-full h-auto object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 mix-blend-lighten group-hover:scale-105"
                />
                
                {/* Overlay sutil para integrarlo al fondo oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50"></div>
                
                {/* Elementos decorativos de luz sobre la imagen */}
                <div className="absolute -right-8 top-1/4 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl mix-blend-screen pointer-events-none"></div>
                <div className="absolute -left-8 bottom-1/4 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl mix-blend-screen pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Sección 'Problemas / Diagnóstico' */}
      <section id="problemas" className="bg-slate-950 py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 sm:mb-16 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              ¿Vives apagando incendios operativos?
            </h2>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 10.5h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Inasistencias que cuestan</h3>
              <p className="text-slate-400 leading-relaxed">
                Clientes que olvidan su cita y dejan tu agenda vacía, drenando tus ingresos diarios.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Cálculo manual</h3>
              <p className="text-slate-400 leading-relaxed">
                Horas perdidas sumando comisiones en Excel que terminan en errores y falta de transparencia.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Fuga de inventario</h3>
              <p className="text-slate-400 leading-relaxed">
                Productos e insumos que desaparecen sin registro, destruyendo tu margen de beneficio.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Baja retención</h3>
              <p className="text-slate-400 leading-relaxed">
                Clientes que no vuelven porque nadie les dio seguimiento. Dinero que se va a la competencia.
              </p>
            </div>

            {/* Card 5 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Marketing a ciegas</h3>
              <p className="text-slate-400 leading-relaxed">
                Invertir en publicidad sin saber qué canal trae clientes reales y cuáles son solo una pérdida.
              </p>
            </div>

            {/* Card 6 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:shadow-2xl hover:border-slate-600">
              <div className="mb-6 inline-flex p-3 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100">Información dispersa</h3>
              <p className="text-slate-400 leading-relaxed">
                Datos en WhatsApp, cuadernos y Excel. Nadie tiene la foto completa de cómo va el negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección 'Soluciones' */}
      <section id="soluciones" className="bg-slate-950 py-16 sm:py-32 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-rose-500 uppercase mb-4">
              LA SOLUCIÓN
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              De la reserva a la rentabilidad
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-400">
              Cada cita reservada alimenta el motor de tu negocio. Descubre cómo operamos para garantizar que se cumpla tu margen de ganancia.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-16 text-sm sm:text-base">
            <div className="rounded-full bg-rose-600 px-6 py-2 font-semibold text-white shadow-lg shadow-rose-500/20">Reservas</div>
            <span className="text-slate-600">→</span>
            <div className="rounded-full border border-slate-800 bg-slate-900 px-6 py-2 text-slate-300">Asignación</div>
            <span className="text-slate-600">→</span>
            <div className="rounded-full border border-slate-800 bg-slate-900 px-6 py-2 text-slate-300">Operación</div>
            <span className="text-slate-600">→</span>
            <div className="rounded-full border border-slate-800 bg-slate-900 px-6 py-2 text-slate-300">Punto de Venta</div>
            <span className="text-slate-600">→</span>
            <div className="rounded-full border border-slate-800 bg-slate-900 px-6 py-2 text-slate-300">Finanzas</div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card 1: Cotiza con visibilidad */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">Gestión de agenda inteligente</h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Cada cita se registra centralizando la disponibilidad en tiempo real. Elimina los espacios vacíos y maximiza la ocupación de tus instalaciones. Al estar digitalizado, evitas errores típicos como cruzar citas o perder datos.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  Citas Activas
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="font-bold text-slate-200">RES-0894</div>
                      <div className="text-xs text-slate-500">Ana Pérez · Corte de cabello</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-500">Confirmada</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="font-bold text-slate-200">RES-0895</div>
                      <div className="text-xs text-slate-500">María Gómez · Limpieza facial</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-500">En espera</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">RES-0896</div>
                      <div className="text-xs text-slate-500">Luis Torres · Láser Diodo</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-blue-500">Agendada</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Card 2: OT automática */}
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
                <div className="absolute right-6 top-6 rounded-md bg-blue-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-blue-400 uppercase">
                  Asignación
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Control de equipo y recursos</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Asigna automáticamente especialistas, cabinas y equipos. El sistema bloquea horarios para evitar cuellos de botella operativos y cruces indeseados.
                </p>
              </div>

              {/* Card 3: Ejecución margen real */}
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
                <div className="absolute right-6 top-6 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                  Trazabilidad
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Ejecución con historial clínico</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A medida que se presta el servicio, se registra el historial del cliente y se descuentan los insumos consumidos. Tienes el inventario siempre al día.
                </p>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-col gap-6">
              {/* Card 4: Facturacion */}
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl h-full">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Cierres de caja y comisiones automáticas</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Procesa pagos al instante y deja que el sistema calcule los porcentajes de comisión de cada especialista. Transparencia financiera inmediata sin usar Excel.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Card 5: Cobranza */}
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl h-full">
                <div className="absolute right-6 top-6 rounded-md bg-amber-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-amber-400 uppercase">
                  Rentabilidad
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Dashboard administrativo</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Gráficas y métricas precisas al final del día. Conoce tus ingresos totales, el especialista que más vendió, y la ganancia real tras el pago de comisiones automáticas.
                </p>
              </div>
            </div>

            {/* EXTENSIONS ROW: New SaaS Features */}
            {/* Card 6: Auto-Reserva */}
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
              <div className="absolute right-6 top-6 rounded-md bg-purple-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-purple-400 uppercase">
                Auto-Reserva
              </div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Agendamiento online 24/7</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tu negocio no duerme. Ofrece un enlace web personalizado para que tus clientes agenden desde Instagram o WhatsApp. El sistema cruza tu disponibilidad en tiempo real.
              </p>
            </div>

            {/* Card 7: CRM */}
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
              <div className="absolute right-6 top-6 rounded-md bg-rose-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
                Fidelización
              </div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">CRM y Retención inteligente</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Clasifica a tus clientes según su frecuencia de visita. Configura acciones automáticas para reactivar a los que llevan meses sin visitarte y premiar a los más leales.
              </p>
            </div>

            {/* Card 8: Escalabilidad */}
            <div className="lg:col-span-2 relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
              <div className="absolute right-6 top-6 rounded-md bg-slate-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                Escalabilidad
              </div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Multi-Sucursal y Roles de Seguridad</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                Controla múltiples locales comerciales desde una sola cuenta administrativa. Define permisos de acceso granulares: asegura que la recepcionista solo vea la agenda, el especialista solo gestione sus citas, y tú, como dueño o administrador, mantengas el control y la visibilidad financiera total.
              </p>
            </div>

            {/* Bottom Row: Comunicacion */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-xl transition-all hover:bg-slate-900/50">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.43 3 11.996c0 2.29.98 4.364 2.56 5.864.21.203.35.485.39.778.04.283-.02.574-.18.817-.26.392-.56.745-.88 1.058a14.545 14.545 0 002.83-.812c.32-.132.68-.13.99.006A8.99 8.99 0 0012 20.25z" /></svg>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                <strong className="text-white block sm:inline mb-1 sm:mb-0">Notificaciones y recordatorios — </strong> 
                Envía confirmaciones de citas, alertas automáticas por email, notifica avances y reduce drásticamente el ausentismo (no-shows). Todo trazable y profesional.
              </p>
            </div>
          </div>

          {/* Toma de Decisión (Integrado en Soluciones) */}
          <div className="mt-32 pt-24 border-t border-slate-800 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 -z-10"></div>
            
            <div className="text-center mb-16 relative z-10">
              <p className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">
                EL MOMENTO DE DECIDIR
              </p>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                ¿Qué camino vas a tomar?
              </h2>
              <p className="text-lg text-slate-400">
                Cada día sin sistema es un día perdido
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Sin Sistema */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 sm:p-10 transition-all hover:bg-slate-900/50">
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-8">Sin Sistema</p>
                <div className="flex items-center gap-5 mb-8">
                  <img src={sadImage} alt="Consecuencias del caos" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover grayscale opacity-70 border border-slate-800" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Las consecuencias<br/>se acumulan</h3>
                    <p className="text-sm sm:text-base text-slate-400">El caos operativo frena tu empresa</p>
                  </div>
                </div>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Estrés constante apagando incendios</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Vivir en modo urgencia sin planificar</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Sin dormir pensando en lo que falta</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="leading-relaxed">Rentabilidad que se escapa sin saber dónde</span>
                  </li>
                </ul>
              </div>

              {/* Con ANGULO */}
              <div className="rounded-3xl border border-blue-500/40 bg-slate-900 p-8 sm:p-10 shadow-2xl shadow-blue-500/10 transition-all hover:border-blue-500/70 relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-8">Con ANGULO</p>
                  <div className="flex items-center gap-5 mb-8">
                    <img src={happyImage} alt="Operación bajo control" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform duration-500 group-hover:scale-105" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Operación bajo<br/>control total</h3>
                      <p className="text-sm sm:text-base text-slate-300">Claridad y crecimiento sostenible</p>
                    </div>
                  </div>
                  <ul className="space-y-5 mb-10">
                    <li className="flex items-start gap-4 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="leading-relaxed">Crecimiento constante y medible mes a mes</span>
                    </li>
                    <li className="flex items-start gap-4 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="leading-relaxed">Mayor tranquilidad para ti y tu equipo</span>
                    </li>
                    <li className="flex items-start gap-4 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="leading-relaxed">Crecimiento ordenado sin depender de nadie</span>
                    </li>
                    <li className="flex items-start gap-4 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="leading-relaxed">Decisiones basadas en datos reales</span>
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:-translate-y-1"
                >
                  Tomar este camino →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección 'Metodología / La Solución' */}
      <section id="metodologia" className="bg-slate-900 py-16 sm:py-32 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Columna Izquierda: Texto y Pasos */}
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-rose-500 uppercase mb-4">
                ¿Cómo trabajamos?
              </p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Implementación estructurada, sin sorpresas.
              </h2>
              <p className="mb-10 sm:mb-12 text-base sm:text-lg text-slate-400">
                Nuestra metodología exclusiva optimiza tu operación en plazos definidos.
              </p>

              <div className="space-y-8 relative">
                {/* Línea conectora */}
                <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-800 -z-10 hidden sm:block"></div>
                
                {/* Paso 1 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400">Evaluación Inicial</h3>
                    <p className="text-slate-400 text-sm sm:text-base">Analizamos tus necesidades y objetivos para detectar fugas.</p>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 font-bold transition-colors group-hover:border-slate-500 group-hover:text-slate-200">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Planeación Estratégica</h3>
                    <p className="text-slate-400 text-sm sm:text-base">Desarrollamos un plan de acción personalizado.</p>
                  </div>
                </div>

                {/* Paso 3 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 font-bold transition-colors group-hover:border-slate-500 group-hover:text-slate-200">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Implementación y Seguimiento</h3>
                    <p className="text-slate-400 text-sm sm:text-base">Integramos soluciones y monitoreamos el progreso.</p>
                  </div>
                </div>

                {/* Paso 4 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-110">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-emerald-400">Optimización Continua</h3>
                    <p className="text-slate-400 text-sm sm:text-base">Ajustamos estrategias para garantizar el máximo rendimiento.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Imagen y Card de Exclusividad */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img 
                src={teamImage} 
                alt="Equipo ANGULO" 
                className="w-full h-full object-cover min-h-[500px] transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Degradado para oscurecer la parte inferior de la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Card de Exclusividad */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-2xl bg-slate-900/40 p-5 backdrop-blur-lg border border-white/10 shadow-2xl max-w-sm">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-slate-200 uppercase bg-slate-800/80 rounded-md">
                  Exclusividad
                </span>
                <h3 className="text-xl font-bold text-white mb-2 shadow-sm">Compromiso de Calidad</h3>
                <p className="text-sm text-slate-200 leading-relaxed drop-shadow-md">
                  Atendemos un máximo de <strong className="text-white font-bold">5 nuevos clientes al mes</strong> para garantizar dedicación total a tu proyecto.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Sección 'Qué nos mueve' (Cultura y Valores) */}
      <section id="cultura" className="bg-slate-950 py-24 sm:py-32 border-t border-slate-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 sm:mb-20">
            <p className="inline-block rounded-full bg-blue-900/30 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-500 uppercase mb-6 border border-blue-800/50">
              NUESTRA CULTURA
            </p>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-6xl font-outfit">
              Lo que nos <span className="text-blue-500">mueve</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400">
              Guiamos a las empresas de servicios para que dejen de improvisar y empiecen a <strong className="text-white">construir negocios rentables.</strong>
            </p>
          </div>

          {/* VISIÓN */}
          <div className="mb-12">
            <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
               <span className="w-8 h-px bg-slate-700"></span> NUESTRA VISIÓN
            </h3>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-4xl">
              Guiar a las empresas de servicios para que sepan qué hacer, cuándo hacerlo y en qué enfocarse, permitiéndoles construir negocios rentables. Reconociendo el error como parte del camino, acompañamos para crear empresas con orden, claridad e impacto positivo.
            </p>
          </div>

          {/* 4 Cards Visión */}
          <div className="grid md:grid-cols-2 gap-6 mb-32">
            {/* Card 1 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/30 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>
                </div>
                <h4 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Claridad Operacional</h4>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-snug">Saber qué hacer, cuándo hacerlo y en qué enfocarte.</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="text-sm">Hoy operas a ciegas, apagando incendios.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm"><strong>ANGULO</strong> te da un camino claro cada mañana.</span>
                </li>
              </ul>
            </div>
            
            {/* Card 2 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/30 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                </div>
                <h4 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Rentabilidad Real</h4>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-snug">Ganar más dinero eliminando fugas que hoy no ves.</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="text-sm">No es solo ordenarse por ordenarse.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm">Cada peso controlado es dinero que deja de perderse.</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/30 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                </div>
                <h4 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Sin juicio, con acompañamiento</h4>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-snug">El error es parte del camino. Nosotros lo guiamos.</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="text-sm">Sabemos que tu operación tiene problemas.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm">No te juzgamos. Te acompañamos para resolverlos.</span>
                </li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/30 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="text-sm font-bold tracking-widest text-blue-500 uppercase">La transformación</h4>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-snug">Del caos al control. Orden, claridad e impacto real.</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="text-sm">Antes: improvisación constante, estrés y pérdidas.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm">Después: una empresa que opera sola mientras creces.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* MISIÓN 2030 */}
          <div className="mb-20 sm:mb-32 rounded-3xl bg-slate-900 p-8 sm:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-48 w-48 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div className="relative z-10 text-center sm:text-left">
              <h3 className="text-xs sm:text-sm font-bold tracking-widest text-blue-500 uppercase mb-4 flex items-center justify-center sm:justify-start gap-4">
                <span className="w-8 h-px bg-blue-500"></span> MISIÓN 2030
              </h3>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-6xl font-outfit">
                Tu operación completa, <br className="hidden sm:block"/><span className="text-blue-500">desde tu celular.</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 mb-10 sm:mb-12 max-w-2xl">
                Tres preguntas que todo dueño de empresa se hace cada mañana. ANGULO las responde en segundos.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Pregunta 1 */}
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-6 shadow-xl">
                  <h4 className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-4 flex items-center justify-between">Capacidad Comercial <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></h4>
                  <h3 className="text-2xl font-bold text-white mb-6">¿Puedo agendar?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm">Revisas WhatsApp, llamas a especialistas o trabajadores y rezas.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-medium">Abres el celular y sabes al instante la disponibilidad.</span>
                    </li>
                  </ul>
                </div>
                {/* Pregunta 2 */}
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-6 shadow-xl">
                  <h4 className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-4 flex items-center justify-between">Rentabilidad Real <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></h4>
                  <h3 className="text-2xl font-bold text-white mb-6">¿Gano dinero?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm">Facturas mucho pero no sabes cuánto queda libre.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-medium">Ves la ganancia neta restando comisiones en tiempo real.</span>
                    </li>
                  </ul>
                </div>
                {/* Pregunta 3 */}
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-6 shadow-xl">
                  <h4 className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-4 flex items-center justify-between">Control de Plazos <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></h4>
                  <h3 className="text-2xl font-bold text-white mb-6">¿Cómo vamos?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm">Citas atrasadas y clientes quejándose en la sala de espera.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-medium">Seguimiento en vivo del estado de cada cita, sin estrés.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">LA PROMESA</p>
                  <p className="text-xl text-white">Que crear una empresa sólida sea una realidad <strong className="text-blue-400">medible y escalable.</strong></p>
                  <p className="text-sm text-slate-400 mt-2">Funciona con 3 especialistas o trabajadores, o con más de 50. Además, tendrás total control de tu nómina.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
                  Prueba ANGULO hoy →
                </button>
              </div>
            </div>
          </div>

          {/* 8 Valores */}
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Nuestros <span className="text-blue-500">8 Valores</span> Fundamentales
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Lo que guía cada decisión, cada línea de código y cada conversación con nuestros clientes.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
            {values.map((val, i) => (
              <div key={i} className="rounded-2xl bg-slate-900/40 p-6 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/20 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={val.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-lg">{val.title}</h3>
                <p className="text-xs font-semibold text-blue-400 mb-4 tracking-wide">"{val.sub}"</p>
                <p className="text-sm text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* ECOSISTEMA MODULAR */}
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ecosistema Modular Completo
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Desde la agenda de citas hasta la facturación.
            </p>
            
            <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-2 sm:gap-4 mx-auto max-w-[90vw] md:max-w-fit bg-slate-900 border border-slate-800 rounded-full p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {['Agenda', 'Operaciones', 'Inventario', 'RRHH', 'Configuración', 'Facturación'].map((tab, i) => (
                <div key={i} className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${i === 0 ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrusel Infinito */}
        <div className="relative flex w-full overflow-hidden bg-slate-950 py-10 mt-10">
          {/* Degrades a los lados para difuminar */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>

          <div className="flex shrink-0 animate-marquee whitespace-nowrap">
            {modules.map((mod, i) => (
              <div key={`m1-${i}`} className="mx-4 flex w-64 flex-col items-center justify-center rounded-3xl bg-slate-900/60 border border-slate-800 p-8 shadow-xl backdrop-blur-md transition-all hover:border-blue-500/50 hover:-translate-y-2 hover:bg-slate-900/90 cursor-pointer group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900/20 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{mod.title}</h4>
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{mod.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 animate-marquee whitespace-nowrap" aria-hidden="true">
            {modules.map((mod, i) => (
              <div key={`m2-${i}`} className="mx-4 flex w-64 flex-col items-center justify-center rounded-3xl bg-slate-900/60 border border-slate-800 p-8 shadow-xl backdrop-blur-md transition-all hover:border-blue-500/50 hover:-translate-y-2 hover:bg-slate-900/90 cursor-pointer group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900/20 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{mod.title}</h4>
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{mod.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-slate-950 pb-16 sm:pb-32 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl sm:rounded-[2.5rem] bg-[#5365FF] relative overflow-hidden px-6 py-16 sm:py-24 text-center shadow-[0_0_50px_rgba(83,101,255,0.2)]">
          {/* Hexagon Decorative Background Shapes */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-30 hidden md:block">
            <svg width="250" height="250" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z" /></svg>
          </div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 opacity-30 hidden md:block">
            <svg width="250" height="250" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z" /></svg>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase mb-8 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              CUPOS LIMITADOS
            </div>
            
            <h2 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-6xl">
              Ordena tu operación hoy.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-blue-100 mb-12">
              Aceptamos solo <strong className="text-white">5 nuevos clientes al mes</strong> para garantizar la máxima calidad en la implementación.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-[#5365FF] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
              >
                Solicitar Cupo <span aria-hidden="true" className="ml-2">&rarr;</span>
              </button>
              
              <a 
                href="https://wa.me/+584249313359" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 py-12 text-center border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center justify-center gap-3 grayscale opacity-30">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-xl font-black tracking-tighter text-slate-100">ANGULO</span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            © 2026 ANGULO. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/+584249313359" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Modal Premium - FASE de Interactividad */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl shadow-rose-500/10 animate-zoom-in">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-slate-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <img src={logo} alt="Logo" className="mx-auto mb-4 h-12 w-12 rounded-full object-cover" />
              <h2 className="mb-2 text-xl font-bold text-slate-900">Diagnóstico Estratégico ANGULO</h2>
              <p className="mb-6 text-sm text-slate-600">Sesión de 25 min · Sin costo · Hallazgos concretos para tu operación.</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {formStatus === 'success' && (
                <div className="rounded-lg bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-600 animate-fade-in">
                  ✅ ¡Datos enviados con éxito! Nos contactaremos pronto.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="rounded-lg bg-rose-50 p-4 text-center text-sm font-medium text-rose-600 animate-fade-in">
                  ❌ Hubo un error. Por favor intenta de nuevo.
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Tu Nombre *</label>
                <input 
                  type="text" 
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Maria Garcia"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Correo Electrónico *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">WhatsApp *</label>
                <input 
                  type="tel" 
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+58 412..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Nombre de tu Compañía *</label>
                <input 
                  type="text" 
                  name="compania"
                  required
                  value={formData.compania}
                  onChange={handleInputChange}
                  placeholder="Ej. Mi Empresa S.A."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Información Adicional (Opcional)</label>
                <textarea 
                  name="notas"
                  rows={2}
                  value={formData.notas}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos más sobre tus necesidades..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 w-full rounded-xl py-3 text-base font-bold text-white transition-all active:scale-[0.98] ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 hover:shadow-lg'}`}
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Demostración'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;