import { MAX_REFLECTIONS } from '../data/projects.js'
import './ReflectionCard.css'

// Up to five lessons from building a prototype, laid out like numbered drawing notes.
// Empty slots stay visible as blank lines so the card reads as "to be filled in".
function ReflectionCard({ reflections = [] }) {
  const slots = Array.from({ length: MAX_REFLECTIONS }, (_, index) => reflections[index])
  const filled = reflections.length > 0

  return (
    <section className="reflection" aria-labelledby="reflection-title">
      <div className="reflection__head">
        <h2 id="reflection-title" className="display reflection__title">
          Reflection
        </h2>
        <span className="mono reflection__count">
          {reflections.length}/{MAX_REFLECTIONS} lessons
        </span>
      </div>
      {!filled && <p className="reflection__empty">Lessons from this build will be added here.</p>}
      <ol className="reflection__list">
        {slots.map((lesson, index) => (
          <li key={index} className={`reflection__item ${lesson ? '' : 'reflection__item--blank'}`}>
            <span className="mono reflection__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="reflection__text">{lesson ?? <span className="sr-only">Not written yet</span>}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ReflectionCard
