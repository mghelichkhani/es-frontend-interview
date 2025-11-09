import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import ApolloWrapper from '../lib/ApolloWrapper'

import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  // You can add localized metadata here if needed
  // For now, keeping it simple as it is only for internal use
  return {
    title: 'Eversports frontend assignment',
    description: 'Looking forward to see what you come up with!',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
