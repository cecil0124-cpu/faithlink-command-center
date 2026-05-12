# FaithLink Command Center

FaithLink Command Center is a private, free-first React/Vite dashboard for organizing ministry, media, music, technology, AI prompts, SOPs, and project work in one clean command center.

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
