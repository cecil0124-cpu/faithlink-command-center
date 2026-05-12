# FaithLink Command Center

FaithLink Command Center is a private, free-first React/Vite dashboard for organizing ministry, media, music, technology, AI prompts, SOPs, and project work in one clean command center.

## Phase 13B Firebase Auth Only

- Adds Firebase Authentication with Email/Password sign-in.
- Adds sign in, create account, forgot password, and sign out flows.
- Keeps dashboard data in browser localStorage.
- Keeps export/import backup tools.
- Keeps local role preview local.
- Does not connect Firestore.
- Does not sync dashboard data across devices yet.

To set up locally:

```bash
cp .env.example .env.local
```

Then add Firebase web app config values to `.env.local`. In Firebase Console, enable Authentication and turn on the Email/Password provider.

Run locally:

```bash
npm run dev
```

Deploy after testing:

```bash
npm run lint
npm run build
firebase deploy --only hosting
```

Important: signing in does not sync dashboard data yet. Dashboard data remains localStorage-only until a later Firestore sync and security rules phase.

## Phase 13A Firebase Hosting Only

- Prepares Firebase Hosting config for the Vite React app.
- Uses `dist` as the production build folder.
- Uses SPA fallback rewrites to `/index.html`.
- Publishes the app shell only.
- Keeps dashboard data in browser localStorage.
- Does not connect Firestore.
- Does not require Firebase Auth.

Deploy commands for later:

```bash
npm run lint
npm run build
firebase login
firebase use --add
firebase deploy --only hosting
```

LocalStorage remains browser/device-specific until Firestore sync is added in a later phase. Do not store real private prayer requests, visitor info, or team data in Firebase yet.

## Phase 12 Mobile + Installable App Prep

- Improves mobile layout with a compact top bar and slide-out navigation.
- Keeps desktop sidebar behavior intact.
- Adds PWA manifest at `public/manifest.webmanifest`.
- Adds placeholder app icon SVG at `public/icons/faithlink-icon.svg`.
- Adds mobile app metadata in `index.html`.
- Adds admin-only `App Install Prep` page.
- Adds `docs/pwa-plan.md` for install/offline planning.
- Updates System Status with PWA, offline cache, mobile layout, and data sync status.

Current PWA limitations:

- Service worker/offline cache is not connected.
- Firebase sync is not connected.
- Real login is not connected.
- Data remains browser/device-specific localStorage.
- Production PNG icons should be added later.

Export a backup before clearing browser data, switching devices, or testing install behavior.

Future Phase 13 options include Firebase Hosting, Firebase Auth/Firestore, service worker/offline support, and real icon assets.

## Phase 11 FaithLink Visual Rebrand

- Rebrands the app as a broader personal command center for ministry, media, music, technology, AI workflows, and real-life planning.
- Adds a central theme config in `src/config/themeConfig.js`.
- Uses a navy, blue, white, gold, and neutral command-center color system.
- Keeps Restoration Ministries as a preset/workspace inside FaithLink, not the whole app identity.
- Scopes Restoration burgundy/gray accents to Restoration-specific cards and preset labels.

### Color System

- Primary: `#101828`
- Secondary: `#2563eb`
- Accent: `#d4af37`
- Background: `#f5f7fb`
- Card: `#ffffff`
- Text: `#111827`
- Muted: `#667085`
- Border: `#e5e7eb`
- Success: `#16a34a`
- Warning: `#f59e0b`
- Danger: `#dc2626`
- Info: `#0ea5e9`

## Phase 10 Deployment Prep

- Adds `.env.example` with placeholder Firebase variable names.
- Keeps `.env.local` protected by `.gitignore`.
- Adds admin-only `Deploy Prep` page for Firebase setup, environment variables, migration planning, and production readiness.
- Adds deployment status fields to Settings and System Status.
- Adds deployment preparation docs in `docs/`.
- Keeps Firebase uninstalled, unconnected, and inactive.

## Environment Setup Later

When Firebase is ready, copy `.env.example` to `.env.local` and replace the placeholder values with Firebase web app config values. Do not commit `.env.local`.

Vite requires browser-exposed environment variables to start with `VITE_`.

## Documentation Folder

- `docs/firebase-setup-checklist.md`: Firebase project setup checklist.
- `docs/deployment-checklist.md`: pre-deploy and future Firebase Hosting checklist.
- `docs/migration-plan.md`: localStorage to Firestore migration plan.
- `docs/production-readiness.md`: readiness checklist before real team/private data.

Current status: Firebase is not connected. Next phase: Firebase project setup and optional hosting.

## Phase 8 Restoration Setup Preset

- Adds an opt-in Restoration Ministries starter setup.
- Keeps existing localStorage data unchanged unless you intentionally load the preset.
- Preset includes Restoration Ministries identity, service times, Sunday workflow, media production, A/V SOPs, website/app tasks, music planning, AI prompt categories, Today’s Focus, This Week, and Sunday Run Sheet data.
- Settings includes a `Restoration Setup Preset` panel with a backup warning and confirmation step.
- Loading the preset logs `Restoration setup loaded` in Recent Activity.

## How To Load The Restoration Preset

Open Settings, review the `Restoration Setup Preset` panel, and click `Load Restoration Setup`. The app asks for confirmation before replacing current local dashboard data.

Loading this preset replaces the current browser localStorage dashboard. Export a backup first if you need to preserve the current data.

The preset is local-only. Firebase, authentication, and Firestore are still not connected.

## Phase 9 Local Role Preview

- Adds local-only role views for `admin`, `pastor_view`, `pastor_contributor`, `prayer_team`, `hospitality_team`, `media_team`, `music_team`, and `member`.
- Adds a Role Preview switcher in the header.
- Saves the selected preview role in browser localStorage.
- Filters sidebar sections by role.
- Filters My World Overview panels for prayer, hospitality, media, music, pastor, and member views.
- Hides or disables local actions by role, including create, edit, delete, archive, export, import, reset, preset loading, and print.
- Adds a Settings Role Preview panel showing current role, allowed sections, enabled actions, and disabled actions.
- Adds admin-only Team View Prep cards for future Firebase onboarding and permission planning.
- Logs role changes in Recent Activity.

Role preview is not security. It only changes the local interface. Firebase Auth and Security Rules are required before using this with real team members.

## Phase 7 Features

- Due dates on local dashboard items.
- Priority levels: Low, Normal, High, and Critical.
- Priority badges on item cards and search results.
- Overdue detection for incomplete items with past due dates.
- Critical, High, overdue, urgent, and key open items appear in Needs Attention.
- Weekly Review page with completed-this-week, still-open, overdue, pinned, upcoming due, and recent activity summaries.
- Sunday Run Sheet page with editable local service flow sections.
- Print buttons for Weekly Review, Sunday Run Sheet, and the Sunday Service checklist.
- Print-friendly layout styles for review pages, run sheet, and checklist cards.
- Archive Completed buttons for editable sections.
- Archived items are hidden by default and can be viewed with the Show Archived toggle.
- Settings shows total archived items, confirms localStorage data mode, and reminds you to export before major changes.

## Phase 6B Features

- Safer local data management while the app still uses browser localStorage.
- Backup export with metadata: app name, version, export date, data mode, total item count, and dashboard data.
- Import Data flow with JSON file selection, validation, preview, warning, cancel, and confirm import.
- Backup Reminder panel showing last exported date and an Export Backup Now button.
- Data Health panel showing sections, total items, pinned items, Today's Focus count, recent activity count, data mode, last updated, and last exported.
- Reset Sample Data now requires confirmation.
- Activity log records Data exported, Backup created, Data imported, and Sample data reset.

## How To Export Data

Open Settings and click `Export Backup Now`. The app downloads a JSON backup named like:

```text
faithlink-command-center-backup-YYYY-MM-DD.json
```

Export regularly before clearing browser data, switching computers, or testing major local changes.

## How To Import Data

Open Settings and click `Import Data`. Choose a JSON file previously exported from FaithLink Command Center. The app previews the app name, export date, section count, and item count before import.

Importing replaces the current local dashboard data. Export a fresh backup first if you need to preserve your current browser data.

## Why Backups Matter

This phase still uses browser localStorage. localStorage is browser-specific and device-specific. Clearing site data, changing browsers, or using another computer can make local data unavailable. Manual backup/import is the safety bridge until Firebase sync is connected.

Future Firebase sync will replace manual backup/import for everyday use, but exports may remain useful for extra safety.

## Workflow Templates

Templates live in `src/data/workflowTemplates.js`. Each template has a destination section and one or more generated tasks. Some generated tasks include checklist items that can be checked or unchecked and saved locally.

## Daily Use Workflow

Use due dates and priorities to keep ministry work visible during the week. Items with `Critical` or `High` priority, overdue incomplete items, urgent items, and important open follow-ups are pulled into Needs Attention on the overview.

Open `Weekly Review` before planning the next week. It summarizes what was completed this week, what is still open, overdue work, pinned items, upcoming due items, and recent activity.

Open `Sunday Run Sheet` to edit the service flow locally. The run sheet includes pre-service, opening, praise and worship, prayer, announcements, giving, sermon, altar/response, closing, and post-service media tasks.

Use `Archive Completed` inside editable sections after review. Archived items stay in localStorage and exports, but they are hidden from normal section views, overview lists, search, and weekly review until you use the section's Show Archived toggle.

## Firebase Status

Firebase is not connected yet. Firebase is not installed yet. The app remains localStorage-based through `src/services/dataService.js`.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Current Limitations

- Firebase is not connected.
- Authentication is not connected.
- Firestore is not connected.
- Backups are manual.
- Imported data replaces current local data after confirmation.
- Data is stored only in the current browser's localStorage.
- Print output depends on the browser's print dialog and selected paper settings.
