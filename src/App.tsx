import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import PictureOfTheDay from './pages/PictureOfTheDay'
import SearchResults from './pages/SearchResults'
import Navbar from './components/Navbar'
import { Toaster } from 'sonner'


function App() {
  return (
    <>
    <Toaster position="top-center" richColors />
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/picture" element={<PictureOfTheDay />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
