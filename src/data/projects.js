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
 * Optional fields per project:
 *   summary     – one or two sentences for the card and page
 *   demoUrl     – the live web build, shown inside the phone frames
 *   iosUrl      – iOS-specific link (TestFlight, App Store, Expo Go); used on iPhones
 *   androidUrl  – Android-specific link (Play Store, Expo Go, APK); used on Android phones
 *   videoUrl    – demo video, for plugins
 *   reflections – up to 5 lessons learned building it
 */
const rawProjects = [
  { number: '001', title: 'Decision Memory Layer', repo: '001_Decision-Memory-Layer', format: 'expo' },
  { number: '002', title: 'Hitchhiker’s Guide to the City', repo: '002_Hitchhiker-s-Guide-To-The-City', format: 'expo' },
  { number: '003', title: 'Detour', repo: '003_Detour', format: 'expo' },
  { number: '004', title: 'Shazanguage', repo: '004_Shazanguage', format: 'expo' },
  { number: '005', title: 'Financial Behaviour Analysis Tool', repo: '005_Financial-Behaviour-Analysis-Tool', format: 'web' },
  { number: '006', title: 'Hominim Wayside Recreate', repo: '006_Hominim_Wayside_Recreate', format: 'expo' },
  { number: '007', title: 'Retrogram', repo: '007_Retrogram', format: 'expo' },
  { number: '008', title: 'Cape Fear Mod', repo: '008_Cape-Fear_Mod', format: 'expo' },
  {
    number: '009',
    title: 'Air City',
    repo: '009_Air_City',
    format: 'web',
    summary: 'Municipal rent control data management system and visualiser.',
  },
  {
    number: '010',
    title: 'Tonicity',
    repo: '010_Tonicity_MIDI-Visualiser-Ableton-Plugin',
    format: 'plugin',
    subtitle: 'MIDI visualiser Ableton plugin',
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
    ...project,
    path: `/product/${project.number}`,
    url: `${GITHUB}/${project.repo}`,
    reflections: reflections.slice(0, MAX_REFLECTIONS),
  }
})

export const findProject = (number) => projects.find((project) => project.number === number)
