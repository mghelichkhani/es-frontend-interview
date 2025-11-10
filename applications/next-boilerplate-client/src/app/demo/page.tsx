'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { Button } from '@/components/Button'
import { LanguageSelector } from '@/components/LanguageSelector'
import { ChevronDownIcon, CheckIcon, Cross2Icon, ArrowRightIcon, FileTextIcon } from '@radix-ui/react-icons'

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
        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Color Palette</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Brand Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">Brand Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--brand-primary))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Primary</span>
                    <span className="text-xs text-text">#21A696</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--brand-primary-dark))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Primary Dark</span>
                    <span className="text-xs text-text">#14645A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Surfaces */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">Surfaces</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--brand-surface))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Surface</span>
                    <span className="text-xs text-text">#FFFFFF</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--brand-surface-muted))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Surface Muted</span>
                    <span className="text-xs text-text">#F9FBFB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">Text Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--text-strong))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Text Strong</span>
                    <span className="text-xs text-text">#141414</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded border border-[#D1D5DB]" style={{ backgroundColor: 'rgb(var(--text))' }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">Text</span>
                    <span className="text-xs text-text">#434343</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Button Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t('demo.buttonSection.title')}</h2>
          <div className="space-y-6">
            {/* Small Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">Small (Default)</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">{t('demo.buttonSection.primary')}</Button>
                  <Button variant="secondary" size="sm">{t('demo.buttonSection.secondary')}</Button>
                  <Button variant="tertiary" size="sm">Tertiary</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm" disabled>{t('demo.buttonSection.primary')} {t('demo.buttonSection.disabled')}</Button>
                  <Button variant="secondary" size="sm" disabled>{t('demo.buttonSection.secondary')} {t('demo.buttonSection.disabled')}</Button>
                  <Button variant="tertiary" size="sm" disabled>Tertiary {t('demo.buttonSection.disabled')}</Button>
                </div>
              </div>
            </div>
            
            {/* Large Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">Large</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg">{t('demo.buttonSection.primary')}</Button>
                  <Button variant="secondary" size="lg">{t('demo.buttonSection.secondary')}</Button>
                  <Button variant="tertiary" size="lg">Tertiary</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg" disabled>{t('demo.buttonSection.primary')} {t('demo.buttonSection.disabled')}</Button>
                  <Button variant="secondary" size="lg" disabled>{t('demo.buttonSection.secondary')} {t('demo.buttonSection.disabled')}</Button>
                  <Button variant="tertiary" size="lg" disabled>Tertiary {t('demo.buttonSection.disabled')}</Button>
                </div>
              </div>
            </div>

            {/* With Icons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">With Icons</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" iconBefore={<CheckIcon className="h-4 w-4" />}>Icon Before</Button>
                  <Button variant="secondary" iconBefore={<CheckIcon className="h-4 w-4" />}>Icon Before</Button>
                  <Button variant="tertiary" iconBefore={<CheckIcon className="h-4 w-4" />}>Icon Before</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" iconAfter={<ChevronDownIcon className="h-4 w-4" />}>Icon After</Button>
                  <Button variant="secondary" iconAfter={<ChevronDownIcon className="h-4 w-4" />}>Icon After</Button>
                  <Button variant="tertiary" iconAfter={<ChevronDownIcon className="h-4 w-4" />}>Icon After</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg" iconBefore={<CheckIcon className="h-5 w-5" />}>Large with Icon</Button>
                  <Button variant="secondary" size="lg" iconAfter={<ChevronDownIcon className="h-5 w-5" />}>Large with Icon</Button>
                  <Button variant="tertiary" size="lg" iconBefore={<CheckIcon className="h-5 w-5" />} iconAfter={<Cross2Icon className="h-5 w-5" />}>Both Icons</Button>
                </div>
                <div className="w-full">
                  <Button variant="primary" size="lg" iconBefore={<FileTextIcon className="h-5 w-5" />} iconAfter={<ArrowRightIcon className="h-5 w-5" />} className="w-full">
                    Full Width with Both Icons
                  </Button>
                </div>
              </div>
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

