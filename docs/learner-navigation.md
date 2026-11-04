# Learner navigation and page map

Use this document to cross-check the learner implementation against `.design/LEARNERS_`.
The menu order below comes from the purple learner designs, with Settings included.
The blue Dashboard and My Lessons screens use an earlier-looking visual style;
the folder does not establish which style is final.

The 13 main-page URLs below are registered. Dashboard, My Lessons, My Subjects,
and Quizzes & Assessments are implemented with sample data; the other nine main
pages currently show placeholders. Assessment attempt and result routes are also
registered; other detail and activity URLs remain proposed targets. Keep the existing `/student`
portal prefix and use learner-facing labels in the interface. `:lessonId` and
similar segments represent actual record IDs. Query parameters describe page
state; they do not represent extra sidebar items.

## Current code

- [Page definitions](../libs/module/student/src/student-pages.config.ts) provide
  the path, label, icon, and description for all 13 main learner pages.
- [Portal routes](../libs/module/student/src/student.routes.ts) and
  [sidebar configuration](../libs/module/student/src/student-sidebar.config.ts)
  both use those definitions, so every sidebar link has a matching page.
  Dashboard, My Lessons, My Subjects, and Quizzes & Assessments load their own feature components.
- [Shared page placeholder](../libs/shared/ui-elements/src/page-placeholder/page-placeholder.ts)
  renders the remaining pages' titles, descriptions, and icons.
- [Shared sidebar](../libs/shared/layout/src/sidebar/sidebar.html) ignores query
  parameters for active-link matching. Learner items also allow descendant paths
  so future detail screens can keep their owning menu item highlighted.
- The portal entry and unknown `/student` paths redirect to the dashboard.
- [Browser navigation checks](../apps/shell-e2e/src/learner-navigation.spec.ts)
  cover the menu links, page titles, active state, refresh, and browser history.

## Sidebar menu to main page

Every route in this table is relative to `/student`.

| Sidebar item          | Registered route   | Design reference                                                    | Current status                                           |
| --------------------- | ------------------ | ------------------------------------------------------------------- | -------------------------------------------------------- |
| Dashboard             | `/dashboard`       | [Learner dashboard](<../.design/LEARNERS_/Learners_ dashboard.png>) | Dashboard implemented; sample data                       |
| My Lessons            | `/lessons`         | [My Lessons](<../.design/LEARNERS_/My lessons_LD.png>)              | Lessons implemented; sample data                         |
| My Subjects           | `/subjects`        | No dedicated screen supplied                                        | Implemented; inferred layout, sample data                |
| Quizzes & Assessments | `/assessments`     | [Assessment overview](../.design/LEARNERS_/QA_LD.png)               | Overview, practice, and results implemented; sample data |
| Worksheets            | `/worksheets`      | [Worksheet overview](../.design/LEARNERS_/Worksheet_LD.png)         | Placeholder registered                                   |
| Portfolio Tasks       | `/portfolio-tasks` | [Portfolio overview](<../.design/LEARNERS_/Portfolio Tasks_LD.png>) | Placeholder registered                                   |
| Feedback              | `/feedback`        | [Feedback](../.design/LEARNERS_/Feedback_LD.png)                    | Placeholder registered                                   |
| Progress              | `/progress`        | [Progress](../.design/LEARNERS_/Progress_LD.png)                    | Placeholder registered                                   |
| Live Classes          | `/live-classes`    | [Class overview](<../.design/LEARNERS_/Live Classes_LD.png>)        | Placeholder registered                                   |
| Resources             | `/resources`       | [Resource library](../.design/LEARNERS_/Resources_LD.png)           | Placeholder registered                                   |
| Ask Tutor             | `/ask-tutor`       | [Tutor conversation](<../.design/LEARNERS_/Ask Tutor_LD.png>)       | Placeholder registered                                   |
| Profile               | `/profile`         | [Profile](../.design/LEARNERS_/Profile_LD.png)                      | Placeholder registered                                   |
| Settings              | `/settings`        | [Settings](../.design/LEARNERS_/Settings_LD.png)                    | Placeholder registered                                   |

That gives 13 sidebar destinations: 12 designed main screens and My Subjects,
which appears in navigation but has no dedicated design.

## Designed detail and activity screens

These five screens open from the main pages and retain their owning sidebar item.
Their routes are also relative to `/student`. The quiz attempt is registered;
the other four detail routes remain planned. Results additionally use
`/assessments/:assessmentId/results/:attemptId` with an inferred review layout.

| Owning menu item      | Screen                                           | Proposed route                       | Design reference                                                  |
| --------------------- | ------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------- |
| Quizzes & Assessments | Quiz in progress                                 | `/assessments/:assessmentId/attempt` | [Quiz attempt](<../.design/LEARNERS_/QA II_LD.png>)               |
| Worksheets            | Worksheet workspace                              | `/worksheets/:worksheetId`           | [Worksheet workspace](<../.design/LEARNERS_/Worksheet II_LD.png>) |
| Portfolio Tasks       | Task details, work, submission, feedback, rubric | `/portfolio-tasks/:taskId`           | [Task details](<../.design/LEARNERS_/Portfolio Task II_LD.png>)   |
| Live Classes          | Live classroom                                   | `/live-classes/:classId`             | [Live classroom](<../.design/LEARNERS_/Live Classes II_LD.png>)   |
| Resources             | Resource detail; supplied example is video       | `/resources/:resourceId`             | [Video resource](<../.design/LEARNERS_/Resources II_LD.png>)      |

The portfolio image illustrates the Overview tab. Its other tab labels identify
required views, but their contents are not separately designed. The video detail
image likewise does not define document, past-question, or external-link viewers.

## Dashboard implementation

The [dashboard feature](../libs/module/student/src/dashboard/dashboard.ts) follows
the learner dashboard reference and composes reusable cards, icon badges, progress
indicators, task lists, metrics, and subject tiles from `@school-hub/ui-elements`.
Its [data fixture](../libs/module/student/src/dashboard/dashboard.data.ts) provides
the sample learner values; no learner backend is connected yet.

Dashboard actions resolve to registered overview pages with the selected record
in query parameters. Assessment dialogs continue to the registered detail routes:

| Action                           | Current destination                                                      |
| -------------------------------- | ------------------------------------------------------------------------ |
| Continue Lesson / Today's Lesson | `/student/lessons?lessonId=whole-numbers`                                |
| Due quiz                         | `/student/assessments?assessmentId=whole-numbers-quiz`                   |
| Due worksheet                    | `/student/worksheets?worksheetId=whole-numbers-worksheet`                |
| Submit Work                      | `/student/portfolio-tasks?taskId=market-price-comparison&tab=submission` |
| Join Class                       | `/student/live-classes?classId=whole-numbers-live`                       |
| View all tasks                   | `/student/lessons?tab=tasks`                                             |
| Quiz Results                     | `/student/assessments?assessmentId=whole-numbers-quiz&tab=results`       |
| Tutor feedback                   | `/student/feedback?feedbackId=whole-numbers-feedback`                    |
| Progress metrics                 | `/student/progress?area=:area`                                           |
| Recent subject                   | `/student/subjects?subjectId=:subjectId`                                 |
| Weak area / recommended practice | `/student/resources?topicId=:topicId`                                    |

These destinations preserve the selected learning context. My Lessons handles
`lessonId` and `tab=tasks` using overview and pending-task dialogs. My Subjects
handles `subjectId` with its subject overview. Assessments opens instructions or
a result summary and links to practice or answer review. The other destinations
still show placeholders. Replace them with the detail routes below as
those screens and workflows are implemented.

## My Lessons implementation

The [My Lessons feature](../libs/module/student/src/lessons/lessons.ts) follows the
provided reference. The [lesson fixtures](../libs/module/student/src/lessons/lessons.data.ts)
contain 20 records, with statistics derived from those records: 16 completed,
one in progress, and three upcoming. The recommended lesson is an available
upcoming lesson, rather than one already marked completed.

| State or action                     | URL or behaviour                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Search                              | `q=:search`                                                                      |
| Subject / term                      | `subject=:subjectId&term=first` (or `second`, `third`)                           |
| Status tab or select                | `status=in-progress`, `completed`, or `upcoming`; omit for All Lessons           |
| Pagination                          | `page=:page`; changing filters resets the page                                   |
| Start / Continue / Review / Preview | `lessonId=:lessonId` opens its overview dialog                                   |
| More actions                        | `lessonId=:lessonId&panel=actions`                                               |
| All pending tasks                   | `tab=tasks`                                                                      |
| Lesson materials                    | `/student/resources?lessonId=:lessonId&subjectId=:subjectId`                     |
| Quiz / worksheet / portfolio        | Existing overview route with its record ID and `lessonId`                        |
| Ask tutor                           | `/student/ask-tutor?contextType=lesson&contextId=:lessonId&subjectId=:subjectId` |

Filters combine, remain shareable, and restore on refresh and browser history.
Unknown filter values fall back to All; invalid page numbers are clamped. Missing
lesson IDs show a dismissible message. Upcoming locked lessons can preview their
objective, but do not expose unlocked activity links. Native modal dialogs support
Escape and restore focus. The full lesson player and server persistence remain
planned.

The [browser checks](../apps/shell-e2e/src/learner-lessons.spec.ts) cover these
behaviours and capture desktop, mobile, and dialog screenshots.

## My Subjects implementation

There is no dedicated My Subjects reference image. The
[implemented subject catalog](../libs/module/student/src/subjects/subjects.ts)
uses the established learner styling and the expanded variant of the existing
shared subject card.

The [subject metadata](../libs/module/student/src/data/subject-catalog.data.ts)
is shared with My Lessons.
[Subject progress](../libs/module/student/src/data/subject-progress.data.ts) is
calculated from the existing lesson records and also feeds the dashboard's recent
subject cards. For the current sample data, Mathematics has 8 lessons and 73%
progress, English Language has 7 lessons and 86%, and Basic Science has 5 lessons
and 100%. These percentages include the partial progress of current lessons;
overall progress is weighted across all lesson records.

| State or action                                         | URL or behaviour                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Search                                                  | `q=:search` searches subject names and descriptions                                   |
| Term                                                    | `term=first`, `second`, or `third`; omit for All Terms                                |
| Status                                                  | `status=in-progress`, `completed`, or `not-started`; omit for All Subjects            |
| Sort                                                    | `sort=name`, `progress-desc`, or `progress-asc`; omit for Recommended                 |
| Subject card / dashboard subject link                   | `subjectId=:subjectId` opens its overview                                             |
| Curriculum lesson                                       | `/student/lessons?subject=:subjectId&term=:term&lessonId=:lessonId`                   |
| Continue / Start / Preview                              | Opens the subject's next lesson overview                                              |
| Review completed subject                                | `/student/lessons?subject=:subjectId&status=completed` (retaining term when selected) |
| View all lessons                                        | `/student/lessons?subject=:subjectId&term=:term`                                      |
| Subject resources, assessments, worksheets, or progress | Corresponding overview route with `subjectId` and optional `term`                     |
| Ask a tutor                                             | `/student/ask-tutor?contextType=subject&contextId=:subjectId&subjectId=:subjectId`    |

Search, filters, sorting, and the selected subject survive refresh and browser
history. Summary statistics follow the selected term. Status-tab counts follow
the current search and term. Missing subject IDs produce a dismissible message. A
valid subject with no lessons in the selected term offers a link to all its terms.
The page displays sample enrollments; enrollment changes and backend persistence
remain outside this implementation.

The [browser checks](../apps/shell-e2e/src/learner-subjects.spec.ts) cover these
behaviours and capture desktop, mobile, and subject-overview screenshots.

## Quizzes & Assessments implementation

The [overview](../libs/module/student/src/assessments/assessments.ts) follows
[QA_LD.png](../.design/LEARNERS_/QA_LD.png); the
[attempt](../libs/module/student/src/assessments/attempt/attempt.ts) follows
[QA II_LD.png](<../.design/LEARNERS_/QA II_LD.png>). Instructions, calendar,
submission confirmation, and results use matching layouts because no separate
designs were supplied for those views.

| State or action                             | URL or behaviour                                                           |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| Search, subject, term                       | `q=:search&subjectId=:subjectId&term=first` (or `second`, `third`, `all`)  |
| Assessment type                             | `type=quiz`, `assessment`, `diagnostic`, or `topic-test`; omit for All     |
| Instructions                                | `assessmentId=:assessmentId`                                               |
| Recent result summary                       | `assessmentId=:assessmentId&tab=results`                                   |
| All results / pagination                    | `tab=results&page=:page`                                                   |
| Calendar / topic performance                | `view=calendar` or `view=topics`                                           |
| Start / resume practice                     | `/student/assessments/:assessmentId/attempt`, retaining filters            |
| Submit / review result                      | `/student/assessments/:assessmentId/results/:attemptId`, retaining filters |
| Back to overview                            | Restores subject, term, type, search, and result pagination                |
| Related lesson, resources, worksheet, tutor | Uses the assessment's subject, topic, and lesson IDs                       |

Statistics, topic performance, and charts derive from the same result records.
New practice scores also update the dashboard's latest quiz and quiz average.
Three sample question banks support whole numbers, parts of speech, and living
things; activities without question content stay unavailable. Existing sample
results count toward the two-attempt allowance. Older summary-only results do
not invent question-level review data.

Answers, review marks, current question, pause state, countdown, and submitted
results persist in session storage for the current tab. Timers use a deadline so
refresh and delayed ticks do not reset them. Expiry submits the current answers;
unanswered questions score zero. Leaving the practice route pauses the activity.
These are browser-local practice activities; account storage, assigned exam
enforcement, and server grading still require a backend.

The [browser checks](../apps/shell-e2e/src/learner-assessments.spec.ts) cover
filters, locked activities, pagination, answer review, attempt limits, pause and
refresh, grading, expiry, calculator use, dashboard updates, invalid records,
and responsive layouts. Unit tests cover grading, timer restoration, storage
validation, and calculator parsing.

## Links between pages

This table assigns intended destinations to visible actions. It is a proposed
navigation contract inferred from the screens, rather than evidence that the
images contain working links. All URLs are relative to `/student`.

| Starting page         | Action                                                | Destination or state                                                                                                                                |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard             | Continue Lesson                                       | `/lessons/:lessonId` (lesson player design needed)                                                                                                  |
| Dashboard             | Open a due quiz, worksheet, or portfolio task         | The matching assessment, worksheet, or portfolio record                                                                                             |
| Dashboard             | Submit Work                                           | `/portfolio-tasks/:taskId?tab=submission`                                                                                                           |
| Dashboard             | Join Class                                            | `/live-classes/:classId`                                                                                                                            |
| Dashboard             | Open recent subject                                   | `/subjects/:subjectId` (subject detail design needed)                                                                                               |
| Dashboard             | Follow a recommended action                           | The specific related lesson, practice activity, or resource                                                                                         |
| My Lessons            | Start, continue, preview, or review a lesson          | `/lessons/:lessonId`; access and presentation depend on lesson state                                                                                |
| My Lessons            | View Progress                                         | `/progress`                                                                                                                                         |
| My Lessons            | Open linked quiz, worksheet, or portfolio task        | The matching record; respect locked states                                                                                                          |
| My Lessons            | Open a pending task                                   | The matching assessment, worksheet, or portfolio record                                                                                             |
| My Subjects           | Open a subject                                        | `/subjects/:subjectId`; page structure and links remain to be designed                                                                              |
| Quizzes & Assessments | Open an available assessment                          | `/assessments/:assessmentId/attempt` after checking availability and remaining attempts                                                             |
| Quizzes & Assessments | Open a recent result                                  | `/assessments/:assessmentId/results/:attemptId`; implemented with an inferred review layout                                                         |
| Quizzes & Assessments | Go to Worksheets                                      | `/worksheets`, filtered to the relevant subject or topic where available                                                                            |
| Quiz attempt          | Submit completed attempt                              | Confirm submission, grade the practice attempt, and open its result/review page                                                                     |
| Worksheets            | Select an item                                        | Update the detail panel on the same page; proposed state: `?worksheetId=:worksheetId`                                                               |
| Worksheets            | Start or Continue Worksheet                           | `/worksheets/:worksheetId`                                                                                                                          |
| Worksheets            | Go to Quizzes                                         | `/assessments`, filtered to the relevant subject or topic                                                                                           |
| Worksheet workspace   | Save & Exit / Back to Worksheets                      | Save progress where applicable, then `/worksheets` with the same item selected                                                                      |
| Worksheet workspace   | Save & Continue                                       | Save progress and remain in the worksheet; final submission behaviour needs definition                                                              |
| Worksheet workspace   | Ask Tutor                                             | `/ask-tutor` with the worksheet and optional question context                                                                                       |
| Portfolio Tasks       | Continue Task / View Submission / View Feedback       | `/portfolio-tasks/:taskId` with `?tab=work`, `?tab=submission`, or `?tab=feedback`                                                                  |
| Portfolio Tasks       | Open Portfolio Rubric                                 | Rubric view; a general rubric versus a task-specific rubric is not established                                                                      |
| Portfolio task        | Upload My Work / Continue Working                     | The task's submission or work tab, keeping the same task ID                                                                                         |
| Portfolio task        | Back to Portfolio Tasks                               | `/portfolio-tasks`, restoring the previous filter and sort                                                                                          |
| Portfolio task        | Ask Tutor                                             | `/ask-tutor` with the task context                                                                                                                  |
| Feedback              | Select a feedback item                                | Update the detail panel on the same page; proposed state: `?feedbackId=:feedbackId`                                                                 |
| Feedback              | View Marked Work                                      | The selected item's annotated submission; viewer design needed                                                                                      |
| Feedback              | Redo Practice / Take Follow-up Quiz                   | The specifically assigned worksheet or assessment                                                                                                   |
| Feedback              | View full progress                                    | `/progress`                                                                                                                                         |
| Feedback              | Ask Tutor                                             | `/ask-tutor` with the selected feedback and activity context                                                                                        |
| Progress              | Review, Retake, Start, or Submit a recommended action | The related lesson, assessment, worksheet, or portfolio task                                                                                        |
| Progress              | View personalized feedback                            | `/feedback`, filtered or selected for the relevant feedback                                                                                         |
| Progress              | View all subjects                                     | `/subjects`                                                                                                                                         |
| Progress              | Message your tutor                                    | `/ask-tutor`                                                                                                                                        |
| Live Classes          | Join Class / valid class-code entry                   | `/live-classes/:classId` after resolving and checking access to the class                                                                           |
| Live Classes          | Open a past recording                                 | The recording resource at `/resources/:resourceId`                                                                                                  |
| Live classroom        | Leave Class / Back to Live Classes                    | `/live-classes`; preserve class attendance/session state                                                                                            |
| Live classroom        | Open materials after class                            | Related lesson or resource, linked by its record ID                                                                                                 |
| Resources             | View a resource                                       | `/resources/:resourceId`; external links can open the external destination                                                                          |
| Resource detail       | Back to Resources                                     | `/resources`, restoring the previous filters                                                                                                        |
| Resource detail       | Open a related resource                               | `/resources/:resourceId` for that resource                                                                                                          |
| Ask Tutor             | Select a subject / open a previous question           | Keep the same page and update the conversation; proposed state: `?subjectId=:subjectId&conversationId=:conversationId`                              |
| Profile               | Edit Profile / account-security shortcut              | `/settings?section=account` or `/settings?section=security`                                                                                         |
| Profile               | View Progress                                         | `/progress`                                                                                                                                         |
| Profile               | View All Subjects / Manage Subjects                   | `/subjects`; enrollment permissions and management design need definition                                                                           |
| Profile               | Continue learning in a subject                        | The next lesson for that subject, using its actual lesson ID                                                                                        |
| Profile               | Edit Goals / learning preferences                     | `/settings?section=learning`                                                                                                                        |
| Settings              | Select a settings category                            | Stay on `/settings` and set `?section=account`, `learning`, `notifications`, `security`, `appearance`, `storage`, `language`, `support`, or `about` |
| Shared header         | Open learner profile                                  | `/profile`                                                                                                                                          |
| Shared help panel     | Chat with a tutor                                     | `/ask-tutor`, retaining the originating page's learning context when available                                                                      |

For tutor links, a proposed context shape is
`?contextType=worksheet&contextId=:worksheetId&questionId=:questionId`.
Resolve that context into a readable activity reference inside the conversation.
The design depicts human tutors; it does not specify AI tutoring.

## Navigation rules to apply during implementation

1. Each sidebar item opens its main page. Detail routes keep that item active and
   use breadcrumbs and a Back link to their parent page.
2. Preserve relevant subject, term, status, search, selected record, sort, and
   pagination state when returning from details. Use query parameters for state
   that should survive refresh or be shareable.
3. Link cards and action buttons using real record IDs. A generic dashboard card
   must open the learner's specific assigned record, not an unrelated example.
4. Connect lessons, assessments, worksheets, tasks, feedback, resources, subjects,
   and classes using their shared curriculum/activity references.
5. Use reusable presentational components from `libs/shared`; keep portal routes,
   record lookup, access decisions, and learning workflows in the student feature.
   Components belong directly under their library's `src`, without `src/lib`.
6. Locked, unavailable, completed, and submitted items need explicit behaviour.
   Buttons should reflect those states and protected routes must enforce access.
7. Header search, notifications, and messages need specified destinations. Their
   presence in an image does not establish a separate designed page.

## Views and destinations needing definition

- A dedicated My Subjects design reference; the current catalog and overview use an inferred layout.
- Lesson player, preview, review, and guided-practice views.
- Assessment instructions, submission confirmation, result/review, and retry use inferred layouts; backend exam policies remain to be defined.
- Worksheet final submission, marking, and completed-review views.
- Portfolio work editor, upload flow, submitted work, feedback, and rubric contents.
- Calendar links from lessons, assessments, live classes, and profile: no dedicated
  learner calendar screen is supplied.
- Dashboard and My Lessons "View all tasks": decide whether this opens an
  aggregated task page or an existing filtered activity list.
- Saved resources, bookmarks, download management, printable worksheets, resource
  requests, and annotated-work viewers: actions are shown but dedicated views are
  not supplied.
- Tutor selection, support/help centre, notifications, messages, and global search
  results: define their page, panel, or modal destinations.
- Profile edit forms and the detailed contents of settings categories.
- Loading, empty, error, invalid-ID, access-denied, and mobile states.
- Final blue versus purple styling and Learno versus SchoolHub branding.

## Implementation cross-check

For each sidebar destination and its detail screens:

- [ ] Match the supplied screen, or document the agreed treatment of a missing design.
- [ ] Register the route and use the same URL in the menu, cards, and action links.
- [ ] Support direct URL entry, refresh, browser Back/Forward, and invalid records.
- [ ] Keep the correct menu item active on both the overview and its detail routes.
- [ ] Verify every visible action reaches the intended record, panel, tab, or download.
- [ ] Restore filter/selection state on return and carry learning context across pages.
- [ ] Verify related progress, result, submission, and feedback values remain consistent.
- [ ] Reuse shared components while keeping feature workflow logic in the student module.
- [ ] Verify access rules and the relevant loading, empty, error, and responsive states.

Update the status table as routes and screens are implemented. A registered route
alone does not mean its screen or cross-page workflow is complete.
