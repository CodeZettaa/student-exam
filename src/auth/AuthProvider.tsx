import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

interface AuthContextValue {
  session: Session | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(configured)

  useEffect(() => {
    if (!configured) return undefined
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    let active = true
    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session)
        setLoading(false)
      }
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [configured])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      configured,
      signIn: async (email, password) => {
        const supabase = getSupabase()
        if (!supabase) return 'Supabase is not configured.'
        try {
          const { error } = await supabase.auth.signInWithPassword({ email, password })
          if (!error) return null
          if (/failed to fetch/i.test(error.message)) {
            return 'Cannot reach Supabase. Check VITE_SUPABASE_URL in .env (Project Settings → API → Project URL). Use the anon/public key that starts with eyJ, not sb_publishable_. Restart npm run dev after saving .env.'
          }
          return error.message
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Sign in failed'
          if (/failed to fetch|networkerror|load failed/i.test(message)) {
            return 'Cannot reach Supabase. The project URL in .env is wrong or the project is paused. Copy the Project URL and the anon JWT key (starts with eyJ) from Supabase → Project Settings → API, then restart the app.'
          }
          return message
        }
      },
      signOut: async () => {
        const supabase = getSupabase()
        if (!supabase) return
        await supabase.auth.signOut()
      },
    }),
    [configured, loading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used within AuthProvider')
  return value
}
