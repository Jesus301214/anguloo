import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terminos = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-rose-500 selection:text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors font-bold mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-white font-outfit mb-8 leading-tight">
          Términos y <span className="text-rose-500">Condiciones</span>
        </h1>
        
        <div className="space-y-8 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Uso de la Plataforma</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Propiedad Intelectual</h2>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitación de Responsabilidad</h2>
            <p>
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terminos;
