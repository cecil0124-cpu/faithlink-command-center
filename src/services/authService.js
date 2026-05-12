import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/firebaseClient'

function requireAuth() {
  if (!auth) {
    throw new Error('Firebase is not configured. Add Firebase values to .env.local first.')
  }

  return auth
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(requireAuth(), email, password)
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(requireAuth(), email, password)
}

export function signOutUser() {
  return signOut(requireAuth())
}

export function sendPasswordReset(email) {
  return sendPasswordResetEmail(requireAuth(), email)
}

export function subscribeToAuthChanges(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, callback)
}
