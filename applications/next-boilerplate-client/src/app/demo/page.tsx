'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { Button } from '@/components/Button'
import { LanguageSelector } from '@/components/LanguageSelector'

const mockItems: Option[] = [
  { id: '1', label: 'Item A' },
  { id: '2', label: 'Item B' },
  { id: '3', label: 'Item C' },
  { id: '4', label: 'Item D' },
  { id: '5', label: 'Item E' },
  { id: '6', label: 'Item F' },
  { id: '7', label: 'Item G' },
  { id: '8', label: 'Item H' },
]

export default function DemoPage() {
  const t = useTranslations()
  const [selectedItems1, setSelectedItems1] = useState<string[]>([])
  const [selectedItems2, setSelectedItems2] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [userCount, setUserCount] = useState(1)
  const [resultCount, setResultCount] = useState(1)

  // Simulate server-side filtering
  const filteredItems = searchQuery
    ? mockItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockItems

  return (
      <div className="mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('demo.title')}</h1>
        <LanguageSelector />
      </div>

      <div className="space-y-8">
        {/* Button Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.buttonSection.title')}</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">{t('demo.buttonSection.primary')}</Button>
              <Button variant="secondary">{t('demo.buttonSection.secondary')}</Button>
              <Button variant="tertiary">{t('demo.buttonSection.tertiary')}</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" disabled>{t('demo.buttonSection.primary')} {t('demo.buttonSection.disabled')}</Button>
              <Button variant="secondary" disabled>{t('demo.buttonSection.secondary')} {t('demo.buttonSection.disabled')}</Button>
              <Button variant="tertiary" disabled>{t('demo.buttonSection.tertiary')} {t('demo.buttonSection.disabled')}</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                {t('demo.buttonSection.clickMe')} ({t('demo.buttonSection.primary')})
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                {t('demo.buttonSection.clickMe')} ({t('demo.buttonSection.secondary')})
              </Button>
              <Button variant="tertiary" onClick={() => alert('Tertiary clicked!')}>
                {t('demo.buttonSection.clickMe')} ({t('demo.buttonSection.tertiary')})
              </Button>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Pluralization Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.pluralization.title')}</h2>
          <p className="text-sm text-gray-600">{t('demo.pluralization.description')}</p>
          <div className="space-y-4 rounded border p-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{t('demo.pluralization.userExample')}</h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={userCount}
                  onChange={(e) => setUserCount(Number(e.target.value))}
                  className="w-20 rounded border px-2 py-1"
                />
                <span className="text-sm">
                  {userCount} {t('common.user', { count: userCount })}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t('demo.pluralization.resultExample')}</h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={resultCount}
                  onChange={(e) => setResultCount(Number(e.target.value))}
                  className="w-20 rounded border px-2 py-1"
                />
                <span className="text-sm">
                  {resultCount} {t('common.result', { count: resultCount })}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t('demo.pluralization.productExample')}</h3>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 5, 10].map((count) => (
                  <span key={count} className="text-sm">
                    {count} {t('common.product', { count })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* MultiSelect Components */}
        {/* Basic Usage */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.multiSelectSection.basicTitle')}</h2>
          <div className="flex items-center gap-4">
            <MultiSelect
              label={t('demo.multiSelectSection.selectItems')}
              value={selectedItems1}
              onChange={setSelectedItems1}
              options={mockItems}
            />
            <div className="text-sm text-gray-600">
              {t('demo.multiSelectSection.selected')}: {selectedItems1.length > 0 ? selectedItems1.join(', ') : t('demo.multiSelectSection.none')}
            </div>
          </div>
        </section>

        {/* With Search */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.multiSelectSection.searchTitle')}</h2>
          <div className="flex items-center gap-4">
            <MultiSelect
              label={t('demo.multiSelectSection.searchItems')}
              value={selectedItems2}
              onChange={setSelectedItems2}
              options={filteredItems}
              onSearchTermChange={setSearchQuery}
              placeholder={t('demo.multiSelectSection.typeToSearch')}
            />
            <div className="text-sm text-gray-600">
              {t('demo.multiSelectSection.selected')}: {selectedItems2.length > 0 ? selectedItems2.join(', ') : t('demo.multiSelectSection.none')}
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500">{t('demo.multiSelectSection.searchingFor', { query: searchQuery })}</p>
          )}
        </section>

        {/* With Loading State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.multiSelectSection.loadingTitle')}</h2>
          <MultiSelect
            label={t('demo.multiSelectSection.loadingItems')}
            value={[]}
            onChange={() => {}}
            options={[]}
            isLoading={true}
          />
        </section>

        {/* With Error State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.multiSelectSection.errorTitle')}</h2>
          <MultiSelect
            label={t('demo.multiSelectSection.errorExample')}
            value={[]}
            onChange={() => {}}
            options={[]}
            error={t('errors.load.options')}
          />
        </section>

        {/* Selected Values Display */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.multiSelectSection.selectedTitle')}</h2>
          <div className="space-y-2 rounded border p-4">
            <div>
              <strong>{t('demo.multiSelectSection.list', { number: 1 })}:</strong>{' '}
              {selectedItems1.length > 0 ? selectedItems1.join(', ') : t('demo.multiSelectSection.noneSelected')}
            </div>
            <div>
              <strong>{t('demo.multiSelectSection.list', { number: 2 })}:</strong>{' '}
              {selectedItems2.length > 0 ? selectedItems2.join(', ') : t('demo.multiSelectSection.noneSelected')}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

