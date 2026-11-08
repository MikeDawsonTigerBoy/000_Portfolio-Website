import { useState } from 'react'
import { Link } from 'react-router-dom'
import { STATEMENTS } from '../data/projects.js'
import { posts } from '../data/posts.js'
import './ProjectSections.css'

/*
 * The standard sections every featured prototype page shows (see CLAUDE.md, "Prototype pages").
 * Each one renders a "to be written" placeholder when its data is missing, so a new prototype
 * gets the whole page structure as soon as it is added to src/data/projects.js.
 */

export function SectionHead({ index, title, note }) {
  return (
    <div className="psection__head">
      <span className="mono psection__index">{String(index).padStart(2, '0')}</span>
      <h2 className="display psection__title">{title}</h2>
      {note && <span className="mono psection__note">{note}</span>}
    </div>
  )
}

export function Placeholder({ children }) {
  return <p className="psection__placeholder mono">To be written: {children}</p>
}

// Large-type statements: why, problem, solution … so a reader can skim the thinking in a minute.
export function Statements({ statements = {}, index }) {
  return (
    <section className="psection" aria-labelledby="statements-title">
      <SectionHead index={index} title={<span id="statements-title">At a glance</span>} />
      <div className="statements">
        {STATEMENTS.map(([key, label]) => (
          <div key={key} className={`statement ${statements[key] ? '' : 'statement--empty'}`}>
            <h3 className="mono statement__label">{label}</h3>
            {statements[key] ? (
              <p className="statement__text">{statements[key]}</p>
            ) : (
              <p className="statement__text statement__text--empty">To be written</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// The presentation deck as slide images, one at a time, with a strip of thumbnails.
export function SlideDeck({ slides = [], index }) {
  const [current, setCurrent] = useState(0)
  const count = slides.length
  const go = (step) => setCurrent((value) => (value + step + count) % count)

  return (
    <section className="psection" aria-labelledby="deck-title">
      <SectionHead index={index} title={<span id="deck-title">Slide deck</span>} note={count ? `${count} slides` : null} />
      {count === 0 ? (
        <Placeholder>the presentation deck, exported as slide images.</Placeholder>
      ) : (
        <div
          className="deck"
          role="region"
          aria-roledescription="carousel"
          aria-label="Slide deck"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') go(1)
            if (event.key === 'ArrowLeft') go(-1)
          }}
        >
          <div className="deck__stage">
            <img
              className="deck__slide"
              src={slides[current].src}
              alt={`Slide ${current + 1} of ${count}: ${slides[current].title}`}
              width="1600"
              height="900"
            />
          </div>
          <div className="deck__bar">
            <button type="button" className="deck__button mono" onClick={() => go(-1)} aria-label="Previous slide">
              ←
            </button>
            <span className="mono deck__count" aria-live="polite">
              {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · {slides[current].title}
            </span>
            <button type="button" className="deck__button mono" onClick={() => go(1)} aria-label="Next slide">
              →
            </button>
          </div>
          <ol className="deck__thumbs">
            {slides.map((slide, slideIndex) => (
              <li key={slide.src}>
                <button
                  type="button"
                  className={`deck__thumb ${slideIndex === current ? 'deck__thumb--on' : ''}`}
                  onClick={() => setCurrent(slideIndex)}
                  aria-label={`Show slide ${slideIndex + 1}: ${slide.title}`}
                  aria-current={slideIndex === current ? 'true' : undefined}
                >
                  <img src={slide.src} alt="" loading="lazy" width="160" height="90" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

// The long read: paragraphs with { h } subheadings between them.
export function Description({ blocks = [], index }) {
  const words = blocks.filter((block) => typeof block === 'string').join(' ').split(/\s+/).filter(Boolean).length
  return (
    <section className="psection" aria-labelledby="description-title">
      <SectionHead
        index={index}
        title={<span id="description-title">The full story</span>}
        note={words ? `${Math.round(words / 50) * 50} words · ${Math.max(1, Math.round(words / 220))} min read` : null}
      />
      {blocks.length === 0 ? (
        <Placeholder>a write-up of about 1,000 words: the question, what was built, what it showed and what comes next.</Placeholder>
      ) : (
        <div className="description">
          {blocks.map((block, blockIndex) =>
            typeof block === 'string' ? (
              <p key={blockIndex}>{block}</p>
            ) : (
              <h3 key={blockIndex} className="description__h">
                {block.h}
              </h3>
            ),
          )}
        </div>
      )}
    </section>
  )
}

// A simple left-to-right diagram of how the prototype works, plus the insights worth knowing.
export function TechStack({ stack, index }) {
  const steps = stack?.steps ?? []
  const insights = stack?.insights ?? []
  return (
    <section className="psection" aria-labelledby="stack-title">
      <SectionHead index={index} title={<span id="stack-title">How it works</span>} />
      {steps.length === 0 ? (
        <Placeholder>a simple diagram of the tech stack, from data in to what the user sees.</Placeholder>
      ) : (
        <>
          <ol className="stack">
            {steps.map((step, stepIndex) => (
              <li key={step.title} className="stack__step">
                <span className="mono stack__number">{String(stepIndex + 1).padStart(2, '0')}</span>
                <h3 className="stack__title">{step.title}</h3>
                <p className="stack__detail">{step.detail}</p>
              </li>
            ))}
          </ol>
          {insights.length > 0 && (
            <ul className="stack__insights">
              {insights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

// Blog posts about this prototype, found by their `project` number in src/data/posts.js.
export function ProjectPosts({ number, index }) {
  const related = posts.filter((post) => post.project === number)
  return (
    <section className="psection" aria-labelledby="posts-title">
      <SectionHead index={index} title={<span id="posts-title">From the blog</span>} />
      {related.length === 0 ? (
        <Placeholder>a blog post about the event or the learnings behind this prototype.</Placeholder>
      ) : (
        <ul className="project-posts">
          {related.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="project-posts__link">
                <span className="mono">
                  {post.number} · {post.date}
                </span>
                <span className="display project-posts__title">{post.title}</span>
                <span>{post.kicker} →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
