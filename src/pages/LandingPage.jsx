import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, ArrowRight, X, Phone, Mail, Globe } from 'lucide-react';

const LandingPage = ({ 
  setIsModalOpen, 
  isModalOpen,
  setIsMenuOpen, 
  isMenuOpen,
  logo,
  heroImage,
  sadImage,
  happyImage,
  teamImage
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
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
      const { error } = await supabase
        .from('leads')
        .insert([{ ...formData, status: 'new', created_at: new Date().toISOString() }]);

      if (error) throw error;

      // Zapier Hook (Optional)
      fetch('https://hooks.zapier.com/hooks/catch/27454979/uve695f/', {
        method: 'POST',
        body: JSON.stringify(formData)
      }).catch(err => console.log('Zapier Error:', err));

      setFormStatus('success');
      setFormData({ nombre: '', email: '', whatsapp: '', compania: '', notas: '' });
      setTimeout(() => { setIsModalOpen(false); setFormStatus(null); }, 3000);
      
    } catch (error) {
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
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#metodologia" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Metodología</a>
            <a href="#soluciones" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Soluciones</a>
            <a href="#nosotros" className="text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors">Nosotros</a>
            
            <a href="/login-admin" className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all flex items-center gap-2 border border-slate-800">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold">Admin</span>
            </a>

            <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95">
              Agenda una Demo
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <div className="space-y-1"><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div></div>}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-24">
        <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]" />
        
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
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
              <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto">
                Comenzar Ahora <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative w-full animate-float">
            <div className="absolute inset-0 -z-10 scale-110 transform rounded-full bg-rose-500/20 blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-800/50 to-slate-900/50 p-2 sm:p-4 backdrop-blur-md border border-slate-700/50 shadow-2xl">
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-950 shadow-inner group">
                <img src={heroImage} alt="Dashboard" className="w-full h-auto object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto de Secciones (Problemas, Soluciones, Metodología, Cultura, CTA) - Simplificado por espacio pero manteniendo la lógica */}
      <section id="soluciones" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-white mb-12">Nuestra Propuesta de Valor</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {modules.slice(0, 3).map((m, i) => (
                    <div key={i} className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                        <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                        <p className="text-slate-400">{m.sub}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 text-center border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-medium text-slate-600">© 2026 ANGULO. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal Demo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-slate-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-black text-white mb-6">Agendar Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" />
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" />
              <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="WhatsApp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" />
              <button disabled={isSubmitting} type="submit" className="w-full bg-rose-600 py-4 rounded-xl font-bold text-white">{isSubmitting ? 'Enviando...' : 'Solicitar Demo'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
