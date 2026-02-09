'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Country, CountryFilters } from '@/@types/country'
import { countryService } from '@/services/http'

const ITEMS_PER_PAGE = 8

export function useCountries() {
  const [allCountries, setAllCountries] = useState<Country[]>([])
  const [languageCountries, setLanguageCountries] = useState<Country[] | null>(null)
  const [languages, setLanguages] = useState<{ code: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingLanguage, setLoadingLanguage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<CountryFilters>({
    search: '',
    continents: [],
    language: '',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [countriesData, languagesData] = await Promise.all([
          countryService.getAll(),
          countryService.getLanguages(),
        ])
        setAllCountries(countriesData)
        setLanguages(languagesData)
      } catch {
        setError('Erro ao carregar países')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!filters.language) {
      setLanguageCountries(null)
      return
    }

    async function fetchByLanguage() {
      try {
        setLoadingLanguage(true)
        const data = await countryService.getByLanguage(filters.language)
        setLanguageCountries(data)
      } catch {
        setLanguageCountries([])
      } finally {
        setLoadingLanguage(false)
      }
    }

    fetchByLanguage()
  }, [filters.language])

  const baseCountries = languageCountries !== null ? languageCountries : allCountries

  const filteredCountries = useMemo(() => {
    return baseCountries.filter((country) => {
      const name = (
        country.translations?.por?.common || country.name.common
      ).toLowerCase()
      const searchMatch =
        !filters.search || name.includes(filters.search.toLowerCase())

      const continentMatch =
        filters.continents.length === 0 ||
        filters.continents.some((selectedContinent) => {
          if (selectedContinent === 'North America') {
            return (
              country.region === 'Americas' &&
              (country.subregion === 'Northern America' ||
                country.subregion === 'Central America' ||
                country.subregion === 'Caribbean')
            )
          }
          if (selectedContinent === 'South America') {
            return (
              country.region === 'Americas' &&
              country.subregion === 'South America'
            )
          }
          return country.region === selectedContinent
        })

      return searchMatch && continentMatch
    })
  }, [baseCountries, filters.search, filters.continents])

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const nameA = a.translations?.por?.common || a.name.common
      const nameB = b.translations?.por?.common || b.name.common
      return nameA.localeCompare(nameB, 'pt-BR')
    })
  }, [filteredCountries])

  const totalPages = Math.ceil(sortedCountries.length / ITEMS_PER_PAGE)

  const paginatedCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedCountries.slice(start, start + ITEMS_PER_PAGE)
  }, [sortedCountries, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const updateFilter = useCallback(
    <K extends keyof CountryFilters>(key: K, value: CountryFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      continents: [],
      language: '',
    })
  }, [])

  return {
    countries: paginatedCountries,
    allCountries: sortedCountries,
    totalCountries: allCountries.length,
    filteredCount: sortedCountries.length,
    loading: loading || loadingLanguage,
    error,
    filters,
    languages,
    updateFilter,
    clearFilters,
    currentPage,
    totalPages,
    setCurrentPage,
  }
}
