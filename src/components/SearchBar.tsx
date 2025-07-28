import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center my-8"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative max-w-md w-full"
        whileHover={{ scale: 1.02 }}
      >
        <div className={`relative flex items-center bg-white/10 backdrop-blur-md border-2 rounded-2xl transition-all duration-300 ${
          focused ? 'border-purple-500 shadow-lg shadow-purple-500/25' : 'border-white/20'
        }`}>
          <div className="absolute left-4 text-gray-400">
            🔍
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search planets, missions, galaxies..."
            className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
          >
            Search
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  )
}

export default SearchBar