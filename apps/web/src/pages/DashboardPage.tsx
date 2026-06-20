import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getMe, logout, type PublicUser } from '../services/auth'

export function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<PublicUser | null>(null)

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => navigate('/login'))
  }, [navigate])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-(--color-bg)">
        <p className="text-(--color-text)">Carregando…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-(--color-bg) gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-(--color-text)">Olá, {user.name}!</h1>
        <p className="text-(--color-text)/70">{user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-2 rounded-lg border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-foreground) transition-colors cursor-pointer"
      >
        Sair
      </button>
    </div>
  )
}
