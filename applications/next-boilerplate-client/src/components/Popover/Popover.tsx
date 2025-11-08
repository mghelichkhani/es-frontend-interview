'use client'
import { useEffect, useRef, ReactNode } from 'react'

type PopoverProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: ReactNode
  children: ReactNode
  onEscape?: () => void
  onEnter?: () => void
  align?: 'left' | 'right'
  width?: string
  triggerWidth?: number
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  onEscape,
  onEnter,
  align = 'left',
  width = 'w-80',
  triggerWidth,
}: PopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  // Click outside to close
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      // Don't close if clicking inside the container (trigger or popover)
      if (containerRef.current && !containerRef.current.contains(target)) {
        onOpenChange(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onOpenChange])

  // Focus trap: keep focus within popover when open
  useEffect(() => {
    if (!open || !popRef.current) return
    const popover = popRef.current
    const focusableElements = popover.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  // Keyboard: Esc and Enter
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onEscape?.()
        onOpenChange(false)
      } else if (e.key === 'Enter') {
        const target = e.target as HTMLElement
        // Exclude buttons - they handle their own Enter key
        const isButton = target.tagName === 'BUTTON' || target.closest('button')
        // Allow Enter in inputs/textareas if onEnter is provided (for MultiSelect apply behavior)
        if (onEnter && popRef.current?.contains(target) && !isButton) {
          const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
          if (isInput) {
            e.preventDefault()
            onEnter()
          }
        } else if (!isButton && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          onEnter?.()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onEscape, onEnter, onOpenChange])

  return (
    <div ref={containerRef} className="relative inline-block">
      {trigger}
      {open && (
        <div
          ref={popRef}
          className={`absolute z-50 mt-2 ${triggerWidth ? '' : width} ${align === 'right' ? 'right-0' : 'left-0'}`}
          style={triggerWidth ? { width: `${triggerWidth}px` } : undefined}
        >
          {children}
        </div>
      )}
    </div>
  )
}

