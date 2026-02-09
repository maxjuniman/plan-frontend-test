import React from 'react'
import { ToastContainer } from 'react-toastify'

import type { Metadata } from 'next'
import { Exo } from 'next/font/google'

import { Providers } from '@/components/Providers'

import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

const exo = Exo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catálogo de Países',
  description:
    'Explore informações sobre países do mundo inteiro. Filtre por nome, continente ou idioma.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={exo.className}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
