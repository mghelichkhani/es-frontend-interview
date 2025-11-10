'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { type Locale, LOCALE_COOKIE_NAME, locales } from '@/i18n/config'

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
            className={`rounded-md text-sm px-1 font-medium uppercase transition-colors u-focus-ring ${
              locale === loc
                ? 'text-brand-primary-dark underline'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {loc}
          </button>
          {index < locales.length - 1 && (
            <span className="text-[#6B7280] ml-1" aria-hidden="true">
              /
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
