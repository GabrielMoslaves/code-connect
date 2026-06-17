import { Link, type LinkProps } from 'react-router'
import { cn } from '../../lib/utils'

type TextLinkProps = LinkProps & { className?: string }

export function TextLink({ className, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn('text-(--color-accent) hover:underline transition-colors', className)}
      {...props}
    >
      {children}
    </Link>
  )
}
