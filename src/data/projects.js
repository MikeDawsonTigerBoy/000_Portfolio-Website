const GITHUB = 'https://github.com/MikeDawsonTigerBoy'

// How each prototype is built. Decides what its page shows.
//   expo   – Expo (React Native): iOS, Android and web from one codebase. The default.
//   web    – Plain React web app, for dashboard-style tools.
//   plugin – Not a phone app (e.g. an Ableton plugin). Shown as a video, no device preview.
export const formats = {
  expo: { label: 'Expo', platforms: 'iOS · Android · Web', preview: true },
  web: { label: 'Web app', platforms: 'Web, best on a laptop', preview: true, frames: false },
  plugin: { label: 'Plugin', platforms: 'Ableton Live', preview: false },
}

export const MAX_REFLECTIONS = 5

/*
 * Product prototypes.
 *
 * `featured` ones (001, 002, 004 for the MVP, SCRUM-33, plus 009 for ClawCamp Berlin and 012 from the Claude Community
 * hackathon) get a card and a project page. The rest appear only in the Under development table on the Product page (SCRUM-34).
 * Summaries are the first line of each prototype's README.
 *
 * Optional fields per project:
 *   featured    – shown as a card with its own page
 *   summary     – one sentence for the card, page and Under development table
 *   demoUrl     – the live web build, shown inside the phone frames (or opened full screen, for web apps)
 *   iosUrl      – iOS-specific link (TestFlight, App Store, Expo Go); used on iPhones
 *   androidUrl  – Android-specific link (Play Store, Expo Go, APK); used on Android phones
 *   videoUrl    – demo video, for plugins
 *   reflections – up to 5 lessons learned building it
 *   diagram     – concept diagram that plays on hover (see components/diagrams); defaults to 'cube'
 *   event       – where it was built, e.g. a hackathon (shown in the spec table)
 *
 * Standard page sections (every featured page shows all of them, in this order; any left out shows a
 * "to be written" placeholder, so a new prototype gets the full page automatically — see CLAUDE.md):
 *   statements  – { why, problem, solution, how, validation, metrics, next, collaborate }: one or two sentences each,
 *                 shown in large type so a reader can skim the thinking
 *   deck        – slide images: deckSlides('/<folder>/deck', ['Title of slide 1', …]); files are slide-01.png …
 *   description – the long read (~1,000 words): an array of paragraphs, with { h: 'Subheading' } entries between them
 *   techStack   – { steps: [{ title, detail }], insights: [] }: how it works, drawn as a simple left-to-right diagram
 *   (prototype) – demoUrl / iosUrl / androidUrl / videoUrl above
 *   (blog)      – posts in src/data/posts.js whose `project` is this number are linked automatically
 *   reflections – up to 5 lessons, last on the page
 */
export const STATEMENTS = [
  ['why', 'Why'],
  ['problem', 'Problem'],
  ['solution', 'Solution'],
  ['how', 'How it works'],
  ['validation', 'Validation'],
  ['metrics', 'Success metrics'],
  ['next', 'What’s next'],
  ['collaborate', 'Collaborate'],
]

// Slide images rendered from a deck, named slide-01.png, slide-02.png … in `folder`.
const deckSlides = (folder, titles) =>
  titles.map((title, index) => ({ src: `${folder}/slide-${String(index + 1).padStart(2, '0')}.png`, title }))

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
    featured: true,
    summary:
      'Data analytics for urban ecosystems fighting the ongoing battle against short term rentals, housing crisis pressures and preserving human-centred urban life where it continues to exist.',
    // Built from the 009_Air_City repo (npm run build) and copied into public/air-city
    demoUrl: '/air-city/index.html',
  },
  {
    number: '010',
    title: 'Tonicity',
    repo: '010_Tonicity_MIDI-Visualiser-Ableton-Plugin',
    format: 'plugin',
    subtitle: 'MIDI visualiser Ableton plugin',
    summary: 'A MIDI visualiser that plays music on a circle of the 12 chromatic notes and highlights shifts in tonal centre.',
  },
  {
    number: '012',
    title: 'Mind Graft',
    repo: '012_Mind-Graft',
    format: 'web',
    featured: true,
    event: 'Claude Community hackathon, Nov 2026 · top 6 of 14 teams',
    summary:
      'Draws the shape of reasoning: human and LLM answers to the same question become 3D graphs you can orbit, so you can see whether an answer moves forward, branches or goes round in circles.',
    // Single-file three.js app, built from the 012_Mind-Graft repo (viewer/language_analyser.html) and copied here
    demoUrl: '/mind-graft/index.html',
    statements: {
      why: 'We trust LLM answers because they sound fluent. Fluent is not the same as well reasoned, and nobody can see the shape of the reasoning behind an answer.',
      problem:
        'Comparisons of human and AI text look at words, tone and length. They miss structure: whether an answer builds forward, branches, weighs the other side, or keeps circling back to where it started.',
      solution:
        'Mind Graft cuts each answer into entities, links them by how they relate, and draws every answer as a 3D graph. Human and LLM reasoning can then be compared by shape, not by wording.',
      how: 'A 12-type entity codebook and four relationship types. Length runs along z, depth up y, opposition across x. A hundred answers fan out around one axis into a cone per domain.',
      validation:
        'On 100 hand-labelled question pairs of near-equal length, ChatGPT came back to earlier points about twice as often as people (1.32 against 0.63 per answer) and ended in a circle three times as often (21% against 7%). Human answers went deeper (4.5 against 3.7).',
      metrics:
        'Targets: a second reader agrees with the labels (Cohen’s kappa of 0.6 or more); the human and LLM differences still hold once Finance and Computer Science are labelled with Claude; a newcomer can import their own CSV and read a result in under five minutes.',
      next: 'Version 2 moves from single answers to conversations: agreement, disagreement and reinforcement between turns, not just within one answer.',
      collaborate:
        'Looking for a second labeller, NLP and argument-mining researchers who want to test the codebook, and anyone with human and LLM transcripts to compare.',
    },
    deck: deckSlides('/mind-graft/deck', [
      'Mind Graft',
      'Six graph types we look for in every answer',
      'Human and LLM on one graph',
      '100 answer pairs on one graph',
      'Each domain grows its own cone',
      'Slide them apart to compare',
      'Link to prototype',
      'Do LLMs reason in circles?',
      'The data',
      'Every answer becomes a set of entities',
      'Three axes for the shape of a thought',
      'Colour is who, shape is what, line is how',
      'Finding 1: shape',
      'Finding 2: depth and return',
      'Finding 3: what they say',
      'Live demo: Language Analyser',
      'What this does not prove yet',
      'From answers to conversations',
    ]),
    description: [
      { h: 'The question' },
      'Most of us have read an AI answer that felt complete but somehow went nowhere. It restated the question, made three tidy points, and ended by saying what it had already said. Human answers to the same question often feel rougher, but they move: they take a position, push it a step further, admit what they are not sure of, and stop. Mind Graft started from that hunch and turned it into something you can measure and see. The hypothesis was simple: LLM reasoning is circular and keeps returning to its starting point, while human reasoning moves forward.',
      { h: 'Why it matters' },
      'People increasingly lean on language models to explain, advise and decide. We judge those answers mostly by how they read. Fluency, confidence and tidy structure are easy to produce and easy to trust. What we rarely see is the shape underneath: how many steps of reasoning an answer really takes, whether it ever considers the other side, and how much of it is repetition dressed up as a conclusion. If that shape can be made visible, people can read AI answers more critically, teams building with LLMs get a new way to evaluate them, and humans and models can learn from each other’s habits.',
      { h: 'What I built' },
      'Mind Graft treats an answer as a structure of entities: small units of meaning such as a claim, a reason, an example, a hedge, a rebuttal or a restatement. Each answer is split into sentences and clauses by fixed rules, and every entity gets one of twelve types, the earlier entity it builds on, and any earlier point it repeats. From those labels come four kinds of relationship: supports, disagrees, qualifies and reinforces.',
      'Each answer is then drawn in 3D. The z axis is length in words, so the answer reads like a timeline. The y axis is depth: how many steps of building an entity stands on. A restatement drops back down to the level it repeats, which is what makes circular reasoning visible as a path that climbs and falls back. The x axis is opposition, so an answer that weighs opposing views spreads wide while a one-sided answer stays narrow. Human answers are orange and LLM answers purple, every entity type has its own 3D shape, and every relationship its own line style.',
      'A single answer becomes a small sculpture. A hundred answers to a hundred questions, fanned around a shared axis, become a sail, and each domain grows its own cone. The prototype, Language Analyser, lets you orbit those cones, slide the human and LLM graphs apart, switch to one question at a time, and see front, side and top views update together as you change how many rows are shown. You can import any CSV of questions with a human and an LLM answer and it becomes a new cone straight away.',
      { h: 'What the data showed' },
      'I used HC3, a public dataset that pairs human and ChatGPT answers to the same questions, and kept only pairs whose lengths differ by fewer than ten words, so a longer answer could not simply look deeper. I labelled all 100 Reddit "Explain like I’m five" pairs, 1,638 segments, against a written codebook. The results lean towards the hypothesis. ChatGPT returned to earlier points or to the question 1.32 times per answer against 0.63 for people. Its answers ended in a circle 21% of the time against 7%, and human answers were mostly lines and trees. People went deeper, with an average maximum depth of 4.5 against 3.7. ChatGPT gave about twice as much unrequested advice and restated itself about twice as often, while people used more examples and more hedges. On exploring the other side, the two were close: 42% of human answers and 38% of ChatGPT answers did it.',
      { h: 'How it works' },
      'The pipeline is deliberately small. Python scripts using only the standard library filter the dataset, split answers into candidate segments and validate the labels, checking that every reference points backwards and every segment has exactly one label. The codebook is the contract: the same segmentation and graph rules are implemented again in JavaScript, so the browser can label a newly imported dataset on its own. The viewer is a single HTML file built with three.js, with the data embedded, so it needs no server. Inside claude.ai it can ask Claude to label a dataset using the same codebook; anywhere else, a rule-based labeller keeps it working.',
      { h: 'What it does not prove yet' },
      'This is a hackathon result, not a finding. One reader labelled every entity, so the next step is a second reader and a measure of agreement. The ChatGPT answers date from 2022, and today’s models may write differently. Restating the question may be house style rather than a reasoning habit. And "Explain like I’m five" explicitly asks for simple answers, so depth partly measures who followed the brief. The Finance and Computer Science cones currently use rule-based labels, which favour straight lines, so they should not yet be compared with the hand-labelled set.',
      { h: 'Where it goes next' },
      'The method is built to travel. The next version applies it to conversations, where the interesting relationships are between turns: where a model agrees too quickly, where a person pushes back, and where an argument is reinforced or quietly dropped. Alongside that come a second labeller, Claude labelling for every domain, and an agreed set of shared definitions so other teams can compare their own data. The longer aim is practical: to learn when wide and deep thinking is worth the effort and when narrow and simple is enough, for people and for models.',
      { h: 'How it was built' },
      'Mind Graft was built in one weekend at a Claude Community hackathon, where it placed in the top six of fourteen teams. I developed the analysis and the visual language in parallel with my team’s shared repository and kept a clean, one-way boundary between the two, copying their shared schema in rather than mixing codebases. Claude Code was my build partner throughout: it labelled entities against the codebook, wrote and tested the pipeline, and built the viewer, while I set the questions, the definitions and the visual rules.',
    ],
    techStack: {
      steps: [
        { title: 'Data', detail: 'HC3 question, human answer and ChatGPT answer, or any CSV. Pairs kept within 10 words of each other.' },
        { title: 'Segment', detail: 'Python, standard library only: sentences, then clauses at “; ” and “, but / however …”.' },
        { title: 'Label', detail: 'Each entity gets a type, a parent and any point it repeats: by hand, by Claude in the app, or by rules.' },
        { title: 'Graph', detail: 'Depth from parents, opposition from type, four relationship types and an overall shape per answer.' },
        { title: 'Visualise', detail: 'One HTML file with three.js: 3D cones and sails, tiled front, side and top views, and insights.' },
      ],
      insights: [
        'No server: the whole analyser is one HTML file with the data inside.',
        'The codebook is the contract: the same rules run in Python and in the browser.',
        'Depth makes circles visible, because a restatement drops back to the level it repeats.',
        'Claude labelling is optional; a rule-based labeller keeps the demo working anywhere.',
      ],
    },
    reflections: [
      'Make the abstract measurable first. “Circular reasoning” only became testable once depth was defined as steps of building and a restatement as a drop back.',
      'Hold the obvious variable constant. Pairing answers within ten words stopped longer answers simply looking deeper.',
      'A labeller is a hypothesis. One reader labelled 1,638 segments; a second reader is what turns the pattern into a finding.',
      'Ship the import. Loading a new CSV live made the demo about the method, not about one dataset.',
      'Keep clean boundaries in a team. Working in parallel and copying the shared schema one way kept both codebases stable.',
    ],
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
