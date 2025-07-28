export interface APODResponse {
  date: string
  explanation: string
  hdurl?: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export interface NASAItem {
  data: {
    nasa_id: string
    title: string
    media_type: string
  }[]
  links: {
    href: string
    rel: string
    render: string
  }[]
}
