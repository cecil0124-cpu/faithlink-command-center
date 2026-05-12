import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { APP_CONFIG } from '../config/appConfig'
import { db } from '../firebase/firebaseClient'
import { getDefaultDashboardData, normalizeDashboardData } from '../utils/storage'

const DASHBOARD_VERSION = 'v1'
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase()

function requireDb() {
  if (!db) {
    throw new Error('Firestore is not configured. Add Firebase values to .env.local and enable Cloud Firestore.')
  }

  return db
}

function userRef(userId) {
  return doc(requireDb(), 'users', userId)
}

function dashboardRef(userId) {
  return doc(requireDb(), 'userDashboards', userId)
}

function getUserRoleFromEmail(email) {
  return adminEmail && email?.toLowerCase() === adminEmail ? 'admin' : 'member'
}

function buildProfile(user, existingProfile = {}) {
  const role = existingProfile.role || getUserRoleFromEmail(user.email)

  return {
    email: user.email || existingProfile.email || '',
    displayName: user.displayName || existingProfile.displayName || '',
    role,
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  }
}

function buildDashboardDocument(data) {
  const dashboardData = normalizeDashboardData(data || getDefaultDashboardData())

  // v1 stores the personal command center as one user-owned document to keep
  // reads/writes simple on the Firebase Spark plan. Later team versions can
  // split prayer, visitor, media, and shared ministry records into scoped
  // collections with role-based rules.
  return {
    dashboardData,
    todayFocus: dashboardData.focusItems || [],
    activityLog: dashboardData.activityLog || [],
    settings: {
      appName: APP_CONFIG.appName,
      dataMode: APP_CONFIG.dataMode,
    },
    updatedAt: serverTimestamp(),
    version: DASHBOARD_VERSION,
  }
}

export async function getUserDashboardData(userId) {
  const snapshot = await getDoc(dashboardRef(userId))

  if (!snapshot.exists()) {
    return null
  }

  return normalizeDashboardData(snapshot.data().dashboardData)
}

export async function saveUserDashboardData(userId, data) {
  await setDoc(dashboardRef(userId), buildDashboardDocument(data), { merge: true })
  return normalizeDashboardData(data)
}

export async function updateUserDashboardData(userId, updater) {
  return runTransaction(requireDb(), async (transaction) => {
    const ref = dashboardRef(userId)
    const snapshot = await transaction.get(ref)
    const currentData = snapshot.exists()
      ? normalizeDashboardData(snapshot.data().dashboardData)
      : getDefaultDashboardData()
    const nextData = normalizeDashboardData(updater(currentData))

    transaction.set(ref, buildDashboardDocument(nextData), { merge: true })

    return nextData
  })
}

export async function getUserProfile(userId) {
  const snapshot = await getDoc(userRef(userId))

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export async function createOrUpdateUserProfile(user) {
  const ref = userRef(user.uid)
  const snapshot = await getDoc(ref)
  const existingProfile = snapshot.exists() ? snapshot.data() : null
  const profile = buildProfile(user, existingProfile || {})

  // Safer v1 role handling: new users default to member. Only the email in
  // VITE_ADMIN_EMAIL is created as admin. Before inviting team members, update
  // role assignment rules or manually set roles in Firestore.
  await setDoc(
    ref,
    existingProfile
      ? profile
      : {
          ...profile,
          role: getUserRoleFromEmail(user.email),
          createdAt: serverTimestamp(),
        },
    { merge: true },
  )

  return {
    id: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    role: existingProfile?.role || getUserRoleFromEmail(user.email),
  }
}

export async function getUserRole(userId) {
  const profile = await getUserProfile(userId)

  return profile?.role || 'member'
}

export async function saveActivityToFirestore(userId, activity) {
  return updateUserDashboardData(userId, (currentData) => ({
    ...currentData,
    activityLog: [activity, ...(currentData.activityLog || [])].slice(0, 30),
  }))
}

export async function migrateLocalDataToFirestore(userId, localData) {
  const migratedData = normalizeDashboardData(localData)

  await saveUserDashboardData(userId, migratedData)

  return migratedData
}

export async function exportFirestoreData(userId) {
  const dashboardData = await getUserDashboardData(userId)
  const profile = await getUserProfile(userId)

  return {
    appName: APP_CONFIG.appName,
    version: APP_CONFIG.version,
    exportedAt: new Date().toLocaleString(),
    dataMode: 'firestore',
    profile: profile
      ? {
          email: profile.email || '',
          displayName: profile.displayName || '',
          role: profile.role || 'member',
        }
      : null,
    dashboardData: dashboardData || getDefaultDashboardData(),
  }
}
