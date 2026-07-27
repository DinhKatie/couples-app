import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

interface AuthContextType {
  session: Session | null
  profile: Profile | null
  loading: boolean
}

interface Profile {
  id: string
  display_name: string
}

const AuthContext = createContext<AuthContextType>({ session: null, profile: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)

      if (session?.user) {
        const { data, error } = await supabase.from("profiles").select("*")
          .eq("id", session.user.id).single()

        if (error) {
          console.error(error)
        } else {
          setProfile(data)
        }
      }

      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, profile,loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}