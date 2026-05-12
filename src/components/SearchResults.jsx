import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import { formatDueDate, isOverdue } from '../utils/itemUtils'

function SearchResults({ groups, onResultClick }) {
  if (groups.length === 0) {
    return (
      <section className="content-panel empty-search">
        <span className="eyebrow">Search</span>
        <h2>No results found</h2>
        <p>Try a status, title, ministry area, note, key, tempo, or next step.</p>
      </section>
    )
  }

  return (
    <section className="search-results">
      {groups.map((group) => (
        <div className="content-panel search-group" key={group.sectionId}>
          <div className="panel-heading">
            <span className="eyebrow">{group.items.length} result(s)</span>
            <h2>{group.sectionTitle}</h2>
          </div>
          <div className="search-result-list">
            {group.items.map((item) => (
              <button
                className="search-result-row"
                key={item.id}
                onClick={() => onResultClick(group.sectionId)}
                type="button"
              >
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{formatDueDate(item.dueDate)}</small>
                </div>
                <div className="badge-stack">
                  {isOverdue(item) && <span className="overdue-badge">Overdue</span>}
                  <PriorityBadge priority={item.priority} />
                  <StatusBadge status={item.status} />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default SearchResults
