import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, ArrowRight, X, Phone, Mail, Globe, MessageCircle, BarChart, Zap, Layers, Smartphone, LayoutGrid, Check, CheckCircle, Shield, ChevronDown, Rocket, Activity, Users, CreditCard, Settings, AlertCircle, UserX, TrendingDown, Target, Handshake, BookOpen, Star, LineChart, Eye, Heart } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-rose-500/50 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(244, 63, 94, 0.15), transparent 80%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

const NavItem = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-all py-2 group">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-300 group-hover:text-rose-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full -left-4 mt-2 w-72 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl z-[100]"
          >
            <div className="grid gap-2">
              {items.map((item, idx) => (
                <a key={idx} href={item.href} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group/item">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-rose-500 group-hover/item:bg-rose-500/10 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover/item:text-rose-500 transition-colors">{item.title}</div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

  const whatsappLink = "https://wa.me/584249313359";

  const menuData = {
    ecosistema: [
      { title: "Diagnóstico", desc: "Identifica los síntomas de una gestión manual.", icon: <AlertCircle size={18} />, href: "#problemas" },
      { title: "Agenda Pro", desc: "Gestión inteligente de citas y personal.", icon: <LayoutGrid size={18} />, href: "#soluciones" },
      { title: "CRM & Leads", desc: "Control total de tus clientes y prospectos.", icon: <Users size={18} />, href: "#soluciones" },
      { title: "BI Analytics", desc: "Dashboards en tiempo real de tu rentabilidad.", icon: <BarChart size={18} />, href: "#soluciones" },
    ],
    soluciones: [
      { title: "Para Spas & Centros", desc: "Optimización operativa para el sector belleza.", icon: <Zap size={18} />, href: "#soluciones" },
      { title: "Para Consultorios", desc: "Orden y claridad para servicios profesionales.", icon: <Activity size={18} />, href: "#soluciones" },
      { title: "Multi-Sede", desc: "Escala tu negocio a múltiples ubicaciones.", icon: <Layers size={18} />, href: "#soluciones" },
    ],
    compania: [
      { title: "Nuestra Misión", desc: "Por qué hacemos lo que hacemos.", icon: <Rocket size={18} />, href: "#nosotros" },
      { title: "Metodología", desc: "El sistema de claridad radical.", icon: <Settings size={18} />, href: "#metodologia" },
    ]
  };

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

  const modules = [
    { icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", title: "Reservas", sub: "AGENDA" },
    { icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z", title: "Clientes", sub: "CRM" },
    { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", title: "Inventario", sub: "CONTROL" },
    { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z", title: "Cajas", sub: "FINANZAS" },
    { icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", title: "BI Dashboards", sub: "ANALÍTICA" },
    { icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.61 8.41m5.98 5.96a14.96 14.96 0 01-5.98 5.96m0-11.92a14.96 14.96 0 015.98-5.96M9.61 8.41L3.45 2.25m6.16 6.16l1.23 6.16", title: "Marketing Autom.", sub: "CRECIMIENTO" },
    { icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253", title: "Multisucursal", sub: "CONTROL" },
    { icon: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z", title: "Portal B2C", sub: "AUTOGESTIÓN" }
  ];

  const integrations = [
    { name: "Stripe", color: "#635BFF" },
    { name: "WhatsApp", color: "#25D366" },
    { name: "Google", color: "#4285F4" },
    { name: "Zapier", color: "#FF4F00" },
    { name: "Mercado Pago", color: "#009EE3" },
    { name: "Meta", color: "#0668E1" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* 1. Navbar Flotante */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-300 ${isMenuOpen ? 'bg-slate-950 h-screen md:h-auto' : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-rose-500/20" />
            <div className="text-2xl font-black tracking-tighter text-white font-outfit">
              ANGULO
            </div>
          </div>
          
          <div className="hidden items-center gap-10 md:flex">
            <a href="#problemas" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Problemas</a>
            <NavItem label="Ecosistema" items={menuData.ecosistema} />
            <NavItem label="Soluciones" items={menuData.soluciones} />
            <NavItem label="Compañía" items={menuData.compania} />
            
            <div className="h-6 w-px bg-slate-800 mx-2" />
            
            <a href="/login-admin" className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors">
              Admin
            </a>

            <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95">
              Agenda una Demo
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <div className="space-y-1"><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div></div>}
          </button>
        </div>

        {/* Menú Móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-t border-slate-900 px-6 py-8 space-y-8 overflow-y-auto max-h-[80vh]"
            >
              <div className="space-y-4">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Ecosistema</p>
                {menuData.ecosistema.map((m, idx) => (
                  <a key={idx} href={m.href} onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white">{m.title}</a>
                ))}
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Soluciones</p>
                {menuData.soluciones.map((m, idx) => (
                  <a key={idx} href={m.href} onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white">{m.title}</a>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-900 space-y-6">
                <a href="/login-admin" className="block text-lg font-bold text-slate-400">Panel Admin</a>
                <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-full bg-rose-500 py-4 rounded-2xl font-black text-white shadow-xl shadow-rose-500/20">
                  Agenda una Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-24">
        <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2"
        >
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-rose-400 backdrop-blur-sm"
            >
              <span className="mr-2 flex h-2 w-2 rounded-full bg-rose-500"></span>
              SaaS de Alto Rendimiento
            </motion.div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl font-outfit leading-[1.1]">
              Eleva tu gestión al <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500">Siguiente Nivel.</span>
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">
              Software premium para empresas que buscan orden, claridad y escalabilidad en un ecosistema neón de alto impacto.
            </p>
            <div className="flex flex-col w-full sm:w-auto gap-4 sm:flex-row">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto">
                Agenda tu Consultoría <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-800/50 to-slate-900/50 p-2 sm:p-4 backdrop-blur-md border border-slate-700/50 shadow-2xl"
            >
              <img src={heroImage} alt="Dashboard" className="w-full h-auto object-cover opacity-90 rounded-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tarea 2: Nuevo componente Diagnóstico / Problemas */}
      <section id="problemas" className="py-32 bg-slate-950 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-rose-500" />
                <span className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase">— EL DIAGNÓSTICO</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white font-outfit mb-6 leading-[1.1]">
                ¿Qué hace que tu empresa tenga que <span className="text-rose-500">vivir en urgencias y todo para ayer?</span>
              </h2>
              <p className="text-slate-400 text-xl">Los síntomas de una gestión manual que frenan tu crecimiento.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300 hover:text-white hover:border-rose-500/50 transition-all font-bold">
              Solicitar auditoría gratuita 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                icon: <AlertCircle className="w-8 h-8" />, 
                title: "Crecer duele cuando no hay procesos", 
                desc: "Cada nueva venta trae más presión y más errores. Sientes que mientras más creces, más caos hay. El problema no es el crecimiento — es que tu operación no está diseñada para sostenerlo." 
              },
              { 
                icon: <UserX className="w-8 h-8" />, 
                title: "El dueño atrapado en la operación", 
                desc: "Vives apagando incendios, persiguiendo datos por WhatsApp y resolviendo urgencias. Tu empresa depende de ti para todo, y cada vez que te desconectas, algo falla." 
              },
              { 
                icon: <TrendingDown className="w-6 h-6" />, 
                title: "Pérdida invisible de recursos", 
                desc: "Inventario sin registrar, insumos o materiales que \"desaparecen\", horas hombre que no se cobran. Cada proyecto termina y no sabes si ganaste o perdiste." 
              }
            ].map((card, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SpotlightCard className="h-full bg-gray-900/40">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-rose-500 mb-8 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee de Integraciones */}
      <div className="bg-slate-900/30 py-12 border-y border-slate-800/50 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
          {[...integrations, ...integrations, ...integrations].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100">
               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-white shadow-inner">
                  {item.name[0]}
               </div>
               <span className="text-xl font-bold tracking-tight text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparativa: El Antes y el Después */}
      <section id="comparativa" className="py-24 bg-slate-950 px-6 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white font-outfit mb-4">¿Tu empresa se siente así?</h2>
            <p className="text-slate-400 text-lg">La falta de sistemas no solo quita tiempo, quita vida. Identifica tu estado actual.</p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", title: "Fuga de Clientes", desc: "No sabes quién dejó de ir ni por qué." },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Pérdida de Tiempo", desc: "Agendas manuales y reportes lentos." },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Cero Claridad", desc: "No conoces tu rentabilidad real." }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 hover:border-rose-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white font-outfit mb-4">Diagnóstico de Realidad</h2>
            <p className="text-slate-400 text-lg">¿Sigues operando en el pasado o estás listo para el futuro?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Problema */}
            <div className="p-12 bg-slate-900/50 border-r border-slate-800">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                     <Shield size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Gestión Tradicional</h3>
               </div>
               <ul className="space-y-6">
                  {[
                    "Agendas en papel o Excel desactualizados.",
                    "Fuga de dinero por falta de control en cajas.",
                    "Personal desmotivado por falta de transparencia.",
                    "Clientes que olvidan sus citas (No-Show).",
                    "Cero datos para decisiones estratégicas."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-400 font-medium group">
                       <span className="text-rose-500 mt-1 shrink-0 group-hover:scale-125 transition-transform text-xl">✕</span>
                       <span className="group-hover:text-slate-200 transition-colors">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Solución */}
            <div className="p-12 bg-rose-500/5 relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle size={24} />
                     </div>
                     <h3 className="text-2xl font-black text-white">Ecosistema ANGULO</h3>
                  </div>
                  <ul className="space-y-6">
                     {[
                       "Agenda inteligente sincronizada en la nube.",
                       "Control de finanzas y cajas blindadas.",
                       "Cálculo automático de comisiones y KPIs.",
                       "Recordatorios automáticos vía WhatsApp.",
                       "Dashboards de BI con visión 360°."
                     ].map((text, i) => (
                       <li key={i} className="flex items-start gap-4 text-slate-300 font-bold group">
                          <span className="text-emerald-500 mt-1 shrink-0 group-hover:scale-125 transition-transform text-xl">✓</span>
                          <span className="group-hover:text-white transition-colors">{text}</span>
                       </li>
                     ))}
                  </ul>
                  <div className="mt-12">
                     <button onClick={() => setIsModalOpen(true)} className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                        Hacer el Cambio Ahora
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones (Ecosistema Silicon Valley) - Marquee Horizontal */}
      <section id="soluciones" className="py-24 bg-slate-900/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 mb-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white font-outfit mb-6">Ecosistema de <span className="text-rose-500">Alto Rendimiento.</span></h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">Módulos integrados con tecnología de punta para escalar tu empresa sin límites.</p>
          </div>
        </div>

        <div className="relative flex overflow-hidden">
          {/* Degradados laterales para suavizar el borde */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-6 py-4">
            {[...modules, ...modules].map((m, i) => (
              <div key={i} className="w-[350px] shrink-0">
                <SpotlightCard className="h-full">
                  <div className="mb-6 text-rose-500 w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center ring-1 ring-rose-500/20 group-hover:ring-rose-500/50 transition-all">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.icon} />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 mb-2">{m.sub}</p>
                  <h3 className="text-xl font-bold text-white mb-3 whitespace-normal">{m.title}</h3>
                  <div className="h-1 w-8 bg-slate-800 group-hover:w-16 group-hover:bg-rose-500 transition-all duration-500" />
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Metodología */}
      <section id="metodologia" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white font-outfit mb-8">Nuestra Metodología: <br/><span className="text-rose-500 italic">Claridad Radical</span></h2>
              <div className="relative space-y-12">
                {/* Línea conectora */}
                <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-rose-500 via-blue-500 to-emerald-500 opacity-20 hidden sm:block" />
                
                {[
                  { id: 1, title: "Inmersión Operativa", color: "rose", desc: "No instalamos un software y nos vamos. Entendemos cómo vendes, cómo cobras y cómo gastas." },
                  { id: 2, title: "Simplicidad Crítica", color: "blue", desc: "Eliminamos pasos innecesarios. Automatizamos lo repetitivo para que tu equipo se enfoque en el cliente." },
                  { id: 3, title: "Escalabilidad Sin Caos", color: "emerald", desc: "Preparamos tus sistemas para que cuando crezcas, el soporte sea sólido y no una carga." }
                ].map((step) => (
                  <div key={step.id} className="flex gap-6 group">
                    <div className={`h-12 w-12 rounded-full bg-${step.color}-500/10 border border-${step.color}-500/30 flex items-center justify-center text-${step.color}-500 font-black shrink-0 group-hover:scale-110 transition-transform`}>
                      {step.id}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-rose-500/10 blur-3xl rounded-full animate-pulse"></div>
              <img src={teamImage} alt="Team" className="relative rounded-[3rem] border border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Cultura: Lo que nos mueve */}
      <section id="cultura" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6">
              NUESTRA CULTURA
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Lo que nos <span className="text-rose-500">mueve</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto">
              Guiamos a las empresas de servicios para que dejen de improvisar y empiecen a construir negocios rentables y escalables.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-rose-500" />
                <span className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase">— NUESTRA VISIÓN</span>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                Diseñar software que no solo organice datos, sino que devuelva el tiempo y la tranquilidad a los dueños de negocios, permitiéndoles crecer con orden, claridad e impacto positivo.
              </p>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Claridad Operacional",
                  phrase: "Saber qué hacer y cuándo hacerlo.",
                  bad: "Operas a ciegas apagando incendios.",
                  good: "ANGULO te da un mapa claro cada mañana."
                },
                {
                  icon: <TrendingDown className="w-6 h-6" />,
                  title: "Rentabilidad Real",
                  phrase: "Ganar más eliminando fugas invisibles.",
                  bad: "El desorden te cuesta dinero todos los días.",
                  good: "Cada proceso controlado es ganancia recuperada."
                },
                {
                  icon: <Handshake className="w-6 h-6" />,
                  title: "Sin Juicio",
                  phrase: "El error es parte del camino.",
                  bad: "Sabemos que tu operación actual tiene fallas.",
                  good: "No te juzgamos, construimos el sistema para resolverlas."
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Transformación",
                  phrase: "Del caos al control total.",
                  bad: "Antes: improvisación constante y estrés.",
                  good: "Después: una empresa que opera sola mientras creces."
                }
              ].map((card, idx) => (
                <SpotlightCard key={idx} className="bg-gray-900/40 p-10 border-slate-800/50">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-rose-500 mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-sm font-medium text-rose-500 mb-4">{card.phrase}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-500">
                      <span className="text-rose-500 mt-0.5 shrink-0">✕</span>
                      <span>{card.bad}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-300 font-bold">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>{card.good}</span>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Valores: 8 Fundamentos */}
      <section id="valores" className="py-24 bg-slate-900/10 px-6 border-t border-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Nuestros <span className="text-rose-500">8 Valores</span> Fundamentales
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto">
              Lo que guía cada decisión, cada línea de código y cada conversación con nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target />, title: "Foco en el objetivo", phrase: "¿Para qué hacemos esto?", desc: "Todo parte por entender qué se quiere lograr. El objetivo ordena la conversación." },
              { icon: <BookOpen />, title: "Claridad para decidir", phrase: "Menos complejidad, mejores decisiones", desc: "La gestión debe entregar claridad, no enredos. Ordenamos lo relevante." },
              { icon: <Star />, title: "Excelencia real", phrase: "Soluciones de tu operación, no genéricas", desc: "Software construido desde la trinchera de tu propia operación." },
              { icon: <LineChart />, title: "Aprendizaje continuo", phrase: "El error es maestro, no enemigo", desc: "Se observa, se entiende y se transforma. Evolucionamos con cada dato." },
              { icon: <Eye />, title: "Transparencia", phrase: "Sin letra chica, sin sorpresas", desc: "Somos claros con los alcances y los tiempos. La confianza es nuestro activo." },
              { icon: <Heart />, title: "Impacto positivo", phrase: "Crecer debe mejorar tu vida", desc: "El crecimiento real significa menos estrés, más orden y más vida propia." },
              { icon: <Users />, title: "Responsabilidad", phrase: "Hacemos lo que dijimos que íbamos a hacer", desc: "Sin excusas. Decimos la verdad, asumimos el compromiso y avanzamos." },
              { icon: <Zap />, title: "Proactividad", phrase: "No esperamos a que explote para actuar", desc: "Anticipamos necesidades y entregamos soluciones antes de que sean urgencias." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-rose-500/30 transition-all group"
              >
                <div className="mb-6 text-rose-500 w-10 h-10 flex items-center justify-center">
                  {React.cloneElement(v.icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm font-medium text-rose-500 mb-3">{v.phrase}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-rose-500/10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-5xl bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8">
             <div className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full animate-pulse uppercase tracking-widest shadow-lg shadow-rose-500/50">Cupos Limitados</div>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white font-outfit mb-8 leading-[1.1]">Transforma tu operación <span className="text-rose-500">Hoy Mismo.</span></h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">No dejes para mañana la eficiencia que puedes tener hoy. Agenda tu demo y entra al futuro.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={() => setIsModalOpen(true)} className="bg-rose-500 hover:bg-rose-600 text-white font-black px-12 py-5 rounded-2xl text-lg shadow-2xl shadow-rose-500/30 transition-all transform hover:-translate-y-1 active:scale-95">
              Solicitar Demo Gratuita
            </button>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-black px-12 py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-3 active:scale-95">
              <MessageCircle size={24} className="text-rose-500" />
              Hablar con un Experto
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-20 text-center border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
             <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-8 w-8 grayscale opacity-50" />
                <span className="text-xl font-black text-slate-500 tracking-tighter">ANGULO</span>
             </div>
             <div className="flex gap-8 text-slate-500 font-bold text-sm">
                <Link to="/privacidad" className="hover:text-rose-500 transition-colors">Privacidad</Link>
                <Link to="/terminos" className="hover:text-rose-500 transition-colors">Términos</Link>
                <a href="mailto:hola@angulosoftwares.com" className="hover:text-rose-500 transition-colors">Soporte</a>
             </div>
          </div>
          <p className="text-sm font-medium text-slate-700">© 2026 ANGULO. Diseñado para empresas de alto crecimiento.</p>
        </div>
      </footer>

      {/* Modal Demo */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-[2.5rem] bg-slate-900 border border-slate-800 p-10 shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute right-8 top-8 text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-black text-white mb-2 font-outfit">Comienza el Cambio</h2>
              <p className="text-slate-500 mb-8 text-sm">Déjanos tus datos y un consultor senior se pondrá en contacto contigo.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre</label>
                  <input required name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre completo" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-rose-500/50 transition-all outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ejemplo@empresa.com" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-rose-500/50 transition-all outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp</label>
                  <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="+58..." className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-rose-500/50 transition-all outline-none" />
                </div>
                
                <button disabled={isSubmitting} type="submit" className="w-full bg-rose-600 py-5 rounded-2xl font-black text-white shadow-xl shadow-rose-600/20 hover:bg-rose-500 transition-all transform hover:-translate-y-1 active:scale-95 mt-4">
                  {isSubmitting ? 'Enviando...' : 'Agendar Ahora'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante WhatsApp */}
      <motion.a 
        href={whatsappLink} 
        target="_blank" 
        rel="noreferrer" 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[70] bg-[#25D366] text-white p-5 rounded-full shadow-2xl shadow-emerald-500/20 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-slate-100 pointer-events-none">
          ¿Hablamos por WhatsApp?
        </span>
      </motion.a>
    </div>
  );
};

export default LandingPage;
