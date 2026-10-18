/*
 * Blog posts (SCRUM-41), oldest first. Each shows as a folder in the stack on /blog
 * and opens at /blog/<slug>.
 *
 * Body blocks:
 *   { type: 'p', text }                 paragraph
 *   { type: 'h', text }                 subheading
 *   { type: 'list', items: [] }         bullet list
 *   { type: 'photo', caption }          photo placeholder until `src` is added
 *   { type: 'photo', src, caption }     photo (put the file in public/blog/)
 *   { type: 'link', href, text }        link out
 *   { type: 'todo', text }              Mike to write: shown as a dashed "to come" note
 */
export const posts = [
  {
    slug: 'claude-community-build-day',
    number: '01',
    date: 'Date to come',
    title: 'Claude Community Build Day',
    kicker: 'The beginnings of Shazanguage',
    project: '004',
    body: [
      {
        type: 'p',
        text: 'I went to the Claude Community Build Day with one idea I couldn’t shake: Shazam, but for languages.',
      },
      { type: 'photo', caption: 'Build Day' },
      { type: 'h', text: 'The idea' },
      {
        type: 'p',
        text: 'You hear someone speaking and wonder what language it is. Shazanguage lets you tap to listen, tells you which language it is, and teaches you how to say hello in it. It’s a small moment of curiosity turned into a way to connect with someone.',
      },
      { type: 'h', text: 'What happened on the day' },
      {
        type: 'todo',
        text: 'What I built, who I worked with, what surprised me, and what the first version could do by the end of the day.',
      },
      { type: 'photo', caption: 'First working version' },
      { type: 'h', text: 'What’s next for Shazanguage' },
      {
        type: 'p',
        text: 'Shazanguage is one of the three prototypes I’m actively developing. It’s being built with Expo, so one codebase runs on iPhone, Android and the web. That means you’ll be able to try it right here in a phone preview.',
      },
      { type: 'link', href: '/product/004', text: 'See Shazanguage on the Product page' },
    ],
  },
  {
    slug: 'make-reign-builders-table',
    number: '02',
    date: 'Date to come',
    title: 'Make Reign Builders Table',
    kicker: 'A hackathon, and deTour',
    project: '003',
    body: [
      {
        type: 'p',
        text: 'The Make Reign Builders Table hackathon is where deTour started: a navigation app that puts the experience ahead of speed.',
      },
      { type: 'photo', caption: 'Builders Table' },
      { type: 'h', text: 'The problem' },
      {
        type: 'p',
        text: 'Navigation apps are built to get you there fastest. That sends everyone down the same streets and into the same busy centres. deTour suggests curated detours along your route that lead to hidden local gems, so visitors find the small businesses outside the busiest areas.',
      },
      { type: 'h', text: 'On the day' },
      {
        type: 'todo',
        text: 'The team, how we framed the problem, what we built and presented, and the feedback we got.',
      },
      { type: 'h', text: 'Where deTour is now' },
      {
        type: 'p',
        text: 'deTour is in the Under development list on the Product page. The thinking behind it also feeds 002, Hitchhiker’s Guide to the City, one of the three prototypes I’m building now.',
      },
      { type: 'link', href: 'https://github.com/MikeDawsonTigerBoy/003_Detour', text: 'deTour on GitHub' },
    ],
  },
  {
    slug: 'a-weekend-of-building',
    number: '03',
    date: '17–18 October 2026',
    title: 'A weekend of building',
    kicker: 'A portfolio, three apps, and a thank you',
    body: [
      {
        type: 'p',
        text: 'This weekend I took this site from a placeholder page to a live, tested product, and shaped the three apps I’m developing: Decision Memory Layer, Hitchhiker’s Guide to the City and Shazanguage. I worked the way a product team would, with tickets, pull requests, reviews and releases, with Claude Code as my build partner.',
      },
      { type: 'h', text: 'Five lessons' },
      {
        type: 'list',
        items: [
          'Decide the format before writing code. Choosing between a web app and a native app came down to constraints: who needs to see it, how quickly, and on what device.',
          'Cutting scope is a product decision. I took Art and Music off the site for now and featured three prototypes instead of ten, so the site says one clear thing.',
          'Guardrails make speed safe. Every change goes through a pull request, and automatic tests on iPhone and Android caught a real layout bug before it reached the live site.',
          'Ship small and review often. Each change got its own preview link, which I could check on my phone before approving it.',
          'Track the work like a team. Every change has a Jira ticket, so the history explains why, not just what.',
        ],
      },
      { type: 'photo', caption: 'The weekend’s board' },
      { type: 'h', text: 'Where I’m going next' },
      {
        type: 'p',
        text: 'Next is depth rather than breadth: a working demo of each of the three apps that you can try in the phone preview, a write-up and Reflection card for each, and a Scrum timeline showing how each one moved from idea to release.',
      },
      { type: 'h', text: 'Thank you' },
      {
        type: 'p',
        text: 'None of this happens alone. Thank you to the community and the growing network of people who have shared their time, feedback and encouragement.',
      },
      { type: 'todo', text: 'Names of the people who have helped and guided me, and a line on what each one taught me.' },
    ],
  },
]

export const findPost = (slug) => posts.find((post) => post.slug === slug)
