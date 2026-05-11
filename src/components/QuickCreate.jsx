function QuickCreate({ items, onCreate }) {
  return (
    <section className="content-panel">
      <div className="panel-heading">
        <span className="eyebrow">Capture</span>
        <h2>Quick Create</h2>
      </div>
      <div className="quick-create-grid">
        {items.map((item) => (
          <button
            className="quick-create-button"
            key={item}
            onClick={() => onCreate(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickCreate
