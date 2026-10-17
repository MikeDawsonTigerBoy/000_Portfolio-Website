import './ListenRow.css'

const BAR_COUNT = 12

// Full-width link to a streaming platform. Floods terracotta and the
// equaliser bars start moving on hover.
function ListenRow({ platform }) {
  return (
    <a className="listen-row" href={platform.url} target="_blank" rel="noopener noreferrer">
      <span className="listen-row__number mono">{platform.number}</span>
      <span className="listen-row__name display">{platform.name}</span>
      <span className="listen-row__eq" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }, (_, index) => (
          <span key={index} style={{ '--bar': index }} />
        ))}
      </span>
      <span className="listen-row__action mono">
        {platform.action} <span className="listen-row__arrow">↗</span>
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export default ListenRow
