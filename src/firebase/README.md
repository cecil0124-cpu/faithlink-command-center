# Firebase Setup

Firebase is active for Phase 14.

Current setup:

- Firebase Hosting serves the Vite build from `dist`.
- Firebase Auth uses Email/Password sign-in.
- Cloud Firestore stores signed-in user profiles and personal dashboards.
- localStorage remains available for export/import backups.

Relevant files:

- `src/firebase/firebaseClient.js`
- `src/services/firestoreService.js`
- `firestore.rules`
- `firestore.indexes.json`
- `docs/firestore-sync-setup.md`
