import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import type { ReactNode } from 'react'

export function ProtectedAdmin({ children }: { children: ReactNode }) {
  const { configured, loading, session } = useAuth()
  const location = useLocation()

  if (!configured) return children
  if (loading) {
    return (
      <div className="page-narrow">
        <h1>Loading instructor workspace</h1>
        <p>Checking your session…</p>
      </div>
    )
  }
  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return children
}
