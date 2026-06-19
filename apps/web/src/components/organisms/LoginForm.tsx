import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextLink } from '../atoms/TextLink'
import { FormField } from '../molecules/FormField'
import { SocialLoginGroup } from '../molecules/SocialLoginGroup'

export function LoginForm() {
  return (
    <div className="flex flex-col justify-center h-full px-8 py-10 gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-(--color-text) m-0">Login</h1>
        <p className="text-sm text-(--color-text)">Boas-vindas! Faça seu login.</p>
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          label="Email ou usuário"
          name="email"
          type="text"
          placeholder="usuario123"
          autoComplete="username"
        />

        <div className="flex flex-col gap-1">
          <FormField
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between mt-2">
            <Checkbox id="remember" label="Lembrar-me" />
            <TextLink to="/forgot-password" className="text-sm">Esqueci a senha</TextLink>
          </div>
        </div>

        <Button type="submit" showArrow>
          Login
        </Button>
      </form>

      <SocialLoginGroup />

      <p className="text-sm text-(--color-text) text-center">
        Ainda não tem conta?{' '}
        <TextLink to="/register">Crie seu cadastro! 📋</TextLink>
      </p>
    </div>
  )
}
