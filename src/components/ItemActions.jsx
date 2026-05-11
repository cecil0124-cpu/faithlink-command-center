function ItemActions({ isComplete, isPinned, onComplete, onDelete, onEdit, onTogglePin }) {
  return (
    <div className="item-actions" aria-label="Item actions">
      <button className="secondary-button" onClick={onTogglePin} type="button">
        {isPinned ? 'Unpin' : 'Pin'}
      </button>
      <button className="secondary-button" onClick={onEdit} type="button">
        Edit
      </button>
      <button
        className="secondary-button"
        disabled={isComplete}
        onClick={onComplete}
        type="button"
      >
        Complete
      </button>
      <button className="danger-button" onClick={onDelete} type="button">
        Delete
      </button>
    </div>
  )
}

export default ItemActions
