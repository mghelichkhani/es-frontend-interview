'use client'

import { useTranslations } from 'next-intl'

import { DotsHorizontalIcon, ReloadIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'

import { Button } from '@/components/Button'
import { LanguageSelector } from '@/components/LanguageSelector'

type PurchasePageHeaderProps = {
  resultCount: number
  onReset: () => void
}

export function PurchasePageHeader({
  resultCount,
  onReset,
}: PurchasePageHeaderProps) {
  const t = useTranslations()

  return (
    <header className="mb-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        {t('purchasesPage.title')}{' '}
        <span className="text-sm font-normal text-text-muted">
          ({resultCount} {t('common.result', { count: resultCount })})
        </span>
      </h1>
      <div className="flex items-center gap-4">
        {/* Desktop: Show buttons directly */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            iconBefore={<ReloadIcon className="h-4 w-4" />}
            aria-label={t('common.resetFilters')}
          >
            {t('common.reset')}
          </Button>
          <LanguageSelector />
        </div>

        {/* Mobile: Show in popover */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="md:hidden"
              iconBefore={<DotsHorizontalIcon className="h-4 w-4" />}
              aria-label={t('common.menu')}
            >
              <span className="sr-only">{t('common.menu')}</span>
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="z-50 outline-none"
              sideOffset={8}
              align="end"
            >
              <div className="rounded-xl bg-brand-surface-muted p-2 shadow-lg">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onReset}
                    iconBefore={<ReloadIcon className="h-4 w-4" />}
                    className="w-full justify-start"
                    aria-label={t('common.resetFilters')}
                  >
                    {t('common.reset')}
                  </Button>
                  <div className="px-2 py-1">
                    <LanguageSelector />
                  </div>
                </div>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </header>
  )
}
