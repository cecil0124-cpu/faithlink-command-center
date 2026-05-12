import {
  exportDashboardData as exportLocalDashboardData,
  getDefaultDashboardData,
  getTotalItems,
  loadDashboardData,
  normalizeDashboardData,
  resetDashboardData as resetLocalDashboardStorageData,
  saveDashboardData,
  validateDashboardImport,
} from '../utils/storage'
import { APP_CONFIG } from '../config/appConfig'
import {
  exportFirestoreData,
  getUserDashboardData,
  migrateLocalDataToFirestore,
  saveUserDashboardData,
} from './firestoreService'

function shouldUseFirestore(user) {
  return APP_CONFIG.dataMode === 'firestore' && APP_CONFIG.firestoreConnected && Boolean(user?.uid)
}

function isoDateStamp() {
  return new Date().toISOString().slice(0, 10)
}

function downloadJsonBackup(payload, filename) {
  if (typeof window === 'undefined') {
    return null
  }

  const file = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)

  return payload.exportedAt
}

export function loadLocalDashboardData() {
  return loadDashboardData()
}

export function saveLocalDashboardData(data) {
  return saveDashboardData(data)
}

export function resetLocalDashboardDataOnly() {
  return resetLocalDashboardStorageData()
}

export function resetLocalDashboardData() {
  return resetLocalDashboardDataOnly()
}

export function getDashboardData() {
  return loadLocalDashboardData()
}

export async function getSyncedDashboardData(user) {
  if (!shouldUseFirestore(user)) {
    return loadLocalDashboardData()
  }

  const cloudData = await getUserDashboardData(user.uid)

  return cloudData || getDefaultDashboardData()
}

export async function updateDashboardData(data, user) {
  saveLocalDashboardData(data)

  if (shouldUseFirestore(user)) {
    await saveUserDashboardData(user.uid, data)
  }

  return data
}

export function resetDashboardData() {
  return resetLocalDashboardDataOnly()
}

export function exportDashboardData(data) {
  return exportLocalDashboardData(data)
}

export function exportLocalBackup(data) {
  return exportLocalDashboardData(data)
}

export async function exportCloudBackup(user) {
  if (!shouldUseFirestore(user)) {
    throw new Error('Sign in before exporting a Firestore cloud backup.')
  }

  const exportData = await exportFirestoreData(user.uid)
  return downloadJsonBackup(
    exportData,
    `faithlink-command-center-cloud-backup-${isoDateStamp()}.json`,
  )
}

export async function migrateLocalBackupToCloud(user, localData = loadLocalDashboardData()) {
  if (!shouldUseFirestore(user)) {
    throw new Error('Sign in before migrating local data to Firestore.')
  }

  return migrateLocalDataToFirestore(user.uid, localData)
}

export function validateImportData(data) {
  return validateDashboardImport(data)
}

export function prepareDashboardData(data) {
  return normalizeDashboardData(data)
}

export function getDashboardItemCount(data) {
  return getTotalItems(data)
}
