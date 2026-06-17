type AuthBannerProps = {
  src: string
  alt?: string
}

export function AuthBanner({ src, alt = '' }: AuthBannerProps) {
  return (
    <div className="relative h-full min-h-[480px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
