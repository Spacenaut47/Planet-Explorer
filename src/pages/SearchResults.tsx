import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchNASAImages } from '../services/nasaApi'
import { type FavoriteItem } from '../context/FavoritesContext'

const RESULTS_PER_PAGE = 10

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<FavoriteItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE)

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchNASAImages(query)
      setResults(res)
      setCurrentPage(1)
    }
    if (query) fetchData()
  }, [query])

  // 🔑 Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, totalPages])

  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>

      {paginatedResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedResults.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-2 font-semibold text-center">{item.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Pagination UI */}
      {results.length > RESULTS_PER_PAGE && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResults
