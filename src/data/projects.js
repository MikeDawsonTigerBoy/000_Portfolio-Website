const GITHUB = 'https://github.com/MikeDawsonTigerBoy'

// How each prototype is built. Decides what its page shows.
//   expo   – Expo (React Native): iOS, Android and web from one codebase. The default.
//   web    – Plain React web app, for dashboard-style tools.
//   plugin – Not a phone app (e.g. an Ableton plugin). Shown as a video, no device preview.
export const formats = {
  expo: { label: 'Expo', platforms: 'iOS · Android · Web', preview: true },
  web: { label: 'Web app', platforms: 'Web (desktop and mobile)', preview: true },
  plugin: { label: 'Plugin', platforms: 'Ableton Live', preview: false },
}

export const MAX_REFLECTIONS = 5

/*
 * Product prototypes.
 *
 * `featured` ones (001, 002, 004 for the MVP, SCRUM-33) get a card and a project page.
 * The rest appear only in the Under development table on the Product page (SCRUM-34).
 * Summaries are the first line of each prototype's README.
 *
 * Optional fields per project:
 *   featured    – shown as a card with its own page
 *   summary     – one sentence for the card, page and Under development table
 *   demoUrl     – the live web build, shown inside the phone frames
 *   iosUrl      – iOS-specific link (TestFlight, App Store, Expo Go); used on iPhones
 *   androidUrl  – Android-specific link (Play Store, Expo Go, APK); used on Android phones
 *   videoUrl    – demo video, for plugins
 *   reflections – up to 5 lessons learned building it
 *   diagram     – concept diagram that plays on hover (see components/diagrams); defaults to 'cube'
 */
const rawProjects = [
  {
    number: '001',
    title: 'Decision Memory Layer',
    repo: '001_Decision-Memory-Layer',
    format: 'expo',
    featured: true,
    summary: 'A Revit plug-in and web app that records why major design decisions were made, like commit history for buildings.',
  },
  {
    number: '002',
    title: 'Hitchhiker’s Guide to the City',
    repo: '002_Hitchhiker-s-Guide-To-The-City',
    format: 'expo',
    featured: true,
    summary: 'A travel app that gives you personalised recommendations along your route.',
  },
  {
    number: '003',
    title: 'deTour',
    repo: '003_Detour',
    format: 'expo',
    summary: 'A navigation app that puts the experience ahead of speed, with curated detours to hidden local gems.',
  },
  {
    number: '004',
    title: 'Shazanguage',
    repo: '004_Shazanguage',
    format: 'expo',
    featured: true,
    summary: 'Shazam for languages: tap to listen, find out which language is being spoken, and learn how to say hello in it.',
  },
  {
    number: '005',
    title: 'Financial Behaviour Analysis Tool',
    repo: '005_Financial-Behaviour-Analysis-Tool',
    format: 'web',
    summary: 'A personal finance dashboard that shows spending behaviour over time, so patterns are visible and can be changed.',
  },
  {
    number: '006',
    title: 'Hominim Wayside Recreate',
    repo: '006_Hominim_Wayside_Recreate',
    format: 'expo',
    summary: 'A rebuild of Hominim, a September 2026 hackathon app, to learn from its build style and simplicity.',
  },
  {
    number: '007',
    title: 'Retrogram',
    repo: '007_Retrogram',
    format: 'expo',
    summary: 'A private photo diary that looks and feels like Instagram, with no feed, followers, ads or endless scrolling.',
  },
  {
    number: '008',
    title: 'Cape Fear Mod',
    repo: '008_Cape-Fear_Mod',
    format: 'expo',
    summary: 'A flying game over Cape Town’s real terrain: fly a Cessna around Lion’s Head in real wind conditions.',
  },
  {
    number: '009',
    title: 'Air City',
    repo: '009_Air_City',
    format: 'web',
    summary: 'Municipal rent control data management system and data visualiser.',
  },
  {
    number: '010',
    title: 'Tonicity',
    repo: '010_Tonicity_MIDI-Visualiser-Ableton-Plugin',
    format: 'plugin',
    subtitle: 'MIDI visualiser Ableton plugin',
    summary: 'A MIDI visualiser that plays music on a circle of the 12 chromatic notes and highlights shifts in tonal centre.',
  },
]

export const projects = rawProjects.map((project) => {
  const reflections = project.reflections ?? []
  if (import.meta.env.DEV && reflections.length > MAX_REFLECTIONS) {
    console.warn(
      `${project.number} ${project.title}: ${reflections.length} reflections, only the first ${MAX_REFLECTIONS} are shown.`,
    )
  }

  return {
    summary: 'Write-up coming soon.',
    diagram: 'cube',
    ...project,
    path: `/product/${project.number}`,
    url: `${GITHUB}/${project.repo}`,
    reflections: reflections.slice(0, MAX_REFLECTIONS),
  }
})

export const featuredProjects = projects.filter((project) => project.featured)
export const upcomingProjects = projects.filter((project) => !project.featured)

// Only featured prototypes have a page.
export const findProject = (number) => featuredProjects.find((project) => project.number === number)
