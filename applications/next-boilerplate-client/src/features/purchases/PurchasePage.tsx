'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePurchases } from './hooks/usePurchases'
import { useProducts } from './hooks/useProducts'
import { useUsers } from './hooks/useUsers'
import PurchaseRow from './PurchaseRow'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { LanguageSelector } from '@/components/LanguageSelector'

export default function PurchasesPage() {
  const t = useTranslations()
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const { nodes: products, loading: productsLoading, error: productsError } = useProducts()
  const { nodes: users, loading: usersLoading, error: usersError } = useUsers()

  const productOptions: Option[] = products.map(p => ({ id: p.id, label: p.name }))
  const userOptions: Option[] = users.map(u => ({ id: u.id, label: `${u.firstName} ${u.lastName}` }))

  const { nodes, loading, error } = usePurchases(selectedProductIds, selectedUserIds)

  return (
    <div className="mx-auto max-w-5xl p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{t('purchasesPage.title')}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {nodes.length} {t('common.result', { count: nodes.length })}
          </span>
          <LanguageSelector />
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
            <span className="text-sm text-red-600">{t('errors.load.purchases')}</span>
          </div>
        )}
        {!loading && !error && nodes.length === 0 && (
          <div className="p-3 text-sm text-gray-500">{t('purchasesPage.empty')}</div>
        )}

        {!loading && nodes.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">{t('common.product', { count: 1 })}</th>
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">{t('common.user', { count: 1 })}</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((p) => <PurchaseRow key={p.id} p={p} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
