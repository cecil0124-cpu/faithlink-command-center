import { useMemo, useRef, useState } from 'react'
import { APP_CONFIG } from '../config/appConfig'
import { useAuth } from '../context/useAuth'
import { getTemplatesForSection } from '../data/workflowTemplates'
import ItemForm from './ItemForm'
import LoginPlaceholder from './LoginPlaceholder'
import TaskList from './TaskList'
import TemplatePicker from './TemplatePicker'
import { isDueSoon, isOverdue } from '../utils/itemUtils'

const filterOrder = ['All', 'New', 'Open', 'In Progress', 'Urgent', 'Completed', 'Draft', 'Overdue', 'Due Soon', 'High Priority', 'Critical']

function SectionPage({
  actionPermissions,
  canEdit,
  cloudStatus,
  dataHealth,
  importState,
  isMusic,
  isSettings,
  lastUpdated,
  onAddItem,
  onArchiveCompleted,
  onCompleteItem,
  onConfirmImport,
  onExportCloudBackup,
  onLoadRestorationPreset,
  onDeleteItem,
  onExportData,
  onExportLocalBackup,
  onImportFile,
  onLoadCloudData,
  onMigrateLocalDataToCloud,
  onResetData,
  onToggleChecklistItem,
  onTogglePin,
  onUpdateItem,
  onUseTemplate,
  roleConfig,
  previewRoleConfig,
  realRole,
  section,
  sectionId,
}) {
  const { currentUser, logout, resetPassword } = useAuth()
  const [editingItem, setEditingItem] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false)
  const [isPresetConfirming, setIsPresetConfirming] = useState(false)
  const [isResetConfirming, setIsResetConfirming] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [showArchived, setShowArchived] = useState(false)
  const importInputRef = useRef(null)
  const sectionTemplates = getTemplatesForSection(sectionId)
  const permissions = actionPermissions || roleConfig.permissions
  const rolePermissions = roleConfig.permissions

  const availableFilters = useMemo(() => {
    const visibleItems = section.items.filter((item) => showArchived || !item.archived)
    const values = new Set(visibleItems.map((item) => item.status))

    if (visibleItems.some((item) => isOverdue(item))) values.add('Overdue')
    if (visibleItems.some((item) => isDueSoon(item))) values.add('Due Soon')
    if (visibleItems.some((item) => item.priority === 'High')) values.add('High Priority')
    if (visibleItems.some((item) => item.priority === 'Critical')) values.add('Critical')

    return filterOrder.filter((filter) => filter === 'All' || values.has(filter))
  }, [section.items, showArchived])

  const filteredItems = useMemo(() => {
    const items = section.items.filter((item) => showArchived || !item.archived).sort((first, second) => {
      if (first.pinned === second.pinned) {
        return 0
      }

      return first.pinned ? -1 : 1
    })

    if (activeFilter === 'All') {
      return items
    }

    if (activeFilter === 'Overdue') {
      return items.filter((item) => isOverdue(item))
    }

    if (activeFilter === 'Due Soon') {
      return items.filter((item) => isDueSoon(item))
    }

    if (activeFilter === 'High Priority') {
      return items.filter((item) => item.priority === 'High')
    }

    if (activeFilter === 'Critical') {
      return items.filter((item) => item.priority === 'Critical')
    }

    return items.filter((item) => item.status === activeFilter)
  }, [activeFilter, section.items, showArchived])

  const archivedCount = section.items.filter((item) => item.archived).length
  const completedCount = section.items.filter((item) => item.status === 'Completed' && !item.archived).length

  function handleAddClick() {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  function handleEditClick(item) {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  function handleSubmit(item) {
    if (editingItem) {
      onUpdateItem({ ...editingItem, ...item })
    } else {
      onAddItem(item)
    }

    setIsFormOpen(false)
    setEditingItem(null)
  }

  function handleUseTemplate(template) {
    onUseTemplate(template)
    setIsTemplatePickerOpen(false)
  }

  function handleImportChange(event) {
    const file = event.target.files?.[0]

    if (file) {
      onImportFile(file)
    }

    event.target.value = ''
  }

  function handleConfirmPresetLoad() {
    onLoadRestorationPreset()
    setIsPresetConfirming(false)
  }

  async function handlePasswordReset() {
    if (currentUser?.email) {
      try {
        await resetPassword(currentUser.email)
      } catch {
        // AuthContext surfaces the error in auth-aware screens.
      }
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // AuthContext keeps the user-facing auth error state.
    }
  }

  return (
    <section className={`section-page ${sectionId === 'sunday' ? 'printable-page' : ''}`}>
      <div className="section-toolbar">
        <div className="section-intro">
          <span className="eyebrow">{section.kicker}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>

        {(permissions.canCreate || permissions.canArchive || permissions.canPrint) && (
          <div className="section-actions">
            {permissions.canCreate && canEdit && (
              <button aria-label={`Add item to ${section.title}`} className="primary-button" onClick={handleAddClick} type="button">
                Add Item
              </button>
            )}
            {permissions.canCreate && canEdit && sectionTemplates.length > 0 && (
              <button className="secondary-button" onClick={() => setIsTemplatePickerOpen(true)} type="button">
                Create From Template
              </button>
            )}
            {permissions.canPrint && sectionId === 'sunday' && (
              <button className="secondary-button print-button" onClick={() => window.print()} type="button">
                Print Checklist
              </button>
            )}
            {permissions.canArchive && (
              <button className="secondary-button" disabled={completedCount === 0} onClick={onArchiveCompleted} type="button">
                Archive Completed
              </button>
            )}
          </div>
        )}
        {canEdit && !permissions.canCreate && !permissions.canEdit && (
          <p className="role-note">Not available in this role preview.</p>
        )}
      </div>

      {isSettings && (
        <>
          <section className="settings-summary content-panel">
            <div>
              <span className="eyebrow">Phase 14</span>
              <h2>System Settings</h2>
            </div>
            <div className="settings-grid">
              <p><strong>App name:</strong> {APP_CONFIG.appName}</p>
              <p><strong>Version:</strong> {APP_CONFIG.version}</p>
              <p><strong>Data mode:</strong> Firestore Cloud Sync</p>
              <p><strong>Last updated:</strong> {lastUpdated}</p>
              <p><strong>Firebase:</strong> {APP_CONFIG.firebaseConnected ? 'Connected' : 'Not Connected'}</p>
              <p><strong>Hosting:</strong> {APP_CONFIG.hostingStatus}</p>
              <p><strong>Auth:</strong> {APP_CONFIG.authConnected ? 'Connected' : 'Not Connected'}</p>
              <p><strong>Firestore:</strong> {APP_CONFIG.firestoreConnected ? 'Connected' : 'Not Connected'}</p>
              <p><strong>Deployment Phase:</strong> {APP_CONFIG.deploymentPhase}</p>
              <p><strong>Sync:</strong> {APP_CONFIG.syncStatus}</p>
              <p><strong>Signed-in user:</strong> {currentUser?.email || 'Not signed in'}</p>
              <p><strong>Real role:</strong> {realRole || 'Loading profile'}</p>
              <p><strong>Last cloud save:</strong> {cloudStatus?.lastCloudSaveAt || 'Not yet'}</p>
              <p><strong>Last exported:</strong> {dataHealth.lastExportedAt || 'Never'}</p>
              <p><strong>Local backup:</strong> Available</p>
              <p><strong>Total archived items:</strong> {dataHealth.archivedItems}</p>
            </div>
            <p className="backup-reminder">Cloud sync is now enabled. Export backups before major changes. Firestore data is tied to your signed-in account.</p>
            {cloudStatus?.error && <p className="import-error">{cloudStatus.error}</p>}
            <div className="settings-actions">
              {rolePermissions.canExport ? (
                <button className="secondary-button" onClick={onExportData} type="button">
                  Export Backup Now
                </button>
              ) : (
                <p className="role-note">Export: Not available in this role preview.</p>
              )}
              {!isResetConfirming ? (
                rolePermissions.canResetData ? (
                  <button className="danger-button reset-button" onClick={() => setIsResetConfirming(true)} type="button">
                    Reset sample data
                  </button>
                ) : (
                  <p className="role-note">Reset: Not available in this role preview.</p>
                )
              ) : (
                <div className="confirm-box">
                  <p>Resetting will remove your current local data and restore sample data.</p>
                  <button className="danger-button" onClick={onResetData} type="button">Confirm Reset</button>
                  <button className="secondary-button" onClick={() => setIsResetConfirming(false)} type="button">Cancel</button>
                </div>
              )}
            </div>
          </section>

          <section className="content-panel backup-panel">
            <div className="panel-heading">
              <span className="eyebrow">Cloud Sync</span>
              <h2>Cloud Sync Migration</h2>
            </div>
            <div className="settings-grid">
              <p><strong>Current mode:</strong> Firestore Cloud Sync</p>
              <p><strong>Signed-in email:</strong> {currentUser?.email || 'Not signed in'}</p>
              <p><strong>Firestore status:</strong> {cloudStatus?.firestoreStatus || 'Not checked'}</p>
              <p><strong>Local backup status:</strong> Available</p>
              <p><strong>Migration status:</strong> {cloudStatus?.migrationStatus || 'Not started'}</p>
              <p><strong>Last cloud load:</strong> {cloudStatus?.lastCloudLoadAt || 'Not yet'}</p>
            </div>
            <p className="backup-reminder">This will copy your current browser data into your cloud dashboard for this signed-in account.</p>
            <div className="settings-actions">
              <button className="secondary-button" onClick={onExportLocalBackup} type="button">Export Local Backup</button>
              <button className="primary-button" onClick={onMigrateLocalDataToCloud} type="button">Migrate Local Data to Cloud</button>
              <button className="secondary-button" onClick={onLoadCloudData} type="button">Load Cloud Data</button>
              <button className="secondary-button" onClick={onExportCloudBackup} type="button">Export Cloud Backup</button>
            </div>
          </section>

          <section className="content-panel backup-panel restoration-preset-panel">
            <div className="panel-heading">
              <span className="eyebrow">Restoration Ministries</span>
              <h2>Restoration Setup Preset</h2>
            </div>
            <p className="backup-reminder">Load a Restoration Ministries starter setup with service times, media workflows, A/V checklists, website/app tasks, music planning, and AI prompt categories.</p>
            <p><strong>Warning:</strong> Loading this preset will replace your current local dashboard data. Export a backup first if needed.</p>
            {!rolePermissions.canLoadPreset ? (
              <p className="role-note">Load preset: Not available in this role preview.</p>
            ) : !isPresetConfirming ? (
              <button className="primary-button" onClick={() => setIsPresetConfirming(true)} type="button">
                Load Restoration Setup
              </button>
            ) : (
              <div className="confirm-box">
                <p>Export a backup before continuing if you need to keep your current local dashboard data.</p>
                <div className="settings-actions">
                  <button className="danger-button" onClick={handleConfirmPresetLoad} type="button">Confirm Load Preset</button>
                  <button className="secondary-button" onClick={() => setIsPresetConfirming(false)} type="button">Cancel</button>
                </div>
              </div>
            )}
          </section>

          <section className="content-panel backup-panel">
            <div className="panel-heading">
              <span className="eyebrow">Backup</span>
              <h2>Backup Reminder</h2>
            </div>
            <p className="backup-reminder">Because this app currently uses browser localStorage, export your data regularly and before major workflow changes.</p>
            <p className="backup-reminder">Cloud sync is active, and localStorage remains available as a manual safety backup.</p>
            <p><strong>Last exported:</strong> {dataHealth.lastExportedAt || 'Never'}</p>
            {rolePermissions.canExport ? (
              <div className="settings-actions">
                <button className="primary-button" onClick={onExportLocalBackup} type="button">Export Local Backup</button>
                <button className="secondary-button" onClick={onExportCloudBackup} type="button">Export Cloud Backup</button>
              </div>
            ) : (
              <p className="role-note">Not available in this role preview.</p>
            )}
          </section>

          <section className="content-panel backup-panel">
            <div className="panel-heading">
              <span className="eyebrow">Deploy Prep</span>
              <h2>Before Deployment</h2>
            </div>
            <ul className="settings-checklist">
              <li>Export a fresh backup</li>
              <li>Run lint</li>
              <li>Run build</li>
              <li>Review role permissions</li>
              <li>Review Firebase rules plan</li>
              <li>Confirm no private data is exposed</li>
            </ul>
          </section>

          {rolePermissions.canImport ? (
            <section className="content-panel import-panel">
            <div className="panel-heading">
              <span className="eyebrow">Restore</span>
              <h2>Import Data</h2>
            </div>
            <p className="backup-reminder">In Firestore mode, imports preview first. Default restore is local backup only; cloud import requires confirmation.</p>
            <input
              accept="application/json,.json"
              className="hidden-file-input"
              onChange={handleImportChange}
              ref={importInputRef}
              type="file"
            />
            <button className="secondary-button" onClick={() => importInputRef.current?.click()} type="button">
              Import Data
            </button>
            {importState.error && <p className="import-error">{importState.error}</p>}
            {importState.preview && (
              <div className="import-preview">
                <h3>Preview Import</h3>
                <p><strong>App name:</strong> {importState.preview.appName}</p>
                <p><strong>Export date:</strong> {importState.preview.exportedAt}</p>
                <p><strong>Sections:</strong> {importState.preview.sectionsCount}</p>
                <p><strong>Total items:</strong> {importState.preview.totalItems}</p>
                <div className="settings-actions">
                  <button className="secondary-button" onClick={() => onConfirmImport('local')} type="button">Import to Local Backup Only</button>
                  <button className="danger-button" onClick={() => onConfirmImport('cloud')} type="button">Import to Cloud Dashboard</button>
                  <button className="secondary-button" onClick={() => onImportFile(null)} type="button">Cancel</button>
                </div>
              </div>
            )}
            </section>
          ) : (
            <section className="content-panel import-panel">
              <div className="panel-heading">
                <span className="eyebrow">Restore</span>
                <h2>Import Data</h2>
              </div>
              <p className="role-note">Not available in this role preview.</p>
            </section>
          )}

          <section className="content-panel data-health-panel">
            <div className="panel-heading">
              <span className="eyebrow">Firebase Auth</span>
              <h2>Account</h2>
            </div>
            <div className="settings-grid">
              <p><strong>Signed-in email:</strong> {currentUser?.email || 'Not signed in'}</p>
              <p><strong>User UID:</strong> {currentUser?.uid || 'Not available'}</p>
              <p><strong>Data sync:</strong> {APP_CONFIG.syncStatus}</p>
              <p><strong>Real role:</strong> {realRole || 'Loading profile'}</p>
            </div>
            <div className="settings-actions">
              <button className="secondary-button" onClick={handlePasswordReset} type="button">
                Send Password Reset
              </button>
              <button className="danger-button" onClick={handleLogout} type="button">
                Sign Out
              </button>
            </div>
            <p className="backup-reminder">Firestore data is private to this signed-in account under v1 security rules.</p>
          </section>

          <section className="content-panel data-health-panel">
            <div className="panel-heading">
              <span className="eyebrow">Roles</span>
              <h2>Role Preview</h2>
            </div>
            <div className="settings-grid">
              <p><strong>Real Role:</strong> {realRole || 'Loading profile'}</p>
              <p><strong>Preview Role:</strong> {previewRoleConfig?.label || roleConfig.label}</p>
              <p><strong>Current Firebase user:</strong> {currentUser?.email || 'Not signed in'}</p>
              <p><strong>Description:</strong> {roleConfig.description}</p>
              <p><strong>Allowed sections:</strong> {roleConfig.allowedSections.join(', ')}</p>
              <p><strong>Enabled actions:</strong> {Object.entries(rolePermissions).filter(([, enabled]) => enabled).map(([key]) => key).join(', ') || 'None'}</p>
              <p><strong>Disabled actions:</strong> {Object.entries(rolePermissions).filter(([, enabled]) => !enabled).map(([key]) => key).join(', ') || 'None'}</p>
              <p><strong>Security note:</strong> Firestore profile role is the real permission source. Preview role remains a local admin/dev aid.</p>
            </div>
          </section>

          <section className="content-panel data-health-panel">
            <div className="panel-heading">
              <span className="eyebrow">Local Data</span>
              <h2>Data Health</h2>
            </div>
            <div className="settings-grid">
              <p><strong>Total sections:</strong> {dataHealth.totalSections}</p>
              <p><strong>Total items:</strong> {dataHealth.totalItems}</p>
              <p><strong>Archived items:</strong> {dataHealth.archivedItems}</p>
              <p><strong>Pinned items:</strong> {dataHealth.pinnedItems}</p>
              <p><strong>Today's Focus:</strong> {dataHealth.focusItems}</p>
              <p><strong>Recent Activity:</strong> {dataHealth.activityItems}</p>
              <p><strong>Data mode:</strong> {APP_CONFIG.dataMode}</p>
              <p><strong>Last updated:</strong> {dataHealth.lastUpdated}</p>
              <p><strong>Last exported:</strong> {dataHealth.lastExportedAt || 'Never'}</p>
            </div>
          </section>

          <LoginPlaceholder />
        </>
      )}

      <div className="filter-bar" aria-label={`${section.title} filters`}>
        {availableFilters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className={activeFilter === filter ? 'active' : ''}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
        {archivedCount > 0 && (
          <button
            aria-pressed={showArchived}
            className={showArchived ? 'active' : ''}
            onClick={() => setShowArchived((current) => !current)}
            type="button"
          >
            {showArchived ? 'Hide Archived' : `Show Archived (${archivedCount})`}
          </button>
        )}
      </div>

      <TaskList
        canDelete={permissions.canDelete}
        canEdit={canEdit && permissions.canEdit}
        items={filteredItems}
        onCompleteItem={onCompleteItem}
        onDeleteItem={onDeleteItem}
        onEditItem={handleEditClick}
        onToggleChecklistItem={onToggleChecklistItem}
        onTogglePin={onTogglePin}
      />

      {isFormOpen && (
        <ItemForm
          initialItem={editingItem}
          isMusic={isMusic}
          key={editingItem?.id || `new-${sectionId}`}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {isTemplatePickerOpen && (
        <TemplatePicker
          onClose={() => setIsTemplatePickerOpen(false)}
          onUseTemplate={handleUseTemplate}
          templates={sectionTemplates}
        />
      )}
    </section>
  )
}

export default SectionPage
