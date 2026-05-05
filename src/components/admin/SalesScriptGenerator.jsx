import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sparkles, Loader2, Copy, Check, Send } from 'lucide-react';

const SalesScriptGenerator = ({ lead }) => {
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Actúa como un experto en ventas B2B de software. 
      Redacta un correo en frío muy corto (máximo 150 palabras), persuasivo y sin jerga técnica para el lead:
      - Nombre del contacto: ${lead.nombre || 'Propietario'}
      - Empresa: ${lead.compania || 'su negocio'}
      - Ubicación: ${lead.ubicacion || 'su ciudad'}
      - Notas/Contexto: ${lead.notas || 'Sin notas adicionales'}

      El objetivo es ofrecerles una AUDITORÍA GRATUITA de procesos y mostrar cómo Angulo Softwares puede automatizar su gestión para dejar de perder dinero por desorden. 
      Tono profesional, cercano y directo al grano. Incluye un asunto llamativo.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setScript(response.text());
    } catch (error) {
      console.error("DETALLE DEL ERROR GEMINI:", error);
      setScript(`Error al generar el guion. Detalle: ${error.message || 'Verifica la consola del navegador'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-blue-500/20 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500 rounded-lg text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Asistente de Ventas IA</h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Powered by Gemini</p>
          </div>
        </div>
        {!script && !isLoading && (
          <button 
            onClick={generateScript}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Generar Correo Pro
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-3 text-blue-500" size={32} />
          <p className="text-sm font-medium animate-pulse">Gemini está redactando tu propuesta...</p>
        </div>
      ) : script ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-64 bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm leading-relaxed outline-none focus:border-blue-500/50 transition-all resize-none"
          />
          <div className="flex gap-3">
            <button 
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 rounded-xl transition-all"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {copied ? 'Copiado' : 'Copiar al Portapapeles'}
            </button>
            <button 
              onClick={() => setScript('')}
              className="px-4 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-400 rounded-xl transition-all"
              title="Borrar"
            >
              <Loader2 size={16} className="rotate-45" />
            </button>
            <button 
              onClick={generateScript}
              className="px-4 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
              title="Regenerar"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic text-center py-4">
          Haz clic en generar para crear un mensaje personalizado basado en los datos de este lead.
        </p>
      )}
    </div>
  );
};

export default SalesScriptGenerator;
