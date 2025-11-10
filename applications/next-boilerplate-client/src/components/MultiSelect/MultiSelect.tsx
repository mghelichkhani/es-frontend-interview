'use client'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'

import { Button } from '../Button'
import { LoadingSpinner } from '../LoadingSpinner'

import { MultiSelectOption } from './MultiSelectOption'

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
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(
    undefined,
  )
  const baseId = useId()
  const groupId = `multiselect-group-${baseId}`
  const buttonId = `multiselect-button-${baseId}`
  const searchInputId = `multiselect-search-${baseId}`

  useEffect(() => {
    if (open) {
      setDraft(new Set(value))
    }
  }, [open, value])

  // Measure trigger width when popover opens
  useEffect(() => {
    if (open && triggerButtonRef.current) {
      setTriggerWidth(triggerButtonRef.current.offsetWidth)
    }
  }, [open])

  // Callback ref to store the button element
  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerButtonRef.current = node
      if (node && open) {
        setTriggerWidth(node.offsetWidth)
      }
    },
    [open],
  )

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

  // Handle Enter key to apply values
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement

        // Don't apply if on Cancel/Apply buttons (let them handle their own behavior)
        const footerDiv = target.closest('.h-12')
        if (footerDiv && footerDiv.contains(target)) return

        // Apply values when Enter is pressed on checkboxes, search input, or within the checkbox group
        const isInCheckboxGroup = target.closest(`#${groupId}`)
        const isSearchInput = target.id === searchInputId
        const isCheckbox =
          target.getAttribute('role') === 'checkbox' ||
          target.closest('[role="checkbox"]')
        const isLabel =
          target.tagName === 'LABEL' && target.closest(`#${groupId}`)

        if (isInCheckboxGroup || isSearchInput || isCheckbox || isLabel) {
          e.preventDefault()
          handleEnter()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleEnter, groupId, searchInputId])

  // Reset draft when popover closes (handles Escape, click outside, etc.)
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) {
        // Reset draft when closing
        handleEscape()
      }
    },
    [handleEscape],
  )

  const appliedCount = value.length

  const toggle = useCallback((id: string) => {
    try {
      setDraft((prev) => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    } catch (error) {
      console.error('Error in toggle:', error)
    }
  }, [])

  const allOnPageSelected =
    options.length > 0 && options.every((o) => draft.has(o.id))
  const onSelectAllPage = useCallback(() => {
    try {
      setDraft((prev) => {
        const next = new Set(prev)
        const allSelected = options.every((o) => next.has(o.id))
        if (allSelected) options.forEach((o) => next.delete(o.id))
        else options.forEach((o) => next.add(o.id))
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
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, effectiveQ, onSearchTermChange])

  return (
    <div className="text-sm">
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button
            ref={setTriggerRef}
            id={buttonId}
            variant="tertiary"
            size="lg"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={groupId}
            className="inline-flex w-full items-center justify-between sm:min-w-[300px] md:min-w-[370px]"
            iconAfter={
              open ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )
            }
          >
            <span className="flex items-center gap-2">
              <span className="font-medium">{defaultLabel}</span>
              {appliedCount > 0 && (
                <span className="rounded-full bg-brand-surface-muted px-2 py-0.5 text-[11px]">
                  {appliedCount}
                </span>
              )}
            </span>
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="z-50 outline-none"
            style={{
              width: triggerWidth ? `${triggerWidth}px` : undefined,
            }}
            sideOffset={8}
            align="start"
            onOpenAutoFocus={(e) => {
              // Prevent Radix from focusing the trigger, focus input instead
              e.preventDefault()
              setTimeout(() => inputRef.current?.focus(), 0)
            }}
          >
            <div
              className="bg-brand-surface-muted"
              style={{
                borderRadius: '12px',
                boxShadow: `0 8px 16px 0 rgb(var(--text-strong) / 0.16)`,
              }}
            >
              {/* Search with leading icon - hidden when error */}
              {!error && (
                <>
                  <div className="relative p-1">
                    <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-6 w-6  -translate-y-1/2 text-[#6B7280]" />
                    <input
                      ref={inputRef}
                      id={searchInputId}
                      value={localQ}
                      onChange={(e) => {
                        const q = e.target.value
                        setLocalQ(q)
                        onSearchTermChange?.(q)
                      }}
                      placeholder={defaultPlaceholder}
                      className="h-10 w-full rounded-tl-md rounded-tr-md border border-transparent bg-transparent px-4 pl-10 pr-10 placeholder:text-[#6B7280] u-focus-ring"
                    />
                    {localQ && (
                      <button
                        type="button"
                        onClick={() => {
                          setLocalQ('')
                          onSearchTermChange?.('')
                          inputRef.current?.focus()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-text-strong u-focus-ring rounded"
                        aria-label={t('common.clearSearch')}
                      >
                        <Cross2Icon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="h-px bg-[#E0E0E0]" />
                </>
              )}

              {/* Checkbox group container */}
              <div
                id={groupId}
                role="group"
                aria-label={defaultLabel}
                className={
                  error
                    ? 'mt-2 max-h-64 overflow-auto rounded-md'
                    : 'max-h-64 overflow-auto rounded-md'
                }
              >
                {/* Select all row (active style when all selected) - hidden when loading, error, or search has value */}
                {!isLoading && !error && !localQ && (
                  <>
                    <MultiSelectOption
                      checked={allOnPageSelected}
                      onChange={(checked: boolean) => {
                        if (checked !== allOnPageSelected) {
                          onSelectAllPage()
                        }
                      }}
                      label={
                        allOnPageSelected
                          ? t('common.deselectAll')
                          : t('common.selectAll')
                      }
                      ariaLabel={
                        allOnPageSelected
                          ? t('common.deselectAll')
                          : t('common.selectAll')
                      }
                      isSelected={allOnPageSelected}
                      isSelectAll={true}
                    />
                    <div className="h-px bg-[#E0E0E0]" />
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
                  <div className="px-3 py-2 text-[#6B7280]">
                    {t('common.noResults')}
                  </div>
                )}

                {/* Options */}
                {!isLoading &&
                  !error &&
                  filtered.map((o) => {
                    const checked = draft.has(o.id)
                    return (
                      <MultiSelectOption
                        key={o.id}
                        checked={checked}
                        onChange={(checked: boolean) => {
                          if (checked !== draft.has(o.id)) {
                            toggle(o.id)
                          }
                        }}
                        label={o.label}
                        ariaLabel={t('multiSelect.selectItem', {
                          label: o.label,
                        })}
                      />
                    )
                  })}
              </div>

              {/* Footer (Cancel / Apply) */}
              <div className="h-px bg-[#E0E0E0]" />
              <div className="h-12 flex items-center justify-between px-4 py-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDraft(new Set(value))
                    setLocalQ('')
                    setOpen(false)
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onChange(Array.from(draft))
                    setLocalQ('')
                    setOpen(false)
                  }}
                >
                  {t('common.apply')}
                </Button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
