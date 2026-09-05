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
          <span className="admin-nav-user">Local mode — add Supabase env vars to enable cloud submissions</span>
        )}
      </nav>
      {!configured ? (
        <div className="setup-banner no-print">
          <strong>Supabase is not configured.</strong> Copy <code>.env.example</code> to <code>.env</code>,
          set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, run{' '}
          <code>supabase/schema.sql</code>, then restart the app. Until then, student links still copy and
          open from the name in the URL, but answers will not save to the cloud.
        </div>
      ) : null}
      {children}
    </div>
  )
}
