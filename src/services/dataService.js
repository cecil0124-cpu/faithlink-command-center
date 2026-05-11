import {
  exportDashboardData as exportLocalDashboardData,
  loadDashboardData,
  resetDashboardData as resetLocalDashboardData,
  saveDashboardData,
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

// Phase 5 keeps localStorage as the active data source.
// Later, this service can switch these functions to Firestore reads/writes
// without forcing the UI components to know which backend is active.
