'use client'

import { useTranslations } from 'next-intl'

import { MultiSelect, type Option } from '@/components/MultiSelect'

type PurchaseFiltersProps = {
  productOptions: Option[]
  userOptions: Option[]
  selectedProductIds: string[]
  selectedUserIds: string[]
  onProductChange: (ids: string[]) => void
  onUserChange: (ids: string[]) => void
  productsLoading: boolean
  usersLoading: boolean
  productsError: string | null
  usersError: string | null
}

export function PurchaseFilters({
  productOptions,
  userOptions,
  selectedProductIds,
  selectedUserIds,
  onProductChange,
  onUserChange,
  productsLoading,
  usersLoading,
  productsError,
  usersError,
}: PurchaseFiltersProps) {
  const t = useTranslations()

  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
      <div className="w-full sm:flex-1">
        <MultiSelect
          label={t('purchasesPage.filter.products')}
          value={selectedProductIds}
          onChange={onProductChange}
          options={productOptions}
          isLoading={productsLoading}
          error={productsError ? t('errors.load.products') : null}
          placeholder={t('purchasesPage.search.products')}
          prioritizeSelected={true}
          sortAlphabetically={true}
        />
      </div>
      <div className="w-full sm:flex-1">
        <MultiSelect
          label={t('purchasesPage.filter.users')}
          value={selectedUserIds}
          onChange={onUserChange}
          options={userOptions}
          isLoading={usersLoading}
          error={usersError ? t('errors.load.users') : null}
          placeholder={t('purchasesPage.search.users')}
          prioritizeSelected={true}
          sortAlphabetically={true}
        />
      </div>
    </div>
  )
}
