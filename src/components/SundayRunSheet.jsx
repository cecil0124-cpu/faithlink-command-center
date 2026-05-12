function SundayRunSheet({ canEdit, canPrint, onAddItem, onDeleteItem, onUpdateItem, runSheet }) {
  return (
    <section className="section-page printable-page run-sheet-page">
      <div className="section-toolbar">
        <div className="section-intro">
          <span className="eyebrow">Service Flow</span>
          <h2>Sunday Run Sheet</h2>
          <p>Build a simple local service order for the team, then print it for Sunday morning.</p>
        </div>
        {canPrint && (
          <button className="secondary-button print-button" onClick={() => window.print()} type="button">
            Print Run Sheet
          </button>
        )}
      </div>

      <div className="run-sheet-list">
        {runSheet.map((section) => (
          <section className="content-panel run-sheet-section" key={section.id}>
            <div className="panel-heading">
              <span className="eyebrow">Sunday Flow</span>
              <h2>{section.title}</h2>
            </div>
            <div className="run-sheet-items">
              {section.items.map((item, index) => (
                <div className="run-sheet-item" key={item.id}>
                  <span>{index + 1}</span>
                  <input
                    aria-label={`${section.title} item ${index + 1}`}
                    disabled={!canEdit}
                    onChange={(event) => onUpdateItem(section.id, item.id, event.target.value)}
                    type="text"
                    value={item.text}
                  />
                  {canEdit && (
                    <button className="danger-button" onClick={() => onDeleteItem(section.id, item.id)} type="button">
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
            {canEdit ? (
              <button className="secondary-button" onClick={() => onAddItem(section.id)} type="button">
                Add Line
              </button>
            ) : (
              <p className="role-note">Not available in this role preview.</p>
            )}
          </section>
        ))}
      </div>
    </section>
  )
}

export default SundayRunSheet
