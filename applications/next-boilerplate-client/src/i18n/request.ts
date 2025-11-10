import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, LOCALE_COOKIE_NAME } from './config'
import { detectLocaleFromHeader, getValidLocale } from './utils'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headersList = await headers()

  // Priority: cookie > Accept-Language header > default
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  const acceptLanguage = headersList.get('accept-language')

  let validLocale = defaultLocale

  if (cookieLocale) {
    validLocale = getValidLocale(cookieLocale)
  } else {
    const headerLocale = detectLocaleFromHeader(acceptLanguage)
    if (headerLocale) {
      validLocale = headerLocale
    }
  }

  // Load messages with error handling
  let messages
  try {
    messages = (await import(`../../messages/${validLocale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale "${validLocale}":`, error)
    // Fallback to default locale messages
    messages = (await import(`../../messages/${defaultLocale}.json`)).default
    validLocale = defaultLocale
  }

  return {
    locale: validLocale,
    messages,
  }
})
