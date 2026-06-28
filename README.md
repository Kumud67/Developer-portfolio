# Kumudh T — Backend Engineer Portfolio

A fast, animated, Apple-inspired portfolio for a Java backend engineer specializing
in Spring Boot, Kafka, and microservices. Built as a fully static React app —
no backend required, deploys free on Netlify.

## Stack

- **React 18 + Vite** — fast builds, instant dev server
- **Tailwind CSS v4** — utility styling, CSS-variable based theming
- **Framer Motion** — page transitions, scroll reveals, micro-interactions
- **React Router** — client-side routing (Home + per-project case study pages)
- **react-syntax-highlighter** — code snippets on project pages
- **Netlify Forms** — working contact form, zero backend code

## Design

- Light/dark mode with system-preference detection, persisted in `localStorage`,
  with a pre-paint script in `index.html` to prevent a flash of the wrong theme.
- Signature visual motif: an animated "event stream" — the hero shows messages
  flowing through Kafka-style partition lanes, and section dividers are styled
  as topic/offset timelines. This ties the design to the subject matter
  (distributed systems) instead of using generic decoration.
- Experience section is formatted like structured log lines — again tying
  content presentation back to the engineer's domain.

## Project structure

```
src/
  data/            → profile.js, skills.js, experience.js, projects.js
                     (EDIT THESE to update your real content)
  context/         → ThemeContext.jsx (light/dark mode)
  components/      → Navbar, ThemeToggle, StreamHero, ArchitectureDiagram,
                     SkillsGrid, ExperienceTimeline, ProjectCard, Footer, etc.
  pages/           → Home.jsx, ProjectDetail.jsx
public/
  resume.pdf       → placeholder resume — REPLACE with your real PDF
  __forms.html     → static form snapshot so Netlify can detect the contact form
```

## Editing your content

You don't need to touch component code to update your real details — everything
lives in `src/data/`:

| File | What it controls |
|---|---|
| `profile.js` | Name, title, tagline, about text, email, social links |
| `skills.js` | Grouped skill categories and items |
| `experience.js` | Company, role, per-client bullet points |
| `projects.js` | All 3 project case studies — problem, solution, features, architecture stages, code snippet, decisions, links |

To add a 4th project, just add another object to the `projects` array in
`projects.js` — the homepage grid and routing pick it up automatically.

To replace your resume: drop your real PDF into `public/` as `resume.pdf`
(same filename), or update the path in `profile.js → links.resume`.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. The build is code-split — the home page and project
detail page (and its syntax highlighter) load as separate chunks, so the
initial page load stays small (~120KB gzipped JS) for a fast first paint.

## Deploying to Netlify (free)

**Option A — Drag & drop (fastest)**
1. Run `npm run build` locally
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page — done, you get a live URL instantly

**Option B — Git-connected (recommended, auto-redeploys on push)**
1. Push this project to a GitHub repo
2. In Netlify: **Add new site → Import an existing project**
3. Connect your repo. Build settings are already set via `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Every future `git push` auto-redeploys.

**Custom domain (optional):** In Netlify, go to *Domain settings → Add a domain*.
A `.dev` domain (e.g. `kumudh.dev`) from Namecheap/Porkbun reads very well for
an engineer's portfolio and costs ~$10-15/year.

### Contact form

The contact form uses **Netlify Forms** — no backend needed. After your first
deploy, go to your Netlify site dashboard → **Forms** tab to see submissions
and set up email notifications (Site settings → Forms → Form notifications).

## Performance

- Fonts use `font-display: swap` and are preconnected
- Hero visual is pure SVG (no images) — zero image payload on first paint
- Routes and syntax highlighter are lazy-loaded via `React.lazy`
- Target: Lighthouse Performance score 90+, sub-2s load on a typical connection

## Customization ideas

- Swap `StreamHero.jsx` colors/speed to taste — all driven by the `LANES` array
- Add a real GitHub Actions badge or live demo link per project once deployed
- Add `react-helmet-async` if you want per-page `<title>` tags on project pages
