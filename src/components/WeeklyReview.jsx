import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import { formatDueDate, getWeekBounds, isDueSoon, isOverdue, wasCompletedThisWeek } from '../utils/itemUtils'

function ReviewList({ emptyText, items, title }) {
  return (
    <section className="content-panel review-panel">
      <div className="panel-heading">
        <span className="eyebrow">{items.length} item(s)</span>
        <h2>{title}</h2>
      </div>
      <div className="review-list">
        {items.length > 0 ? (
          items.map((item) => (
            <article className="review-row" key={`${item.sectionId}-${item.id}`}>
              <div>
                <span>{item.sectionTitle}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
                <small>{formatDueDate(item.dueDate)}</small>
              </div>
              <div className="badge-stack">
                {isOverdue(item) && <span className="overdue-badge">Overdue</span>}
                <PriorityBadge priority={item.priority} />
                <StatusBadge status={item.status} />
              </div>
            </article>
          ))
        ) : (
          <p className="empty-state">{emptyText}</p>
        )}
      </div>
    </section>
  )
}

function WeeklyReview({ activityLog, canPrint, sections }) {
  const weekBounds = getWeekBounds()
  const allItems = Object.entries(sections).flatMap(([sectionId, section]) =>
    (section.items || []).map((item) => ({ ...item, sectionId, sectionTitle: section.title })),
  )
  const activeItems = allItems.filter((item) => !item.archived)
  const completedThisWeek = activeItems.filter((item) => wasCompletedThisWeek(item, weekBounds))
  const stillOpen = activeItems.filter((item) => item.status !== 'Completed')
  const overdue = activeItems.filter((item) => isOverdue(item))
  const pinned = activeItems.filter((item) => item.pinned)
  const upcoming = activeItems
    .filter((item) => isDueSoon(item))
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))

  return (
    <section className="section-page printable-page weekly-review-page">
      <div className="section-toolbar">
        <div className="section-intro">
          <span className="eyebrow">Weekly Rhythm</span>
          <h2>Weekly Review</h2>
          <p>Review what finished, what is still open, what is overdue, and what needs attention before the next service week.</p>
        </div>
        {canPrint && (
          <button className="secondary-button print-button" onClick={() => window.print()} type="button">
            Print Weekly Review
          </button>
        )}
      </div>

      <div className="review-grid">
        <ReviewList emptyText="No completed items logged this week." items={completedThisWeek} title="Completed This Week" />
        <ReviewList emptyText="No open items right now." items={stillOpen} title="Still Open" />
        <ReviewList emptyText="No overdue items." items={overdue} title="Overdue" />
        <ReviewList emptyText="No pinned items." items={pinned} title="Pinned Items" />
        <ReviewList emptyText="No items due in the next seven days." items={upcoming} title="Upcoming Due Items" />
        <section className="content-panel review-panel">
          <div className="panel-heading">
            <span className="eyebrow">{activityLog.length} recent action(s)</span>
            <h2>Recent Activity Summary</h2>
          </div>
          <div className="activity-list">
            {activityLog.length > 0 ? (
              activityLog.slice(0, 10).map((activity) => (
                <article className="activity-row" key={activity.id}>
                  <strong>{activity.action}</strong>
                  <p>{activity.section}{activity.itemTitle ? ` - ${activity.itemTitle}` : ''}</p>
                  <span>{activity.timestamp}</span>
                </article>
              ))
            ) : (
              <p className="empty-state">No recent activity yet.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

export default WeeklyReview
