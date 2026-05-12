# Future Security Rules Plan

Firebase is not connected yet. This is a planning document for future Firestore and Auth rules.

## Roles

- admin
- pastor_view
- pastor_contributor
- prayer_team
- hospitality_team
- media_team
- member

## Suggested Permissions

### admin

- Full access to all collections.
- Can manage users, roles, settings, and all dashboard data.

### pastor_view

- Read-only access to church operations, prayer summaries, visitor summaries, and media status.
- No write access to private prayer notes or visitor details unless separately granted.

### pastor_contributor

- Can create drafts for announcements, events, media notes, and sermon notes.
- Can read relevant church operations and media status.
- Cannot manage roles, settings, or private admin data.

### prayer_team

- Can read and update prayer requests only.
- Cannot access visitor private notes, media task internals, settings, or role management.

### hospitality_team

- Can read and update visitors/connect cards only.
- Cannot access prayer request private notes, app settings, or role management.

### media_team

- Can read and update media tasks, tech SOPs, and Sunday service tasks.
- Can read relevant production status.
- Cannot access private prayer or visitor care data unless granted by admin.

### member

- Can submit prayer requests and connect forms only.
- Cannot view private admin data, prayer team data, visitor data, or internal workflows.

## Rule Strategy

- Store role assignments on user profiles or role mapping documents.
- Use custom claims only if role checks need to be fast and centralized.
- Protect prayer requests and visitor records with strict role checks.
- Deny by default and explicitly allow only needed reads/writes.
- Add server timestamps for createdAt and updatedAt when Firestore is connected.

## Phase 9 Local Role Preview Notes

The current role switcher is not security. It only changes the local React interface and stores the selected preview role in browser localStorage. Anyone with browser/devtools access could bypass it.

Future Firebase enforcement should include:

- Firebase Authentication for real user identity.
- A user profile document with roleIds, active team assignments, displayName, email, and disabled/active state.
- Firestore Security Rules that check the authenticated user role before reads or writes.
- Section-level checks for sunday, media, prayer, visitors, music, websites, prompts, sops, run sheets, settings, and activity logs.
- Assignment fields such as assignedTo, teamId, createdBy, updatedBy, visibility, and privateNotes for scoped team access.
- Submit-only member rules for future prayer requests and connect cards.
- Admin-only rules for settings, role changes, imports, resets, presets, and user management.

Local role preview helps design the interface, but Firebase Auth and Firestore Security Rules must enforce permissions before real team members use shared data.
