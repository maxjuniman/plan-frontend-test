'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Label,
  SearchField,
} from 'react-aria-components'

import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'

interface HeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void // eslint-disable-line no-unused-vars
  selectedContinents: string[]
  onContinentChange: (continents: string[]) => void // eslint-disable-line no-unused-vars
  languages: { code: string; name: string }[]
  selectedLanguage: string
  onLanguageChange: (language: string) => void // eslint-disable-line no-unused-vars
}

const CONTINENTS = [
  { value: 'Africa', label: 'África' },
  { value: 'North America', label: 'América do Norte' },
  { value: 'South America', label: 'América do Sul' },
  { value: 'Asia', label: 'Ásia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceania' },
]

export function Header({
  searchValue,
  onSearchChange,
  selectedContinents,
  onContinentChange,
  languages,
  selectedLanguage,
  onLanguageChange,
}: HeaderProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [languageSearch, setLanguageSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false)
        setLanguageSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isLanguageOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLanguageOpen])

  const filteredLanguages = useMemo(() => {
    if (!languageSearch) return languages
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(languageSearch.toLowerCase())
    )
  }, [languages, languageSearch])

  const selectedLanguageName = selectedLanguage
    ? languages.find((l) => l.code === selectedLanguage)?.name || 'Selecione o idioma'
    : 'Todos'

  function handleLanguageSelect(code: string) {
    onLanguageChange(code)
    setIsLanguageOpen(false)
    setLanguageSearch('')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/img/logo.png"
            alt="Plan Marketing"
            width={80}
            height={32}
            priority
          />
        </Link>

        <div className={styles.centerControls}>
          <SearchField
            aria-label="Buscar país por nome"
            value={searchValue}
            onChange={onSearchChange}
            className={styles.searchContainer}
          >
            <Label className={styles.srOnly}>Buscar país</Label>
            <Input
              placeholder="Informe o país que deseja conhecer..."
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>
              <Image
                src="/img/lupa.png"
                alt="Buscar"
                width={20}
                height={20}
                priority
              />
            </span>
          </SearchField>

          <div
            ref={dropdownRef}
            className={styles.languageDropdown}
          >
            <button
              type="button"
              className={styles.languageButton}
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              aria-expanded={isLanguageOpen}
              aria-haspopup="listbox"
              aria-label="Filtrar por idioma"
            >
              <span>{selectedLanguageName}</span>
              <span
                aria-hidden="true"
                className={`${styles.chevron} ${isLanguageOpen ? styles.chevronOpen : ''}`}
              >
                ▲
              </span>
            </button>

            {isLanguageOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownSearchWrapper}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar idioma..."
                    value={languageSearch}
                    onChange={(e) => setLanguageSearch(e.target.value)}
                    className={styles.dropdownSearchInput}
                  />
                </div>

                <ul className={styles.dropdownList} role="listbox">
                  <li
                    role="option"
                    aria-selected={selectedLanguage === ''}
                    className={`${styles.dropdownItem} ${selectedLanguage === '' ? styles.selected : ''}`}
                    onClick={() => handleLanguageSelect('')}
                  >
                    <span>Todos</span>
                  </li>

                  {filteredLanguages.map((lang) => (
                    <li
                      key={lang.code}
                      role="option"
                      aria-selected={selectedLanguage === lang.code}
                      className={`${styles.dropdownItem} ${selectedLanguage === lang.code ? styles.selected : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span>{lang.name}</span>
                    </li>
                  ))}

                  {filteredLanguages.length === 0 && (
                    <li className={styles.dropdownEmpty}>
                      Nenhum idioma encontrado
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckboxGroup
        aria-label="Filtrar por continente"
        value={selectedContinents}
        onChange={onContinentChange}
        className={styles.filtersRow}
      >
        {CONTINENTS.map((continent) => (
          <Checkbox
            key={continent.value}
            value={continent.value}
            className={styles.checkboxLabel}
          >
            <div className={styles.checkboxIndicator}>
              <div className={styles.checkmark} />
            </div>
            <span>{continent.label}</span>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </header>
  )
}
