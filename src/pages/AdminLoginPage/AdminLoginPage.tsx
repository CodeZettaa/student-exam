import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'

export function AdminLoginPage() {
  const { configured, loading, session, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  if (!configured) {
    return (
      <div className="page-narrow">
        <h1>Supabase is not configured</h1>
        <p>
          Copy <code>.env.example</code> to <code>.env</code> and set <code>VITE_SUPABASE_URL</code> and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code>. Then apply <code>supabase/schema.sql</code> in the Supabase SQL
          editor and create an instructor Auth user.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="page-narrow">
        <h1>Loading</h1>
      </div>
    )
  }

  if (session) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const message = await signIn(email.trim(), password)
    setSubmitting(false)
    if (message) {
      setError(message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="page-narrow login-card">
      <p className="exam-kicker">Instructor access</p>
      <h1>Admin login</h1>
      <p className="hint">Only authenticated instructors can open the dashboard, submissions, and answer keys.</p>
      <form className="login-form" onSubmit={(event) => void handleSubmit(event)}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="notice danger">{error}</p> : null}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
