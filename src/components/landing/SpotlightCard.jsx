import { useMotionValue, useTransform, motion } from 'framer-motion'

const SpotlightCard = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group relative overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0f1a] transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-500/20 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, rgba(244, 63, 94, 0.12), transparent 80%)`,
          ),
        }}
      />
      {children}
    </motion.div>
  )
}

export default SpotlightCard
