import React from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

type MultiSelectOptionProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  ariaLabel: string
  isSelectAll?: boolean
}

export function MultiSelectOption({
  checked,
  onChange,
  label,
  ariaLabel,
  isSelectAll = false,
}: MultiSelectOptionProps) {
  const handleFocus = () => {
    // Scroll into view when focused via keyboard navigation
    const label = document.activeElement?.closest('label')
    label?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  const labelClassName = isSelectAll
    ? 'font-medium'
    : 'truncate text-text-strong'

  return (
    <label
      className={
        'flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left transition-colors hover:bg-border-divider focus-within:bg-border-divider'
      }
    >
      <div className="flex items-center gap-2">
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(checked) => onChange(checked === true)}
          onFocus={handleFocus}
          aria-label={ariaLabel}
          className="w-5 h-5 rounded border border-text-muted flex items-center justify-center data-[state=checked]:bg-white data-[state=checked]:p-[1px] u-focus-ring"
        >
          <Checkbox.Indicator className="w-[calc(100%-1px)] h-[calc(100%-1px)] rounded-sm bg-brand-primary flex items-center justify-center">
            <CheckIcon className="w-3.5 h-3.5 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className={labelClassName}>{label}</span>
      </div>
    </label>
  )
}
