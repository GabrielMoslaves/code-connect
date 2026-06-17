import { AuthBanner } from '../components/organisms/AuthBanner'
import { RegisterForm } from '../components/organisms/RegisterForm'
import { AuthLayout } from '../components/templates/AuthLayout'

export function RegisterPage() {
  return (
    <AuthLayout
      banner={
        <AuthBanner
          src="/register-screen-banner.png"
          alt="Code Connect cadastro banner"
        />
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
