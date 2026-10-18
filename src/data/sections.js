// The site's sections, in header-nav order.
//
// `hidden` sections (Art, Music) stay in the code but are left out of the deployed
// site for the MVP (SCRUM-35): no nav link, no home card and no route. To work on
// them locally, put VITE_SHOW_HIDDEN_SECTIONS=true in .env.local and restart `npm run dev`.
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
    meta: '3 in development',
    glyph: 'grid',
  },
  {
    id: 'art',
    number: '03',
    title: 'Art',
    path: '/art',
    summary: 'Drawings, studies and visual work from an architect’s sketchbook.',
    meta: 'Selected works',
    glyph: 'arc',
    hidden: true,
  },
  {
    id: 'music',
    number: '02',
    title: 'Music',
    path: '/music',
    summary: 'Releases as Dawson. Electronic, melodic, made between two cities.',
    meta: 'Spotify · Apple · YouTube',
    glyph: 'wave',
    hidden: true,
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

const showHidden = import.meta.env.VITE_SHOW_HIDDEN_SECTIONS === 'true'

export const isPublished = (section) => Boolean(section) && (!section.hidden || showHidden)
export const findSection = (id) => sections.find((section) => section.id === id)

// Sections visitors can reach: the header nav and the routes.
export const publishedSections = sections.filter(isPublished)

// Home shows the first three published sections in this order as its entry points.
// With Art and Music hidden that's Product, Blog, About.
const entryIds = ['product', 'music', 'art', 'blog', 'about']
export const entrySections = entryIds.map(findSection).filter(isPublished).slice(0, 3)
