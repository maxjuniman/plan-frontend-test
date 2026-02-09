'use client'
import Image from 'next/image'

import styles from './Footer.module.scss'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image
            src="/img/logo_footer.png"
            alt="Grupo Plan Marketing"
            width={120}
            height={48}
          />
        </div>
        <p className={styles.copyright}>
          Grupo Plan Marketing (C) Todos os direitos reservados - {currentYear}
        </p>
      </div>
    </footer>
  )
}
