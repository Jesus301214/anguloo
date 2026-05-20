import { useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const testimonials = [
  {
    name: 'María González',
    role: 'Dueña de Spa Serenity',
    metric: '+30% en reservas en 60 días',
    quote: 'Desde que usamos ANGULO, las reservas online llenan nuestra agenda sin que movamos un dedo. Las inasistencias desaparecieron. Es como tener un gerente 24/7.',
    rating: 5,
    image: 'MG',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Director Clínica DentalCare',
    metric: 'Inasistencias reducidas a 0%',
    quote: 'Los recordatorios automáticos por WhatsApp cambiaron todo. Antes perdíamos 15 citas por semana. Ahora cero. El ROI fue inmediato.',
    rating: 5,
    image: 'CM',
  },
  {
    name: 'Ana Lucía Rivas',
    role: 'CEO Estética & Bienestar',
    metric: 'Visibilidad total de inventario',
    quote: 'Saber exactamente cuánto producto se gasta por servicio nos ahorró miles en compras innecesarias. ANGULO nos dio el control que no teníamos.',
    rating: 5,
    image: 'AR',
  },
]

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.testimonials-title', { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="testimonios" className="py-32 bg-[#050a14] px-6">
      <div className="mx-auto max-w-4xl">
        <div className="testimonials-title text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">
            TESTIMONIOS
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-outfit mb-4">
            <span className="text-white">Resultados reales </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">de clientes reales</span>
          </h2>
        </div>

        <div className="relative">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0a0f1a] to-[#0d122a] border border-gray-800 p-10 md:p-14 shadow-xl">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-emerald-400 font-bold text-lg mb-6">
              {testimonials[current].metric}
            </div>
            <blockquote className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[current].image}
              </div>
              <div>
                <div className="font-bold text-white">{testimonials[current].name}</div>
                <div className="text-sm text-gray-500">{testimonials[current].role}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-gray-700 bg-transparent flex items-center justify-center text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-rose-500' : 'w-2 bg-gray-700 hover:bg-gray-600'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-gray-700 bg-transparent flex items-center justify-center text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
