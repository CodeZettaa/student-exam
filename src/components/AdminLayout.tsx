import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import type { ReactNode } from 'react'

export function AdminLayout({ children }: { children: ReactNode }) {
  const { configured, session, signOut } = useAuth()

  return (
    <div className="admin-shell">
      <nav className="admin-nav no-print">
        <NavLink to="/admin" end>
          Generate
        </NavLink>
        <NavLink to="/admin/submissions">Submissions</NavLink>
        <span className="admin-nav-spacer" />
        {configured && session ? (
          <>
            <span className="admin-nav-user">{session.user.email}</span>
            <button type="button" className="btn btn-ghost" onClick={() => void signOut()}>
              Sign out
            </button>
          </>
        ) : configured ? null : (
          <span className="admin-nav-user">Local mode — add Supabase env vars to enable submissions</span>
        )}
      </nav>
      {children}
    </div>
  )
}
