import { motion } from 'framer-motion'

function SkeletonCard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
    >
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
        
        {/* Content skeleton */}
        <div className="p-6 space-y-3">
          <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-lg w-3/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
            />
          </div>
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-lg w-1/2 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SkeletonCard