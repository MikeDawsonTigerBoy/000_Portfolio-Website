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

## Site structure

| Page | Purpose |
| --- | --- |
| Home | Landing page with three clear entry points: Product, Music, Art |
| Product | AI / product prototypes, numbered cards (001–010) linking to GitHub repos |
| Music | Releases and links to Spotify, Apple Music, YouTube |
| Art | Visual / architectural work |
| About / Contact | Background, CV, how to get in touch |

## Prototype formats

Decided in SCRUM-28. Set per project as `format` in `src/data/projects.js`.

- **Expo (React Native) by default.** One codebase builds iOS, Android and web. Its web build is what runs in the portfolio's phone frames. Test it on a phone with Expo Go.
- **Plain React web for dashboard-style tools:** 005 Financial Behaviour Analysis Tool and 009 Air City.
- **010 Tonicity is an Ableton plugin.** It gets a video demo, not a phone preview.

Each project page (`/product/001` … `/product/010`) shows:
- **On desktop:** iPhone and Android frames running `demoUrl`.
- **On phones:** a button that opens `iosUrl` or `androidUrl`, falling back to `demoUrl`.
- **At the end:** a Reflection card with at most 5 lessons, from `reflections`.

## Rules

- **Start from the latest `main`.** At the start of every session, before doing anything else, run `git checkout main && git pull`. If there are uncommitted changes or unpushed commits, don't switch: say what's there and ask first. In a worktree where `main` is checked out elsewhere, run `git fetch origin` and branch from `origin/main`.
- **Jira key first.** Branch names and commit messages start with the Jira key, e.g. branch `SCRUM-9-home-page`, commit `SCRUM-9 Add home page entry points`.
- **Jira comments.** Start every Jira comment with `(via Claude)`.
- **Never push to `main`.** Work on a branch and open a PR to `main`. Merging the PR is what deploys.
- **Clean up merged branches.** After a PR is merged, delete its branch locally and on GitHub. The repo auto-deletes head branches on merge, so check it's gone (`git fetch --prune`) and delete the local copy with `git branch -d <branch>`.

## Jira map

| Key | Scope |
| --- | --- |
| SCRUM-5 | Epic: portfolio website |
| SCRUM-26 | Visual style (design tokens, components) |
| SCRUM-9 | Home page |
| SCRUM-10 | Product cards |
| SCRUM-27 | Music section |
