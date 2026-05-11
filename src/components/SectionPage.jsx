import { useMemo, useState } from 'react'
import { APP_CONFIG } from '../config/appConfig'
import { getTemplatesForSection } from '../data/workflowTemplates'
import ItemForm from './ItemForm'
import LoginPlaceholder from './LoginPlaceholder'
import TaskList from './TaskList'
import TemplatePicker from './TemplatePicker'

const statusOrder = ['All', 'New', 'Open', 'In Progress', 'Urgent', 'Completed', 'Draft']

function SectionPage({
  canEdit,
  isMusic,
  isSettings,
  lastUpdated,
  onAddItem,
  onCompleteItem,
  onDeleteItem,
  onExportData,
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
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionTemplates = getTemplatesForSection(sectionId)

  const availableFilters = useMemo(() => {
    const statuses = new Set(section.items.map((item) => item.status))
    return statusOrder.filter((status) => status === 'All' || statuses.has(status))
  }, [section.items])

  const filteredItems = useMemo(() => {
    const items = [...section.items].sort((first, second) => {
      if (first.pinned === second.pinned) {
        return 0
      }

      return first.pinned ? -1 : 1
    })

    if (activeFilter === 'All') {
      return items
    }

    return items.filter((item) => item.status === activeFilter)
  }, [activeFilter, section.items])

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

  return (
    <section className="section-page">
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
          </div>
        )}
      </div>

      {isSettings && (
        <>
          <section className="settings-summary content-panel">
            <div>
              <span className="eyebrow">Phase 6A</span>
              <h2>Local Settings</h2>
            </div>
            <div className="settings-grid">
              <p>
                <strong>App name:</strong> {APP_CONFIG.appName}
              </p>
              <p>
                <strong>Version:</strong> {APP_CONFIG.version}
              </p>
              <p>
                <strong>Data mode:</strong> Browser {APP_CONFIG.dataMode}
              </p>
              <p>
                <strong>Last updated:</strong> {lastUpdated}
              </p>
              <p>
                <strong>Firebase:</strong> {APP_CONFIG.firebaseEnabled ? 'Enabled' : 'Not connected'}
              </p>
              <p>
                <strong>Import:</strong> Import will be added in a later phase.
              </p>
            </div>
            <p className="backup-reminder">
              LocalStorage data is saved only in this browser. Export your data regularly before clearing browser data or moving to another computer.
            </p>
            <div className="settings-actions">
              <button className="secondary-button" onClick={onExportData} type="button">
                Export data
              </button>
              <button className="danger-button reset-button" onClick={onResetData} type="button">
                Reset sample data
              </button>
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
