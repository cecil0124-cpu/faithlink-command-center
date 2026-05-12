import { APP_CONFIG } from '../config/appConfig'
import { sectionPages, todaysFocusItems, upcomingItems } from '../data/dashboardData'
import { priorityOptions } from './itemUtils'

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
        archived: Boolean(item.archived),
        archivedAt: item.archivedAt || '',
        dueDate: item.dueDate || '',
        priority: priorityOptions.includes(item.priority) ? item.priority : 'Normal',
        createdAt: item.createdAt || timestamp,
        updatedAt: item.updatedAt || item.createdAt || timestamp,
        completedAt: item.completedAt || '',
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

function normalizeUpcomingItems(items) {
  const source = Array.isArray(items) && items.length > 0 ? items : upcomingItems

  return source.map((item, index) => ({
    when: item.when || 'This week',
    title: item.title || `Weekly item ${index + 1}`,
  }))
}

function defaultRunSheet() {
  return [
    { id: 'pre-service', title: 'Pre-service', items: ['Unlock/check rooms', 'Power on audio, video, lyrics, and livestream systems', 'Confirm volunteers and final slides'] },
    { id: 'opening', title: 'Opening', items: ['Welcome', 'Opening scripture or call to worship'] },
    { id: 'praise-worship', title: 'Praise & Worship', items: ['Song 1', 'Song 2', 'Song 3 or response song'] },
    { id: 'prayer', title: 'Prayer', items: ['Corporate prayer', 'Special prayer needs'] },
    { id: 'announcements', title: 'Announcements', items: ['Church announcements', 'Upcoming events'] },
    { id: 'giving', title: 'Giving', items: ['Giving moment', 'Offering instructions'] },
    { id: 'sermon', title: 'Sermon', items: ['Sermon title', 'Scripture text', 'Speaker notes'] },
    { id: 'altar-response', title: 'Altar/Response', items: ['Altar call', 'Prayer team ready', 'Response song'] },
    { id: 'closing', title: 'Closing', items: ['Benediction', 'Final reminders'] },
    { id: 'post-service-media', title: 'Post-service media tasks', items: ['Stop stream and recording', 'Save/archive recordings', 'Capture sermon edit notes'] },
  ]
}

function normalizeRunSheet(runSheet) {
  const source = Array.isArray(runSheet) && runSheet.length > 0 ? runSheet : defaultRunSheet()

  return source.map((section, sectionIndex) => ({
    id: section.id || `run-sheet-${sectionIndex}`,
    title: section.title || 'Service Section',
    items: (section.items || []).map((item, itemIndex) =>
      typeof item === 'string'
        ? { id: `${section.id || sectionIndex}-item-${itemIndex}`, text: item }
        : { id: item.id || `${section.id || sectionIndex}-item-${itemIndex}`, text: item.text || '' },
    ),
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
    runSheet: normalizeRunSheet(),
    focusItems: defaultFocusItems(),
    upcomingItems: normalizeUpcomingItems(),
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
      runSheet: normalizeRunSheet(sourceData.runSheet),
      focusItems: sourceData.focusItems || defaultFocusItems(),
      upcomingItems: normalizeUpcomingItems(sourceData.upcomingItems),
      activityLog: sourceData.activityLog || [],
      lastExportedAt: sourceData.lastExportedAt || '',
      lastUpdated: sourceData.lastUpdated || now(),
    }
  }

  if (sourceData && typeof sourceData === 'object') {
    return {
      sections: normalizeItems(sourceData),
      runSheet: normalizeRunSheet(),
      focusItems: defaultFocusItems(),
      upcomingItems: normalizeUpcomingItems(),
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
