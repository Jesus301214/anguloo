import { useRef } from 'react'
import { useGSAP, gsap } from '../../lib/gsap'

const TrustBar = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.trust-logo', {
        y: 20,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      })
    },
    { scope: sectionRef }
  )

  const logos = [
    { name: 'Studio 9', subtitle: 'BARBERSHOP' },
    { name: 'LUXE', subtitle: 'SALON' },
    { name: 'Bella', subtitle: 'SPA & BEAUTY' },
    { name: 'Premium', subtitle: 'BARBERIA' },
    { name: 'Glow', subtitle: 'BEAUTY STUDIO' },
    { name: 'Urban', subtitle: 'NAILS & SPA' },
  ]

  return (
    <div ref={sectionRef} className="py-12 bg-[#030712] border-b border-gray-800/30">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold text-gray-500 mb-8 tracking-wide">
          Más de 2,000 negocios ya confían en Angulo
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
          {logos.map((logo, i) => (
            <div key={i} className="trust-logo flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
              <span className={`text-2xl font-black text-white ${i % 2 === 0 ? 'font-serif italic' : 'font-sans'}`}>
                {logo.name}
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mt-1 uppercase">
                {logo.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBar
