import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

type ButtonProps = {
  variant?: ButtonVariant
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  children,
  onClick,
  disabled,
  type = 'button',
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'rounded-md px-3 py-1 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/30 disabled:opacity-60 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-white border border-border-light text-fg hover:bg-brand-50 active:border-brand-700',
    tertiary: 'bg-transparent text-muted hover:bg-brand-50 underline',
  }

  // Merge classes, allowing className to override base styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

