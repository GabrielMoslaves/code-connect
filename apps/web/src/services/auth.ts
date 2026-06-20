import api from '../lib/api'

export interface PublicUser {
  id: string
  name: string
  email: string
}

export async function register(data: { name: string; email: string; password: string }): Promise<PublicUser> {
  const res = await api.post<{ data: PublicUser }>('/auth/register', data)
  return res.data.data
}

export async function login(data: { email: string; password: string }): Promise<void> {
  const res = await api.post<{ data: { accessToken: string } }>('/auth/login', data)
  localStorage.setItem('access_token', res.data.data.accessToken)
}

export async function getMe(): Promise<PublicUser> {
  const res = await api.get<{ data: PublicUser }>('/auth/me')
  return res.data.data
}

export function logout(): void {
  localStorage.removeItem('access_token')
}
