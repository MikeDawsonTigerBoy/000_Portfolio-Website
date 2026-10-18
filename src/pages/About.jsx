import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import { contacts } from '../data/contact.js'
import { sections } from '../data/sections.js'
import './About.css'

const section = sections.find((item) => item.id === 'about')

function About() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          Registered architect with nine years of international delivery, moving into AI product
          management. Based in Cape Town, heading to Berlin.
        </p>
      </SectionHero>

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
                <span className="contact-row__value display">{contact.value}</span>
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
