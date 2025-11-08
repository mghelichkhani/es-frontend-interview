'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, SearchIcon, Check, X } from '../icons'
import { Popover } from '../Popover'
import { Button } from '../Button'
import { LoadingSpinner } from '../LoadingSpinner'

export type Option = { id: string; label: string }

type Props = {
  label?: string
  value: string[]
  onChange: (ids: string[]) => void
  options: Option[]
  placeholder?: string
  isLoading?: boolean
  error?: string | null
  onSearchTermChange?: (q: string) => void
}

export default function MultiSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  isLoading,
  error,
  onSearchTermChange,
}: Props) {
  const t = useTranslations()
  const defaultLabel = label ?? t('multiSelect.defaultLabel')
  const defaultPlaceholder = placeholder ?? t('common.search.placeholder')
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Set<string>>(new Set(value))
  const [localQ, setLocalQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null)
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined)

  useEffect(() => { if (open) setDraft(new Set(value)) }, [open, value])

  // Measure trigger width when popover opens
  useEffect(() => {
    if (open && triggerButtonRef.current) {
      setTriggerWidth(triggerButtonRef.current.offsetWidth)
    }
  }, [open])

  // Callback ref to store the button element
  const setTriggerRef = useCallback((node: HTMLButtonElement | null) => {
    triggerButtonRef.current = node
    if (node && open) {
      setTriggerWidth(node.offsetWidth)
    }
  }, [open])

  const handleEscape = useCallback(() => {
    try {
      setDraft(new Set(value))
      setLocalQ('')
    } catch (error) {
      console.error('Error in handleEscape:', error)
    }
  }, [value])

  const handleEnter = useCallback(() => {
    try {
      onChange(Array.from(draft))
      setLocalQ('')
      setOpen(false)
    } catch (error) {
      console.error('Error in handleEnter:', error)
    }
  }, [draft, onChange])

  const appliedCount = value.length

  const toggle = useCallback((id: string) => {
    try {
      setDraft(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    } catch (error) {
      console.error('Error in toggle:', error)
    }
  }, [])

  const allOnPageSelected = options.length > 0 && options.every(o => draft.has(o.id))
  const onSelectAllPage = useCallback(() => {
    try {
      setDraft(prev => {
        const next = new Set(prev)
        const allSelected = options.every(o => next.has(o.id))
        if (allSelected) options.forEach(o => next.delete(o.id))
        else options.forEach(o => next.add(o.id))
        return next
      })
    } catch (error) {
      console.error('Error in onSelectAllPage:', error)
    }
  }, [options])

  const [effectiveQ, setEffectiveQ] = useState('')
  // Debounce search input with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setEffectiveQ(localQ)
    }, 300)
    return () => clearTimeout(timer)
  }, [localQ])
  const filtered = useMemo(() => {
    if (onSearchTermChange) return options
    const q = effectiveQ.trim().toLowerCase()
    if (!q) return options
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [options, effectiveQ, onSearchTermChange])

  return (
    <div className="text-sm">
      <Popover
        open={open}
        onOpenChange={setOpen}
        onEscape={handleEscape}
        onEnter={handleEnter}
        triggerWidth={triggerWidth}
        trigger={
          <Button
            ref={setTriggerRef}
            variant="secondary"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            className="inline-flex w-full items-center justify-between gap-2 border border-brand-700 bg-surface text-brand-700 hover:bg-brand-50 sm:min-w-[300px] md:min-w-[370px]"
            style={{ borderRadius: '12px', padding: '10px 16px' }}
            onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 0) }}
          >
            <span className="flex items-center gap-2">
              <span className="font-medium text-brand-700">{defaultLabel}</span>
              {appliedCount > 0 && (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] text-brand-700">
                  {appliedCount}
                </span>
              )}
            </span>
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        }
      >
        <div
          role="dialog"
          aria-label={defaultLabel}
          className="bg-brand-50 p-2"
          style={{ borderRadius: '12px', boxShadow: '0 8px 16px 0 rgba(20, 20, 20, 0.16)' }}
        >
          {/* Search with leading icon - hidden when error */}
          {!error && (
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={inputRef}
                value={localQ}
                onChange={(e) => { const q = e.target.value; setLocalQ(q); onSearchTermChange?.(q) }}
                placeholder={defaultPlaceholder}
                className="w-full rounded-md border border-border bg-white pl-8 pr-8 py-1 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-700/30"
              />
              {localQ && (
                <button
                  type="button"
                  onClick={() => { setLocalQ(''); onSearchTermChange?.(''); inputRef.current?.focus() }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-fg focus:outline-none focus:ring-2 focus:ring-brand-700/30 rounded"
                  aria-label={t('common.clearSearch')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* List container */}
          <div role="listbox" aria-multiselectable className="mt-2 px-1 max-h-64 overflow-auto rounded-md">
            {/* Select all row (active style when all selected) - hidden when loading, error, or search has value */}
            {!isLoading && !error && !localQ && (
              <>
                <label
                  className={
                    'flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left ' +
                    (allOnPageSelected ? 'bg-brand-50 text-brand-700' : 'hover:bg-brand-50') +
                    ' focus-within:bg-brand-50 focus-within:outline focus-within:outline-1 focus-within:outline-inset focus-within:outline-brand-700/30'
                  }
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={onSelectAllPage}
                      onFocus={(e) => {
                        // Scroll into view when focused via keyboard navigation
                        e.currentTarget.closest('label')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
                      }}
                      className="sr-only"
                      aria-label={allOnPageSelected ? t('common.deselectAll') : t('common.selectAll')}
                    />
                    {allOnPageSelected ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-700">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                    ) : (
                      <span className="h-5 w-5 rounded border border-border" />
                    )}
                    <span className="font-medium">{allOnPageSelected ? t('common.deselectAll') : t('common.selectAll')}</span>
                  </div>
                </label>

                <div className="h-px bg-border" />
              </>
            )}

            {/* States */}
            {isLoading && (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center px-3 py-4">
                <span className="text-red-600">{error}</span>
              </div>
            )}
            {!isLoading && !error && filtered.length === 0 && (
              <div className="px-3 py-2 text-muted">{t('common.noResults')}</div>
            )}

            {/* Options (checked row shows right-aligned green check) */}
            {!isLoading && !error && filtered.map(o => {
              const checked = draft.has(o.id)
              return (
                <label
                  key={o.id}
                  role="option"
                  aria-selected={checked}
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left hover:bg-brand-50 focus-within:bg-brand-50 focus-within:outline focus-within:outline-1 focus-within:outline-inset focus-within:outline-brand-700/30"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(o.id)}
                      onFocus={(e) => {
                        // Scroll into view when focused via keyboard navigation
                        e.currentTarget.closest('label')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
                      }}
                      className="sr-only"
                      aria-label={t('multiSelect.selectItem', { label: o.label })}
                    />
                    {checked ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-700">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                    ) : (
                      <span className="h-5 w-5 rounded border border-border" />
                    )}
                    <span className="truncate text-fg">{o.label}</span>
                  </div>
                </label>
              )
            })}
          </div>

          {/* Footer (Cancel / Apply) */}
          <div className="mt-2 flex items-center justify-between">
            <Button
              variant="tertiary"
              onClick={() => { setDraft(new Set(value)); setLocalQ(''); setOpen(false) }}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={() => { onChange(Array.from(draft)); setLocalQ(''); setOpen(false) }}
            >
              {t('common.apply')}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  )
}
