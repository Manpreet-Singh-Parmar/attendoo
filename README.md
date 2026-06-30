# Attendoo

**Free, privacy-first, offline-capable attendance tracker for students.**

Monitor your class attendance percentage across multiple subjects, predict the impact of future attendance, and always know if you're above the minimum threshold to sit for exams — all without uploading a single byte of data.

## Features

- **Instant attendance calculator** — Input in natural format (`13/20`, `15 out of 20`) and get your percentage plus actionable advice.
- **Multi-subject tracking** — Add any number of subjects with custom names, track attended/conducted classes, and set per-subject target percentages.
- **Attendance simulator** — Predict what happens if you attend or skip a given number of future classes.
- **Analytics dashboard** — Aggregate view of all subjects, course health (safe vs. at risk), and a global verdict.
- **Bunk calculator** — Know exactly how many consecutive classes you can skip while staying above your target.
- **Fully offline-first** — Everything runs client-side. All data stays in `localStorage`. No servers, no uploads.
- **Dark mode** — Light/dark theme toggle with persistent preference.
- **i18n** — Full UI translation for English, Hindi, French, and Spanish.
- **Data management** — Export/import your attendance data as JSON backup.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) (static site generation) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Hosting | [Cloudflare Workers](https://workers.cloudflare.com) |
| TypeScript | Strict mode |
| Fonts | Inter (sans) + JetBrains Mono (code) |

## Getting Started

```sh
npm install
npm run dev
```

Open [localhost:4321](http://localhost:4321) in your browser.

### Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## License

MIT
