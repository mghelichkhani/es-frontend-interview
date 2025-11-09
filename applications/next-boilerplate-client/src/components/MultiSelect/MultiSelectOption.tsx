import React from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

type MultiSelectOptionProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  ariaLabel: string
  isSelected?: boolean
  isSelectAll?: boolean
}

export function MultiSelectOption({
  checked,
  onChange,
  label,
  ariaLabel,
  isSelected = false,
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
        'flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left ' +
        (isSelected ? 'bg-brand-surface-muted text-brand-primary-dark' : 'hover:bg-brand-surface-muted') +
        ' focus-within:bg-brand-surface-muted'
      }
    >
      <div className="flex items-center gap-2">
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(checked) => onChange(checked === true)}
          onFocus={handleFocus}
          aria-label={ariaLabel}
          className="w-4 h-4 rounded-sm border border-text flex items-center justify-center data-[state=checked]:bg-brand-primary u-focus-ring"
        >
          <Checkbox.Indicator>
            <CheckIcon className="w-3 h-3 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className={labelClassName}>
          {label}
        </span>
      </div>
    </label>
  )
}

