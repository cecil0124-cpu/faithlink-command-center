import { APP_CONFIG } from '../config/appConfig'
import StatusBadge from './StatusBadge'

const systemItems = [
  { label: 'Firebase Project', value: APP_CONFIG.firebaseConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firebaseConnected ? 'Active' : 'Not Connected' },
  { label: 'Hosting', value: APP_CONFIG.hostingStatus, status: 'Prep' },
  { label: 'Auth', value: APP_CONFIG.authConnected ? 'Connected' : 'Not Required', status: APP_CONFIG.authConnected ? 'Active' : 'Manual' },
  { label: 'Firestore', value: APP_CONFIG.firestoreConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firestoreConnected ? 'Active' : 'Not Connected' },
  { label: 'Data Mode', value: APP_CONFIG.dataMode, status: 'Active' },
  { label: 'PWA', value: APP_CONFIG.installableStatus, status: 'Prep' },
  { label: 'Offline Cache', value: 'Not Connected', status: 'Not Connected' },
  { label: 'Mobile Layout', value: APP_CONFIG.mobileStatus, status: 'Active' },
  { label: 'Data Sync', value: APP_CONFIG.dataSyncStatus, status: 'Not Connected' },
  { label: 'Deployment Phase', value: '13A Hosting Only', status: 'Prep' },
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
