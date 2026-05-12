import ItemActions from './ItemActions'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import { formatDueDate, isOverdue } from '../utils/itemUtils'

function TaskList({
  canEdit,
  items,
  onCompleteItem,
  onDeleteItem,
  onEditItem,
  onToggleChecklistItem,
  onTogglePin,
}) {
  if (items.length === 0) {
    return (
      <section className="content-panel empty-section">
        <p>No items yet. Use Quick Create or Add Item to get started.</p>
      </section>
    )
  }

  return (
    <div className="task-list">
      {items.map((item) => (
        <article
          className={`task-row ${item.pinned ? 'pinned-task' : ''} ${isOverdue(item) ? 'overdue-task' : ''}`}
          key={item.id}
        >
          <div className="task-main">
            <div className="task-title-line">
              <div>
                {item.pinned && <span className="task-category">Pinned</span>}
                {item.category && <span className="task-category">{item.category}</span>}
                <h3>{item.title}</h3>
              </div>
              <div className="badge-stack">
                {isOverdue(item) && <span className="overdue-badge">Overdue</span>}
                <PriorityBadge priority={item.priority} />
                <StatusBadge status={item.status} />
              </div>
            </div>

            <dl className="item-details">
              <div>
                <dt>Description</dt>
                <dd>{item.detail}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{item.status}</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>{item.priority}</dd>
              </div>
              <div>
                <dt>Due Date</dt>
                <dd>{formatDueDate(item.dueDate)}</dd>
              </div>
              {item.category && (
                <div>
                  <dt>Category</dt>
                  <dd>{item.category}</dd>
                </div>
              )}
              <div>
                <dt>Pinned</dt>
                <dd>{item.pinned ? 'Yes' : 'No'}</dd>
              </div>
              {item.key && (
                <div>
                  <dt>Key</dt>
                  <dd>{item.key}</dd>
                </div>
              )}
              {item.tempo && (
                <div>
                  <dt>Tempo</dt>
                  <dd>{item.tempo}</dd>
                </div>
              )}
              {item.style && (
                <div>
                  <dt>Style</dt>
                  <dd>{item.style}</dd>
                </div>
              )}
              {item.notes && (
                <div>
                  <dt>Notes</dt>
                  <dd>{item.notes}</dd>
                </div>
              )}
              {item.updatedAt && (
                <div>
                  <dt>Last updated</dt>
                  <dd>{item.updatedAt}</dd>
                </div>
              )}
              {item.archived && (
                <div>
                  <dt>Archived</dt>
                  <dd>{item.archivedAt || 'Yes'}</dd>
                </div>
              )}
            </dl>

            {item.checklist?.length > 0 && (
              <div className="checklist-block">
                <span className="eyebrow">Checklist</span>
                <div className="checklist-items">
                  {item.checklist.map((checklistItem, index) => (
                    <label className="checklist-item" key={`${item.id}-${checklistItem.label}`}>
                      <input
                        checked={checklistItem.completed}
                        onChange={() => onToggleChecklistItem(item.id, index)}
                        type="checkbox"
                      />
                      <span>{checklistItem.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="task-side">
            {item.nextStep && (
              <div className="next-step">
                <span>Next Step</span>
                <p>{item.nextStep}</p>
              </div>
            )}

            {canEdit && (
              <ItemActions
                isComplete={item.status === 'Completed'}
                isPinned={item.pinned}
                onComplete={() => onCompleteItem(item.id)}
                onDelete={() => onDeleteItem(item.id)}
                onEdit={() => onEditItem(item)}
                onTogglePin={() => onTogglePin(item.id)}
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default TaskList
