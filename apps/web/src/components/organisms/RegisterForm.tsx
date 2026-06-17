import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextLink } from '../atoms/TextLink'
import { FormField } from '../molecules/FormField'
import { SocialLoginGroup } from '../molecules/SocialLoginGroup'

export function RegisterForm() {
  return (
    <div className="flex flex-col justify-center h-full px-8 py-14 gap-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-[31px] font-semibold text-(--color-text) m-0">Cadastro</h1>
          <p className="text-xl text-(--color-text)">Olá! Preencha seus dados.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <FormField
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome completo"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Digite seu email"
          />
          <div className="flex flex-col gap-1">
            <FormField
              label="Senha"
              name="password"
              type="password"
              placeholder="••••••"
            />
            <div className="mt-2">
              <Checkbox id="remember-register" label="Lembrar-me" />
            </div>
          </div>

          <Button type="submit" showArrow>
            Cadastrar
          </Button>
        </form>
      </div>

      <SocialLoginGroup />

      <p className="text-lg text-(--color-text)">
        Já tem conta?{' '}
        <TextLink to="/login" className="text-lg">Faça seu login! →</TextLink>
      </p>
    </div>
  )
}
