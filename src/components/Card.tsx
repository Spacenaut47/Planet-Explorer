import { motion } from 'framer-motion'
import type { FavoriteItem } from '../types/context'
import { useFavorites } from '../context/FavoritesContext'
import { toast } from 'sonner'

function Card({ item }: { item: FavoriteItem }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(item.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <motion.img
          src={item.url}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Favorite Button */}
        <motion.button
          onClick={() => {
            if (fav) {
              removeFavorite(item.id)
              toast.warning('Removed from favorites ❌')
            } else {
              addFavorite(item)
              toast.success('Added to favourites ❤️', {
                description: item.title,
                duration: 2000,
              })
            }
          }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-xl hover:bg-white/40 dark:hover:bg-white/20 transition-all duration-200 z-10"
        >
          <motion.span
            animate={{ scale: fav ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {fav ? '❤️' : '🤍'}
          </motion.span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <motion.h2
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {item.title}
        </motion.h2>

        {/* Animated underline */}
        <div className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
      </div>
    </motion.div>
  )
}

export default Card
