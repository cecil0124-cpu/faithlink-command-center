function ActivityLog({ activities }) {
  return (
    <section className="content-panel activity-panel">
      <div className="panel-heading">
        <span className="eyebrow">History</span>
        <h2>Recent Activity</h2>
      </div>
      <div className="activity-list">
        {activities.length > 0 ? (
          activities.slice(0, 8).map((activity) => (
            <article className="activity-row" key={activity.id}>
              <strong>{activity.action}</strong>
              <p>
                {activity.section}
                {activity.itemTitle ? ` - ${activity.itemTitle}` : ''}
              </p>
              <span>{activity.timestamp}</span>
            </article>
          ))
        ) : (
          <p className="empty-state">No activity yet.</p>
        )}
      </div>
    </section>
  )
}

export default ActivityLog
