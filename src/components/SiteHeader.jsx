import { Link, NavLink } from 'react-router-dom'
import { publishedSections } from '../data/sections.js'
import './SiteHeader.css'

// Header styled as the top strip of a drawing sheet.
function SiteHeader({ sheet = '000', sheetTitle = 'Index' }) {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link to="/" className="site-header__mark">
          <span className="site-header__logo display">MD</span>
          <span className="mono">Mike Dawson</span>
        </Link>
        <span className="site-header__sheet mono">
          DWG {sheet} · {sheetTitle}
        </span>
        <nav className="site-header__nav" aria-label="Main">
          {publishedSections.map((section) => (
            <NavLink
              key={section.id}
              to={section.path}
              className="site-header__link mono"
              style={{ '--link-flood': `var(--section-${section.id})` }}
            >
              {section.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
