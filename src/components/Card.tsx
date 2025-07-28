import { motion } from 'framer-motion'
  import type { FavoriteItem } from '../types/context'
  import { useFavorites } from '../context/FavoritesContext'
  import { toast } from 'sonner'


  function Card({ item }: { item: FavoriteItem }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    const fav = isFavorite(item.id)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative border rounded p-4 shadow-md dark:bg-gray-800"
      >
        {/* Image */}
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-40 object-cover rounded"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold mt-2">{item.title}</h2>

        {/* ❤️ Favorite Toggle */}
        <button
          onClick={() => {
            if(fav) {
              removeFavorite(item.id)
              toast.warning('Removed from favorites ❌')
            }else {
              addFavorite(item)
              toast.success('Added to favourites ❤️', {
                description: item.title,
                duration: 2000,
              })
            }
          }}
          title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
          className="absolute top-2 right-2 text-2xl hover:scale-125 transition-transform z-10"
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </motion.div>
    )
  }

  export default Card