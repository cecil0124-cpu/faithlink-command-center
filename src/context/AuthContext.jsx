import { useEffect, useMemo, useState } from 'react'
import {
  sendPasswordReset,
  signIn,
  signOutUser,
  signUp,
  subscribeToAuthChanges,
} from '../services/authService'
import { createOrUpdateUserProfile } from '../services/firestoreService'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setCurrentUser(user)

      if (!user) {
        setUserProfile(null)
        setAuthLoading(false)
        return
      }

      try {
        const profile = await createOrUpdateUserProfile(user)
        setUserProfile(profile)
        setAuthError('')
      } catch (error) {
        setUserProfile(null)
        setAuthError(error.message || 'Unable to load Firestore user profile.')
      } finally {
        setAuthLoading(false)
      }
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
      userProfile,
      realRole: userProfile?.role || null,
      authLoading,
      isAuthenticated: Boolean(currentUser),
      authError,
      login: (email, password) => runAuthAction(() => signIn(email, password)),
      register: (email, password) => runAuthAction(() => signUp(email, password)),
      logout: () => runAuthAction(() => signOutUser()),
      resetPassword: (email) => runAuthAction(() => sendPasswordReset(email)),
      clearAuthError: () => setAuthError(''),
    }),
    [authError, authLoading, currentUser, userProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
