'use client'

import { useTranslations } from 'next-intl'

export function PurchaseTableHeader() {
  const t = useTranslations()

  return (
    <div className="overflow-hidden rounded-t-lg">
      <table
        className="w-full table-fixed border-collapse"
        aria-label={t('purchasesPage.title')}
      >
        <thead className="bg-gray-50">
          <tr className="border-b border-border-subtle">
            <th className="w-1/2 p-2 text-left text-sm font-semibold md:p-3 md:text-base first:rounded-tl-lg">
              {t('common.product', { count: 1 })}
            </th>
            <th className="w-1/2 p-2 text-left text-sm font-semibold md:p-3 md:text-base last:rounded-tr-lg">
              {t('common.user', { count: 1 })}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
