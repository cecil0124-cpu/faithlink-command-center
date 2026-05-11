# FaithLink Command Center

FaithLink Command Center is a private, free-first React/Vite dashboard for organizing ministry, media, music, technology, AI prompts, SOPs, and project work in one clean command center.

## Phase 6A Features

- Workflow templates for Sunday service prep, media production, audio/video tech, prayer and visitor follow-up, website/app work, music projects, and AI prompts.
- New Templates sidebar page with all templates grouped by category.
- Create From Template buttons on matching section pages.
- Recommended Templates panel on My World Overview.
- Template activity logging when a workflow is created.
- Checklist support for generated workflow tasks such as Sunday service prep, X32 startup, and vMix startup.

## How Templates Work

Templates live in `src/data/workflowTemplates.js`. Each template has a name, destination section, description, and one or more tasks. When you create from a template, the app generates local dashboard items with status `Open`, timestamps, category, notes, next step, and optional checklist items.

Templates are local only until Firebase is connected.

## How Checklist Items Work

Some generated tasks include a `checklist` array. Checklist items can be checked or unchecked directly from the task card. Changes save to browser localStorage and update the task's last updated time.

## Current App Features

- Command Center Home with Today's Focus, Needs Attention, Pinned Items, Recommended Templates, This Week, Quick Create, Recent Activity, and System Status panels.
- Local section workspaces for Sunday Service, Media Tasks, Prayer Requests, Visitors / Connect Cards, Music Projects, Website & App Projects, AI Prompt Library, Tech SOPs, Templates, and Settings.
- Browser localStorage persistence for items, checklists, pinned state, today's focus, activity log, and last updated time.
- Add, edit, delete, complete, pin, and unpin local items.
- Global search, section filters, dynamic overview cards, empty states, and manual JSON export.

## Firebase Status

Firebase is not connected yet. Firebase is not installed yet. The app remains localStorage-based through `src/services/dataService.js`.

## localStorage Warning

Your data is browser-specific. Export your data regularly before clearing browser data or moving to another computer.

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
- Import is still a placeholder.
- Templates and checklist items are local only.
- Manual JSON export is the current backup option.

## Future Phase 6B / Phase 7

- Import/restore from exported JSON backups.
- More workflow automation around recurring services.
- Firebase Auth, Firestore sync, and security rules when ready.
