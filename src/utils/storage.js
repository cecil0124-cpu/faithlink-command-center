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

export function getDefaultDashboardData() {
  return {
    sections: normalizeItems(cloneData(sectionPages)),
    focusItems: defaultFocusItems(),
    activityLog: [],
    lastUpdated: now(),
  }
}

function normalizeDashboardData(data) {
  if (data?.sections) {
    return {
      ...data,
      sections: normalizeItems(data.sections),
      focusItems: data.focusItems || defaultFocusItems(),
      activityLog: data.activityLog || [],
      lastUpdated: data.lastUpdated || now(),
    }
  }

  return {
    sections: normalizeItems(data),
    focusItems: defaultFocusItems(),
    activityLog: [],
    lastUpdated: now(),
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
    return
  }

  // Export/import is a safety feature before Firebase connection.
  const file = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = 'faithlink-command-center-data.json'
  link.click()
  URL.revokeObjectURL(url)
}
