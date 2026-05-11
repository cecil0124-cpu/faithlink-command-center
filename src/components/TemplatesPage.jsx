import { groupTemplatesByCategory } from '../data/workflowTemplates'

function TemplatesPage({ onUseTemplate, templates }) {
  const groupedTemplates = groupTemplatesByCategory(templates)

  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Workflow Library</span>
        <h2>Templates</h2>
        <p>Reusable local workflows for services, media, audio/video, prayer, visitors, web/app work, music, and AI prompts.</p>
      </div>

      <div className="template-groups">
        {Object.entries(groupedTemplates).map(([group, groupTemplates]) => (
          <section className="content-panel template-group" key={group}>
            <div className="panel-heading">
              <span className="eyebrow">{groupTemplates.length} template(s)</span>
              <h2>{group}</h2>
            </div>
            <div className="template-list">
              {groupTemplates.map((template) => (
                <article className="template-card" key={template.templateName}>
                  <div>
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
        ))}
      </div>
    </section>
  )
}

export default TemplatesPage
