// The site's sections, in header-nav order.
export const sections = [
  {
    id: 'about',
    number: '04',
    title: 'About',
    path: '/about',
    summary: 'Registered architect moving into AI product management. Cape Town ⇄ Berlin.',
    meta: 'Contact',
    glyph: 'grid',
  },
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
    id: 'blog',
    number: '05',
    title: 'Blog',
    path: '/blog',
    summary: 'Learnings from building, each linked to the prototype or article it came from.',
    meta: 'Field notes',
    glyph: 'lines',
  },
]

// Home shows these three as its entry points, in this order.
const entryIds = ['product', 'music', 'art']
export const entrySections = entryIds.map((id) => sections.find((section) => section.id === id))
