import DimensionLine from '../components/DimensionLine.jsx'
import EntryCard from '../components/EntryCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { entrySections } from '../data/sections.js'
import './Home.css'

const facts = [
  { value: '09', label: 'Years of international architectural delivery' },
  { value: '03', label: 'AI prototypes in active development, seven more on the drawing board' },
  { value: '02', label: 'Cities: Cape Town 33.9°S ⇄ Berlin 52.5°N' },
]

function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="home-hero__label mono">
          <span>Sheet 000 · Index</span>
          <span>Architecture → AI product</span>
        </div>
        <h1 className="home-hero__title display">
          <span className="home-hero__line">Mike</span>
          <span className="home-hero__line">
            Dawson<span className="home-hero__dot">.</span>
          </span>
        </h1>
        <Reveal className="home-hero__intro" delay={300}>
          <p className="home-hero__lede">
            Registered architect turned AI product manager. I design systems people live in —
            buildings first, now software.
          </p>
          <DimensionLine label="9 yrs → AI product" />
        </Reveal>
      </section>

      <section className="home-index container" aria-labelledby="home-index-title">
        <div className="home-index__head mono">
          <h2 id="home-index-title">Index — three ways in</h2>
          <span>01—03</span>
        </div>
        <div className="home-index__grid">
          {entrySections.map((section, index) => (
            <Reveal key={section.id} delay={index * 120} className="home-index__cell">
              <EntryCard section={section} number={String(index + 1).padStart(2, '0')} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-facts container" aria-label="At a glance">
        {facts.map((fact, index) => (
          <Reveal key={fact.value + fact.label} delay={index * 120} className="home-facts__item">
            <span className="home-facts__value display">{fact.value}</span>
            <span className="home-facts__label">{fact.label}</span>
          </Reveal>
        ))}
      </section>
    </>
  )
}

export default Home
