export interface Country {
  name: {
    common: string
    official: string
    nativeName?: Record<string, { official: string; common: string }>
  }
  translations: {
    por?: {
      official: string
      common: string
    }
  }
  cca3: string
  capital?: string[]
  region: string
  subregion?: string
  population: number
  area?: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  currencies?: Record<string, { name: string; symbol: string }>
  languages?: Record<string, string>
  borders?: string[]
  continents: string[]
  timezones: string[]
  maps?: {
    googleMaps: string
    openStreetMaps: string
  }
}

export interface CountryFilters {
  search: string
  continents: string[]
  language: string
}

export const CONTINENTS = [
  { value: 'Africa', label: 'África' },
  { value: 'North America', label: 'América do Norte' },
  { value: 'South America', label: 'América do Sul' },
  { value: 'Asia', label: 'Ásia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceania' },
]
