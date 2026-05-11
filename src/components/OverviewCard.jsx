function OverviewCard({ card }) {
  return (
    <article className="overview-card">
      <span className="card-kicker">{card.category}</span>
      <h2>{card.title}</h2>
      <p>{card.status}</p>
    </article>
  )
}

export default OverviewCard
