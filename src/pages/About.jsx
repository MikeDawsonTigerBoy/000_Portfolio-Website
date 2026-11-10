import FitWords from '../components/FitWords.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import ToolBelt from '../components/ToolBelt.jsx'
import { contacts } from '../data/contact.js'
import { sections } from '../data/sections.js'
import { aiBuild, howIWork, learningNext } from '../data/tools.js'
import './About.css'

const section = sections.find((item) => item.id === 'about')

function About() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          Registered architect with nine years of international delivery, moving into AI product
          management.
        </p>
      </SectionHero>

      <ToolBelt id="about-ai-title" title="AI build" meta="How the code gets written" items={aiBuild} />
      <ToolBelt id="about-work-title" title="How I work" meta="Ticket to live site" items={howIWork}>
        Every change follows the same path: a Jira ticket, a branch, automated tests on real phone
        and desktop browsers, a preview link, review, then merge and deploy.
      </ToolBelt>
      <ToolBelt id="about-learning-title" title="Learning next" meta="Not yet in a shipped project" items={learningNext} />

      <section className="about container" aria-labelledby="about-contact-title">
        <div className="about__head mono">
          <h2 id="about-contact-title">Contact</h2>
          <span>Get in touch</span>
        </div>
        <ul className="about__list">
          {contacts.map((contact, index) => (
            <Reveal as="li" key={contact.id} delay={index * 100}>
              <a
                className="contact-row"
                href={contact.url}
                {...(contact.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className="contact-row__number mono">{contact.number}</span>
                <span className="contact-row__name mono">{contact.name}</span>
                <FitWords className="contact-row__value display" fitKey={contact.value}>
                  {contact.value}
                </FitWords>
                <span className="contact-row__arrow mono" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}

export default About
