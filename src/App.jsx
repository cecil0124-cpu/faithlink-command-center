import { useMemo, useState } from 'react'
import './App.css'
import ActivityLog from './components/ActivityLog'
import Header from './components/Header'
import ItemForm from './components/ItemForm'
import OverviewCard from './components/OverviewCard'
import QuickCreate from './components/QuickCreate'
import SearchResults from './components/SearchResults'
import SectionPage from './components/SectionPage'
import Sidebar from './components/Sidebar'
import SundayRunSheet from './components/SundayRunSheet'
import SystemStatus from './components/SystemStatus'
import TemplatesPage from './components/TemplatesPage'
import TodayFocus from './components/TodayFocus'
import WeeklyReview from './components/WeeklyReview'
import {
  editableSectionIds,
  focusCard,
  navigationItems,
  quickCreateItems,
  sectionPages,
  upcomingItems,
} from './data/dashboardData'
import { restorationPresetData } from './data/restorationPresetData'
import {
  getTemplateByName,
  recommendedTemplates,
  workflowTemplates,
} from './data/workflowTemplates'
import {
  exportDashboardData,
  getDashboardData,
  getDashboardItemCount,
  prepareDashboardData,
  resetDashboardData,
  updateDashboardData,
  validateImportData,
} from './services/dataService'
import { isHighAttentionPriority, isOverdue } from './utils/itemUtils'

const quickCreateMap = {
  'Prayer Request': 'prayer',
  'Media Task': 'media',
  'Song Idea': 'music',
  'Website Update': 'websites',
  'AI Prompt': 'prompts',
  'SOP Note': 'sops',
}

const searchableSectionIds = editableSectionIds

function getTimestamp() {
  return new Date().toLocaleString()
}

function getItems(sections, sectionId) {
  return sections[sectionId]?.items || []
}

function getActiveItems(sections, sectionId) {
  return getItems(sections, sectionId).filter((item) => !item.archived)
}

function countByStatus(items, statuses) {
  return items.filter((item) => statuses.includes(item.status)).length
}

function getDynamicOverviewCards(sections) {
  const sundayOpen = getActiveItems(sections, 'sunday').filter((item) => item.status !== 'Completed').length
  const mediaActive = countByStatus(getActiveItems(sections, 'media'), ['Open', 'In Progress'])
  const prayerNeeds = countByStatus(getActiveItems(sections, 'prayer'), ['New', 'Urgent'])
  const visitorFollowUps = getActiveItems(sections, 'visitors').filter((item) => item.status !== 'Completed').length
  const musicActive = countByStatus(getActiveItems(sections, 'music'), ['New', 'Open', 'In Progress'])
  const websiteUpdates = getActiveItems(sections, 'websites').filter((item) => item.status !== 'Completed').length
  const promptDrafts = countByStatus(getActiveItems(sections, 'prompts'), ['Draft', 'Open', 'In Progress'])
  const sopDrafts = countByStatus(getActiveItems(sections, 'sops'), ['Draft', 'In Progress'])

  return [
    { category: 'Sunday Service', title: `${sundayOpen} Open`, status: 'Incomplete Sunday service tasks.' },
    { category: 'Media Tasks', title: `${mediaActive} Active`, status: 'Open or in-progress production work.' },
    { category: 'Prayer Requests', title: `${prayerNeeds} Needs Care`, status: 'New or urgent prayer requests.' },
    { category: 'Visitors', title: `${visitorFollowUps} Follow-ups`, status: 'Guests still needing connection.' },
    { category: 'Music Projects', title: `${musicActive} Active`, status: 'Songs and ideas still moving.' },
    { category: 'Website/App', title: `${websiteUpdates} Updates`, status: 'Incomplete digital project tasks.' },
    { category: 'AI Prompts', title: `${promptDrafts} Working`, status: 'Draft, open, or in-progress prompts.' },
    { category: 'Tech SOPs', title: `${sopDrafts} Drafting`, status: 'Draft or in-progress procedures.' },
  ]
}

function collectPinnedItems(sections) {
  return searchableSectionIds.flatMap((sectionId) =>
    getItems(sections, sectionId)
      .filter((item) => item.pinned && !item.archived)
      .map((item) => ({ ...item, sectionId, sectionTitle: sections[sectionId].title })),
  )
}

function getNeedsAttention(sections) {
  const results = []
  const pushItems = (sectionId, items) => {
    items.forEach((item) => {
      if (!results.some((result) => result.id === item.id)) {
        results.push({ ...item, sectionId, sectionTitle: sections[sectionId].title })
      }
    })
  }

  searchableSectionIds.forEach((sectionId) => {
    pushItems(sectionId, getActiveItems(sections, sectionId).filter((item) => item.status === 'Urgent'))
    pushItems(sectionId, getActiveItems(sections, sectionId).filter((item) => isHighAttentionPriority(item)))
    pushItems(sectionId, getActiveItems(sections, sectionId).filter((item) => isOverdue(item)))
  })
  pushItems('prayer', getActiveItems(sections, 'prayer').filter((item) => item.status === 'New'))
  pushItems('visitors', getActiveItems(sections, 'visitors').filter((item) => item.status === 'Open'))
  pushItems('media', getActiveItems(sections, 'media').filter((item) => item.status === 'Open'))
  pushItems('sunday', getActiveItems(sections, 'sunday').filter((item) => item.status !== 'Completed'))

  return results.slice(0, 6)
}

function itemMatchesSearch(item, term) {
  const haystack = [
    item.title,
    item.detail,
    item.notes,
    item.category,
    item.nextStep,
    item.status,
    item.priority,
    item.dueDate,
    item.archived ? 'archived' : '',
    item.style,
    item.key,
    item.tempo,
    item.createdAt,
    item.updatedAt,
    ...(item.checklist || []).map((checklistItem) => checklistItem.label),
    ...(item.meta || []).flatMap((meta) => [meta.label, meta.value]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(term.toLowerCase())
}

function getSearchResults(sections, searchTerm) {
  if (!searchTerm.trim()) {
    return []
  }

  return searchableSectionIds
    .map((sectionId) => ({
      sectionId,
      sectionTitle: sections[sectionId].title,
      items: getActiveItems(sections, sectionId).filter((item) => itemMatchesSearch(item, searchTerm)),
    }))
    .filter((group) => group.items.length > 0)
}

function createActivity(action, section, itemTitle, timestamp = getTimestamp()) {
  return {
    id: crypto.randomUUID(),
    action,
    section,
    itemTitle,
    timestamp,
  }
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

function createTaskFromTemplate(task, template, timestamp) {
  return {
    id: crypto.randomUUID(),
    title: task.title,
    detail: task.description,
    status: 'Open',
    category: task.category || template.group,
    nextStep: task.nextStep || '',
    notes: task.notes || '',
    key: task.key || '',
    tempo: task.tempo || '',
    style: task.style || '',
    pinned: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    checklist: (task.checklist || []).map((label) => ({ label, completed: false })),
    dueDate: task.dueDate || '',
    priority: task.priority || 'Normal',
    archived: false,
    archivedAt: '',
    completedAt: '',
  }
}

function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [appData, setAppData] = useState(() => getDashboardData())
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [quickCreateSection, setQuickCreateSection] = useState(null)
  const [importState, setImportState] = useState({ error: '', fileData: null, preview: null })

  const sections = appData.sections
  const currentSection = useMemo(
    () => navigationItems.find((item) => item.id === activeSection),
    [activeSection],
  )

  const isSearchActive = searchTerm.trim().length > 0
  const isOverview = activeSection === 'overview'
  const isTemplates = activeSection === 'templates'
  const isWeeklyReview = activeSection === 'weeklyReview'
  const isRunSheet = activeSection === 'runSheet'
  const sectionContent = isOverview || isTemplates ? sectionPages[activeSection] : sections[activeSection]
  const pageTitle = isSearchActive
    ? 'Search Results'
    : isOverview
      ? 'FaithLink Command Center'
      : currentSection?.label
  const canEditSection = editableSectionIds.includes(activeSection)

  const overviewCards = useMemo(() => getDynamicOverviewCards(sections), [sections])
  const pinnedItems = useMemo(() => collectPinnedItems(sections), [sections])
  const needsAttentionItems = useMemo(() => getNeedsAttention(sections), [sections])
  const searchResults = useMemo(() => getSearchResults(sections, searchTerm), [sections, searchTerm])
  const recommendedTemplateItems = recommendedTemplates.map(getTemplateByName).filter(Boolean)
  const dashboardUpcomingItems = appData.upcomingItems || upcomingItems
  const dataHealth = useMemo(() => {
    const allItems = Object.values(sections).flatMap((section) => section.items || [])
    return {
      archivedItems: allItems.filter((item) => item.archived).length,
      activityItems: appData.activityLog.length,
      focusItems: appData.focusItems.length,
      lastExportedAt: appData.lastExportedAt || '',
      lastUpdated: appData.lastUpdated,
      pinnedItems: allItems.filter((item) => item.pinned && !item.archived).length,
      totalItems: getDashboardItemCount(appData),
      totalSections: Object.keys(sections).length,
    }
  }, [appData, sections])

  function persistData(nextData, nextMessage, activity) {
    const timestamp = getTimestamp()
    const baseActivities = nextData.activityLog || appData.activityLog || []
    const activityItems = Array.isArray(activity) ? activity : activity ? [activity] : []
    const nextActivities = activityItems.length > 0
      ? [
          ...activityItems.map((entry) => createActivity(entry.action, entry.section, entry.itemTitle, timestamp)),
          ...baseActivities,
        ].slice(0, 30)
      : baseActivities
    const dataWithTimestamp = {
      ...nextData,
      activityLog: nextActivities,
      lastUpdated: timestamp,
    }

    setAppData(dataWithTimestamp)
    updateDashboardData(dataWithTimestamp)
    setMessage(nextMessage)
  }

  function updateSectionItems(sectionId, updater, nextMessage, activity) {
    const currentItems = sections[sectionId]?.items || []
    const nextData = {
      ...appData,
      sections: {
        ...sections,
        [sectionId]: {
          ...sections[sectionId],
          items: updater(currentItems),
        },
      },
    }

    persistData(nextData, nextMessage, activity)
  }

  function handleAddItem(sectionId, item) {
    const timestamp = getTimestamp()
    updateSectionItems(
      sectionId,
      (items) => [
        {
          ...item,
          id: crypto.randomUUID(),
          pinned: Boolean(item.pinned),
          checklist: item.checklist || [],
          dueDate: item.dueDate || '',
          priority: item.priority || 'Normal',
          archived: false,
          archivedAt: '',
          completedAt: item.status === 'Completed' ? timestamp : '',
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        ...items,
      ],
      'Item added',
      { action: 'Item added', section: sections[sectionId].title, itemTitle: item.title },
    )
  }

  function handleUseTemplate(template) {
    const timestamp = getTimestamp()
    const generatedTasks = template.tasks.map((task) => createTaskFromTemplate(task, template, timestamp))
    updateSectionItems(
      template.section,
      (items) => [...generatedTasks, ...items],
      'Template used',
      { action: 'Template used', section: sections[template.section].title, itemTitle: template.templateName },
    )
    setActiveSection(template.section)
  }

  function handleUpdateItem(sectionId, item) {
    const timestamp = getTimestamp()
    const originalItem = getItems(sections, sectionId).find((current) => current.id === item.id)
    const completedAt = item.status === 'Completed'
      ? originalItem?.completedAt || timestamp
      : ''
    const updatedItem = { ...item, completedAt, updatedAt: timestamp }
    updateSectionItems(
      sectionId,
      (items) => items.map((current) => (current.id === item.id ? updatedItem : current)),
      'Item updated',
      { action: 'Item edited', section: sections[sectionId].title, itemTitle: item.title },
    )
  }

  function handleDeleteItem(sectionId, itemId) {
    const deletedItem = getItems(sections, sectionId).find((item) => item.id === itemId)
    updateSectionItems(
      sectionId,
      (items) => items.filter((item) => item.id !== itemId),
      'Item deleted',
      { action: 'Item deleted', section: sections[sectionId].title, itemTitle: deletedItem?.title },
    )
  }

  function handleCompleteItem(sectionId, itemId) {
    const completedItem = getItems(sections, sectionId).find((item) => item.id === itemId)
    const timestamp = getTimestamp()
    updateSectionItems(
      sectionId,
      (items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, status: 'Completed', completedAt: timestamp, updatedAt: timestamp } : item,
        ),
      'Item marked complete',
      { action: 'Item completed', section: sections[sectionId].title, itemTitle: completedItem?.title },
    )
  }

  function handleArchiveCompleted(sectionId) {
    const timestamp = getTimestamp()
    const completedItems = getItems(sections, sectionId).filter((item) => item.status === 'Completed' && !item.archived)
    updateSectionItems(
      sectionId,
      (items) =>
        items.map((item) =>
          item.status === 'Completed' && !item.archived
            ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp }
            : item,
        ),
      'Completed items archived',
      {
        action: 'Completed archived',
        section: sections[sectionId].title,
        itemTitle: `${completedItems.length} item(s)`,
      },
    )
  }

  function handleToggleChecklistItem(sectionId, itemId, checklistIndex) {
    const checklistItem = getItems(sections, sectionId).find((item) => item.id === itemId)
    updateSectionItems(
      sectionId,
      (items) =>
        items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                checklist: item.checklist.map((entry, index) =>
                  index === checklistIndex ? { ...entry, completed: !entry.completed } : entry,
                ),
                updatedAt: getTimestamp(),
              }
            : item,
        ),
      'Checklist updated',
      { action: 'Checklist updated', section: sections[sectionId].title, itemTitle: checklistItem?.title },
    )
  }

  function handleTogglePin(sectionId, itemId) {
    const pinnedItem = getItems(sections, sectionId).find((item) => item.id === itemId)
    const willPin = !pinnedItem?.pinned
    updateSectionItems(
      sectionId,
      (items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, pinned: !item.pinned, updatedAt: getTimestamp() } : item,
        ),
      willPin ? 'Item pinned' : 'Item unpinned',
      {
        action: willPin ? 'Item pinned' : 'Item unpinned',
        section: sections[sectionId].title,
        itemTitle: pinnedItem?.title,
      },
    )
  }

  function handleResetData() {
    const resetData = resetDashboardData()
    const timestamp = getTimestamp()
    const dataWithActivity = {
      ...resetData,
      activityLog: [
        createActivity('Sample data reset', 'Settings', 'Sample data', timestamp),
        ...resetData.activityLog,
      ],
      lastUpdated: timestamp,
    }
    setAppData(dataWithActivity)
    updateDashboardData(dataWithActivity)
    setMessage('Data reset')
  }

  function handleLoadRestorationPreset() {
    const timestamp = getTimestamp()
    const presetData = prepareDashboardData(cloneData(restorationPresetData))
    const dataWithActivity = {
      ...presetData,
      activityLog: [
        createActivity('Restoration setup loaded', 'Settings', 'Restoration Ministries preset', timestamp),
        ...(presetData.activityLog || []),
      ],
      lastUpdated: timestamp,
    }

    setAppData(dataWithActivity)
    updateDashboardData(dataWithActivity)
    setImportState({ error: '', fileData: null, preview: null })
    setMessage('Restoration setup loaded')
  }

  function handleFocusChange(focusItems) {
    persistData(
      { ...appData, focusItems },
      "Today's Focus updated",
      { action: "Today's Focus updated", section: 'My World Overview', itemTitle: 'Daily focus list' },
    )
  }

  function handleQuickCreate(label) {
    setQuickCreateSection(quickCreateMap[label])
  }

  function handleQuickCreateSubmit(item) {
    handleAddItem(quickCreateSection, item)
    setQuickCreateSection(null)
  }

  function handleResultClick(sectionId) {
    setActiveSection(sectionId)
    setSearchTerm('')
  }

  function handleExportData() {
    const exportedAt = exportDashboardData(appData)
    persistData(
      { ...appData, lastExportedAt: exportedAt || appData.lastExportedAt },
      'Backup created',
      [
        { action: 'Data exported', section: 'Settings', itemTitle: 'JSON backup' },
        { action: 'Backup created', section: 'Settings', itemTitle: 'JSON backup' },
      ],
    )
  }

  async function handleImportFile(file) {
    if (!file) {
      setImportState({ error: '', fileData: null, preview: null })
      return
    }

    try {
      const parsedData = JSON.parse(await file.text())
      const validation = validateImportData(parsedData)

      if (!validation.isValid) {
        setImportState({ error: validation.error, fileData: null, preview: null })
        return
      }

      setImportState({ error: '', fileData: validation.dashboardData, preview: validation.preview })
    } catch {
      setImportState({
        error: 'This file does not appear to be a valid FaithLink Command Center export.',
        fileData: null,
        preview: null,
      })
    }
  }

  function handleConfirmImport() {
    if (!importState.fileData) {
      return
    }

    persistData(importState.fileData, 'Data imported', {
      action: 'Data imported',
      section: 'Settings',
      itemTitle: 'JSON backup',
    })
    setImportState({ error: '', fileData: null, preview: null })
  }

  function updateRunSheet(updater, nextMessage, activity) {
    persistData({ ...appData, runSheet: updater(appData.runSheet || []) }, nextMessage, activity)
  }

  function handleRunSheetAddItem(sectionId) {
    updateRunSheet(
      (runSheet) =>
        runSheet.map((section) =>
          section.id === sectionId
            ? { ...section, items: [...section.items, { id: crypto.randomUUID(), text: '' }] }
            : section,
        ),
      'Run sheet updated',
      { action: 'Run sheet line added', section: 'Sunday Run Sheet', itemTitle: sectionId },
    )
  }

  function handleRunSheetUpdateItem(sectionId, itemId, text) {
    updateRunSheet(
      (runSheet) =>
        runSheet.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: section.items.map((item) => (item.id === itemId ? { ...item, text } : item)),
              }
            : section,
      ),
      'Run sheet updated',
      null,
    )
  }

  function handleRunSheetDeleteItem(sectionId, itemId) {
    updateRunSheet(
      (runSheet) =>
        runSheet.map((section) =>
          section.id === sectionId
            ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
            : section,
        ),
      'Run sheet updated',
      { action: 'Run sheet line deleted', section: 'Sunday Run Sheet', itemTitle: sectionId },
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        items={navigationItems}
        onSelect={(sectionId) => {
          setActiveSection(sectionId)
          setSearchTerm('')
        }}
      />

      <main className="main-content">
        <Header
          description={
            isSearchActive
              ? `Searching local dashboard data for "${searchTerm}".`
              : isOverview
                ? 'A daily command center for ministry, media, music, technology, care, and AI workflows.'
                : sectionContent?.description || 'Review and print weekly service workflow tools.'
          }
          focusCard={focusCard}
          lastUpdated={appData.lastUpdated}
          onClearSearch={() => setSearchTerm('')}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
          tagline={
            isSearchActive
              ? 'Local search across your command center.'
              : isOverview
                ? 'One place. One view. Everything connected.'
                : sectionContent?.kicker || currentSection?.label
          }
          title={pageTitle}
        />

        {message && (
          <div className="feedback-message" role="status">
            {message}
          </div>
        )}

        {isSearchActive ? (
          <SearchResults groups={searchResults} onResultClick={handleResultClick} />
        ) : isOverview ? (
          <section className="dashboard-grid command-home" aria-label="Command Center Home">
            <div className="overview-cards">
              {overviewCards.map((card) => (
                <OverviewCard key={card.category} card={card} />
              ))}
            </div>

            <section className="content-panel recommended-panel">
              <div className="panel-heading">
                <span className="eyebrow">Workflow Starters</span>
                <h2>Recommended Templates</h2>
              </div>
              <div className="template-list">
                {recommendedTemplateItems.map((template) => (
                  <article className="template-card" key={template.templateName}>
                    <div>
                      <h3>{template.templateName}</h3>
                      <p>{template.description}</p>
                    </div>
                    <button className="primary-button" onClick={() => handleUseTemplate(template)} type="button">
                      Create
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <div className="home-panel-grid">
              <section className="content-panel identity-card">
                <div className="panel-heading">
                  <span className="eyebrow">Church Home</span>
                  <h2>Restoration Ministries</h2>
                </div>
                <p>1204 Commercial Ave, Charlotte, NC 28208</p>
                <strong>Sunday 10:45 AM | Wednesday 7:00 PM</strong>
                <p>Restoring the world with God's Word.</p>
              </section>
              <TodayFocus items={appData.focusItems} onChange={handleFocusChange} />
              <section className="content-panel needs-panel">
                <div className="panel-heading">
                  <span className="eyebrow">Auto Review</span>
                  <h2>Needs Attention</h2>
                </div>
                <div className="attention-list">
                  {needsAttentionItems.length > 0 ? (
                    needsAttentionItems.map((item) => (
                      <button
                        className="attention-row clickable-row"
                        key={`${item.sectionId}-${item.id}`}
                        onClick={() => setActiveSection(item.sectionId)}
                        type="button"
                      >
                        <span>{item.sectionTitle}</span>
                        <strong>{item.title}</strong>
                      </button>
                    ))
                  ) : (
                    <p className="empty-state">Nothing needs attention right now.</p>
                  )}
                </div>
              </section>
              <section className="content-panel pinned-panel">
                <div className="panel-heading">
                  <span className="eyebrow">Pinned</span>
                  <h2>Pinned Items</h2>
                </div>
                <div className="attention-list">
                  {pinnedItems.length > 0 ? (
                    pinnedItems.map((item) => (
                      <button
                        className="attention-row clickable-row"
                        key={`${item.sectionId}-${item.id}`}
                        onClick={() => setActiveSection(item.sectionId)}
                        type="button"
                      >
                        <span>{item.sectionTitle}</span>
                        <strong>{item.title}</strong>
                      </button>
                    ))
                  ) : (
                    <p className="empty-state">No pinned items yet.</p>
                  )}
                </div>
              </section>
              <section className="content-panel">
                <div className="panel-heading">
                  <span className="eyebrow">This Week</span>
                  <h2>This Week</h2>
                </div>
                <div className="upcoming-list">
                  {dashboardUpcomingItems.map((item) => (
                    <article className="upcoming-item" key={item.title}>
                      <span>{item.when}</span>
                      <strong>{item.title}</strong>
                    </article>
                  ))}
                </div>
              </section>
              <QuickCreate items={quickCreateItems} onCreate={handleQuickCreate} />
              <ActivityLog activities={appData.activityLog} />
              <SystemStatus />
            </div>
          </section>
        ) : isTemplates ? (
          <TemplatesPage
            localTemplateItems={sections.templates?.items || []}
            onUseTemplate={handleUseTemplate}
            templates={workflowTemplates}
          />
        ) : isWeeklyReview ? (
          <WeeklyReview activityLog={appData.activityLog} sections={sections} />
        ) : isRunSheet ? (
          <SundayRunSheet
            onAddItem={handleRunSheetAddItem}
            onDeleteItem={handleRunSheetDeleteItem}
            onUpdateItem={handleRunSheetUpdateItem}
            runSheet={appData.runSheet || []}
          />
        ) : (
          <SectionPage
            canEdit={canEditSection}
            dataHealth={dataHealth}
            importState={importState}
            isMusic={activeSection === 'music'}
            isSettings={activeSection === 'settings'}
            lastUpdated={appData.lastUpdated}
            onAddItem={(item) => handleAddItem(activeSection, item)}
            onArchiveCompleted={() => handleArchiveCompleted(activeSection)}
            onCompleteItem={(itemId) => handleCompleteItem(activeSection, itemId)}
            onConfirmImport={handleConfirmImport}
            onDeleteItem={(itemId) => handleDeleteItem(activeSection, itemId)}
            onExportData={handleExportData}
            onImportFile={handleImportFile}
            onLoadRestorationPreset={handleLoadRestorationPreset}
            onResetData={handleResetData}
            onToggleChecklistItem={(itemId, checklistIndex) => handleToggleChecklistItem(activeSection, itemId, checklistIndex)}
            onTogglePin={(itemId) => handleTogglePin(activeSection, itemId)}
            onUpdateItem={(item) => handleUpdateItem(activeSection, item)}
            onUseTemplate={handleUseTemplate}
            section={sectionContent}
            sectionId={activeSection}
          />
        )}

        {quickCreateSection && (
          <ItemForm
            initialItem={{ category: sectionPages[quickCreateSection].title }}
            isMusic={quickCreateSection === 'music'}
            key={`quick-create-${quickCreateSection}`}
            onCancel={() => setQuickCreateSection(null)}
            onSubmit={handleQuickCreateSubmit}
          />
        )}
      </main>
    </div>
  )
}

export default App
