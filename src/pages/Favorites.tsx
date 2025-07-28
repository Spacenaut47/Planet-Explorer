// Favorites.tsx - Enhanced favorites page
import { motion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'
import Card from '../components/Card'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Your Favorite Cosmic Discoveries ❤️
        </motion.h1>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🌌</div>
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet!</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
              Start exploring the cosmos and add your favorite discoveries to build your personal space collection.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              Start Exploring 🚀
            </motion.a>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <p className="text-gray-300 text-lg">
                You've collected <span className="font-bold text-purple-400">{favorites.length}</span> cosmic treasures
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {favorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card item={item} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default Favorites