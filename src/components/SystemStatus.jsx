import { APP_CONFIG } from '../config/appConfig'
import StatusBadge from './StatusBadge'

const systemItems = [
  { label: 'Firebase Project', value: APP_CONFIG.firebaseConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firebaseConnected ? 'Active' : 'Not Connected' },
  { label: 'Hosting', value: APP_CONFIG.hostingStatus, status: APP_CONFIG.hostingStatus },
  { label: 'Auth', value: APP_CONFIG.authConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.authConnected ? 'Active' : 'Not Connected' },
  { label: 'Firestore', value: APP_CONFIG.firestoreConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firestoreConnected ? 'Active' : 'Not Connected' },
  { label: 'Data Mode', value: APP_CONFIG.dataMode, status: 'Active' },
  { label: 'Deployment Phase', value: APP_CONFIG.deploymentPhase, status: 'Prep' },
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
