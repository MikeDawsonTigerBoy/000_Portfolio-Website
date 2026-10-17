// The site's sections. Home renders the first three as entry points.
export const sections = [
  {
    id: 'product',
    number: '01',
    title: 'Product',
    path: '/product',
    summary: 'AI product prototypes, from problem framing to working build.',
    meta: '10 prototypes',
    glyph: 'grid',
  },
  {
    id: 'music',
    number: '02',
    title: 'Music',
    path: '/music',
    summary: 'Releases as Dawson. Electronic, melodic, made between two cities.',
    meta: 'Spotify · Apple · YouTube',
    glyph: 'wave',
  },
  {
    id: 'art',
    number: '03',
    title: 'Art',
    path: '/art',
    summary: 'Drawings, studies and visual work from an architect’s sketchbook.',
    meta: 'Selected works',
    glyph: 'arc',
  },
  {
    id: 'about',
    number: '04',
    title: 'About',
    path: '/about',
    summary: 'Registered architect moving into AI product management. Cape Town ⇄ Berlin.',
    meta: 'Contact',
    glyph: 'grid',
  },
]

export const entrySections = sections.slice(0, 3)
