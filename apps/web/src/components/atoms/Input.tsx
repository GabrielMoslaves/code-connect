import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg px-4 py-3 text-sm bg-(--color-input-bg) text-(--color-input-text)',
        'border border-transparent outline-none',
        'placeholder:text-(--color-input-text)/50',
        'focus:border-(--color-primary) transition-colors',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
