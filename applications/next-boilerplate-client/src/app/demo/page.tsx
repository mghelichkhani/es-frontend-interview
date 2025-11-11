'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  Cross2Icon,
  FileTextIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/components/Button'
import { LanguageSelector } from '@/components/LanguageSelector'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { Toast } from '@/components/Toast'

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

// Larger list for threshold demonstration (more than 10 items)
const mockItemsLarge: Option[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date' },
  { id: '5', label: 'Elderberry' },
  { id: '6', label: 'Fig' },
  { id: '7', label: 'Grape' },
  { id: '8', label: 'Honeydew' },
  { id: '9', label: 'Kiwi' },
  { id: '10', label: 'Lemon' },
  { id: '11', label: 'Mango' },
  { id: '12', label: 'Orange' },
  { id: '13', label: 'Papaya' },
  { id: '14', label: 'Quince' },
  { id: '15', label: 'Raspberry' },
  { id: '16', label: 'Strawberry' },
  { id: '17', label: 'Tangerine' },
  { id: '18', label: 'Watermelon' },
]

export default function DemoPage() {
  const t = useTranslations()
  const [selectedItems1, setSelectedItems1] = useState<string[]>([])
  const [selectedItems2, setSelectedItems2] = useState<string[]>([])
  const [userCount, setUserCount] = useState(1)
  const [resultCount, setResultCount] = useState(1)
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('demo.title')}</h1>
        <LanguageSelector />
      </div>

      <div className="space-y-8">
        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.colorPalette.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Brand Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.colorPalette.brandColors')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--brand-primary))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.primary')}
                    </span>
                    <span className="text-xs text-text">#21A696</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{
                      backgroundColor: 'rgb(var(--brand-primary-dark))',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.primaryDark')}
                    </span>
                    <span className="text-xs text-text">#14645A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Surfaces */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.colorPalette.surfaces')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--brand-surface))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.surface')}
                    </span>
                    <span className="text-xs text-text">#FFFFFF</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{
                      backgroundColor: 'rgb(var(--brand-surface-muted))',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.surfaceMuted')}
                    </span>
                    <span className="text-xs text-text">#F9FBFB</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{
                      backgroundColor: 'rgb(var(--brand-surface-muted-hover))',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.surfaceMutedHover')}
                    </span>
                    <span className="text-xs text-text">#F0F0F0</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{
                      backgroundColor: 'rgb(var(--brand-surface-pressed))',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.surfacePressed')}
                    </span>
                    <span className="text-xs text-text">#E5E5E5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.colorPalette.textColors')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--text-strong))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.textStrong')}
                    </span>
                    <span className="text-xs text-text">#141414</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--text))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.text')}
                    </span>
                    <span className="text-xs text-text">#434343</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--text-muted))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.textMuted')}
                    </span>
                    <span className="text-xs text-text">#6B7280</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--text-subtle))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.textSubtle')}
                    </span>
                    <span className="text-xs text-text">#111827</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Borders & Dividers */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.colorPalette.borders')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--border-divider))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.borderDivider')}
                    </span>
                    <span className="text-xs text-text">#E0E0E0</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--border-subtle))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.borderSubtle')}
                    </span>
                    <span className="text-xs text-text">#D1D5DB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grays */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.colorPalette.grays')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--gray-50))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.gray50')}
                    </span>
                    <span className="text-xs text-text">#F9FAFB</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--gray-200))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.gray200')}
                    </span>
                    <span className="text-xs text-text">#E5E7EB</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--gray-500))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.gray500')}
                    </span>
                    <span className="text-xs text-text">#6B7280</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded border border-[#D1D5DB]"
                    style={{ backgroundColor: 'rgb(var(--gray-600))' }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-strong">
                      {t('demo.colorPalette.gray600')}
                    </span>
                    <span className="text-xs text-text">#4B5563</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Button Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.buttonSection.title')}
          </h2>
          <div className="space-y-6">
            {/* Small Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.buttonSection.small')}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">
                    {t('demo.buttonSection.primary')}
                  </Button>
                  <Button variant="secondary" size="sm">
                    {t('demo.buttonSection.secondary')}
                  </Button>
                  <Button variant="tertiary" size="sm">
                    {t('demo.buttonSection.tertiary')}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm" disabled>
                    {t('demo.buttonSection.primary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                  <Button variant="secondary" size="sm" disabled>
                    {t('demo.buttonSection.secondary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                  <Button variant="tertiary" size="sm" disabled>
                    {t('demo.buttonSection.tertiary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Large Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.buttonSection.large')}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg">
                    {t('demo.buttonSection.primary')}
                  </Button>
                  <Button variant="secondary" size="lg">
                    {t('demo.buttonSection.secondary')}
                  </Button>
                  <Button variant="tertiary" size="lg">
                    {t('demo.buttonSection.tertiary')}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg" disabled>
                    {t('demo.buttonSection.primary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                  <Button variant="secondary" size="lg" disabled>
                    {t('demo.buttonSection.secondary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                  <Button variant="tertiary" size="lg" disabled>
                    {t('demo.buttonSection.tertiary')}{' '}
                    {t('demo.buttonSection.disabled')}
                  </Button>
                </div>
              </div>
            </div>

            {/* With Icons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-strong">
                {t('demo.buttonSection.withIcons')}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    iconBefore={<CheckIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconBefore')}
                  </Button>
                  <Button
                    variant="secondary"
                    iconBefore={<CheckIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconBefore')}
                  </Button>
                  <Button
                    variant="tertiary"
                    iconBefore={<CheckIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconBefore')}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    iconAfter={<ChevronDownIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconAfter')}
                  </Button>
                  <Button
                    variant="secondary"
                    iconAfter={<ChevronDownIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconAfter')}
                  </Button>
                  <Button
                    variant="tertiary"
                    iconAfter={<ChevronDownIcon className="h-4 w-4" />}
                  >
                    {t('demo.buttonSection.iconAfter')}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    iconBefore={<CheckIcon className="h-5 w-5" />}
                  >
                    {t('demo.buttonSection.largeWithIcon')}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    iconAfter={<ChevronDownIcon className="h-5 w-5" />}
                  >
                    {t('demo.buttonSection.largeWithIcon')}
                  </Button>
                  <Button
                    variant="tertiary"
                    size="lg"
                    iconBefore={<CheckIcon className="h-5 w-5" />}
                    iconAfter={<Cross2Icon className="h-5 w-5" />}
                  >
                    {t('demo.buttonSection.bothIcons')}
                  </Button>
                </div>
                <div className="w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    iconBefore={<FileTextIcon className="h-5 w-5" />}
                    iconAfter={<ArrowRightIcon className="h-5 w-5" />}
                    className="w-full"
                  >
                    {t('demo.buttonSection.fullWidthWithIcons')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Pluralization Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.pluralization.title')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('demo.pluralization.description')}
          </p>
          <div className="space-y-4 rounded border p-4">
            <div className="space-y-2">
              <h3 className="font-semibold">
                {t('demo.pluralization.userExample')}
              </h3>
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
              <h3 className="font-semibold">
                {t('demo.pluralization.resultExample')}
              </h3>
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
              <h3 className="font-semibold">
                {t('demo.pluralization.productExample')}
              </h3>
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
        {/* Basic Usage - Unsorted */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.multiSelectSection.basicTitle')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('demo.multiSelectSection.unsortedDescription')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MultiSelect
              label={t('demo.multiSelectSection.selectItems')}
              value={selectedItems1}
              onChange={setSelectedItems1}
              options={mockItems}
              sortAlphabetically={false}
            />
            <div className="text-sm text-gray-600">
              {t('demo.multiSelectSection.selected')}:{' '}
              {selectedItems1.length > 0
                ? selectedItems1.join(', ')
                : t('demo.multiSelectSection.none')}
            </div>
          </div>
        </section>

        {/* With Threshold and Prioritization - Sorted */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.multiSelectSection.thresholdTitle')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('demo.multiSelectSection.thresholdDescription')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MultiSelect
              label={t('demo.multiSelectSection.selectFruits')}
              value={selectedItems2}
              onChange={setSelectedItems2}
              options={mockItemsLarge}
              prioritizeSelected={true}
              prioritizeThreshold={10}
              sortAlphabetically={true}
            />
            <div className="text-sm text-gray-600">
              {t('demo.multiSelectSection.selected')}:{' '}
              {selectedItems2.length > 0
                ? selectedItems2.join(', ')
                : t('demo.multiSelectSection.none')}
            </div>
          </div>
        </section>

        {/* With Loading State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.multiSelectSection.loadingTitle')}
          </h2>
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
          <h2 className="text-xl font-semibold">
            {t('demo.multiSelectSection.errorTitle')}
          </h2>
          <MultiSelect
            label={t('demo.multiSelectSection.errorExample')}
            value={[]}
            onChange={() => {}}
            options={[]}
            error={t('errors.load.options')}
          />
        </section>

        <div className="h-px bg-gray-200" />

        {/* Toast Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t('demo.toastSection.title')}
          </h2>
          <div className="space-y-3">
            <Button variant="primary" onClick={() => setToastOpen(true)}>
              {t('demo.toastSection.showToast')}
            </Button>
            <p className="text-sm text-gray-600">
              {t('demo.toastSection.description')}
            </p>
          </div>
        </section>
      </div>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        description={t('demo.toastSection.exampleMessage')}
        duration={3000}
      />
    </div>
  )
}
