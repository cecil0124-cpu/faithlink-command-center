import { useState } from 'react'

const statusOptions = ['New', 'Open', 'In Progress', 'Urgent', 'Completed', 'Draft']

const emptyItem = {
  title: '',
  detail: '',
  status: 'Open',
  category: '',
  nextStep: '',
  notes: '',
  key: '',
  tempo: '',
  style: '',
}

function getInitialFormData(initialItem) {
  return {
    ...emptyItem,
    ...initialItem,
    key:
      initialItem?.key ||
      initialItem?.meta?.find((item) => item.label === 'Key')?.value ||
      '',
    tempo:
      initialItem?.tempo ||
      initialItem?.meta?.find((item) => item.label === 'Tempo')?.value ||
      '',
    style:
      initialItem?.style ||
      initialItem?.meta?.find((item) => item.label === 'Style')?.value ||
      '',
  }
}

function ItemForm({ initialItem, isMusic, onCancel, onSubmit }) {
  const [formData, setFormData] = useState(() => getInitialFormData(initialItem))

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextItem = {
      ...formData,
      title: formData.title.trim(),
      detail: formData.detail.trim(),
      category: formData.category.trim(),
      nextStep: formData.nextStep.trim(),
      notes: formData.notes.trim(),
    }

    if (isMusic) {
      nextItem.key = formData.key.trim()
      nextItem.tempo = formData.tempo.trim()
      nextItem.style = formData.style.trim()
    }

    onSubmit(nextItem)
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="item-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <span className="eyebrow">{initialItem ? 'Edit Item' : 'New Item'}</span>
            <h2>{initialItem ? 'Update details' : 'Add to command center'}</h2>
          </div>
          <button className="icon-close-button" onClick={onCancel} type="button">
            Close
          </button>
        </div>

        <label>
          Title
          <input
            onChange={(event) => updateField('title', event.target.value)}
            required
            type="text"
            value={formData.title}
          />
        </label>

        <label>
          Description
          <textarea
            onChange={(event) => updateField('detail', event.target.value)}
            required
            rows="4"
            value={formData.detail}
          />
        </label>

        <div className="form-grid">
          <label>
            Status
            <select
              onChange={(event) => updateField('status', event.target.value)}
              value={formData.status}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label>
            Category
            <input
              onChange={(event) => updateField('category', event.target.value)}
              type="text"
              value={formData.category}
            />
          </label>
        </div>

        {isMusic && (
          <div className="form-grid three-column">
            <label>
              Key
              <input
                onChange={(event) => updateField('key', event.target.value)}
                type="text"
                value={formData.key}
              />
            </label>
            <label>
              Tempo
              <input
                onChange={(event) => updateField('tempo', event.target.value)}
                type="text"
                value={formData.tempo}
              />
            </label>
            <label>
              Style
              <input
                onChange={(event) => updateField('style', event.target.value)}
                type="text"
                value={formData.style}
              />
            </label>
          </div>
        )}

        <label>
          Next Step
          <input
            onChange={(event) => updateField('nextStep', event.target.value)}
            type="text"
            value={formData.nextStep}
          />
        </label>

        <label>
          Notes
          <textarea
            onChange={(event) => updateField('notes', event.target.value)}
            rows="3"
            value={formData.notes}
          />
        </label>

        <div className="form-actions">
          <button className="secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Save Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
