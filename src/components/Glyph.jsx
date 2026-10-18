import './Glyph.css'

// Small line drawings for each section. Strokes draw in on hover of a parent `.glyph-host`.
const paths = {
  grid: [
    'M10 10 H90 V90 H10 Z',
    'M36.7 10 V90',
    'M63.3 10 V90',
    'M10 36.7 H90',
    'M10 63.3 H90',
    'M36.7 36.7 H63.3 V63.3 H36.7 Z',
  ],
  wave: [
    'M5 50 H95',
    'M10 50 V40 M20 50 V25 M30 50 V35 M40 50 V12 M50 50 V30 M60 50 V18 M70 50 V38 M80 50 V22 M90 50 V42',
    'M10 50 V60 M20 50 V75 M30 50 V65 M40 50 V88 M50 50 V70 M60 50 V82 M70 50 V62 M80 50 V78 M90 50 V58',
  ],
  arc: [
    'M10 90 H90',
    'M10 90 A80 80 0 0 1 90 10',
    'M10 90 V10 H90',
    'M10 90 L90 10',
    'M50 90 A40 40 0 0 1 90 50',
  ],
  lines: [
    'M20 8 H70 L84 22 V92 H20 Z',
    'M70 8 V22 H84',
    'M32 40 H72',
    'M32 54 H72',
    'M32 68 H60',
  ],
}

function Glyph({ type = 'grid', className = '' }) {
  return (
    <svg className={`glyph ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      {paths[type].map((d, index) => (
        <path key={d} d={d} pathLength="1" style={{ '--i': index }} />
      ))}
    </svg>
  )
}

export default Glyph
