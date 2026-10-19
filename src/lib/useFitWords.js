import { useLayoutEffect } from 'react'

/*
 * Never cut a word in half (SCRUM-42). Big display text may wrap between words,
 * but a single word that is wider than its box would otherwise break mid-word
 * or run off the screen. This measures the widest word at the CSS font size and,
 * only if it doesn't fit, scales the font down just enough to fit it on one line.
 * It re-checks when the box changes width and once web fonts have loaded.
 */
export function useFitWords(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let lastWidth = -1

    const fit = () => {
      el.style.fontSize = ''
      const style = getComputedStyle(el)
      const available = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      lastWidth = el.clientWidth
      if (available <= 0) return

      // Measure each word unbroken, on its own line
      const wrap = el.style.overflowWrap
      el.style.overflowWrap = 'normal'
      let widest = 0
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const words = /\S+/g
        for (let match = words.exec(node.data); match; match = words.exec(node.data)) {
          const range = document.createRange()
          range.setStart(node, match.index)
          range.setEnd(node, match.index + match[0].length)
          widest = Math.max(widest, range.getBoundingClientRect().width)
        }
      }
      el.style.overflowWrap = wrap

      if (widest > available) {
        // A hair under, so rounding never tips the word over the edge
        el.style.fontSize = `${(parseFloat(style.fontSize) * available * 0.98) / widest}px`
      }
    }

    fit()
    document.fonts?.ready.then(fit)
    const observer = new ResizeObserver(() => {
      if (el.clientWidth !== lastWidth) fit()
    })
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
