import { Link } from 'react-router-dom'
import './TitleBlock.css'

const year = new Date().getFullYear()

// Footer drawn as an architectural title block.
function TitleBlock() {
  return (
    <footer className="title-block container">
      <dl className="title-block__grid">
        <div className="title-block__cell title-block__cell--wide">
          <dt className="mono">Project</dt>
          <dd className="display title-block__name">Mike Dawson — Portfolio</dd>
        </div>
        <div className="title-block__cell">
          <dt className="mono">Drawn by</dt>
          <dd>M. Dawson</dd>
        </div>
        <div className="title-block__cell">
          <dt className="mono">Location</dt>
          <dd>Cape Town ⇄ Berlin</dd>
        </div>
        <div className="title-block__cell">
          <dt className="mono">Date</dt>
          <dd>{year}</dd>
        </div>
        <div className="title-block__cell">
          <dt className="mono">Contact</dt>
          <dd>
            <Link to="/about">Get in touch →</Link>
          </dd>
        </div>
      </dl>
    </footer>
  )
}

export default TitleBlock
