import { motion } from 'framer-motion'

const TrustBar = () => {
  const logos = [
    { name: 'Studio 9', subtitle: 'BARBERSHOP' },
    { name: 'LUXE', subtitle: 'SALON' },
    { name: 'Bella', subtitle: 'SPA & BEAUTY' },
    { name: 'Premium', subtitle: 'BARBERIA' },
    { name: 'Glow', subtitle: 'BEAUTY STUDIO' },
    { name: 'Urban', subtitle: 'NAILS & SPA' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  }

  return (
    <div className="py-12 bg-[#030712] border-b border-gray-800/30 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20"
        >
          {logos.map((logo, i) => (
            <motion.div 
              variants={logoVariants}
              key={i} 
              className="flex flex-col items-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer hover:scale-105"
            >
              <span className={`text-2xl font-black text-white ${i % 2 === 0 ? 'font-serif italic' : 'font-sans'}`}>
                {logo.name}
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-500 mt-1 uppercase">
                {logo.subtitle}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default TrustBar
