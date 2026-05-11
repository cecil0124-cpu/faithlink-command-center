import { APP_CONFIG } from '../config/appConfig'
import StatusBadge from './StatusBadge'

const systemItems = [
  { label: 'Data Mode', value: 'Local Browser Storage', status: 'Active' },
  { label: 'Firebase', value: APP_CONFIG.firebaseEnabled ? 'Connected' : 'Not Connected', status: APP_CONFIG.firebaseEnabled ? 'Active' : 'Not Connected' },
  { label: 'Auth', value: APP_CONFIG.authEnabled ? 'Connected' : 'Not Connected', status: APP_CONFIG.authEnabled ? 'Active' : 'Not Connected' },
  { label: 'Backup', value: 'Manual Export', status: 'Manual' },
  { label: 'App Version', value: APP_CONFIG.version, status: 'Local Only' },
]

function SystemStatus() {
  return (
    <section className="content-panel system-panel">
      <div className="panel-heading">
        <span className="eyebrow">System</span>
        <h2>System Status</h2>
      </div>
      <div className="system-list">
        {systemItems.map((item) => (
          <article className="system-row" key={item.label}>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <StatusBadge status={item.status} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default SystemStatus
