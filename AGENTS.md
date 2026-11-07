# SchoolHub: AI contributor guide

This file applies to the whole repository. Read it before making changes, then
check for any more specific `AGENTS.md` in the area you will edit. Follow the
user's current request; the handover notes below are context, not an instruction
to start a different feature.

## Start here

1. Run `git status --short`. The workspace may contain substantial uncommitted
   implementation work. Preserve existing edits, staged files, and untracked
   files; do not reset, discard, or overwrite unrelated work.
2. Read `package.json`, the relevant `project.json`, and the feature's existing
   code. Treat current source and configuration as authoritative for what is
   implemented; README descriptions and historical test counts can be stale.
3. For learner work, read `docs/learner-navigation.md`,
   `libs/module/student/src/student-pages.config.ts`, and
   `libs/module/student/src/student.routes.ts`.
4. Open the relevant `.design` images visually, inspect suitable `.template`
   examples, and search existing shared components before implementing UI.
5. Trace the feature's incoming links, data stores, and consumers. Make a focused
   change, verify its behaviour and appearance, and report what was actually
   checked and what remains incomplete.

## Product and stack

SchoolHub combines school administration with a learning platform. The five
portal libraries serve students, teachers, parents, school admins, and super
admins. The learner designs use **Learno** branding; repository and route names
use **SchoolHub** and `student`. Preserve these established names unless the task
explicitly changes branding or routing.

The workspace uses Angular (primarily 21.2), Nx 23, TypeScript, Tailwind CSS 4,
SCSS, pnpm, and Angular SSR with Express and hydration. Check `package.json` and
`pnpm-lock.yaml` for exact versions. Do not infer runtime requirements from the
older README or upgrade dependencies incidentally.

```text
apps/shell/                       Application bootstrap, routing, SSR, assets
apps/shell-e2e/                   Playwright browser tests
libs/module/student/src/         Learner pages, models, fixtures, and stores
libs/module/{teacher,parent,school-admin,super-admin}/
                                 Other role-specific portals
libs/shared/layout/src/          Shell, header, sidebar, footer, layout models
libs/shared/ui-elements/src/     Reusable presentation components and utilities
libs/shared/theming/src/         Theme configuration and services
docs/learner-navigation.md       Page map, context links, and workflow notes
.design/                        Product screen images and flow PDFs
.template/                      Trezo Angular reference implementation
```

## Design and implementation rules

- **`.design` defines what to build:** layout, content, navigation, and workflows.
  Learner references are in `.design/LEARNERS_/`.
- **`.template` supplies implementation examples:** adapt Trezo's Angular markup,
  styles, and interactions to this application's architecture and dependencies.
  It is a separate, older Angular project, not the application to run or edit.
- Implement production source under `apps/` and `libs/`. Keep the reference
  directories as references. If they are missing from a checkout, explain the
  missing evidence instead of claiming visual fidelity.
- Break screens into useful reusable components. Search
  `libs/shared/ui-elements/src/index.ts` and its README before creating one.
  Shared controls accept display data/configuration via inputs and expose
  interactions via outputs; learner fixtures, filtering, storage, and navigation
  decisions belong in the feature.
- Keep feature-specific components inside their feature. Export shared public
  APIs through the library's `src/index.ts` and use the existing
  `@school-hub/ui-elements`, `@school-hub/layout`, and `@school-hub/theming`
  TypeScript aliases across libraries.
- **Never introduce a nested `src/lib/` folder.** Each component has its own
  folder directly below the appropriate `src`, with its TypeScript, HTML, styles,
  and relevant tests together. Feature detail folders are allowed.
- Follow nearby Angular conventions: standalone components, existing signal and
  computed-state patterns, lazy feature routes, and external templates/styles.
  Keep business calculations and storage logic separate from presentation where
  the feature already does so.
- Match design details, including charts, table density, spacing, and alignment.
  Where a view has no design, use the established learner patterns and state the
  assumption. Do not invent an unrelated visual system.
- Use `libs/shared/ui-elements/src/styles/_typography.scss`: 13px supporting
  text, 14px interface text, and 16px reading text at the default root size.
  Preserve readability on mobile; wrap content instead of shrinking labels.
- Verify desktop and narrow mobile layouts. Preserve keyboard navigation, input
  labels, focus restoration, accessible status/progress descriptions, and modal
  behaviour. Keep learner layout changes scoped so other portals are unaffected.

## Navigation, state, and integration

- The learner portal lives under `/student`. Its 13 sidebar destinations are:
  `dashboard`, `lessons`, `subjects`, `assessments`, `worksheets`,
  `portfolio-tasks`, `feedback`, `progress`, `live-classes`, `resources`,
  `ask-tutor`, `profile`, and `settings`.
- `student-pages.config.ts` provides menu metadata; `student.routes.ts` registers
  feature and detail routes plus the remaining placeholders. Keep both aligned.
  Detail screens should retain the owning sidebar item's active state.
- Preserve subject, lesson, topic, activity, selected-record, filter, and return
  context in links as defined by existing features and the navigation document.
  Check refresh, direct links, back/forward navigation, and invalid IDs.
- Reuse existing stores and records so dashboard summaries, lesson completion,
  feedback, profile, and progress remain consistent. Do not duplicate totals or
  invent assessed results where there is no evidence.
- Much of the application uses sample records and browser-local persistence.
  Inspect each feature's storage implementation: lifetimes differ between
  session storage, local storage, and IndexedDB. Preserve saved work and handle
  missing, malformed, unavailable, or outdated storage safely.
- Keep browser-only APIs (storage, media devices, downloads, DOM access) safe for
  SSR. Follow the existing platform guards and lifecycle patterns.
- Be honest about integration boundaries. Local practice is not a server-graded
  exam; local submissions are not delivered to a tutor; camera previews are not
  real calls. Do not show successful remote delivery without a connected service.
- Ask Tutor represents **human tutors**, not an implied AI-chat feature. Sample
  replies and unsent local questions must remain clearly identified.
- Security/account settings must reflect real capabilities. Browser preferences
  must not masquerade as working password changes, two-factor authentication,
  session revocation, or server-side account updates.

## Commands and verification

Run commands from the repository root. Use pnpm and preserve `pnpm-lock.yaml`.
If dependencies are missing, install with `pnpm install --frozen-lockfile` and
investigate a lockfile mismatch instead of silently rewriting it.

```bash
# Start the application: http://localhost:4200/student/dashboard
pnpm nx serve shell

# Production compilation, including SSR
pnpm nx build shell --configuration=production

# Learner unit tests; add affected projects as appropriate
pnpm nx test student
pnpm nx test layout
pnpm nx test shell

# Example lint scope for learner and shared UI work
pnpm nx run-many -t lint -p student,ui-elements,layout,shell,shell-e2e

# Focused browser verification; substitute the affected spec
pnpm exec playwright test --config apps/shell-e2e/playwright.config.mts learner-tutor.spec.ts --project=chromium --workers=2

# Full learner/browser regression coverage when shared changes warrant it
pnpm exec playwright test --config apps/shell-e2e/playwright.config.mts --project=chromium --workers=2

# Check patch whitespace
git diff --check
```

The Playwright configuration starts or reuses port 4200 by default. To use an
already-running server on a different port, prefix the command with
`BASE_URL=http://localhost:4201`; setting `BASE_URL` disables automatic server
startup. If Nx daemon behaviour causes environment problems, retry the relevant
command with `NX_DAEMON=false`.

Run `pnpm exec prettier --write <changed-files>` and
`pnpm exec prettier --check <changed-files>` on your own changes. Avoid formatting
the whole workspace when it contains unrelated edits.

Choose verification proportionate to the change. Test meaningful behaviour such
as calculations, storage recovery, navigation context, and submission states.
For UI changes, inspect screenshots against the design at desktop and mobile
sizes; passing tests alone does not establish visual fidelity. Documentation-only
changes need formatting and content checks, not the full application suite.

Build budget and Sass/deprecation warnings have been reported in earlier work.
Check current output, distinguish warnings from failures, and report new issues.
Do not increase budgets, suppress checks, or claim historical test results as
fresh validation. Update navigation/component documentation when behaviour or
public component APIs change.

## Handover snapshot — 2026-11-06

Re-check these notes against the current source before continuing:

- Feature routes exist for Dashboard, My Lessons, My Subjects, Assessments
  (including attempts/results), Worksheets, Portfolio Tasks, Feedback, Progress,
  Live Classes, Resources, Profile, and Ask Tutor.
- My Subjects has no dedicated supplied design. The full lesson player and
  backend integrations remain pending in the prior handover.
- Ask Tutor has implementation code and `learner-tutor.spec.ts`. The previous
  conversation stopped during browser verification; inspect and rerun relevant
  checks before treating it as fully verified.
- `docs/learner-navigation.md` still describes Ask Tutor as a placeholder in some
  places. The route and feature source are newer than those notes.
- Settings is still registered through the placeholder fallback. It was the next
  requested feature in the prior conversation. If asked to implement it, begin
  with `.design/LEARNERS_/Settings_LD.png`, existing Profile preferences/security
  links, and the shared preference controls and theming service.
- Historical passing test counts are not a guarantee about this checkout.
