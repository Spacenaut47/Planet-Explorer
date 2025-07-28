import { type FavoriteItem } from '../context/FavoritesContext'
import { type APODResponse, type NASAItem } from '../types/nasa'

const API_KEY = import.meta.env.VITE_NASA_API_KEY

export const fetchAPOD = async (): Promise<APODResponse> => {
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch APOD')
  return res.json()
}

export const searchNASAImages = async (query: string): Promise<FavoriteItem[]> => {
  const res = await fetch(`https://images-api.nasa.gov/search?q=${query}`)
  const data = await res.json()
  const items: NASAItem[] = data.collection.items || []

  return items
    .filter(item => item.data[0]?.media_type === 'image')
    .map(item => ({
      id: item.data[0].nasa_id,
      title: item.data[0].title,
      url: item.links?.[0]?.href || '',
    }))
}
