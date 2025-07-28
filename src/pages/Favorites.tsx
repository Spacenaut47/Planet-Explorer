import { useFavorites } from '../context/FavoritesContext'
import Card from '../components/Card'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Favorite Picks</h2>
      {favorites.length === 0 ? (
        <p>You haven’t added anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
