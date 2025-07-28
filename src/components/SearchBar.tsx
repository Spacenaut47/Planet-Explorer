import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search planets, missions, etc..."
        className="p-2 rounded-l border dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
