import { useMemo, useRef, useState } from 'react'
import { APP_CONFIG } from '../config/appConfig'
import { getTemplatesForSection } from '../data/workflowTemplates'
import ItemForm from './ItemForm'
import LoginPlaceholder from './LoginPlaceholder'
import TaskList from './TaskList'
import TemplatePicker from './TemplatePicker'
import { isDueSoon, isOverdue } from '../utils/itemUtils'

const filterOrder = ['All', 'New', 'Open', 'In Progress', 'Urgent', 'Completed', 'Draft', 'Overdue', 'Due Soon', 'High Priority', 'Critical']

function SectionPage({
  canEdit,
  dataHealth,
  importState,
  isMusic,
  isSettings,
  lastUpdated,
  onAddItem,
  onArchiveCompleted,
  onCompleteItem,
  onConfirmImport,
  onDeleteItem,
  onExportData,
  onImportFile,
  onResetData,
  onToggleChecklistItem,
  onTogglePin,
  onUpdateItem,
  onUseTemplate,
  section,
  sectionId,
}) {
  const [editingItem, setEditingItem] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false)
  const [isResetConfirming, setIsResetConfirming] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [showArchived, setShowArchived] = useState(false)
  const importInputRef = useRef(null)
  const sectionTemplates = getTemplatesForSection(sectionId)

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

  return (
    <section className={`section-page ${sectionId === 'sunday' ? 'printable-page' : ''}`}>
      <div className="section-toolbar">
        <div className="section-intro">
          <span className="eyebrow">{section.kicker}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>

        {canEdit && (
          <div className="section-actions">
            <button aria-label={`Add item to ${section.title}`} className="primary-button" onClick={handleAddClick} type="button">
              Add Item
            </button>
            {sectionTemplates.length > 0 && (
              <button className="secondary-button" onClick={() => setIsTemplatePickerOpen(true)} type="button">
                Create From Template
              </button>
            )}
            {sectionId === 'sunday' && (
              <button className="secondary-button print-button" onClick={() => window.print()} type="button">
                Print Checklist
              </button>
            )}
            <button className="secondary-button" disabled={completedCount === 0} onClick={onArchiveCompleted} type="button">
              Archive Completed
            </button>
          </div>
        )}
      </div>

      {isSettings && (
        <>
          <section className="settings-summary content-panel">
            <div>
              <span className="eyebrow">Phase 7</span>
              <h2>Local Settings</h2>
            </div>
            <div className="settings-grid">
              <p><strong>App name:</strong> {APP_CONFIG.appName}</p>
              <p><strong>Version:</strong> {APP_CONFIG.version}</p>
              <p><strong>Data mode:</strong> Browser {APP_CONFIG.dataMode}</p>
              <p><strong>Last updated:</strong> {lastUpdated}</p>
              <p><strong>Firebase:</strong> {APP_CONFIG.firebaseEnabled ? 'Enabled' : 'Not connected'}</p>
              <p><strong>Last exported:</strong> {dataHealth.lastExportedAt || 'Never'}</p>
              <p><strong>Total archived items:</strong> {dataHealth.archivedItems}</p>
            </div>
            <div className="settings-actions">
              <button className="secondary-button" onClick={onExportData} type="button">
                Export Backup Now
              </button>
              {!isResetConfirming ? (
                <button className="danger-button reset-button" onClick={() => setIsResetConfirming(true)} type="button">
                  Reset sample data
                </button>
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
              <span className="eyebrow">Backup</span>
              <h2>Backup Reminder</h2>
            </div>
            <p className="backup-reminder">Because this app currently uses browser localStorage, export your data regularly and before major workflow changes.</p>
            <p><strong>Last exported:</strong> {dataHealth.lastExportedAt || 'Never'}</p>
            <button className="primary-button" onClick={onExportData} type="button">Export Backup Now</button>
          </section>

          <section className="content-panel import-panel">
            <div className="panel-heading">
              <span className="eyebrow">Restore</span>
              <h2>Import Data</h2>
            </div>
            <p className="backup-reminder">Importing will replace your current local dashboard data. Export a backup first if needed.</p>
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
                  <button className="danger-button" onClick={onConfirmImport} type="button">Confirm Import</button>
                  <button className="secondary-button" onClick={() => onImportFile(null)} type="button">Cancel</button>
                </div>
              </div>
            )}
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
        canEdit={canEdit}
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
