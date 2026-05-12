# Deployment Checklist

Use this checklist before any future Firebase Hosting deployment.

## Local Checks

- Run `npm install`.
- Run `npm run lint`.
- Run `npm run build`.
- Confirm `.env.local` exists only when Firebase config is needed.
- Confirm no secrets are committed.
- Confirm a local backup export is saved from Settings.
- Test role preview behavior.
- Test export/import.
- Test mobile view.
- Test print views for Weekly Review, Sunday Run Sheet, and Sunday Service checklist.

## Firebase Hosting Later

- Install/use Firebase CLI only in the future Firebase phase.
- Run Firebase CLI login later.
- Run `firebase init hosting` later.
- Confirm build output directory before deploy.
- Run `firebase deploy` later.
- Verify the live app URL.
- Document the deployment URL.

## Final Safety Check

- Firebase Auth must be ready before real team access.
- Firestore rules must be reviewed before storing private prayer or visitor data.
- Keep local backup exports after deployment.
