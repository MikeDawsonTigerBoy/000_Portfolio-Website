import './CubeDiagram.css'

const LAYERS = ['top', 'middle', 'bottom']
const SIDES = ['front', 'right', 'back', 'left']

const stickers = (count) =>
  Array.from({ length: count }, (_, index) => <span key={index} className="cube__sticker" />)

/*
 * Default concept diagram: a flat 3×3 grid that pivots into a wireframe Rubik's
 * cube, turns its layers, then folds back to the flat grid. Lines only, no fills.
 *
 * Built as three horizontal layers so each one can turn on its own. Every layer
 * has four side strips (three stickers each) plus a top and bottom face; only
 * the cube's real top and bottom carry stickers.
 */
function CubeDiagram() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube">
        {LAYERS.map((layer) => (
          <div key={layer} className={`cube__layer cube__layer--${layer}`}>
            {SIDES.map((side) => (
              <div key={side} className={`cube__face cube__face--${side}`}>
                {stickers(3)}
              </div>
            ))}
            <div className="cube__face cube__face--up">{layer === 'top' && stickers(9)}</div>
            <div className="cube__face cube__face--down">{layer === 'bottom' && stickers(9)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CubeDiagram
