const statusClassMap = {
  Active: 'active',
  Completed: 'completed',
  Draft: 'draft',
  'In Progress': 'progress',
  'Local Only': 'local',
  Manual: 'manual',
  New: 'new',
  'Not Connected': 'offline',
  Open: 'open',
  Urgent: 'urgent',
}

function StatusBadge({ status }) {
  const statusClass = statusClassMap[status] || 'open'

  return <span className={`status-badge ${statusClass}`}>{status}</span>
}

export default StatusBadge
