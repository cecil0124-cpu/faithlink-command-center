import { APP_CONFIG } from '../config/appConfig'

function AppInstallPrep() {
  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Mobile + PWA Prep</span>
        <h2>App Install Prep</h2>
        <p>Prepare FaithLink Command Center to become an installable app later while keeping today’s data local and private.</p>
      </div>

      <div className="warning-banner">
        Current mode: local/dev web app. Install support is prepared, but full offline sync is not connected yet.
      </div>

      <div className="deploy-prep-grid">
        <article className="content-panel deploy-prep-card">
          <div className="panel-heading">
            <span className="eyebrow">Current Mode</span>
            <h2>Local Web App</h2>
          </div>
          <ul>
            <li>Data mode: {APP_CONFIG.dataMode}</li>
            <li>PWA: {APP_CONFIG.installableStatus}</li>
            <li>Mobile layout: {APP_CONFIG.mobileStatus}</li>
            <li>Backup before clearing browser data or switching devices</li>
          </ul>
        </article>

        <article className="content-panel deploy-prep-card">
          <div className="panel-heading">
            <span className="eyebrow">Later</span>
            <h2>Add To Home Screen</h2>
          </div>
          <ul>
            <li>Chrome/Edge: use the install icon or browser menu</li>
            <li>Safari iOS: Share, then Add to Home Screen</li>
            <li>Use the live hosted URL after a future deployment</li>
            <li>Keep backups until Firebase sync is active</li>
          </ul>
        </article>

        <article className="content-panel deploy-prep-card">
          <div className="panel-heading">
            <span className="eyebrow">Backup</span>
            <h2>LocalStorage Reminder</h2>
          </div>
          <ul>
            <li>Data is saved only in this browser on this device</li>
            <li>Export a backup before clearing browser data</li>
            <li>Export before changing devices</li>
            <li>Import backup JSON to restore locally</li>
          </ul>
        </article>

        <article className="content-panel deploy-prep-card">
          <div className="panel-heading">
            <span className="eyebrow">Not Ready Yet</span>
            <h2>Future Connections</h2>
          </div>
          <ul>
            <li>Firebase sync</li>
            <li>Real login</li>
            <li>Multi-device data sync</li>
            <li>Service worker offline cache</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AppInstallPrep
