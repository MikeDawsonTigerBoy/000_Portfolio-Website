import './GridOverlay.css'

// Faint column lines behind every page, like a drafting grid.
function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="grid-overlay__inner container" />
    </div>
  )
}

export default GridOverlay
