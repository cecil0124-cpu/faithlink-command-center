import { useEffect, useMemo, useState } from 'react'
import {
  sendPasswordReset,
  signIn,
  signOutUser,
  signUp,
  subscribeToAuthChanges,
} from '../services/authService'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  async function runAuthAction(action) {
    setAuthError('')
    setAuthLoading(true)

    try {
      return await action()
    } catch (error) {
      setAuthError(error.message || 'Authentication failed.')
      throw error
    } finally {
      setAuthLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      currentUser,
      authLoading,
      isAuthenticated: Boolean(currentUser),
      authError,
      login: (email, password) => runAuthAction(() => signIn(email, password)),
      register: (email, password) => runAuthAction(() => signUp(email, password)),
      logout: () => runAuthAction(() => signOutUser()),
      resetPassword: (email) => runAuthAction(() => sendPasswordReset(email)),
      clearAuthError: () => setAuthError(''),
    }),
    [authError, authLoading, currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
