'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'

type LoadMoreButtonProps = {
  hasMore: boolean
  isLoading: boolean
  onClick: () => void
}

export function LoadMoreButton({
  hasMore,
  isLoading,
  onClick,
}: LoadMoreButtonProps) {
  const t = useTranslations()

  return (
    <div className="rounded-b-lg border-t border-border-subtle bg-brand-surface p-4">
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="sm"
          onClick={onClick}
          disabled={!hasMore || isLoading}
        >
          {isLoading ? t('common.loading') : t('purchasesPage.loadMore')}
        </Button>
      </div>
    </div>
  )
}
