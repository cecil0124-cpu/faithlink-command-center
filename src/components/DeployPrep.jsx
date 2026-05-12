const envVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

const prepCards = [
  {
    title: 'Firebase Setup',
    status: 'Not Started',
    items: [
      'Create Firebase project',
      'Stay on Spark/free plan if possible',
      'Register web app',
      'Copy config into .env.local later',
      'Enable Auth and Firestore later',
      'Review security rules before private data',
    ],
  },
  {
    title: 'Environment Variables',
    status: 'Pending',
    items: envVariables,
  },
  {
    title: 'Migration Plan',
    status: 'Planned',
    items: [
      'Export localStorage backup first',
      'Validate backup JSON',
      'Map local sections to Firestore collections',
      'Create user roles and assignments',
      'Verify counts and permissions',
      'Keep rollback backup',
    ],
  },
  {
    title: 'Production Readiness',
    status: 'Not Ready',
    items: [
      'Authentication enabled',
      'Firestore rules tested',
      'Admin account created',
      'Team roles assigned',
      'Prayer/visitor data protected',
      'Mobile and print views checked',
    ],
  },
]

function DeployPrep() {
  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Phase 10</span>
        <h2>Deploy Prep</h2>
        <p>Prepare Firebase setup, environment variables, migration planning, and production readiness before any connection is made.</p>
      </div>

      <div className="warning-banner">
        Firebase is not connected yet. This page is preparation only.
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
