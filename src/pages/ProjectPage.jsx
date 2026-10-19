import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DevicePreview from '../components/DevicePreview.jsx'
import ReflectionCard from '../components/ReflectionCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { featuredProjects, findProject, formats, projects } from '../data/projects.js'
import { useCapGrid } from '../lib/useCapGrid.js'
import { useFitWords } from '../lib/useFitWords.js'
import './ProjectPage.css'

function ProjectPage() {
  const { number } = useParams()
  const project = findProject(number)
  const titleRef = useRef(null)
  useFitWords(titleRef, [number])
  const grid = useCapGrid(titleRef, [number])

  if (!project) return <Navigate to="/product" replace />

  const format = formats[project.format]
  // Prev / next step through the featured prototypes only
  const index = featuredProjects.indexOf(project)
  const prev = featuredProjects[index - 1]
  const next = featuredProjects[index + 1]

  return (
    <article className="project-page">
      <header className="project-hero">
        <div className="project-hero__inner container">
          <div className="project-hero__label mono">
            <Link to="/product">← Product</Link>
            <span>
              PRJ {project.number} / {projects.at(-1).number}
            </span>
          </div>
          <span className="project-hero__number display">{project.number}</span>
          {/* Static on purpose: the visitor has chosen this project, so nothing moves here.
              It spans the title's first two lines exactly (see useCapGrid). */}
          <div
            className="project-hero__grid"
            aria-hidden="true"
            style={grid ? { '--grid-top': `${grid.top}px`, '--grid-size': `${grid.size}px` } : { visibility: 'hidden' }}
          >
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <h1 ref={titleRef} className="project-hero__title display">
            {project.title}
          </h1>
          {project.subtitle && <p className="mono project-hero__subtitle">{project.subtitle}</p>}
          <p className="project-hero__summary">{project.summary}</p>
        </div>
      </header>

      <div className="project-page__body container">
        <dl className="project-spec">
          <div>
            <dt className="mono">Format</dt>
            <dd>{format.label}</dd>
          </div>
          <div>
            <dt className="mono">Runs on</dt>
            <dd>{format.platforms}</dd>
          </div>
          <div>
            <dt className="mono">Status</dt>
            <dd>{project.demoUrl || project.videoUrl ? 'Live demo' : 'In progress'}</dd>
          </div>
          <div>
            <dt className="mono">Source</dt>
            <dd>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </dd>
          </div>
        </dl>

        <Reveal className="project-page__demo">
          {format.preview ? (
            <DevicePreview project={project} />
          ) : (
            <div className="project-video">
              {project.videoUrl ? (
                <video src={project.videoUrl} controls playsInline preload="metadata" />
              ) : (
                <p className="mono">Video demo coming soon</p>
              )}
            </div>
          )}
        </Reveal>

        <Reveal>
          <ReflectionCard reflections={project.reflections} />
        </Reveal>

        <nav className="project-nav mono" aria-label="Other prototypes">
          {prev ? <Link to={prev.path}>← {prev.number} {prev.title}</Link> : <span />}
          {next ? <Link to={next.path}>{next.number} {next.title} →</Link> : <span />}
        </nav>
      </div>
    </article>
  )
}

export default ProjectPage
