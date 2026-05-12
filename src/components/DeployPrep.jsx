const envVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_ADMIN_EMAIL',
]

const prepCards = [
  {
    title: 'Firebase Hosting',
    status: 'Active',
    items: [
      'Hosting: Active',
      'Build Output: dist',
      'Data Mode: Firestore Cloud Sync',
      'Firestore: Ready/Connected',
      'Auth: Active',
      'Deploy Command: firebase deploy',
    ],
  },
  {
    title: 'Firebase Setup',
    status: 'Cloud Sync Ready',
    items: [
      'Firebase app config loaded from .env.local',
      'Email/Password Auth connected',
      'Firestore client connected',
      'Rules: firestore.rules',
      'Indexes: firestore.indexes.json',
      'Migration: Available in Settings',
    ],
  },
  {
    title: 'Environment Variables',
    status: 'Pending',
    items: envVariables,
  },
  {
    title: 'Migration Plan',
    status: 'Available',
    items: [
      'Export Local Backup first',
      'Validate backup JSON',
      'Migrate Local Data to Cloud from Settings',
      'Export Cloud Backup after migration',
      'Verify dashboard on another signed-in device',
      'Keep rollback backup',
    ],
  },
  {
    title: 'Production Readiness',
    status: 'v1.0 Candidate',
    items: [
      'Authentication enabled',
      'Firestore rules ready for deploy',
      'Admin email set with VITE_ADMIN_EMAIL',
      'New users default to member',
      'Prayer/visitor data protected',
      'Mobile and print views checked',
      'Release Status: v1.0 Candidate',
    ],
  },
]

function DeployPrep() {
  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Phase 14</span>
        <h2>Deploy Prep</h2>
        <p>Track Firebase Hosting, Auth, Firestore sync, security rules, migration, and v1.0 release readiness.</p>
      </div>

      <div className="warning-banner">
        Cloud sync is enabled. Deploy Firestore rules before storing private prayer, visitor, or team data.
      </div>

      <div className="deploy-prep-grid">
        {prepCards.map((card) => (
          <article className="content-panel deploy-prep-card" key={card.title}>
            <div className="panel-heading">
              <span className="eyebrow">{card.status}</span>
              <h2>{card.title}</h2>
            </div>
            <ul>
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DeployPrep
