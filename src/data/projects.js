const GITHUB = 'https://github.com/MikeDawsonTigerBoy'

// Product prototypes. Summaries are placeholders until each project is written up.
export const projects = [
  { number: '001', title: 'Decision Memory Layer', repo: '001_Decision-Memory-Layer' },
  { number: '002', title: 'Hitchhiker’s Guide to the City', repo: '002_Hitchhiker-s-Guide-To-The-City' },
  { number: '003', title: 'Detour', repo: '003_Detour' },
  { number: '004', title: 'Shazanguage', repo: '004_Shazanguage' },
  { number: '005', title: 'Financial Behaviour Analysis Tool', repo: '005_Financial-Behaviour-Analysis-Tool' },
  { number: '006', title: 'Hominim Wayside Recreate', repo: '006_Hominim_Wayside_Recreate' },
  { number: '007', title: 'Retrogram', repo: '007_Retrogram' },
  { number: '008', title: 'Cape Fear Mod', repo: '008_Cape-Fear_Mod' },
  {
    number: '009',
    title: 'Air City',
    repo: '009_Air_City',
    summary: 'Municipal rent control data management system and visualiser.',
  },
  { number: '010', title: 'Tonicity', repo: '010_Tonicity_MIDI-Visualiser-Ableton-Plugin', subtitle: 'MIDI visualiser Ableton plugin' },
].map((project) => ({
  summary: 'Write-up coming soon.',
  ...project,
  url: `${GITHUB}/${project.repo}`,
}))
