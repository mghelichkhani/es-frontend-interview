import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'lg'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'sm',
  children,
  iconBefore,
  iconAfter,
  className = '',
  ...props
}, ref) => {
  const sizeStyles = {
    sm: variant === 'tertiary' ? 'h-[30px] rounded-lg px-4 text-sm font-medium' : 'h-8 rounded-lg px-4 text-sm font-medium',
    lg: variant === 'tertiary' ? 'h-[42px] rounded-lg px-4 text-base font-medium' : 'h-11 rounded-lg px-4 text-base font-medium',
  }
  
  const baseStyles = `${sizeStyles[size]} u-focus-ring colors-transition u-disabled flex justify-between gap-1`
  
  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary-dark active:opacity-90 disabled:hover:bg-brand-primary disabled:active:opacity-60',
    secondary: 'bg-transparent text-text hover:bg-brand-surface-muted active:bg-brand-surface-pressed disabled:hover:bg-transparent',
    tertiary: 'bg-brand-surface-muted text-text hover:bg-brand-surface-muted-hover active:bg-brand-surface-pressed disabled:hover:bg-brand-surface-muted border border-brand-primary-dark',
  }

  // Merge classes, allowing className to override base styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  return (
    <button
      ref={ref}
      type="button"
      className={combinedClassName}
      {...props}
    >
      {iconBefore && <span className="flex items-center h-full">{iconBefore}</span>}
      <span className="flex items-center w-full">
        {children}
      </span>
      {iconAfter && <span className="flex items-center h-full">{iconAfter}</span>}
    </button>
  )
})

Button.displayName = 'Button'

