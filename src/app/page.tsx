'use client'
import { Loader2 } from 'lucide-react'

import { CountryCard } from '@/components/CountryCard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Pagination } from '@/components/Pagination'
import { useCountries } from '@/hooks'

import styles from './Home.module.scss'

export default function Home() {
  const {
    countries,
    loading,
    error,
    filters,
    languages,
    updateFilter,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCountries()

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <Header
          searchValue={filters.search}
          onSearchChange={(value) => updateFilter('search', value)}
          selectedContinents={filters.continents}
          onContinentChange={(continents) =>
            updateFilter('continents', continents)
          }
          languages={languages}
          selectedLanguage={filters.language}
          onLanguageChange={(language) => updateFilter('language', language)}
        />
        <main className={styles.main}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Tentar novamente
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <Header
        searchValue={filters.search}
        onSearchChange={(value) => updateFilter('search', value)}
        selectedContinents={filters.continents}
        onContinentChange={(continents) =>
          updateFilter('continents', continents)
        }
        languages={languages}
        selectedLanguage={filters.language}
        onLanguageChange={(language) => updateFilter('language', language)}
      />

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={48} />
            <p>Carregando países...</p>
          </div>
        ) : (
          <>
            <section className={styles.countriesGrid}>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>Nenhum país encontrado com os filtros selecionados.</p>
                </div>
              )}
            </section>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
