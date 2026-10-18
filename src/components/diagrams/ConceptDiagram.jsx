import { useEffect, useRef, useState } from 'react'
import CubeDiagram from './CubeDiagram.jsx'
import { advanceCubePuzzle } from './cubePuzzle.js'

// Each prototype names its diagram in src/data/projects.js. Add new ones here.
// `onStart` runs once each time a hover starts the diagram playing.
const diagrams = {
  cube: { Component: CubeDiagram, cycleAnimation: 'cube-pivot', onStart: advanceCubePuzzle },
}

/*
 * Plays a project's concept diagram while the nearest [data-diagram-host]
 * ancestor is hovered or focused. When the pointer leaves, it finishes the
 * current cycle before stopping, so it always comes to rest in its start state.
 */
// `size` is px (number) or any CSS length, e.g. a calc() tied to a parent's grid.
function ConceptDiagram({ type = 'cube', size = 120, className = '' }) {
  const ref = useRef(null)
  const stopRequested = useRef(false)
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const { Component, cycleAnimation, onStart } = diagrams[type] ?? diagrams.cube

  useEffect(() => {
    const host = ref.current?.closest('[data-diagram-host]')
    if (!host) return

    const start = () => {
      stopRequested.current = false
      // A fresh hover (not re-entering mid-cycle) moves the puzzle on
      if (!playingRef.current) onStart?.()
      playingRef.current = true
      setPlaying(true)
    }
    const stop = (event) => {
      // Ignore focus moving between elements inside the host
      if (event.type === 'focusout' && host.contains(event.relatedTarget)) return
      stopRequested.current = true
    }

    host.addEventListener('pointerenter', start)
    host.addEventListener('pointerleave', stop)
    host.addEventListener('focusin', start)
    host.addEventListener('focusout', stop)
    return () => {
      host.removeEventListener('pointerenter', start)
      host.removeEventListener('pointerleave', stop)
      host.removeEventListener('focusin', start)
      host.removeEventListener('focusout', stop)
    }
  }, [onStart])

  const handleIteration = (event) => {
    if (event.animationName === cycleAnimation && stopRequested.current) {
      playingRef.current = false
      setPlaying(false)
    }
  }

  return (
    <div
      ref={ref}
      className={`concept-diagram ${playing ? 'is-playing' : ''} ${className}`}
      style={{ '--cube': typeof size === 'number' ? `${size}px` : size }}
      onAnimationIteration={handleIteration}
    >
      <Component />
    </div>
  )
}

export default ConceptDiagram
