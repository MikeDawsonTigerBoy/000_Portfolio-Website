import { useSyncExternalStore } from 'react'

/*
 * The cube puzzle (SCRUM-40): every hover moves every cube one state closer to solved.
 *   1 – completely jumbled (first hover)
 *   2 – mostly jumbled
 *   3 – nearly solved
 *   4 – solved: each face one colour, so three colours show at a time
 * Progress is shared by all cubes on the site and remembered in this browser.
 */
export const SOLVED_STATE = 4
const STORAGE_KEY = 'md-cube-hovers'

const read = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0
  } catch {
    return 0
  }
}

let hovers = typeof window === 'undefined' ? 0 : read()
const listeners = new Set()

export function advanceCubePuzzle() {
  if (hovers >= SOLVED_STATE) return
  hovers += 1
  try {
    window.localStorage.setItem(STORAGE_KEY, String(hovers))
  } catch {
    // Storage blocked (private mode etc.): progress just won't survive a reload.
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// The state to draw: 1 until the first hover has happened, then 1–4.
export const useCubeState = () =>
  useSyncExternalStore(subscribe, () => Math.min(Math.max(hovers, 1), SOLVED_STATE))

// Nine tones (tokens.css): five reference colours plus four oranges.
export const PALETTE = [
  'var(--cube-aubergine)',
  'var(--cube-magenta)',
  'var(--cube-rose)',
  'var(--cube-coral)',
  'var(--cube-peach)',
  'var(--cube-electric)',
  'var(--cube-tangerine)',
  'var(--cube-ember)',
  'var(--cube-apricot)',
]

// Each face's colour when solved. Front, left and up are the faces the 3D pose shows.
const FACE_COLOURS = {
  front: 'var(--cube-peach)',
  left: 'var(--cube-aubergine)',
  up: 'var(--cube-magenta)',
  right: 'var(--cube-coral)',
  back: 'var(--cube-rose)',
  down: 'var(--cube-tangerine)',
}

// Share of stickers out of place per state. Lower states reuse the same random
// values, so the stickers still jumbled at state 3 are a subset of those at state 2.
const JUMBLE = { 1: 1, 2: 0.6, 3: 0.25, 4: 0 }

// Small deterministic hash → [0, 1), so a sticker's colour is stable between renders.
const random = (key) => {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 10000) / 10000
}

/*
 * Colour of one sticker. `index` runs 0–8 across the face, row by row.
 * Centre stickers never move, like a real cube, so each face keeps its anchor colour.
 */
export function stickerColour(face, index, state) {
  const solved = FACE_COLOURS[face]
  if (index === 4 || random(`${face}${index}`) >= JUMBLE[state]) return solved

  const pick = Math.floor(random(`${face}${index}colour`) * PALETTE.length)
  const colour = PALETTE[pick]
  return colour === solved ? PALETTE[(pick + 1) % PALETTE.length] : colour
}
