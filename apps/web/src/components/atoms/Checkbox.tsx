import { type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        className={cn(
          'w-4 h-4 rounded border border-(--color-text-muted) bg-(--color-surface-input)',
          'accent-(--color-primary) cursor-pointer',
          className,
        )}
        {...props}
      />
      <span className="text-sm text-(--color-text-muted)">{label}</span>
    </label>
  )
}
