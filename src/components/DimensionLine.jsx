import './DimensionLine.css'

// An architectural dimension line: |←── label ──→|. Draws itself in when visible.
function DimensionLine({ label, className = '' }) {
  return (
    <div className={`dimension ${className}`}>
      <span className="dimension__tick" aria-hidden="true" />
      <span className="dimension__line" aria-hidden="true" />
      <span className="dimension__label mono">{label}</span>
      <span className="dimension__line" aria-hidden="true" />
      <span className="dimension__tick" aria-hidden="true" />
    </div>
  )
}

export default DimensionLine
