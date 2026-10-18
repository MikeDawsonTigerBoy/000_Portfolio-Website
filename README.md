# 000 Portfolio Website

Mike Dawson's Product Builder Portfolio. It shows his AI product prototypes and what he learned building them, and its job is to support a move from architecture into AI product management.

Live at https://mike-dawson.vercel.app

> **Draft for review.** Lines tagged *(proposed)* are Claude's suggestions, not yet agreed. Section 10 lists the questions to settle. `CLAUDE.md` holds the build rules for Claude Code.

## Status

- **Focus: active.** Live first version, built in React and Vite and deployed on Vercel.
- **Decision (Oct 2026), less is more:** the site features three working prototypes.
  - **001 Decision Memory Layer:** a serious problem from Mike's own field.
  - **002 Hitchhiker's Guide to the City:** started at the hackathon.
  - **004 Shazanguage:** Mike's own idea.
- The other seven prototypes are parked. They appear only in a short **Under development** table on the Product page (number, name, one line), never as "coming soon" cards.
- **MVP focus:** Music and Art are built but hidden from the deployed site, so the site says one clear thing.
- **No location on the site.** Mike is geographically mobile.

## 1. Problem statement

A registered architect applying for product roles reads as an AEC candidate on paper. Hiring managers need fast, concrete proof of product thinking: problems framed, prototypes shipped and lessons learned. A CV can't show that.

## 2. Target audience

- **Primary:** hiring managers, heads of product and founders at construction-tech, climate-tech and AI companies (for example Gropyus and Andercore), and recruiters screening for PM roles.
- **Secondary:** mentors, friends and Mike's growing professional network, who can give meaningful feedback.

## 3. Value proposition

One link that shows how Mike thinks and ships. Each case study runs from problem to prototype to what he learned, backed by the systems thinking from 9 years of international project delivery.

## 4. Core functionality

- A home page with three entry points: Product, Blog and About.
- A product section with cards for the three featured prototypes (001, 002, 004), each with its own page: device previews, a demo and a Reflection card with up to 5 lessons. Below them, an Under development table lists the parked prototypes.
- A blog of field notes, shown as a stack of folders; each post opens as a sheet with its own link. Three drafts so far.
- About and contact, with email and LinkedIn.
- Music (releases and players for Spotify, Apple Music and YouTube) and Art are built but hidden for the MVP.

## 5. Key user journeys

1. **Hiring manager:** opens the link from a CV or LinkedIn, goes to Product, reads one case study, then gets in touch.
2. **Recruiter:** skims the About page to place Mike's background, then opens one prototype.
3. **Mentor or peer:** opens a blog post from a shared link, reads what Mike learned, then explores the related prototype.

## 6. Non-goals

- Not a UX/UI design portfolio. Visual work is a personal pursuit, not the job Mike is applying for.
- Not a blog platform or a CMS *(proposed)*.
- No custom domain until every prototype is on the site.

## 7. Feasibility

The stack, hosting and tests are already in place. The real constraint is content: writing up each prototype well.

## 8. Assumptions and risks

- **Assumption:** reviewers click through to a case study rather than skimming the home page.
- **Risk:** 10 or more cards that say "write-up coming soon" signal unfinished work and hurt more than they help.
- **Risk (addressed for the MVP):** giving music and art equal weight with product dilutes the hiring message. Both are hidden until the product story is complete.

## 9. Success metrics

*(proposed)*
- Case studies for 001, 002 and 004 are complete by the end of November 2026.
- The site gets mentioned in interviews or recruiter messages.
- Product pages are read for more than 60 seconds (needs simple analytics).

## 10. Open questions and challenges

1. **Depth or breadth?** *Resolved: three featured prototypes (001, 002 and 004). The parked ones are listed in a short Under development table on the Product page.*
2. **Who comes first?** *Resolved for the MVP: Music and Art are hidden, and the home page leads with Product, Blog and About.*
3. **Is 011 Slow Craftsman on the site?** The site currently lists 001–010.
4. **Is the story clear?** The headline is "Architect turned product thinker". Does each prototype show a skill a PM is hired for (discovery, prioritisation, metrics), or mostly building skill?

## 11. Tech approach

- React 19, Vite and oxlint.
- Vercel auto-deploys from `main`.
- Playwright mobile tests run on every pull request.
- Work is tracked in Jira under project key `SCRUM`.

See `CLAUDE.md` for the commands and rules.

## 12. Roadmap

- **v1 (live):** structure, three featured prototypes with their pages, the Under development table, and the blog with three draft posts.
- **Next:** demos and reflections for 001, 002 and 004, one at a time, and one blog post per prototype.
- **Later:** bring back Music and Art, then a custom domain.

## Running it

```
npm install
npm run dev
```
