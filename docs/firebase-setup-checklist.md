# Firebase Setup Checklist

Firebase is not connected yet. Use this checklist when the project is ready for a future Firebase phase.

## Setup Steps

- Create a Firebase project for FaithLink Command Center.
- Stay on the Spark/free plan if possible.
- Register a Firebase web app.
- Copy the Firebase config values into `.env.local`.
- Keep `.env.local` out of git.
- Enable Firebase Authentication later.
- Enable Firestore later.
- Review Firestore security rules before storing real private data.
- Do not store real prayer requests or visitor information until Auth and rules are working.
- Test locally with `npm run lint`, `npm run build`, and `npm run dev` before deploy.

## Environment Notes

- Start from `.env.example`.
- Vite requires browser-exposed variables to use the `VITE_` prefix.
- Never paste production secrets into documentation, README files, commits, screenshots, or shared chats.
