import { stickerColour, useCubeState } from './cubePuzzle.js'
import './CubeDiagram.css'

const LAYERS = ['top', 'middle', 'bottom']
const SIDES = ['front', 'right', 'back', 'left']

// `indexes` are the stickers' positions (0–8, row by row) on their face.
const stickers = (face, indexes, state) =>
  indexes.map((index) => (
    <span
      key={index}
      className="cube__sticker"
      style={{ '--sticker': stickerColour(face, index, state) }}
    />
  ))

const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8]

/*
 * Default concept diagram: a flat 3×3 grid that pivots into a Rubik's cube,
 * turns its layers, then folds back to the flat grid.
 *
 * Built as three horizontal layers so each one can turn on its own. Every layer
 * has four side strips (one row of three stickers) plus a top and bottom face; only
 * the cube's real top and bottom carry stickers, the inner faces are the dark core.
 * Sticker colours come from the shared puzzle state (cubePuzzle.js).
 */
function CubeDiagram() {
  const state = useCubeState()

  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube">
        {LAYERS.map((layer, row) => (
          <div key={layer} className={`cube__layer cube__layer--${layer}`}>
            {SIDES.map((side) => (
              <div key={side} className={`cube__face cube__face--${side}`}>
                {stickers(side, [row * 3, row * 3 + 1, row * 3 + 2], state)}
              </div>
            ))}
            <div className={`cube__face cube__face--up ${layer === 'top' ? '' : 'cube__face--core'}`}>
              {layer === 'top' && stickers('up', ALL, state)}
            </div>
            <div className={`cube__face cube__face--down ${layer === 'bottom' ? '' : 'cube__face--core'}`}>
              {layer === 'bottom' && stickers('down', ALL, state)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CubeDiagram
