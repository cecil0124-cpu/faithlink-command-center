# Firebase Hosting Deploy

Phase 13A prepares FaithLink Command Center for Firebase Hosting only.

## What Phase 13A Does

- Publishes the Vite React app shell from `dist`.
- Uses Firebase Hosting SPA fallback to `/index.html`.
- Keeps all dashboard data in browser localStorage.
- Does not connect Firestore.
- Does not require Firebase Authentication.
- Does not sync private prayer requests, visitor info, or team data.

## Why Private Data Is Not Synced Yet

Private data should not move into Firebase until Firebase Authentication, user roles, team assignments, and Firestore Security Rules are connected and tested.

## Required Commands

```bash
npm run lint
npm run build
firebase login
firebase use --add
firebase deploy --only hosting
```

## Troubleshooting

- If `firebase` command is missing, install the Firebase CLI.
- If the project is wrong, run `firebase use --add`.
- If deploy fails, confirm the `dist` folder exists after `npm run build`.
- If refreshing nested pages breaks, confirm `firebase.json` rewrites `**` to `/index.html`.
- If `.firebaserc` still says `YOUR_FIREBASE_PROJECT_ID`, run `firebase use --add`.

## Post-Deploy Checklist

- Open the live Firebase Hosting URL.
- Check the dashboard loads.
- Check mobile layout.
- Check export/import.
- Check role preview.
- Confirm System Status still shows Firebase/Firestore as Not Connected.
- Confirm data remains local to each browser.
