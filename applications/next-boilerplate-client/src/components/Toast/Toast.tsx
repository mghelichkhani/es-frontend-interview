'use client'

import { useTranslations } from 'next-intl'

import { Cross2Icon } from '@radix-ui/react-icons'
import * as ToastPrimitive from '@radix-ui/react-toast'

type ToastProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description: string
  duration?: number
}

export function Toast({
  open,
  onOpenChange,
  title,
  description,
  duration = 3000,
}: ToastProps) {
  const t = useTranslations()

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={duration}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        className="bg-brand-surface rounded-lg border border-border-subtle p-4 shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]"
        style={{
          boxShadow: '0 8px 16px 0 rgb(var(--text-strong) / 0.16)',
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {title && (
              <ToastPrimitive.Title className="text-sm font-semibold text-text-strong">
                {title}
              </ToastPrimitive.Title>
            )}
            <ToastPrimitive.Description className="text-sm text-text mt-1">
              {description}
            </ToastPrimitive.Description>
          </div>
          <ToastPrimitive.Close className="flex-shrink-0 text-text-muted hover:text-text-strong transition-colors u-focus-ring rounded">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">{t('common.close')}</span>
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] hidden md:flex flex-col p-6 gap-2 w-full max-w-sm m-0 list-none outline-none" />
    </ToastPrimitive.Provider>
  )
}
