# FaithLink Command Center

FaithLink Command Center is a private, free-first React/Vite dashboard for organizing ministry, media, music, technology, AI prompts, SOPs, and project work in one clean command center.

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

## Firebase Status

Firebase is not connected yet. Firebase is not installed yet. The app remains localStorage-based through `src/services/dataService.js`.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Current Limitations

- Firebase is not connected.
- Authentication is not connected.
- Firestore is not connected.
- Backups are manual.
- Imported data replaces current local data after confirmation.
- Data is stored only in the current browser's localStorage.
