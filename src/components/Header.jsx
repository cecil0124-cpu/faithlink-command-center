function Header({
  description,
  focusCard,
  lastUpdated,
  onClearSearch,
  onSearchChange,
  roleSwitcher,
  searchTerm,
  tagline,
  title,
}) {
  return (
    <header className="top-header">
      <div className="header-copy">
        <p className="eyebrow">FaithLink Command Center</p>
        <h1>{title}</h1>
        <p className="header-tagline">{tagline}</p>
        <p>{description}</p>
        <p className="last-updated">Last updated: {lastUpdated}</p>
      </div>

      <div className="header-actions">
        {roleSwitcher}

        <label className="global-search">
          <span>Search</span>
          <div>
            <input
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search tasks, notes, status..."
              type="search"
              value={searchTerm}
            />
            {searchTerm && (
              <button onClick={onClearSearch} type="button">
                Clear
              </button>
            )}
          </div>
        </label>

        <article className="focus-card">
          <span>Current Focus</span>
          <strong>{focusCard.title}</strong>
          <p>{focusCard.detail}</p>
          <small>{focusCard.nextStep}</small>
        </article>
      </div>
    </header>
  )
}

export default Header
