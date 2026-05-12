# Firestore Sync Setup

Phase 14 connects Firestore cloud sync for the v1.0 FaithLink Command Center release candidate.

## Enable Firestore

1. Open Firebase Console.
2. Select `faithlink-command-center`.
3. Enable Authentication with the Email/Password provider.
4. Enable Cloud Firestore.
5. Start in production mode when possible.
6. Deploy the checked-in rules before storing private data.

```bash
npm run lint
npm run build
firebase deploy --only firestore:rules
firebase deploy --only hosting
```

## Data Structure

v1 uses one private dashboard document per signed-in account:

```text
users/{uid}
  email
  displayName
  role
  createdAt
  updatedAt
  lastLoginAt

userDashboards/{uid}
  dashboardData
  todayFocus
  activityLog
  settings
  updatedAt
  version
```

This keeps reads and writes simple for the Firebase Spark plan. Later team releases can split prayer requests, visitor records, media tasks, and shared team data into separate collections with role-based rules.

## Security Rules

Rules live in `firestore.rules` and deny public access. A signed-in user can read and write only:

- `users/{theirUid}`
- `userDashboards/{theirUid}`

Users cannot update their own `role` after the profile exists. Shared/team collections are intentionally closed in v1.

## Roles

New users default to `member`. Set the first admin by adding this to `.env.local` before the admin account signs in:

```bash
VITE_ADMIN_EMAIL=your_admin_email@example.com
```

If a profile already exists, update roles manually in Firestore. Test with one admin email and one member email before inviting team members.

## Migration

1. Sign in.
2. Open Settings.
3. Export Local Backup.
4. Click `Migrate Local Data to Cloud`.
5. Confirm: `This will copy your current browser data into your cloud dashboard for this signed-in account.`
6. Load Cloud Data.
7. Export Cloud Backup.

Migration does not delete localStorage.

## Import And Backup

- `Export Local Backup` downloads the browser localStorage dashboard.
- `Export Cloud Backup` downloads the Firestore dashboard for the signed-in user.
- Import defaults to local backup only.
- Importing to cloud requires confirmation because it overwrites the signed-in user's cloud dashboard.

## Rollback

1. Export Cloud Backup.
2. Restore Local Backup.
3. Set `APP_CONFIG.dataMode` back to `localStorage` if needed.
4. Run `npm run lint` and `npm run build`.
5. Redeploy hosting.
6. Do not delete Firestore data until the local rollback is verified.
