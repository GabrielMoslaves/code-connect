import { SocialButton } from './SocialButton'

export function SocialLoginGroup() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-(--color-border)" />
        <span className="text-xs text-(--color-text) whitespace-nowrap">ou entre com outras contas</span>
        <div className="flex-1 h-px bg-(--color-border)" />
      </div>
      <div className="flex gap-4">
        <SocialButton
          iconSrc="/login-screen/Vector.svg"
          label="Github"
        />
        <SocialButton
          iconSrc="/login-screen/Group 2083.svg"
          label="Gmail"
        />
      </div>
    </div>
  )
}
