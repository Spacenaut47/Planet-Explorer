import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md z-50">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:underline">🌍 Planet Explorer</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className={location.pathname === '/' ? 'underline' : ''}>Home</Link>
        <Link to="/picture" className={location.pathname === '/picture' ? 'underline' : ''}>APOD</Link>
        <Link to="/favorites" className={location.pathname === '/favorites' ? 'underline' : ''}>Favorites</Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar