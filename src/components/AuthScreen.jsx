import { useState } from 'react'
import { APP_CONFIG } from '../config/appConfig'
import { isFirebaseConfigured } from '../firebase/firebaseClient'
import { useAuth } from '../context/useAuth'

function AuthScreen() {
  const { authError, authLoading, clearAuthError, login, register, resetPassword } = useAuth()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [localError, setLocalError] = useState('')

  const isRegistering = mode === 'register'
  const isResetting = mode === 'reset'

  function switchMode(nextMode) {
    setMode(nextMode)
    setMessage('')
    setLocalError('')
    clearAuthError()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLocalError('')

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setLocalError('Enter your email address.')
      return
    }

    try {
      if (isResetting) {
        await resetPassword(trimmedEmail)
        setMessage('Password reset email sent if the account exists.')
        return
      }

      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters.')
        return
      }

      if (isRegistering && password !== confirmPassword) {
        setLocalError('Passwords must match.')
        return
      }

      if (isRegistering) {
        await register(trimmedEmail, password)
      } else {
        await login(trimmedEmail, password)
      }
    } catch {
      // AuthContext exposes the user-facing error message.
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand-mark auth-mark" aria-hidden="true">FL</div>
        <span className="eyebrow">Firebase Auth</span>
        <h1>FaithLink Command Center</h1>
        <p>A personal command center for ministry, media, music, technology, AI workflows, and planning.</p>
        <p className="backup-reminder">Dashboard data is still stored locally in this browser until Firestore sync is added.</p>

        {!isFirebaseConfigured && (
          <p className="import-error">Firebase environment variables are missing. Add `.env.local` before signing in.</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>

          {!isResetting && (
            <label>
              Password
              <input
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
            </label>
          )}

          {isRegistering && (
            <label>
              Confirm Password
              <input
                autoComplete="new-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                value={confirmPassword}
              />
            </label>
          )}

          {(localError || authError) && <p className="import-error">{localError || authError}</p>}
          {message && <p className="feedback-message">{message}</p>}

          <button className="primary-button" disabled={authLoading || !isFirebaseConfigured} type="submit">
            {authLoading
              ? 'Working...'
              : isResetting
                ? 'Send Reset Email'
                : isRegistering
                  ? 'Create Account'
                  : 'Sign In'}
          </button>
        </form>

        <div className="auth-actions">
          <button className="secondary-button" onClick={() => switchMode('signin')} type="button">Sign In</button>
          <button className="secondary-button" onClick={() => switchMode('register')} type="button">Create Account</button>
          <button className="secondary-button" onClick={() => switchMode('reset')} type="button">Forgot Password</button>
        </div>

        <small>{APP_CONFIG.version}</small>
      </section>
    </main>
  )
}

export default AuthScreen
