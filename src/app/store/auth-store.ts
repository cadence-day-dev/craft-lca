import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isSignedIn: boolean
  username: string | null
  signIn: (username: string, password: string) => boolean
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isSignedIn: false,
      username: null,
      signIn: (username: string, password: string) => {
        if (username === 'craft' && password === 'hi') {
          set({ isSignedIn: true, username })
          return true
        }
        return false
      },
      signOut: () => {
        set({ isSignedIn: false, username: null })
      },
    }),
    {
      name: 'auth-store',
    }
  )
)