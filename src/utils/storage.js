import { APP_CONFIG } from '../config/appConfig'
import { sectionPages, todaysFocusItems } from '../data/dashboardData'

const STORAGE_KEY = 'faithlink-command-center-data'

function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

function createStableId(sectionId, item, index) {
  const titleSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `${sectionId}-${titleSlug}-${index}`
}

function now() {
  return new Date().toLocaleString()
}

function isoDateStamp() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeItems(data) {
  const timestamp = now()

  return Object.entries(data).reduce((sections, [sectionId, section]) => {
    sections[sectionId] = {
      ...section,
      items: (section.items || []).map((item, index) => ({
        ...item,
        id: item.id || createStableId(sectionId, item, index),
        pinned: Boolean(item.pinned),
        createdAt: item.createdAt || timestamp,
        updatedAt: item.updatedAt || item.createdAt || timestamp,
        checklist: (item.checklist || []).map((checklistItem) => ({
          label: checklistItem.label || checklistItem,
          completed: Boolean(checklistItem.completed),
        })),
      })),
    }

    return sections
  }, {})
}

function defaultFocusItems() {
  return todaysFocusItems.slice(0, 3).map((item, index) => ({
    id: `focus-${index}`,
    title: item.title,
  }))
}

export function getTotalItems(data) {
  return Object.values(data?.sections || {}).reduce(
    (total, section) => total + (section.items?.length || 0),
    0,
  )
}

export function getDefaultDashboardData() {
  return {
    sections: normalizeItems(cloneData(sectionPages)),
    focusItems: defaultFocusItems(),
    activityLog: [],
    lastExportedAt: '',
    lastUpdated: now(),
  }
}

export function normalizeDashboardData(data) {
  const sourceData = data?.dashboardData || data

  if (sourceData?.sections) {
    return {
      ...sourceData,
      sections: normalizeItems(sourceData.sections),
      focusItems: sourceData.focusItems || defaultFocusItems(),
      activityLog: sourceData.activityLog || [],
      lastExportedAt: sourceData.lastExportedAt || '',
      lastUpdated: sourceData.lastUpdated || now(),
    }
  }

  if (sourceData && typeof sourceData === 'object') {
    return {
      sections: normalizeItems(sourceData),
      focusItems: defaultFocusItems(),
      activityLog: [],
      lastExportedAt: '',
      lastUpdated: now(),
    }
  }

  return getDefaultDashboardData()
}

export function validateDashboardImport(data) {
  const dashboardData = data?.dashboardData || data

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { isValid: false, error: 'This file does not appear to be a valid FaithLink Command Center export.' }
  }

  if (!dashboardData || typeof dashboardData !== 'object' || Array.isArray(dashboardData)) {
    return { isValid: false, error: 'This file does not appear to be a valid FaithLink Command Center export.' }
  }

  if (!dashboardData.sections || typeof dashboardData.sections !== 'object') {
    return { isValid: false, error: 'This file does not appear to be a valid FaithLink Command Center export.' }
  }

  const normalizedData = normalizeDashboardData(data)

  if (Object.keys(normalizedData.sections).length === 0) {
    return { isValid: false, error: 'This file does not appear to be a valid FaithLink Command Center export.' }
  }

  return {
    isValid: true,
    dashboardData: normalizedData,
    preview: {
      appName: data.appName || APP_CONFIG.appName,
      exportedAt: data.exportedAt || normalizedData.lastExportedAt || 'Not provided',
      sectionsCount: Object.keys(normalizedData.sections).length,
      totalItems: getTotalItems(normalizedData),
    },
  }
}

export function loadDashboardData() {
  if (typeof window === 'undefined') {
    return getDefaultDashboardData()
  }

  const storedData = window.localStorage.getItem(STORAGE_KEY)

  if (!storedData) {
    return getDefaultDashboardData()
  }

  try {
    return normalizeDashboardData(JSON.parse(storedData))
  } catch {
    return getDefaultDashboardData()
  }
}

export function saveDashboardData(data) {
  if (typeof window === 'undefined') {
    return
  }

  // This localStorage layer will later be replaced by Firestore.
  // Auth will later determine user role and permissions before writes are allowed.
  // Firebase security rules will later protect prayer requests and visitor data.
  // Pinned items and activity will later sync by user account.
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetDashboardData() {
  const defaultData = getDefaultDashboardData()
  saveDashboardData(defaultData)
  return defaultData
}

export function exportDashboardData(data) {
  if (typeof window === 'undefined') {
    return null
  }

  const exportedAt = now()
  const exportData = {
    appName: APP_CONFIG.appName,
    version: APP_CONFIG.version,
    exportedAt,
    dataMode: APP_CONFIG.dataMode,
    totalItems: getTotalItems(data),
    dashboardData: {
      ...data,
      lastExportedAt: exportedAt,
    },
  }

  // Export/import is a safety feature before Firebase connection.
  const file = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `faithlink-command-center-backup-${isoDateStamp()}.json`
  link.click()
  URL.revokeObjectURL(url)

  return exportedAt
}
