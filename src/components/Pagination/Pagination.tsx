'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from 'react-aria-components'

import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisibleDots = 5

  const getVisiblePages = () => {
    if (totalPages <= maxVisibleDots) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisibleDots / 2)
    let start = currentPage - half
    let end = currentPage + half

    if (start < 1) {
      start = 1
      end = maxVisibleDots
    }

    if (end > totalPages) {
      end = totalPages
      start = totalPages - maxVisibleDots + 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className={styles.pagination} aria-label="Paginação de países">
      <Button
        className={styles.arrowButton}
        onPress={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={20} />
      </Button>

      <div className={styles.dots} role="group" aria-label="Páginas">
        {visiblePages.map((page) => (
          <Button
            key={page}
            className={`${styles.dot} ${page === currentPage ? styles.active : ''}`}
            onPress={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          />
        ))}
      </div>

      <Button
        className={styles.arrowButton}
        onPress={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={20} />
      </Button>
    </nav>
  )
}
