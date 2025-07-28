import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchNASAImages } from '../services/nasaApi'
import Card from '../components/Card'
import { type FavoriteItem } from '../context/FavoritesContext'
import SkeletonCard from '../components/SkeletonCard'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(false)

  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (!query) return
    setLoading(true)
    searchNASAImages(query).then(items => {
      setResults(items)
      setLoading(false)
    })
  }, [query])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length : 6}).map((_,i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
