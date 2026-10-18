import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import { featuredProjects, upcomingProjects } from '../data/projects.js'
import { sections } from '../data/sections.js'
import './Product.css'

const section = sections.find((item) => item.id === 'product')

function Product() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          Three AI product prototypes in active development, each taken from a real problem to
          working code. The rest of the drawing set is listed below.
        </p>
      </SectionHero>

      <section className="product container" aria-labelledby="product-set-title">
        <div className="product__head mono">
          <h2 id="product-set-title">In development</h2>
          <span>{featuredProjects.map((project) => project.number).join(' · ')}</span>
        </div>
        <ul className="product__grid">
          {featuredProjects.map((project, index) => (
            <Reveal as="li" key={project.repo} delay={(index % 3) * 100} className="product__cell">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </section>

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
              <tr key={project.repo}>
                <td className="mono">{project.number}</td>
                <th scope="row">{project.title}</th>
                <td>{project.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </>
  )
}

export default Product
