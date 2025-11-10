'use client'
import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { DotsHorizontalIcon, ReloadIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'

import { Button } from '@/components/Button'
import { LanguageSelector } from '@/components/LanguageSelector'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { MultiSelect, type Option } from '@/components/MultiSelect'

import { useProducts } from './hooks/useProducts'
import { usePurchases } from './hooks/usePurchases'
import { useUsers } from './hooks/useUsers'
import PurchaseRow from './PurchaseRow'

export default function PurchasesPage() {
  const t = useTranslations()
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const {
    nodes: products,
    loading: productsLoading,
    error: productsError,
  } = useProducts()
  const { nodes: users, loading: usersLoading, error: usersError } = useUsers()

  const productOptions: Option[] = products.map((p) => ({
    id: p.id,
    label: p.name,
  }))
  const userOptions: Option[] = users.map((u) => ({
    id: u.id,
    label: `${u.firstName} ${u.lastName}`,
  }))

  const { nodes, loading, error } = usePurchases(
    selectedProductIds,
    selectedUserIds,
  )

  const handleReset = () => {
    setSelectedProductIds([])
    setSelectedUserIds([])
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {t('purchasesPage.title')}{' '}
          <span className="text-sm font-normal text-gray-600">
            ({nodes.length} {t('common.result', { count: nodes.length })})
          </span>
        </h1>
        <div className="flex items-center gap-4">
          {/* Desktop: Show buttons directly */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              iconBefore={<ReloadIcon className="h-4 w-4" />}
              aria-label="Reset filters"
            >
              Reset
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
                aria-label="Menu"
              >
                <span className="sr-only">Menu</span>
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-50 outline-none"
                sideOffset={8}
                align="end"
              >
                <div
                  className="bg-brand-surface-muted p-2"
                  style={{
                    borderRadius: '12px',
                    boxShadow: `0 8px 16px 0 rgb(var(--text-strong) / 0.16)`,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleReset}
                      iconBefore={<ReloadIcon className="h-4 w-4" />}
                      className="w-full justify-start"
                      aria-label="Reset filters"
                    >
                      Reset
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

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="w-full sm:flex-1">
          <MultiSelect
            label={t('purchasesPage.filter.products')}
            value={selectedProductIds}
            onChange={setSelectedProductIds}
            options={productOptions}
            isLoading={productsLoading}
            error={productsError ? t('errors.load.products') : null}
            placeholder={t('purchasesPage.search.products')}
          />
        </div>
        <div className="w-full sm:flex-1">
          <MultiSelect
            label={t('purchasesPage.filter.users')}
            value={selectedUserIds}
            onChange={setSelectedUserIds}
            options={userOptions}
            isLoading={usersLoading}
            error={usersError ? t('errors.load.users') : null}
            placeholder={t('purchasesPage.search.users')}
          />
        </div>
      </div>

      <div className="rounded border">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner text={t('purchasesPage.loading')} />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-red-600">
              {t('errors.load.purchases')}
            </span>
          </div>
        )}
        {!loading && !error && nodes.length === 0 && (
          <div className="p-3 text-sm text-gray-500">
            {t('purchasesPage.empty')}
          </div>
        )}

        {!loading && nodes.length > 0 && (
          <table className="w-full" aria-label={t('purchasesPage.title')}>
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">
                  {t('common.product', { count: 1 })}
                </th>
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">
                  {t('common.user', { count: 1 })}
                </th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((p) => (
                <PurchaseRow key={p.id} p={p} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
