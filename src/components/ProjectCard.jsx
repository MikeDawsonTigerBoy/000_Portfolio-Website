import './ProjectCard.css'

// A numbered drawing-sheet card linking out to a project's GitHub repo.
function ProjectCard({ project }) {
  return (
    <a className="project-card" href={project.url} target="_blank" rel="noopener noreferrer">
      <div className="project-card__head mono">
        <span>PRJ</span>
        <span>GitHub ↗</span>
      </div>
      <span className="project-card__number display">{project.number}</span>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        {project.subtitle && <p className="project-card__subtitle mono">{project.subtitle}</p>}
        <p className="project-card__summary">{project.summary}</p>
      </div>
      <div className="project-card__foot mono">
        <span className="project-card__repo">{project.repo}</span>
        <span className="project-card__arrow" aria-hidden="true">
          →
        </span>
      </div>
      <span className="sr-only">(opens GitHub in a new tab)</span>
    </a>
  )
}

export default ProjectCard
