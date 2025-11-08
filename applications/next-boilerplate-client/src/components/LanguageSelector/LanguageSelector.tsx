'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { locales, type Locale, LOCALE_COOKIE_NAME } from '@/i18n/config'

export function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()

  const handleLocaleChange = (newLocale: Locale) => {
    // Set locale in cookie - next-intl will read this on next request
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    
    // Use router.refresh() to trigger a server-side re-render with the new locale
    // This is more efficient than window.location.reload() as it preserves client state
    router.refresh()
  }

  return (
    <nav aria-label="Language selector" className="flex items-center gap-1">
      {locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          <button
            type="button"
            onClick={() => handleLocaleChange(loc)}
            aria-label={`Switch to ${loc === 'en' ? 'English' : 'German'}`}
            aria-current={locale === loc ? 'page' : undefined}
            className={`rounded-md text-sm px-1 font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/30 ${
              locale === loc
                ? 'text-brand-700 underline'
                : 'text-muted hover:text-fg'
            }`}
          >
            {loc}
          </button>
          {index < locales.length - 1 && (
            <span className="text-muted ml-1" aria-hidden="true">
              /
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

