// Shared locale configuration that can be imported in both client and server components
export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]

// Default locale used when no preference is detected
export const defaultLocale: Locale = 'en'

// Cookie name for locale storage (must match the name used in middleware and request config)
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

