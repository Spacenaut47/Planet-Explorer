import { useEffect, useState } from 'react'
import { fetchAPOD } from '../services/nasaApi'
import { type FavoriteItem, useFavorites } from '../context/FavoritesContext'
import SkeletonCard from '../components/SkeletonCard'

function PictureOfTheDay() {
  const [data, setData] = useState<FavoriteItem | null>(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    fetchAPOD().then(apod => {
      setData({
        id: apod.date,
        title: apod.title,
        url: apod.url,
      })
    })
  }, [])

  if (!data) return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {Array.from({ length: 6 }).map((_, i) => (
    <SkeletonCard key={i} />
  ))}
</div>


  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-2">{data.title}</h2>
      <img src={data.url} alt={data.title} className="mx-auto rounded max-w-full max-h-[500px]" />
      <div className="mt-4">
        <button
          onClick={() =>
            isFavorite(data.id)
              ? removeFavorite(data.id)
              : addFavorite(data)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isFavorite(data.id) ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  )
}

export default PictureOfTheDay
