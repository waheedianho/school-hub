# student

Learner portal features mounted at `/student`.

See the [learner navigation and page map](../../../docs/learner-navigation.md)
for sidebar destinations, design references, proposed routes, links between
screens, and implementation checks.

The 13 main pages are defined in `src/student-pages.config.ts`. Both the sidebar
and the routes use those definitions. The dashboard is lazy-loaded from
`src/dashboard/`, My Lessons from `src/lessons/`, My Subjects from
`src/subjects/`, and Quizzes & Assessments from `src/assessments/`. The remaining
pages render a shared placeholder through the `Student` component. Assessment
attempts and results also have lazy-loaded detail routes.

The dashboard follows `.design/LEARNERS_/Learners_ dashboard.png`. Its sample
learner data is isolated in `dashboard.data.ts` until the API is available.
Current-lesson, pending-task, and tutor fixtures are shared in
`src/data/learning-context.data.ts` so the dashboard and My Lessons stay consistent.
Action links open existing overview pages with record IDs in query parameters.

My Lessons follows `.design/LEARNERS_/My lessons_LD.png`. Its 20 sample lessons
are defined in `src/lessons/lessons.data.ts`. Search, subject, term, status, and page
are preserved in query parameters. `lessonId` opens a lesson overview;
`panel=actions` opens its actions, and `tab=tasks` opens pending tasks. The page
supports available-lesson resources, completed review, and locked previews.
The full lesson player and persistent learner progress still require implementation.

My Subjects has no dedicated design reference. Its layout uses the existing
learner styling and shared subject cards. The enrolled subject catalog lives in
`src/data/subject-catalog.data.ts`; `subject-progress.data.ts` derives counts,
next lessons, and progress from the lesson records. Dashboard subject cards use
the same values. Progress includes partial completion of current lessons.

Subject search (`q`), term (`term`), status (`status`), and sorting (`sort`) persist
in the URL. `subjectId` opens an overview with its curriculum and contextual links
to lessons, resources, assessments, worksheets, progress, and tutor support. This
also supports the subject links already present on the dashboard. The page shows
sample enrollments; it does not change course enrollment or persist progress.

Quizzes & Assessments follows `.design/LEARNERS_/QA_LD.png` and `QA II_LD.png`.
The overview derives statistics, scheduled activities, recent results, and topic
performance from lesson-linked fixtures. Search, subject, term, type, and result
pagination persist in the URL. Dashboard, lesson, and subject links select the
matching assessment or filter.

Available practice quizzes have ten questions each for whole numbers, parts of
speech, and living things. Other activities show their availability explicitly.
The attempt screen supports a countdown, pause/resume, question navigation,
review marks, answer clearing, a calculator, and confirmed submission. Results
include grading and answer explanations. New results update the overview and
dashboard quiz metrics. Practice answers and results use session storage in the
current browser tab; they are sample learning activities, without server grading
or account persistence. Active timers survive refresh and submit on expiry.

Detail routes are `/student/assessments/:assessmentId/attempt` and
`/student/assessments/:assessmentId/results/:attemptId`. They use server rendering
instead of prerendering because their IDs are resolved at runtime. Missing records
and exhausted attempts have explicit states.

Run `pnpm exec playwright test --config apps/shell-e2e/playwright.config.mts --project chromium`
to check sidebar navigation, dashboard actions, responsive layout, and browser
history, subject and lesson filters, pagination, overview dialogs, and the
assessment lifecycle. Tests save screenshots under
`dist/.playwright/apps/shell-e2e/test-output/`.

## Running unit tests

Run `nx test student` to execute the unit tests.
