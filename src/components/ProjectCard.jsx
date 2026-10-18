import { Link } from 'react-router-dom'
import { formats } from '../data/projects.js'
import ConceptDiagram from './diagrams/ConceptDiagram.jsx'
import './ProjectCard.css'

// A numbered drawing-sheet card linking to a prototype's page.
function ProjectCard({ project }) {
  return (
    <Link
      className="project-card"
      to={project.path}
      data-diagram-host
      style={{ '--card-colour': project.colour, '--card-colour-on': project.colourOn }}
    >
      <div className="project-card__head mono">
        <span>PRJ</span>
        <span>{formats[project.format].platforms}</span>
      </div>
      <div className="project-card__hero">
        <span className="project-card__number display">{project.number}</span>
      </div>
      <ConceptDiagram
        type={project.diagram}
        size="calc(var(--card-grid) * 3)"
        className="project-card__diagram"
      />
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        {project.subtitle && <p className="project-card__subtitle mono">{project.subtitle}</p>}
        <p className="project-card__summary">{project.summary}</p>
      </div>
      <div className="project-card__foot mono">
        <span className="project-card__repo">View prototype</span>
        <span className="project-card__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  )
}

export default ProjectCard
