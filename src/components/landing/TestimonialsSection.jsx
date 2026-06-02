import { useRef, useState } from 'react'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { useGSAP, gsap } from '../../lib/gsap'

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Owner, Studio 9 Barbershop',
    quote: 'Antes tenía todo en cuadernos y hojas sueltas. Ahora mi negocio es otro. Más organizado, más clientes y más ganancias.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=carlos',
  },
  {
    name: 'Ana Lucía Rivas',
    role: 'CEO, Bella Spa & Beauty',
    quote: 'Las inasistencias eran mi mayor dolor de cabeza. Desde que activamos los recordatorios por WhatsApp automáticos, se redujeron a cero.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=ana',
  },
  {
    name: 'Roberto Gómez',
    role: 'Gerente, Luxe Salon',
    quote: 'El control de inventario es mágico. Sé exactamente qué productos me faltan y cuáles son los más rentables. Recuperé el control de mis números.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=roberto',
  }
]

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.testi-header', { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
      gsap.from('.testi-card', { y: 40, autoAlpha: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
    },
    { scope: sectionRef }
  )

  const handlePrev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
  const handleNext = () => setCurrent(prev => (prev + 1) % testimonials.length)

  return (
    <section ref={sectionRef} id="testimonios" className="py-24 bg-[#050a14] px-6 border-b border-gray-800/30">
      <div className="mx-auto max-w-5xl flex flex-col items-center">
        
        <div className="testi-header mb-12">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
            LO QUE DICEN NUESTROS CLIENTES
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-6 md:gap-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 shrink-0 rounded-full bg-[#0a0f1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="testi-card flex-1 bg-[#0a0f1a] border border-gray-800/60 rounded-[2.5rem] p-10 md:p-14 text-center shadow-xl">
            <div className="flex justify-center gap-1.5 mb-8">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl font-medium text-gray-300 mb-10 leading-relaxed italic">
              "{testimonials[current].quote}"
            </p>
            
            <div className="flex flex-col items-center gap-3">
              <img 
                src={testimonials[current].image} 
                alt={testimonials[current].name} 
                className="w-14 h-14 rounded-full border-2 border-gray-700 object-cover"
              />
              <div>
                <div className="font-bold text-white text-base">{testimonials[current].name}</div>
                <div className="text-sm font-medium text-gray-500">{testimonials[current].role}</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 shrink-0 rounded-full bg-[#0a0f1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
