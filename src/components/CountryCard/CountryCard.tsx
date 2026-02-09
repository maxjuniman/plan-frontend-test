'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Country } from '@/@types/country'

import styles from './CountryCard.module.scss'

interface CountryCardProps {
  country: Country
}

const REGION_ICONS: Record<string, string> = {
  Africa: '🌍',
  Americas: '🌎',
  Asia: '🌏',
  Europe: '🌍',
  Oceania: '🌏',
  Antarctic: '🌐',
}

export function CountryCard({ country }: CountryCardProps) {
  const name = country.translations?.por?.common || country.name.common
  const region = getRegionInPortuguese(country.region)
  const capital = country.capital?.[0] || 'N/A'

  const getFlag = (regionName: string) => {
    if (regionName === "Ásia") {
      return "/img/mapas/asia.png"
    }
    if (regionName === "África") {
      return "/img/mapas/africa.png"
    }
    if (regionName === "Europa") {
      return "/img/mapas/europa.png"
    }
    if (regionName === "Américas") {
      return "/img/mapas/norte.png"
    }
    if (regionName === "Oceania") {
      return "/img/mapas/oceania.png"
    }
    return `/img/mapas/${regionName.toLowerCase()}.png`
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.regionLabel}>{region}</span>
        <Image
          src={getFlag(region)}
          alt={`Ícone ${region}`}
          width={30}
          height={30}
          className={styles.headerFlag}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.flagContainer}>
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Bandeira de ${name}`}
            width={60}
            height={40}
            className={styles.flag}
          />
        </div>

        <h2 className={styles.countryName}>{name}</h2>

        <div className={styles.capitalRow}>
          <span className={styles.locationIcon}>
            <Image
              src={"/img/capital.png"}
              alt={`Capital de ${name}`}
              width={20}
              height={20}
              className={styles.flag}
            />
          </span>
          <span className={styles.capitalName}>{capital}</span>
        </div>

        <Link href={`/country/${country.cca3}`} className={styles.viewMoreButton}>
          Ver mais
        </Link>
      </div>
    </article>
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
