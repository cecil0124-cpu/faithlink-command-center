function PriorityBoard({ items }) {
  return (
    <section className="content-panel priority-panel">
      <div className="panel-heading">
        <span className="eyebrow">Phase 1</span>
        <h2>Priority Board</h2>
      </div>
      <div className="priority-list">
        {items.map((item, index) => (
          <article className="priority-item" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PriorityBoard
