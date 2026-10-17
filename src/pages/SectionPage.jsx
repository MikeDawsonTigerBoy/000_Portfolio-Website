import { Link } from 'react-router-dom'
import SectionHero from '../components/SectionHero.jsx'
import { sections } from '../data/sections.js'
import './SectionPage.css'

// Placeholder for sections whose content hasn't been built yet.
function SectionPage({ id }) {
  const section = sections.find((item) => item.id === id)

  return (
    <>
      <SectionHero section={section} />
      <div className="section-page container">
        <p className="mono section-page__status">Under construction — drawings in progress</p>
        <Link to="/" className="mono section-page__back">
          ← Back to index
        </Link>
      </div>
    </>
  )
}

export default SectionPage
