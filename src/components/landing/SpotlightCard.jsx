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
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-gray-800 bg-[#0a0f1a] p-8 transition-all hover:shadow-xl hover:border-rose-500/30 ${className}`}
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
