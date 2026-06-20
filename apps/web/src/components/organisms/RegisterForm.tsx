import { useState } from 'react'
import { useNavigate } from 'react-router'
import { isAxiosError } from 'axios'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextLink } from '../atoms/TextLink'
import { FormField } from '../molecules/FormField'
import { SocialLoginGroup } from '../molecules/SocialLoginGroup'
import { register } from '../../services/auth'

export function RegisterForm() {
  const navigate = useNavigate()
  const [fields, setFields] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(fields)
      navigate('/login')
    } catch (err) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message
        setError(Array.isArray(msg) ? msg[0] : msg ?? 'Algo deu errado. Tente novamente.')
      } else {
        setError('Algo deu errado. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center h-full px-8 py-14 gap-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-[31px] font-semibold text-(--color-text) m-0">Cadastro</h1>
          <p className="text-xl text-(--color-text)">Olá! Preencha seus dados.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormField
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome completo"
            value={fields.name}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={fields.email}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-1">
            <FormField
              label="Senha"
              name="password"
              type="password"
              placeholder="••••••"
              value={fields.password}
              onChange={handleChange}
            />
            <div className="mt-2">
              <Checkbox id="remember-register" label="Lembrar-me" />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button type="submit" showArrow disabled={loading}>
            {loading ? 'Cadastrando…' : 'Cadastrar'}
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
