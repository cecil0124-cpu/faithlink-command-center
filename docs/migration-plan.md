# Migration Plan: localStorage to Firestore

This plan is for a later phase. FaithLink Command Center still uses browser localStorage.

## Before Migration

- Export current local data first.
- Save the backup JSON in a safe location.
- Validate the backup JSON through the app import preview.
- Confirm Firebase Auth is enabled.
- Confirm Firestore security rules are tested.
- Confirm admin and team roles exist.

## Data Mapping

- Map Sunday Service items to a service or dashboard items collection.
- Map Media Tasks to media tasks.
- Map Prayer Requests to prayer requests with strict access rules.
- Map Visitors / Connect Cards to visitor records with hospitality access.
- Map Music Projects to music projects.
- Map Website & App Projects to website/app project records.
- Map AI Prompt Library to prompt records.
- Map Tech SOPs to SOP records.
- Map Today’s Focus to user-specific focus records.
- Map Sunday Run Sheet to service run sheet records.
- Map Recent Activity to activity log records.

## Firestore Preparation

- Create Firestore collections.
- Create user profile documents.
- Create user roles.
- Add team assignment fields such as `assignedTo`, `teamId`, `createdBy`, and `visibility`.
- Import data into Firestore later.
- Verify collection counts after import.
- Verify role permissions by testing each role.

## Rollback Plan

- Keep the local backup after migration.
- If Firestore import fails, stop writes to Firestore.
- Reset local app data from the backup JSON.
- Review failed records and security rule errors before retrying.
