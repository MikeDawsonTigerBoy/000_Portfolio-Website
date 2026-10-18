# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project context

- **Owner:** Mike Dawson — registered architect (9 years of international delivery) moving into AI product management.
- **Location:** Based in Cape Town; aiming to work in Berlin, then split time between Berlin and Cape Town ("two summers" swallow FIRE lifestyle). The site should support job hunting in Berlin.
- **What this is:** Mike's portfolio site, live at https://mike-dawson.vercel.app.
- **Stack:** React 19 + Vite, linted with oxlint.
- **Repo:** GitHub `MikeDawsonTigerBoy/000_Portfolio-Website`.
- **Hosting:** Vercel auto-deploys from `main`, so anything merged to `main` goes live.
- **Tracking:** Jira project key `SCRUM`, epic `SCRUM-5`.

## Commands

- `npm install` — install dependencies
- `npm run dev` — dev server on http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run lint` — oxlint
- `npm run test:mobile` — Playwright smoke tests on iPhone 15 (WebKit), Pixel 7 (Chromium) and desktop Chromium, against the production build. First time: `npx playwright install chromium webkit`. Screenshots land in `screenshots/<profile>/`. Runs on every PR via `.github/workflows/mobile-tests.yml`.

## Site structure

| Page | Purpose |
| --- | --- |
| Home | Landing page with three entry points: the first three published sections (now Product, Blog, About). Header nav: About, Product, Blog. |
| Product | Featured prototypes only (001, 002, 004: `featured` in `src/data/projects.js`) as cards with their own pages, then an Under development table for the rest |
| Music | **Hidden for the MVP.** Releases and links to Spotify, Apple Music, YouTube |
| Art | **Hidden for the MVP.** Visual / architectural work |
| About / Contact | Background, email and LinkedIn (`src/data/contact.js`) |
| Blog | Field notes as a stack of folders; each post slides up as a sheet at `/blog/<slug>`. Posts live in `src/data/posts.js` (photos go in `public/blog/`; `todo` blocks are Mike's to write) |

**MVP focus (SCRUM-32):** the site's job is to show Mike can iterate and get hired. Art and Music stay in the code with `hidden: true` in `src/data/sections.js`: no nav link, no home card, and their URLs redirect home. To work on them locally, add `VITE_SHOW_HIDDEN_SECTIONS=true` to `.env.local` and restart `npm run dev`. Don't feature more prototypes or unhide sections unless Mike asks.

**Identity (SCRUM-37):** "Mike Dawson — Product Builder Portfolio". Copy stays location-neutral: based in Cape Town, free to relocate. Don't name a target city. Section colours: Product is orange `#e43804` (black text on it), About is black, Blog is grey.

**Cube puzzle (SCRUM-40):** the Rubik's cube uses a 9-colour palette (`--cube-*` in `tokens.css`). Each hover moves every cube one state closer to solved, from 1 (jumbled) to 4 (solved). Progress is stored in the visitor's browser under `md-cube-hovers`; see `src/components/diagrams/cubePuzzle.js`.

## Prototype formats

Decided in SCRUM-28. Set per project as `format` in `src/data/projects.js`.

- **Expo (React Native) by default.** One codebase builds iOS, Android and web. Its web build is what runs in the portfolio's phone frames. Test it on a phone with Expo Go.
- **Plain React web for dashboard-style tools:** 005 Financial Behaviour Analysis Tool and 009 Air City.
- **010 Tonicity is an Ableton plugin.** It gets a video demo, not a phone preview.

Each project page (`/product/001` … `/product/010`) shows:
- **On desktop:** iPhone and Android frames running `demoUrl`.
- **On phones:** a button that opens `iosUrl` or `androidUrl`, falling back to `demoUrl`.
- **At the end:** a Reflection card with at most 5 lessons, from `reflections`.

## Testing on real devices

Playwright runs on every PR, but check real phones before merging layout changes:

- **Android:** Android Studio's emulator is free and runs on Windows. Create a Pixel device in Device Manager, start it, and open the PR's Vercel preview URL in Chrome.
- **iPhone:** open the PR's Vercel preview URL on a real iPhone in Safari.
- **Caveat:** Playwright's WebKit is close to iOS Safari but isn't the same browser. Apple's iOS Simulator needs macOS, so a real iPhone is the final check. On Windows, WebKit's iPhone emulation also reports the viewport about 20px too narrow, which clips the right edge of local screenshots. The Linux CI screenshots are accurate.

## Rules

- **Start from the latest `main`.** At the start of every session, before doing anything else, run `git checkout main && git pull`. If there are uncommitted changes or unpushed commits, don't switch: say what's there and ask first. In a worktree where `main` is checked out elsewhere, run `git fetch origin` and branch from `origin/main`.
- **Jira key first.** Branch names and commit messages start with the Jira key, e.g. branch `SCRUM-9-home-page`, commit `SCRUM-9 Add home page entry points`.
- **Jira comments.** Start every Jira comment with `(via Claude)`.
- **Never push to `main`.** Work on a branch and open a PR to `main`. Merging the PR is what deploys.
- **Clean up merged branches.** After a PR is merged, delete its branch locally and on GitHub. The repo auto-deletes head branches on merge, so check it's gone (`git fetch --prune`) and delete the local copy with `git branch -d <branch>`.
- **Mike approves every merge.** He merges on GitHub, or tells Claude to merge, after reviewing the Vercel preview. Never merge without his say-so.
- **Close the Jira ticket on merge.** Once a PR is merged, move its Jira ticket (from the branch name) to Done without asking, then tell Mike it's done. Ask first only if the merge is substantial or looks suspicious, e.g. unexpected files, commits by someone else, or changes beyond the ticket's scope.
- **Never close an epic on merge.** If the branch names an epic (e.g. SCRUM-5), leave it open. When the last open ticket under an epic moves to Done, tell Mike and ask whether to close the epic.

## Jira map

| Key | Scope |
| --- | --- |
| SCRUM-5 | Epic: portfolio website |
| SCRUM-26 | Visual style (design tokens, components) |
| SCRUM-9 | Home page |
| SCRUM-10 | Product cards |
| SCRUM-27 | Music section |
| SCRUM-28 | Prototype pages (device preview, Reflection card) |
| SCRUM-29 | Mobile-browser testing (Playwright, CI) |
| SCRUM-31 | Contact details, Blog section, nav order |
| SCRUM-37 | Product builder identity: location-neutral copy, warm orange, cube puzzle, blog folders (subtasks SCRUM-38 to SCRUM-41) |
| SCRUM-32 | MVP focus: featured prototypes, Under development table, hide Art and Music, cube on hover grid (subtasks SCRUM-33 to SCRUM-36) |
