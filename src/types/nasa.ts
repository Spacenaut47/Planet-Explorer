export interface APODResponse {
  date: string
  explanation: string
  hdurl?: string
  media_type: 'image' | 'video'
  service_version: string
  title: string
  url: string
  thumbnail_url?: string // For videos
}

export interface NASAItem {
  data: Array<{
    nasa_id: string
    title: string
    media_type: string
    description?: string
    date_created?: string
  }>
  links?: Array<{
    href: string
    rel: string
    render?: string
  }>
}