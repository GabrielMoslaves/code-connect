import { type LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-(--color-text) mb-1.5', className)}
      {...props}
    >
      {children}
    </label>
  )
}
