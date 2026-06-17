import { type ReactNode } from 'react'

type AuthLayoutProps = {
  banner: ReactNode
  children: ReactNode
}

export function AuthLayout({ banner, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-(--color-bg) flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-(--color-surface) rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl border border-black">
        <div className="hidden md:block">
          {banner}
        </div>
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}
