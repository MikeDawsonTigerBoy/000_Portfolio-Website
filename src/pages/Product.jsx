import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import { projects } from '../data/projects.js'
import { sections } from '../data/sections.js'
import './Product.css'

const section = sections.find((item) => item.id === 'product')

function Product() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          Ten AI product prototypes, numbered like a drawing set. Each one starts from a real problem
          and ends in working code.
        </p>
      </SectionHero>

      <section className="product container" aria-labelledby="product-set-title">
        <div className="product__head mono">
          <h2 id="product-set-title">Drawing set — prototypes</h2>
          <span>001—{projects.at(-1).number}</span>
        </div>
        <ul className="product__grid">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.repo} delay={(index % 3) * 100} className="product__cell">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Product
