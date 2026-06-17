import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'
  showArrow?: boolean
}

export function Button({ variant = 'primary', showArrow = false, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 w-full rounded-lg px-6 py-3 font-semibold text-base transition-colors cursor-pointer',
        variant === 'primary' && 'bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover)',
        className,
      )}
      {...props}
    >
      {children}
      {showArrow && <span aria-hidden="true">→</span>}
    </button>
  )
}
