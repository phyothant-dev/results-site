import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

function AnimatedNumber({ value }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  useEffect(() => {
    animate(count, value, { duration: 1.5 })
  }, [value])
  return <motion.span>{rounded}</motion.span>
}

export default function LiveCounter({ label, count, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="text-3xl sm:text-4xl mb-2">{icon}</div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-1">
        <AnimatedNumber value={count} />
      </div>
      <p className="text-xs sm:text-sm text-gray-400 font-medium">{label}</p>
    </motion.div>
  )
}
