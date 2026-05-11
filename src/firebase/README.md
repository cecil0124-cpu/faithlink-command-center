# Firebase Preparation

This folder is documentation and placeholder-only setup for a future Firebase phase.

Firebase is not installed, initialized, or connected yet. The live app still uses browser `localStorage` through `src/services/dataService.js`.

Future work:

- Create a Firebase project.
- Add `.env.local` with `VITE_` Firebase variables.
- Initialize Firebase Auth.
- Move dashboard data from localStorage to Firestore.
- Add security rules before storing private prayer, visitor, or ministry data.
