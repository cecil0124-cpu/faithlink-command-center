# Future Firestore Collections

## users
Purpose: Store user profiles and account metadata.
Suggested fields: displayName, email, roleIds, createdAt, updatedAt, active.
Access: Admin full access; users can read limited self profile later.

## roles
Purpose: Define application roles and permission labels.
Suggested fields: name, description, permissions, createdAt, updatedAt.
Access: Admin manages; authenticated users may read their assigned role summary.

## dashboardItems
Purpose: Shared generic items for dashboard-wide views, pinned items, and cross-section workflows.
Suggested fields: title, description, status, category, sectionId, pinned, createdBy, assignedTo, createdAt, updatedAt.
Access: Admin full access; role-based read/write by section.

## focusItems
Purpose: Store user-specific Today’s Focus items.
Suggested fields: userId, title, completed, sortOrder, date, createdAt, updatedAt.
Access: Owner and admin; later user-specific by Auth.

## activityLog
Purpose: Track important app events and workflow changes.
Suggested fields: action, section, itemTitle, itemId, actorId, timestamp.
Access: Admin read; contributors can write activity tied to allowed actions.

## prayerRequests
Purpose: Store prayer requests and care follow-up workflow.
Suggested fields: requesterName, requestText, status, urgency, assignedTo, privateNotes, submittedBy, createdAt, updatedAt.
Access: Admin and prayer_team; members can submit only their own request later.

## visitors
Purpose: Track connect cards, first-time guests, and hospitality follow-up.
Suggested fields: name, contact, visitDate, status, nextStep, assignedTo, notes, createdAt, updatedAt.
Access: Admin and hospitality_team; limited pastor summary access.

## mediaTasks
Purpose: Track sermon editing, graphics, uploads, clips, Access 21, and production tasks.
Suggested fields: title, description, status, platform, dueDate, assignedTo, assets, createdAt, updatedAt.
Access: Admin and media_team; pastor_view can read status.

## musicProjects
Purpose: Track songs, albums, Suno prompts, keys, tempos, styles, and release planning.
Suggested fields: title, status, key, tempo, style, prompt, nextStep, notes, createdAt, updatedAt.
Access: Admin and approved music/media contributors.

## websiteAppProjects
Purpose: Track WordPress, Rm App, Firebase, GitHub, and feature updates.
Suggested fields: title, description, status, projectType, repoLink, nextStep, createdAt, updatedAt.
Access: Admin and approved app/media contributors.

## aiPrompts
Purpose: Store reusable prompts for music, media, websites, app development, and SOPs.
Suggested fields: title, promptText, category, tags, status, createdBy, createdAt, updatedAt.
Access: Admin and contributors; read access by approved internal roles.

## techSops
Purpose: Store setup guides, troubleshooting notes, and training material.
Suggested fields: title, system, steps, status, category, lastReviewedAt, createdAt, updatedAt.
Access: Admin and media_team; selected read access for trained volunteers.

## settings
Purpose: Store app-level preferences and future organization configuration.
Suggested fields: appName, theme, dataMode, featureFlags, updatedAt.
Access: Admin only.
