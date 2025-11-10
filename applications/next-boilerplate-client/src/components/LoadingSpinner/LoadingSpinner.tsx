'use client'

import { useTranslations } from 'next-intl'

export function LoadingSpinner({ text }: { text?: string }) {
  const t = useTranslations()
  const displayText = text ?? t('common.loading')
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-3 py-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-primary-dark border-t-transparent" />
      <span className="text-text-muted">{displayText}</span>
    </div>
  )
}
