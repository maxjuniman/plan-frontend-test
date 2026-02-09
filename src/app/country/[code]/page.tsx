'use client'
import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Country } from '@/@types/country'
import { Footer } from '@/components/Footer'
import { countryService } from '@/services/http'

import styles from './CountryDetails.module.scss'

function getRegionFlag(regionName: string) {
  if (regionName === 'Ásia') return '/img/mapas/asia.png'
  if (regionName === 'África') return '/img/mapas/africa.png'
  if (regionName === 'Europa') return '/img/mapas/europa.png'
  if (regionName === 'Américas') return '/img/mapas/norte.png'
  if (regionName === 'Oceania') return '/img/mapas/oceania.png'
  return `/img/mapas/${regionName.toLowerCase()}.png`
}

export default function CountryDetailsPage() {
  const params = useParams()
  const code = params.code as string

  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true)
        setError(null)
        const data = await countryService.getByCode(code)
        setCountry(data)
      } catch {
        setError('País não encontrado')
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchCountry()
    }
  }, [code])

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/img/logo.png"
              alt="Plan Marketing"
              width={80}
              height={32}
              priority
            />
          </Link>
        </header>
        <main className={styles.main}>
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={48} />
            <p>Carregando informações do país...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/img/logo.png"
              alt="Plan Marketing"
              width={80}
              height={32}
              priority
            />
          </Link>
        </header>
        <main className={styles.main}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error || 'País não encontrado'}</p>
            <Link href="/" className={styles.backButton}>
              Voltar para a lista
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const name = country.translations?.por?.common || country.name.common
  const officialName =
    country.translations?.por?.official || country.name.official
  const region = getRegionInPortuguese(country.region)
  const subregion = country.subregion
    ? getSubregionInPortuguese(country.subregion)
    : null
  const currencies = country.currencies
    ? Object.values(country.currencies)
      .map((c) => c.name)
      .join(', ')
    : 'N/A'
  const languages = country.languages
    ? Object.values(country.languages).join(' e ')
    : 'N/A'
  const capital = country.capital?.join(', ') || 'N/A'

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/img/logo.png"
            alt="Plan Marketing"
            width={80}
            height={32}
            priority
          />
        </Link>
      </header>

      <main className={styles.main}>
        <article className={styles.countryCard}>
          <div className={styles.cardHeader}>
            <span className={styles.regionLabel}>{region}</span>
            <Image
              src={getRegionFlag(region)}
              alt={`Ícone ${region}`}
              width={40}
              height={40}
              className={styles.headerFlag}
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.sectionLeft}>
              <div className={styles.flagSection}>
                <Image
                  src={country.flags.svg || country.flags.png}
                  alt={country.flags.alt || `Bandeira de ${name}`}
                  width={290}
                  height={220}
                  className={styles.flag}
                  priority
                />
              </div>
              <span className={styles.flagLabel}>Bandeira</span>
            </div>
            <div className={styles.infoSection}>
              <h2 className={styles.countryName}>{name}</h2>

              <div className={styles.detailsList}>
                <div className={styles.labelsColumn}>
                  <span className={styles.label}>Nome oficial</span>
                  <span className={styles.label}>Capital</span>
                  <span className={styles.label}>População</span>
                  <span className={styles.label}>Moeda</span>
                  <span className={styles.label}>Idiomas</span>
                  <span className={styles.label}>Região</span>
                  {subregion && <span className={styles.label}>Sub-Região</span>}
                </div>
                <div className={styles.valuesColumn}>
                  <span className={styles.value}>{officialName}</span>
                  <span className={styles.value}>{capital}</span>
                  <span className={styles.value}>{country.population.toLocaleString('pt-BR')}</span>
                  <span className={styles.value}>{currencies}</span>
                  <span className={styles.value}>{languages}</span>
                  <span className={styles.value}>{region}</span>
                  {subregion && <span className={styles.value}>{subregion}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <Link href="/" className={styles.backButton}>
              Voltar
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

function getRegionInPortuguese(region: string): string {
  const regions: Record<string, string> = {
    Africa: 'África',
    Americas: 'Américas',
    Antarctic: 'Antártida',
    Asia: 'Ásia',
    Europe: 'Europa',
    Oceania: 'Oceania',
  }
  return regions[region] || region
}

function getSubregionInPortuguese(subregion: string): string {
  const subregions: Record<string, string> = {
    'Northern Africa': 'Norte da África',
    'Eastern Africa': 'África Oriental',
    'Middle Africa': 'África Central',
    'Southern Africa': 'África Austral',
    'Western Africa': 'África Ocidental',
    'Caribbean': 'Caribe',
    'Central America': 'América Central',
    'South America': 'América do Sul',
    'Northern America': 'América do Norte',
    'Central Asia': 'Ásia Central',
    'Eastern Asia': 'Ásia Oriental',
    'Southern Asia': 'Sul da Ásia',
    'South-Eastern Asia': 'Sudeste Asiático',
    'Western Asia': 'Ásia Ocidental',
    'Eastern Europe': 'Europa Oriental',
    'Northern Europe': 'Europa do Norte',
    'Southern Europe': 'Europa do Sul',
    'Western Europe': 'Europa Ocidental',
    'Southeast Europe': 'Sudeste Europeu',
    'Australia and New Zealand': 'Austrália e Nova Zelândia',
    'Melanesia': 'Melanésia',
    'Micronesia': 'Micronésia',
    'Polynesia': 'Polinésia',
  }
  return subregions[subregion] || subregion
}
