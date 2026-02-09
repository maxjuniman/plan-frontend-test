import axios from 'axios'

import { Country } from '@/@types/country'

const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
})

const FIELDS = [
  'name',
  'translations',
  'cca3',
  'capital',
  'region',
  'subregion',
  'population',
  'area',
  'flags',
].join(',')

export const countryService = {
  async getAll(): Promise<Country[]> {
    const { data } = await countriesApi.get<Country[]>(`/all?fields=${FIELDS}`)
    return data
  },

  async getByCode(code: string): Promise<Country> {
    const { data } = await countriesApi.get<Country[]>(`/alpha/${code}`)
    return data[0]
  },

  async getByCodes(codes: string[]): Promise<Country[]> {
    const { data } = await countriesApi.get<Country[]>(
      `/alpha?codes=${codes.join(',')}`
    )
    return data
  },

  async getByLanguage(language: string): Promise<Country[]> {
    const { data } = await countriesApi.get<Country[]>(`/lang/${language}`)
    return data
  },

  async getLanguages(): Promise<{ code: string; name: string }[]> {
    const { data } = await countriesApi.get<{ languages: Record<string, string> }[]>(
      '/independent?status=true&fields=languages'
    )

    const languageMap = new Map<string, string>()
    data.forEach((item) => {
      if (item.languages) {
        Object.entries(item.languages).forEach(([code, name]) => {
          if (!languageMap.has(code)) {
            languageMap.set(code, name)
          }
        })
      }
    })

    return Array.from(languageMap.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  },
}
