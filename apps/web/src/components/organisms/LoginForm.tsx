import { useState } from 'react'
import { useNavigate } from 'react-router'
import { isAxiosError } from 'axios'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextLink } from '../atoms/TextLink'
import { FormField } from '../molecules/FormField'
import { SocialLoginGroup } from '../molecules/SocialLoginGroup'
import { login } from '../../services/auth'

export function LoginForm() {
  const navigate = useNavigate()
  const [fields, setFields] = useState({ email: '', password: '' })
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
      await login(fields)
      navigate('/dashboard')
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
    <div className="flex flex-col justify-center h-full px-8 py-10 gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-(--color-text) m-0">Login</h1>
        <p className="text-sm text-(--color-text)">Boas-vindas! Faça seu login.</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField
          label="Email ou usuário"
          name="email"
          type="text"
          placeholder="usuario123"
          autoComplete="username"
          value={fields.email}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-1">
          <FormField
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between mt-2">
            <Checkbox id="remember" label="Lembrar-me" />
            <TextLink to="/forgot-password" className="text-sm">Esqueci a senha</TextLink>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <Button type="submit" showArrow disabled={loading}>
          {loading ? 'Entrando…' : 'Login'}
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
