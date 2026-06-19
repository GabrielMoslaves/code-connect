type SocialButtonProps = {
  iconSrc: string
  label: string
  onClick?: () => void
}

export function SocialButton({ iconSrc, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 px-6 py-3 rounded-lg border border-(--color-border) bg-(--color-surface-input) hover:border-(--color-primary) transition-colors cursor-pointer"
    >
      <img src={iconSrc} alt="" aria-hidden="true" className="w-7 h-7" />
      <span className="text-xs text-(--color-text)">{label}</span>
    </button>
  )
}
