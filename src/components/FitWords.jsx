import { useRef } from 'react'
import { useFitWords } from '../lib/useFitWords.js'

// Display text that never cuts a word in half: see useFitWords.
// `fitKey` re-fits when the text changes (e.g. a new section or post).
function FitWords({ as: Tag = 'span', fitKey, children, ...props }) {
  const ref = useRef(null)
  useFitWords(ref, [fitKey])
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}

export default FitWords
