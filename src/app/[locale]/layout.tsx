import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import '../globals.css'
import { notFound } from 'next/navigation'
import { hasLocale } from 'use-intl'
import { routing } from '@/i18n/routing'
import { TRPCProvider } from '@/providers/trpc-provider'
import { AuthProvider } from '@/providers/auth-provider'

export const metadata: Metadata = {
  title: 'Nextjs Boilerplate',
  description: 'Just a boilerplate',
}

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TRPCProvider>
          <NextIntlClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </NextIntlClientProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
