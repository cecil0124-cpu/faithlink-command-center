function TemplatePicker({ onClose, onUseTemplate, templates }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="item-form template-picker" aria-label="Create from template">
        <div className="form-heading">
          <div>
            <span className="eyebrow">Workflow Templates</span>
            <h2>Create From Template</h2>
          </div>
          <button className="icon-close-button" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="template-list">
          {templates.map((template) => (
            <article className="template-card" key={template.templateName}>
              <div>
                <span className="eyebrow">{template.group}</span>
                <h3>{template.templateName}</h3>
                <p>{template.description}</p>
                <small>{template.tasks.length} task(s)</small>
              </div>
              <button className="primary-button" onClick={() => onUseTemplate(template)} type="button">
                Create
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TemplatePicker
