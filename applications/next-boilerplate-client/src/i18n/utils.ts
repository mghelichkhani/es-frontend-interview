import { locales, type Locale, defaultLocale, LOCALE_COOKIE_NAME } from './config'

/**
 * Detects the user's preferred locale from Accept-Language header
 * Returns a locale that matches the user's browser preferences
 */
export function detectLocaleFromHeader(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,de;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q = '1'] = lang.trim().split(';q=')
      return { locale: locale.split('-')[0], quality: parseFloat(q) }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find the first matching locale
  for (const { locale } of languages) {
    if (locales.includes(locale as Locale)) {
      return locale as Locale
    }
  }

  return null
}

/**
 * Validates and returns a valid locale, falling back to default if invalid
 */
export function getValidLocale(locale: string | null | undefined): Locale {
  if (locale && locales.includes(locale as Locale)) {
    return locale as Locale
  }
  return defaultLocale
}

/**
 * Gets the locale from a cookie value
 */
export function getLocaleFromCookie(cookieValue: string | undefined): Locale | null {
  if (!cookieValue) return null
  return getValidLocale(cookieValue) !== defaultLocale ? (cookieValue as Locale) : null
}

