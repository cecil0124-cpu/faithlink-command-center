import {
  exportDashboardData as exportLocalDashboardData,
  getTotalItems,
  loadDashboardData,
  normalizeDashboardData,
  resetDashboardData as resetLocalDashboardData,
  saveDashboardData,
  validateDashboardImport,
} from '../utils/storage'

export function getDashboardData() {
  return loadDashboardData()
}

export function updateDashboardData(data) {
  return saveDashboardData(data)
}

export function resetDashboardData() {
  return resetLocalDashboardData()
}

export function exportDashboardData(data) {
  return exportLocalDashboardData(data)
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

// Phase 6B keeps localStorage as the active data source.
// Later, this service can switch these functions to Firestore reads/writes
// without forcing the UI components to know which backend is active.
