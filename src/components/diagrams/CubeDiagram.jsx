import './CubeDiagram.css'

const LAYERS = ['top', 'middle', 'bottom']

// The nine small cubes in one layer: x is the column (0–2, left to right),
// z the depth (0–2, back to front).
const PIECES = [0, 1, 2].flatMap((z) => [0, 1, 2].map((x) => ({ x, z })))

// Faces each small cube draws, so every shared plane is drawn once and every
// outer face exists: front and right always, back and left only on the outer
// rows. Up and down are always drawn because layers turn apart from each other.
const facesFor = ({ x, z }) => [
  'front',
  'right',
  'up',
  'down',
  ...(z === 0 ? ['back'] : []),
  ...(x === 0 ? ['left'] : []),
]

function Cube() {
  return (
    <div className="cube">
      {LAYERS.map((layer) => (
        <div key={layer} className={`cube__layer cube__layer--${layer}`}>
          {PIECES.map(({ x, z }) => (
            <div
              key={`${x}-${z}`}
              className={`cube__piece${z === 2 ? ' cube__piece--front' : ''}`}
              style={{ '--x': x, '--z': z }}
            >
              {facesFor({ x, z }).map((face) => (
                <span key={face} className={`cube__face cube__face--${face}`} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/*
 * Default concept diagram: a flat 3×3 grid that pivots into a Rubik's cube,
 * turns its layers, then folds back to the flat grid.
 *
 * Drawn as two copies of the same 27-cube form, animated in step:
 *   solid – faces filled with the card's colour, so you see the external form,
 *           with one thick outline traced around its silhouette only
 *   ghost – every edge again at 25% strength on top, so the lines behind
 *           show faintly, as if the cube were translucent
 */
function CubeDiagram() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube-view cube-view--solid">
        <Cube />
      </div>
      <div className="cube-view cube-view--ghost">
        <Cube />
      </div>
    </div>
  )
}

export default CubeDiagram
