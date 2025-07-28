import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'

export interface FavoriteItem {
  id: string
  title: string
  url: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (item: FavoriteItem) => {
    if (!favorites.find(fav => fav.id === item.id)) {
      setFavorites([...favorites, item])
    }
  }

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
