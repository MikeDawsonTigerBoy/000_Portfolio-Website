import { useLayoutEffect, useState } from 'react'

let canvas

/*
 * Places a square to span a heading's first two lines exactly: from the top of
 * the capitals on line 1 to the baseline of line 2 (SCRUM-37 review).
 * Measures the loaded font rather than guessing, so it holds for every title,
 * font size and screen width. Returns { top, size } in px relative to the
 * heading's offset parent, or null until measured.
 *
 *   baseline of line n = top + n·L + (L − (A + D)) / 2 + A
 *   cap top of line 1  = baseline 1 − capHeight
 *   size               = L + capHeight      (cap top of line 1 → baseline of line 2)
 * where L is the line height and A / D the font's ascent and descent.
 */
export function useCapGrid(headingRef, deps = []) {
  const [box, setBox] = useState(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const measure = () => {
      const style = getComputedStyle(heading)
      canvas ??= document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const metrics = ctx.measureText('H')
      const capHeight = metrics.actualBoundingBoxAscent
      const ascent = metrics.fontBoundingBoxAscent
      const descent = metrics.fontBoundingBoxDescent
      const lineHeight = parseFloat(style.lineHeight)
      if (![capHeight, ascent, descent, lineHeight].every(Number.isFinite)) return

      const baseline = heading.offsetTop + (lineHeight - (ascent + descent)) / 2 + ascent
      setBox({ top: baseline - capHeight, size: lineHeight + capHeight })
    }

    measure()
    document.fonts?.ready.then(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(heading)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return box
}
