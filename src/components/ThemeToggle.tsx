import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="text-xl p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle
