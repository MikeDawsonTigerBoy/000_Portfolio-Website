# 000 Portfolio Website

Mike Dawson's professional site. It shows his product prototypes alongside his music and art, and its job is to support a move from architecture into AI product management in Berlin.

Live at https://mike-dawson.vercel.app

> **Draft for review.** Lines tagged *(proposed)* are Claude's suggestions, not yet agreed. Section 10 lists the questions to settle. `CLAUDE.md` holds the build rules for Claude Code.

## Status

- **Focus: active.** Live first version, built in React and Vite and deployed on Vercel.
- **Decision (Oct 2026), less is more:** the site features three working prototypes.
  - **001 Decision Memory Layer:** a serious problem from Mike's own field.
  - **002 Hitchhiker's Guide to the City:** started at the hackathon.
  - **004 Shazanguage:** Mike's own idea.
- The other prototypes are parked and shouldn't appear as "coming soon" stubs.

## 1. Problem statement

A registered architect applying for product roles reads as an AEC candidate on paper. Hiring managers need fast, concrete proof of product thinking: problems framed, prototypes shipped and lessons learned. A CV can't show that.

## 2. Target audience

- **Primary:** hiring managers, heads of product and founders at Berlin construction-tech, climate-tech and AI companies (for example Gropyus and Andercore), and recruiters screening for PM roles.
- **Secondary:** people following Mike's music and art.

## 3. Value proposition

One link that shows how Mike thinks and ships. Each case study runs from problem to prototype to what he learned, backed by the systems thinking from 9 years of international project delivery.

## 4. Core functionality

- A home page with three entry points: Product, Music and Art.
- A product section with one card and one page per prototype. Each page has device previews, a demo and a Reflection card with up to 5 lessons.
- A music section with releases and players for Spotify, Apple Music and YouTube.
- An art section with a gallery.
- About and contact, with email and LinkedIn.
- A blog for learnings (currently a placeholder).

## 5. Key user journeys

1. **Hiring manager:** opens the link from a CV or LinkedIn, goes to Product, reads one case study, then gets in touch.
2. **Recruiter:** skims the About page to place Mike's background, then opens one prototype.
3. **Music listener:** goes to Music and plays a release.

## 6. Non-goals

- Not a UX/UI design portfolio. Visual work is a personal pursuit, not the job Mike is applying for.
- Not a blog platform or a CMS *(proposed)*.
- No custom domain until every prototype is on the site.

## 7. Feasibility

The stack, hosting and tests are already in place. The real constraint is content: writing up each prototype well.

## 8. Assumptions and risks

- **Assumption:** reviewers click through to a case study rather than skimming the home page.
- **Risk:** 10 or more cards that say "write-up coming soon" signal unfinished work and hurt more than they help.
- **Risk:** giving music and art equal weight with product dilutes the hiring message.

## 9. Success metrics

*(proposed)*
- Case studies for 001, 002 and 004 are complete before the November trip to Berlin.
- The site gets mentioned in interviews or recruiter messages.
- Product pages are read for more than 60 seconds (needs simple analytics).

## 10. Open questions and challenges

1. **Depth or breadth?** *Resolved: three featured prototypes (001, 002 and 004).*
   - Still to decide: are parked prototypes hidden completely, or shown as a short "also exploring" list?
2. **Who comes first?** A hiring manager gives the site about 30 seconds. Should the home page lead with Product and frame Music and Art as "who I am", rather than offering three equal doors?
3. **Is 011 Slow Craftsman on the site?** The site currently lists 001–010.
4. **Is the story clear?** The headline is "Architect turned product thinker". Does each prototype show a skill a PM is hired for (discovery, prioritisation, metrics), or mostly building skill?

## 11. Tech approach

- React 19, Vite and oxlint.
- Vercel auto-deploys from `main`.
- Playwright mobile tests run on every pull request.
- Work is tracked in Jira under project key `SCRUM`.

See `CLAUDE.md` for the commands and rules.

## 12. Roadmap

- **v1 (live):** structure, product cards and the music section.
- **Next:** prototype pages with demos and reflections, written one at a time.
- **Later:** blog posts, then a custom domain.

## Running it

```
npm install
npm run dev
```
