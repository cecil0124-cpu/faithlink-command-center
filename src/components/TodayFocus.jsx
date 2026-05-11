import { useState } from 'react'

function TodayFocus({ items, onChange }) {
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft || items.length >= 5) {
      return
    }

    onChange([{ id: crypto.randomUUID(), title: trimmedDraft }, ...items].slice(0, 5))
    setDraft('')
  }

  function handleRemove(id) {
    onChange(items.filter((item) => item.id !== id))
  }

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <span className="eyebrow">Today</span>
        <h2>Today's Focus</h2>
      </div>
      <div className="focus-input-row">
        <input
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAdd()
            }
          }}
          placeholder="Add up to 5 focus items"
          type="text"
          value={draft}
        />
        <button className="secondary-button" onClick={handleAdd} type="button">
          Add
        </button>
      </div>
      <div className="focus-list">
        {items.length > 0 ? (
          items.map((item) => (
            <article className="focus-row editable-focus" key={item.id}>
              <strong>{item.title}</strong>
              <button onClick={() => handleRemove(item.id)} type="button">
                Remove
              </button>
            </article>
          ))
        ) : (
          <p className="empty-state">No focus items set for today.</p>
        )}
      </div>
    </section>
  )
}

export default TodayFocus
