function Sidebar({ activeSection, items, onSelect }) {
  return (
    <aside className="sidebar" aria-label="FaithLink navigation">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          FL
        </div>
        <div>
          <p className="brand-name">FaithLink</p>
          <p className="brand-subtitle">Command Center</p>
          <p className="brand-mode">Personal Command Center</p>
        </div>
      </div>

      <nav className="nav-list">
        {items.map((item) => (
          <button
            className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
