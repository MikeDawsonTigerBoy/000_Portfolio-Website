import { Link } from 'react-router-dom'
import Glyph from './Glyph.jsx'
import './EntryCard.css'

// A large linked panel into a section. Floods with the section colour on hover.
function EntryCard({ section }) {
  return (
    <Link
      to={section.path}
      className="entry-card glyph-host"
      style={{
        '--flood': `var(--section-${section.id})`,
        '--flood-on': `var(--section-${section.id}-on)`,
      }}
    >
      <div className="entry-card__top">
        <span className="mono">{section.number}</span>
        <span className="mono entry-card__meta">{section.meta}</span>
      </div>
      <div className="entry-card__glyph">
        <Glyph type={section.glyph} />
      </div>
      <div className="entry-card__bottom">
        <h3 className="entry-card__title display">{section.title}</h3>
        <p className="entry-card__summary">{section.summary}</p>
        <span className="entry-card__cta mono">
          Enter <span className="entry-card__arrow" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

export default EntryCard
