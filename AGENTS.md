# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a single-page choose-your-adventure story called "The Lost Puppy" for kids aged 6–10 with about 8 short story screens. Each screen has a few simple sentences, a big emoji scene and 2–3 choice buttons, and every ending is happy. Include a "Start over" button and a tracker showing how many endings the player has found. Bright, rounded, storybook-style design. No login, no forms and no external links.

## Goal
Build a single-page choose-your-adventure story called "The Lost Puppy" for kids aged 6–10 with ~8 story screens, emoji scenes, branching choices, happy endings, an endings tracker, and a Start Over button — all in a bright storybook design.

## Project type
other

## Design system — match this exactly
- Color tokens: `--background: #FFF8E1`, `--foreground: #3E2723`, `--card: #FFFFFF`, `--border: #FFD54F`, `--muted-foreground: #6D4C41`, `--primary: #FF7043`, `--accent: #42A5F5`, `--secondary: #AB47BC`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cta`, `endings`, `endings-tracker`, `footer`, `hero`, `how`, `meta`, `nav`, `start-over`, `story`, `tracker`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
