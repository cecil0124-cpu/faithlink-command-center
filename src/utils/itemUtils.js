export const priorityOptions = ['Low', 'Normal', 'High', 'Critical']

export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10)
}

export function isCompleted(item) {
  return item.status === 'Completed'
}

export function isOverdue(item, today = getTodayDateString()) {
  return Boolean(item.dueDate) && item.dueDate < today && !isCompleted(item)
}

export function isHighAttentionPriority(item) {
  return item.priority === 'High' || item.priority === 'Critical'
}

export function isDueSoon(item, today = getTodayDateString(), daysAhead = 7) {
  if (!item.dueDate || isCompleted(item)) {
    return false
  }

  const dueDate = new Date(`${item.dueDate}T00:00:00`)
  const startDate = new Date(`${today}T00:00:00`)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + daysAhead)

  return dueDate >= startDate && dueDate <= endDate
}

export function getWeekBounds(date = new Date()) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - start.getDay())

  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

export function parseLocalTimestamp(value) {
  if (!value) {
    return null
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function wasCompletedThisWeek(item, weekBounds = getWeekBounds()) {
  if (!isCompleted(item)) {
    return false
  }

  const completedDate = parseLocalTimestamp(item.completedAt || item.updatedAt)

  if (!completedDate) {
    return false
  }

  return completedDate >= weekBounds.start && completedDate <= weekBounds.end
}

export function formatDueDate(dateString) {
  if (!dateString) {
    return 'No due date'
  }

  const date = new Date(`${dateString}T00:00:00`)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
