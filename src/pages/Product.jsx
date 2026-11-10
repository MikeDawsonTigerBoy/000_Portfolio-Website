import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import ToolBelt from '../components/ToolBelt.jsx'
import { featuredProjects, upcomingProjects } from '../data/projects.js'
import { sections } from '../data/sections.js'
import { aiBuild, builtWith } from '../data/tools.js'
import './Product.css'

const section = sections.find((item) => item.id === 'product')

function Product() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          Two AI product prototypes you can try, each taken from a real problem to working
          code. The rest of the drawing set is listed below.
        </p>
      </SectionHero>

      <section className="product container" aria-labelledby="product-set-title">
        <div className="product__head mono">
          <h2 id="product-set-title">In development</h2>
          <span>{featuredProjects.map((project) => project.number).join(' · ')}</span>
        </div>
        <ul className="product__grid" style={{ '--product-columns': Math.min(3, featuredProjects.length) }}>
          {featuredProjects.map((project, index) => (
            <Reveal as="li" key={project.repo} delay={(index % 3) * 100} className="product__cell">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </section>

      <ToolBelt id="product-built-title" title="Built with" meta="In the prototypes and this site" items={builtWith} />
      <ToolBelt id="product-ai-title" title="AI build" meta="How the code gets written" items={aiBuild} />

      <Reveal as="section" className="product-upcoming container" aria-labelledby="product-upcoming-title">
        <div className="product__head mono">
          <h2 id="product-upcoming-title">Under development</h2>
          <span>{upcomingProjects.length} prototypes</span>
        </div>
        <table className="product-upcoming__table">
          <thead className="mono">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {upcomingProjects.map((project) => (
              // Focusable so keyboard users can reveal the description too
              <tr key={project.repo} tabIndex={0}>
                <td className="product-upcoming__number display">{project.number}</td>
                <th scope="row">{project.title}</th>
                <td className="product-upcoming__description">{project.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </>
  )
}

export default Product
