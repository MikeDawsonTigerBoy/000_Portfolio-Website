import { useEffect, useRef, useState } from 'react'
import CubeDiagram from './CubeDiagram.jsx'

// Each prototype names its diagram in src/data/projects.js. Add new ones here.
const diagrams = {
  cube: { Component: CubeDiagram, cycleAnimation: 'cube-pivot' },
}

/*
 * Plays a project's concept diagram while the nearest [data-diagram-host]
 * ancestor is hovered or focused. When the pointer leaves, it finishes the
 * current cycle before stopping, so it always comes to rest in its start state.
 */
function ConceptDiagram({ type = 'cube', size = 120, className = '' }) {
  const ref = useRef(null)
  const stopRequested = useRef(false)
  const [playing, setPlaying] = useState(false)
  const { Component, cycleAnimation } = diagrams[type] ?? diagrams.cube

  useEffect(() => {
    const host = ref.current?.closest('[data-diagram-host]')
    if (!host) return

    const start = () => {
      stopRequested.current = false
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
  }, [])

  const handleIteration = (event) => {
    if (event.animationName === cycleAnimation && stopRequested.current) {
      setPlaying(false)
    }
  }

  return (
    <div
      ref={ref}
      className={`concept-diagram ${playing ? 'is-playing' : ''} ${className}`}
      style={{ '--cube': `${size}px` }}
      onAnimationIteration={handleIteration}
    >
      <Component />
    </div>
  )
}

export default ConceptDiagram
