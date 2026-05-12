# Firebase Auth Setup

Phase 13B connects Firebase Authentication only. Dashboard data still stays in browser localStorage.

## Firebase Console

- Open the Firebase Console.
- Select the FaithLink Firebase project.
- Go to Authentication.
- Enable Authentication.
- Enable the Email/Password sign-in provider.
- Do not enable Firestore data storage for dashboard data yet.

## Environment Setup

- Copy `.env.example` to `.env.local`.
- Add the Firebase web app config values:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- Never commit `.env.local`.

## Local Test

```bash
npm run lint
npm run build
npm run dev
```

Then test:

- Create account.
- Sign in.
- Sign out.
- Password reset.
- Confirm System Status says Firestore is Not Connected.
- Confirm dashboard export/import still works.
- Confirm dashboard data stays local to the browser.

## Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Important Limit

Firebase Auth identifies a user, but it does not sync dashboard data yet. Firestore sync and security rules belong to a later phase.
