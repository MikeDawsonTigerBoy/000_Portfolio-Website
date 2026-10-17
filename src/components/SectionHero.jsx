import Glyph from './Glyph.jsx'
import './SectionHero.css'

// Full-bleed colour flood that opens each section page.
function SectionHero({ section, children }) {
  return (
    <section
      className="section-hero"
      style={{
        '--flood': `var(--section-${section.id})`,
        '--flood-on': `var(--section-${section.id}-on)`,
      }}
    >
      <div className="section-hero__inner container">
        <div className="section-hero__label mono">
          <span>Sheet {section.number}</span>
          <span>{section.meta}</span>
        </div>
        <h1 className="section-hero__title display">{section.title}</h1>
        <div className="section-hero__glyph">
          <Glyph type={section.glyph} />
        </div>
        <div className="section-hero__body">{children ?? <p>{section.summary}</p>}</div>
      </div>
    </section>
  )
}

export default SectionHero
