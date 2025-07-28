import { type FavoriteItem } from '../context/FavoritesContext'
import { type APODResponse, type NASAItem } from '../types/nasa'

const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

export const fetchAPOD = async (): Promise<APODResponse> => {
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch APOD: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    console.log('APOD data received:', data) // Debug log
    return data
  } catch (error) {
    console.error('APOD fetch error:', error)
    throw error
  }
}

export const searchNASAImages = async (query: string): Promise<FavoriteItem[]> => {
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`)
    if (!res.ok) {
      throw new Error(`Search failed: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    const items: NASAItem[] = data.collection?.items || []

    return items
      .filter(item => item.data?.[0]?.media_type === 'image' && item.links?.[0]?.href)
      .map(item => ({
        id: item.data[0].nasa_id || `item-${Date.now()}-${Math.random()}`,
        title: item.data[0].title || 'Untitled',
        url: item.links[0].href,
      }))
      .slice(0, 50) // Limit results
  } catch (error) {
    console.error('NASA Images search error:', error)
    return []
  }
}