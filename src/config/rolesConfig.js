const fullPermissions = {
  canView: true,
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canArchive: true,
  canExport: true,
  canImport: true,
  canResetData: true,
  canLoadPreset: true,
  canPrint: true,
}

const readOnlyPermissions = {
  canView: true,
  canCreate: false,
  canEdit: false,
  canDelete: false,
  canArchive: false,
  canExport: false,
  canImport: false,
  canResetData: false,
  canLoadPreset: false,
  canPrint: true,
}

export const roleConfigs = {
  admin: {
    label: 'Admin',
    description: 'Full local preview access to every dashboard area and data tool.',
    allowedSections: ['overview', 'sunday', 'media', 'prayer', 'visitors', 'music', 'websites', 'prompts', 'sops', 'templates', 'weeklyReview', 'runSheet', 'teamViewPrep', 'deployPrep', 'settings'],
    permissions: fullPermissions,
  },
  pastor_view: {
    label: 'Pastor View',
    description: 'Read-only view of church operations, care status, media status, weekly review, and run sheets.',
    allowedSections: ['overview', 'sunday', 'media', 'prayer', 'visitors', 'websites', 'weeklyReview', 'runSheet', 'settings'],
    permissions: readOnlyPermissions,
  },
  pastor_contributor: {
    label: 'Pastor Contributor',
    description: 'Can contribute draft-style media, website/app, AI prompt, and run sheet updates without data administration rights.',
    allowedSections: ['overview', 'sunday', 'media', 'prayer', 'visitors', 'websites', 'prompts', 'weeklyReview', 'runSheet', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canCreate: true,
      canEdit: true,
      canPrint: true,
    },
  },
  prayer_team: {
    label: 'Prayer Team',
    description: 'Can view and update prayer requests while seeing a prayer-focused overview.',
    allowedSections: ['overview', 'prayer', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canEdit: true,
    },
  },
  hospitality_team: {
    label: 'Hospitality Team',
    description: 'Can view and update visitor/connect card follow-up while seeing a hospitality-focused overview.',
    allowedSections: ['overview', 'visitors', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canEdit: true,
    },
  },
  media_team: {
    label: 'Media Team',
    description: 'Can view and update Sunday service, media tasks, tech SOPs, weekly review, and run sheet workflows.',
    allowedSections: ['overview', 'sunday', 'media', 'sops', 'weeklyReview', 'runSheet', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canCreate: true,
      canEdit: true,
      canArchive: true,
      canExport: true,
      canPrint: true,
    },
  },
  music_team: {
    label: 'Music Team',
    description: 'Can view and update music projects and AI prompt library items.',
    allowedSections: ['overview', 'music', 'prompts', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canCreate: true,
      canEdit: true,
    },
  },
  member: {
    label: 'Member',
    description: 'Limited welcome preview with future prayer request and connect card submission placeholders.',
    allowedSections: ['overview', 'settings'],
    permissions: {
      ...readOnlyPermissions,
      canPrint: false,
    },
  },
}

export const defaultRoleId = 'admin'

export const roleOptions = Object.entries(roleConfigs).map(([id, config]) => ({
  id,
  label: config.label,
}))

export function getRoleConfig(roleId) {
  return roleConfigs[roleId] || roleConfigs[defaultRoleId]
}

export function canAccessSection(roleId, sectionId) {
  return getRoleConfig(roleId).allowedSections.includes(sectionId)
}

export function getRoleSectionIds(roleId) {
  return getRoleConfig(roleId).allowedSections
}
