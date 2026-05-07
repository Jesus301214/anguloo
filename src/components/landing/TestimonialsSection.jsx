import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const testimonials = [
  {
    name: 'María González',
    role: 'Dueña de Spa Serenity',
    quote:
      'La auditoría de ANGULO nos mostró que perdíamos 40 horas semanales en procesos manuales. En 3 semanas todo estaba automatizado.',
    rating: 5,
    image: 'MG',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Director Clínica DentalCare',
    quote:
      'Desde que implementamos el ecosistema ANGULO, nuestras citas canceladas bajaron 70%. Los recordatorios automáticos por WhatsApp cambiaron todo.',
    rating: 5,
    image: 'CM',
  },
  {
    name: 'Ana Lucía Rivas',
    role: 'CEO Estética & Bienestar',
    quote:
      'Lo que más valoro es la claridad. Ahora sé exactamente cuánto factura cada sucursal y dónde están las fugas. Mi contador me felicitó.',
    rating: 5,
    image: 'AR',
  },
  {
    name: 'Roberto Castillo',
    role: 'Gerente Barbería Club',
    quote:
      'Pensé que era solo un software más. Pero la auditoría gratuita me abrió los ojos. En 2 días ya teníamos el diagnóstico completo.',
    rating: 5,
    image: 'RC',
  },
]

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.testimonials-title', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} className="py-24 bg-white px-6">
      <div className="mx-auto max-w-4xl">
        <div className="testimonials-title text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-6">
            TESTIMONIOS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">
            Lo que dicen <span className="text-rose-500">nuestros clientes</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-xl p-10 md:p-16">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[current].image}
              </div>
              <div>
                <div className="font-bold text-slate-900">{testimonials[current].name}</div>
                <div className="text-sm text-slate-500">{testimonials[current].role}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-rose-500 hover:border-rose-500/30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? 'bg-rose-500 w-8'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-rose-500 hover:border-rose-500/30 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
