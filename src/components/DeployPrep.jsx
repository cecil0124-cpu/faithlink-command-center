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
    title: 'Firebase Hosting',
    status: 'Ready for Deployment',
    items: [
      'Hosting Status: Ready for Deployment',
      'Build Output: dist',
      'Data Mode: localStorage',
      'Firestore: Not Connected',
      'Auth: Connected',
      'Deploy Command: firebase deploy --only hosting',
    ],
  },
  {
    title: 'Firebase Setup',
    status: 'Auth Connected',
    items: [
      'Firebase app config loaded from .env.local',
      'Email/Password Auth connected',
      'Firestore is still not connected',
      'Data sync is still not connected',
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
      'Next step: Firestore migration and security rules',
    ],
  },
]

function DeployPrep() {
  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Phase 13B</span>
        <h2>Deploy Prep</h2>
        <p>Track Firebase Hosting and Auth readiness while keeping dashboard data in browser localStorage.</p>
      </div>

      <div className="warning-banner">
        Auth is connected, but dashboard data remains stored in each browser until Firestore and security rules are connected.
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
