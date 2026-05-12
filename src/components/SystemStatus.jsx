import { APP_CONFIG } from '../config/appConfig'
import { useAuth } from '../context/useAuth'
import StatusBadge from './StatusBadge'

function SystemStatus({ cloudStatus }) {
  const { currentUser, realRole } = useAuth()
  const systemItems = [
    { label: 'Firebase', value: APP_CONFIG.firebaseConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firebaseConnected ? 'Active' : 'Not Connected' },
    { label: 'Hosting', value: APP_CONFIG.hostingStatus, status: 'Active' },
    { label: 'Auth', value: APP_CONFIG.authConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.authConnected ? 'Active' : 'Not Connected' },
    { label: 'Signed-in User', value: currentUser?.email || 'Not signed in', status: currentUser ? 'Active' : 'Manual' },
    { label: 'Firestore', value: APP_CONFIG.firestoreConnected ? 'Connected' : 'Not Connected', status: APP_CONFIG.firestoreConnected ? 'Active' : 'Not Connected' },
    { label: 'Data Mode', value: 'Firestore Cloud Sync', status: 'Active' },
    { label: 'Sync', value: APP_CONFIG.syncStatus, status: 'Active' },
    { label: 'Real Role', value: realRole || 'Loading profile', status: realRole ? 'Active' : 'Manual' },
    { label: 'Last Cloud Save', value: cloudStatus?.lastCloudSaveAt || 'Not yet', status: 'Active' },
    { label: 'Local Backup', value: 'Still Available', status: 'Manual' },
    { label: 'PWA', value: APP_CONFIG.installableStatus, status: 'Prep' },
    { label: 'Offline Cache', value: 'Not Connected', status: 'Not Connected' },
    { label: 'Mobile Layout', value: APP_CONFIG.mobileStatus, status: 'Active' },
    { label: 'Deployment Phase', value: APP_CONFIG.deploymentPhase, status: 'Active' },
    { label: 'App Version', value: APP_CONFIG.version, status: APP_CONFIG.releaseStatus },
  ]

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
