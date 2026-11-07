# student

Learner portal features mounted at `/student`.

See the [learner navigation and page map](../../../docs/learner-navigation.md)
for sidebar destinations, design references, proposed routes, links between
screens, and implementation checks.

The 13 main pages are defined in `src/student-pages.config.ts`. Both the sidebar
and the routes use those definitions. The dashboard is lazy-loaded from
`src/dashboard/`, My Lessons from `src/lessons/`, My Subjects from
`src/subjects/`, Quizzes & Assessments from `src/assessments/`, Worksheets from
`src/worksheets/`, Portfolio Tasks from `src/portfolio/`, Feedback from
`src/feedback/`, Progress from `src/progress/`, Live Classes from
`src/live-classes/`, Resources from `src/resources/`, Ask Tutor from `src/ask-tutor/`, and Profile from `src/profile/`. Settings
renders a shared placeholder through the `Student` component. Assessment
attempts, results, worksheet workspace, portfolio task workspace, classroom, and resource detail also have lazy-loaded routes.

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

Worksheets follows `.design/LEARNERS_/Worksheet_LD.png` and `Worksheet II_LD.png`.
Twenty lesson-linked records supply status counts, progress, scores, time spent,
strengths, and suggested revision. The overview preserves search, subject, term,
topic, status, pagination, and selected worksheet in the URL. `printable=1` filters
to records with question content.

The workspace at `/student/worksheets/:worksheetId` supports written answers,
question navigation and review marks, saved scratch notes, calculator, study
notes, unit conversion, zoom, and Save & Exit. Submission confirms unanswered
questions, grades the sample numeric/short answers, and opens read-only feedback
in the same workspace. Completed records without question content show their
score summary. Locked and invalid records have explicit states.

Drafts, submitted practice results, and scratch notes use session storage for the
current tab. Time counts while a worksheet workspace is open. Downloads are text
worksheets; the browser print dialog can also print or save as PDF, with optional
answers. No account persistence, tutor marking, or backend submission is connected.
The dynamic workspace uses server rendering rather than prerendering.

The dashboard worksheet metric now derives from the same 20 records (initially
16 completed, or 80%). Submitting work updates the metric and the matching My
Lessons activity badge, and removes the completed worksheet from pending tasks.
Overview statistics follow the selected term and subject.

Portfolio Tasks follows `.design/LEARNERS_/Portfolio Tasks_LD.png` and
`Portfolio Task II_LD.png`. Fourteen sample tasks use existing lesson IDs, plus
an independent personal dictionary assignment. The overview preserves search,
subject, term, status, sorting, and pagination in the URL. Counts, progress,
ratings, and skill evidence derive from the records rather than the image's
illustrative numbers. Task thumbnails use the existing icon system.

`/student/portfolio-tasks/:taskId` provides Overview, My Work, Submission,
Feedback, and Rubric tabs. The work tab reuses the shared written answer field.
Planning, written work, reflection, checklist state, notes, and actual attachment
blobs save in IndexedDB on the current device. This persists beyond a tab session
and is separate from the session-only quiz and worksheet stores. The UI identifies
the portfolio as practice; tutor delivery and account sync are not connected.

File uploads accept PDF, DOCX, XLSX, PNG, JPG/JPEG, TXT, and CSV: at most five
files, 10 MB per file and 20 MB combined. Text and images can be previewed; other
formats can be downloaded. Task briefs download as text; the market comparison
template downloads as CSV, and other task templates as text outlines.

Submission requires written work or an attachment and a reflection. Confirmation
saves a read-only local receipt and evidence snapshot. Revision requests can be
edited and resubmitted with a new version; earlier feedback remains labelled as
such and no new tutor grade is invented. Existing `?taskId=...` links redirect to
the canonical task path. Missing and locked records have explicit states.

Dashboard portfolio progress counts submitted and completed tasks (initially
9/14, or 64%). New submissions update the card, lesson activity badges, and
pending tasks. A shared sample rubric totals 100 marks; feedback is fixture data
until a tutor service is connected. The dynamic task path uses server rendering.

Feedback follows `.design/LEARNERS_/Feedback_LD.png`. It combines existing
assessment results, completed worksheet reviews, and portfolio tutor comments.
The list supports category/status tabs, search, term, subject, sorting, pagination,
and a selected detail panel; these are saved in query parameters. Statistics and
topic focus areas derive from activity scores. New quiz and worksheet submissions
produce clearly labelled automatic feedback. Unsubmitted work receives no grade.

Reviewed status is independent of activity completion, persists in local storage
on this device, and updates the dashboard feedback card. Marked-work and practice
links retain a validated return URL, including the selected item and filters.
Portfolio revision shows the earlier rubric assessment while awaiting new feedback.
Progress opens the implemented overview; Resources opens its implemented library; Ask Tutor opens a local question with the selected activity context;
there is no live tutor marking or account sync. Reusable feedback notes and return
links live in `libs/shared/ui-elements/src/` alongside the existing controls.

Progress follows `.design/LEARNERS_/Progress_LD.png`. Existing lesson and activity
stores supply overview metrics, subject progress, topic scores, portfolio rubric
evidence, weekly quiz performance, achievements, and available next steps.
Initially academic coverage is 84% (includes partial lessons), quiz average 70%,
worksheet completion 80%, and portfolio completion 64%. New practice updates the
same records used by the dashboard and other learner screens.

Subject, term, activity focus, performance period, detail dialogs, and achievement
pagination use URL state. The chart groups actual quiz results into Lagos school
weeks and keeps unrecorded weeks blank. Topic mastery uses the latest quiz, completed
worksheet, and available portfolio review. Skill evidence uses actual rubric
marks, including explicitly retained earlier feedback on revised submissions.
Unassessed work has no score. A calculation dialog explains the measures.

The new shared score-table and activity-list controls hold presentation only.
Scoping, evidence, recommendation availability, history, and timeline logic stay
in `src/progress/`. Validated `progressReturn` links retain the learner's scope
when returning from related lessons, subjects, quizzes, worksheets, portfolio
work, and feedback. Empty selections and unavailable evidence have clear states.
There is no separate attendance, streak, or visit tracker and no learner backend.

Live Classes follows `Live Classes_LD.png` and `Live Classes II_LD.png`.
The schedule supports upcoming/past tabs, subject/search filters, pagination,
next-class countdown, today’s schedule, valid class-code lookup, bookmarks,
calendar browsing, and actual ICS downloads. Twelve fixtures use fixed November
2026 Lagos dates. Full, ended, inaccessible, and missing records have explicit states.

The server-rendered `/student/live-classes/:classId` opens a local practice room
with slides, outline, zoom/fullscreen, sample participants, chat, notes,
vocabulary, short-answer practice, and real text downloads. The dashboard links
to the same whole-numbers class. Return navigation preserves schedule filters.
Work and elapsed practice time use session storage in the current tab. Practice
answers do not update real attendance, tutor grades, or quiz records.

Camera/microphone previews request access only on explicit clicks and stop on
leave, dialog dismissal, or page exit. Refresh keeps work and turns devices off.
Browser checks report capabilities without claiming measured call quality.
Tutor portraits/conversation are samples; real calls, shared messaging, attendance,
recordings, and account sync need backend services. Related learning opens in
another tab. Shared presentation controls live directly under the UI library’s
`src/`; class lookup, schedule rules, downloads, and device handling stay in this feature.

Resources follows `Resources_LD.png` and `Resources II_LD.png`. Its 23 original
sample materials cover the three enrolled subjects. The library supports search,
category/subject/term filters, sorting, pagination, featured cards, saved resources,
bookmarks, recently viewed items, downloads, and existing lesson/topic links.
Counts and file sizes derive from actual records. Exam-style sample questions
are explicitly labelled as original revision material, not official past papers.

The server-rendered `/student/resources/:resourceId` provides real local MP4
revision videos, captions, chapter seeking, speed selection, transcripts, text
readers, related materials, and actual downloads. The four silent clips last
2:30, 1:00, 1:15, and 1:00; their slides and captions match the transcript. Notes,
practice sets, and worksheets download as text files. Assets can be regenerated
with `node scripts/generate-resource-videos.mjs` using FFmpeg and DejaVu fonts.
They are already bundled, so this command is not needed for normal development.

Saved items, likes, resource completion, bookmarks, playback position, viewing
and download history, and timestamped personal notes persist in local storage on
this device. Notes can be edited, exported, and deleted with confirmation. Resource
completion remains separate from lesson or assessment progress. Browser downloads
are not cached as offline library files, and clearing resource history does not
remove files from the device's download folder. Storage management reports actual
metadata bytes and the browser's estimated site quota. Requests export an unsent
draft or open Ask Tutor with context; service delivery and account sync remain
backend work. Locked, missing, empty, corrupted-storage, and download-error states
are handled. Back navigation preserves library scope.

Profile follows `Profile_LD.png`. It composes shared identity and achievement cards,
progress and preference lists, snapshot tiles, weekly activity, and the month calendar.
`src/data/learner-profile-store.ts` saves validated contact details, three personal
goals, and the resource Wi-Fi preference under `school-hub:learner-profile:v1`.
Identity updates reach the header, dashboard, practice classroom, and other open
tabs. These edits do not change sign-in credentials or contact a backend.

Snapshot and goals derive from existing Progress records. Practice time includes
recorded worksheet and portfolio seconds. Streaks use dated learner completions
in Lagos time, not page visits; missing evidence does not create scores or badges.
The Profile calendar links back to the recorded work. Editors, badge details, and
calendar selection use query parameters and restore on direct entry or refresh.

Resource downloads enforce the Profile Wi-Fi preference when enabled. Known
cellular connections are blocked; unknown connection types need an explicit
Download Once action. Account/security and other preferences link to the matching
Settings placeholder. Storage errors keep changes for the current visit and show
a persistence message. `profile/profile-engine.spec.ts` and
`apps/shell-e2e/src/learner-profile.spec.ts` cover these calculations and workflows.

Run `pnpm exec playwright test --config apps/shell-e2e/playwright.config.mts --project chromium`
to check sidebar navigation, dashboard actions, responsive layout, and browser
history, subject and lesson filters, pagination, overview dialogs, and the
assessment, worksheet, portfolio, feedback, progress, live-class, resource, and profile lifecycles. Tests save screenshots under
`dist/.playwright/apps/shell-e2e/test-output/`.

For checks against the built server, run `pnpm exec nx build shell`, then
`NG_ALLOWED_HOSTS=localhost PORT=4201 node dist/apps/shell/server/server.mjs`.
Use `BASE_URL=http://localhost:4201` with the Playwright command above. An explicit
`BASE_URL` uses an already running server; otherwise Playwright starts the usual
development server. `NG_ALLOWED_HOSTS` keeps Angular server rendering active for
the local production check. Configure the appropriate hosts for a deployment.

## Running unit tests

Run `nx test student` to execute the unit tests.

## Ask Tutor

`src/ask-tutor/` implements subject selection, sample human-tutor conversations,
independent drafts, local questions and follow-ups, sample-answer ratings, a
tutor directory, topics, and searchable history. Context links resolve existing
learner records rather than trusting arbitrary destinations. IndexedDB stores
questions and attachment bytes; unavailable storage falls back to the current
visit with a visible status. Attachments support validation, preview, removal,
and download. Conversations export as text and local deletion is confirmed.

New questions remain explicitly unsent. Tutor availability, delivery, and account
sync require backend integration. See `tutor-engine.spec.ts`, the browser suite
`apps/shell-e2e/src/learner-tutor.spec.ts`, and the navigation document for limits
and URL state.
