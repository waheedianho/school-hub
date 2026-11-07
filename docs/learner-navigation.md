# Learner navigation and page map

Use this document to cross-check the learner implementation against `.design/LEARNERS_`.
The menu order below comes from the purple learner designs, with Settings included.
The blue Dashboard and My Lessons screens use an earlier-looking visual style;
the folder does not establish which style is final.

The 13 main-page URLs below are registered. Dashboard, My Lessons, My Subjects,
Quizzes & Assessments, Worksheets, Portfolio Tasks, Feedback, Progress, Live Classes, Resources, Ask Tutor, Profile, and Settings are implemented with sample data. Assessment attempt, result, worksheet workspace, portfolio task, classroom, and resource detail routes are also
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
  Dashboard, My Lessons, My Subjects, Quizzes & Assessments, Worksheets, Portfolio Tasks, Feedback, Progress, Live Classes, Resources, Ask Tutor, and Profile load their own feature components.
- [Shared page placeholder](../libs/shared/ui-elements/src/page-placeholder/page-placeholder.ts)
  renders the Settings title, description, and icon.
- [Shared sidebar](../libs/shared/layout/src/sidebar/sidebar.html) ignores query
  parameters for active-link matching. Learner items also allow descendant paths
  so future detail screens can keep their owning menu item highlighted.
- The portal entry and unknown `/student` paths redirect to the dashboard.
- [Browser navigation checks](../apps/shell-e2e/src/learner-navigation.spec.ts)
  cover the menu links, page titles, active state, refresh, and browser history.

## Sidebar menu to main page

Every route in this table is relative to `/student`.

| Sidebar item          | Registered route   | Design reference                                                    | Current status                                                                                    |
| --------------------- | ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Dashboard             | `/dashboard`       | [Learner dashboard](<../.design/LEARNERS_/Learners_ dashboard.png>) | Dashboard implemented; sample data                                                                |
| My Lessons            | `/lessons`         | [My Lessons](<../.design/LEARNERS_/My lessons_LD.png>)              | Lessons implemented; sample data                                                                  |
| My Subjects           | `/subjects`        | No dedicated screen supplied                                        | Implemented; inferred layout, sample data                                                         |
| Quizzes & Assessments | `/assessments`     | [Assessment overview](../.design/LEARNERS_/QA_LD.png)               | Overview, practice, and results implemented; sample data                                          |
| Worksheets            | `/worksheets`      | [Worksheet overview](../.design/LEARNERS_/Worksheet_LD.png)         | Overview, workspace, and practice review implemented; sample data                                 |
| Portfolio Tasks       | `/portfolio-tasks` | [Portfolio overview](<../.design/LEARNERS_/Portfolio Tasks_LD.png>) | Overview, work, submissions, feedback, and rubric implemented; sample data                        |
| Feedback              | `/feedback`        | [Feedback](../.design/LEARNERS_/Feedback_LD.png)                    | Implemented with activity feedback, review status, and linked work                                |
| Progress              | `/progress`        | [Progress](../.design/LEARNERS_/Progress_LD.png)                    | Implemented with scoped metrics, evidence, history, and next steps                                |
| Live Classes          | `/live-classes`    | [Class overview](<../.design/LEARNERS_/Live Classes_LD.png>)        | Schedule and local practice classroom implemented; sample data                                    |
| Resources             | `/resources`       | [Resource library](../.design/LEARNERS_/Resources_LD.png)           | Library, videos, text readers, notes, and downloads implemented; sample data                      |
| Ask Tutor             | `/ask-tutor`       | [Tutor conversation](<../.design/LEARNERS_/Ask Tutor_LD.png>)       | Implemented with sample replies, local questions, attachments, and activity context               |
| Profile               | `/profile`         | [Profile](../.design/LEARNERS_/Profile_LD.png)                      | Identity, subjects, snapshot, achievements, goals, preferences, and activity calendar implemented |
| Settings              | `/settings`        | [Settings](../.design/LEARNERS_/Settings_LD.png)                    | Account details, preferences, reminders, security, and appearance implemented                     |

That gives 13 sidebar destinations: 12 designed main screens and My Subjects,
which appears in navigation but has no dedicated design.

## Designed detail and activity screens

These five screens open from the main pages and retain their owning sidebar item.
Their routes are also relative to `/student`. The quiz attempt, worksheet
workspace, portfolio task, classroom, and resource detail are registered. Results additionally use
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

| Action                           | Current destination                                                |
| -------------------------------- | ------------------------------------------------------------------ |
| Continue Lesson / Today's Lesson | `/student/lessons?lessonId=whole-numbers`                          |
| Due quiz                         | `/student/assessments?assessmentId=whole-numbers-quiz`             |
| Due worksheet                    | `/student/worksheets?worksheetId=whole-numbers-worksheet`          |
| Submit Work                      | `/student/portfolio-tasks/market-price-comparison?tab=submission`  |
| Join Class                       | `/student/live-classes?classId=whole-numbers-live`                 |
| View all tasks                   | `/student/lessons?tab=tasks`                                       |
| Quiz Results                     | `/student/assessments?assessmentId=whole-numbers-quiz&tab=results` |
| Tutor feedback                   | `/student/feedback?feedbackId=whole-numbers-feedback`              |
| Progress metrics                 | `/student/progress?area=:area`                                     |
| Recent subject                   | `/student/subjects?subjectId=:subjectId`                           |
| Weak area / recommended practice | `/student/resources?topicId=:topicId`                              |

These destinations preserve the selected learning context. My Lessons handles
`lessonId` and `tab=tasks` using overview and pending-task dialogs. My Subjects
handles `subjectId` with its subject overview. Assessments opens instructions or
a result summary and links to practice or answer review. Worksheets selects its
detail panel and links to its workspace. Portfolio task links open the corresponding
task tabs; legacy task-ID query links redirect to those paths. Feedback opens its
selected item and Progress handles the chosen activity focus. Live Classes resolves
`classId` into class details and the practice classroom. Resources resolves existing topic, lesson, subject, and term links; Ask Tutor resolves the selected activity into a local question. Replace them with the detail routes below as
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

## Worksheets implementation

The [overview](../libs/module/student/src/worksheets/worksheets.ts) follows
[Worksheet_LD.png](../.design/LEARNERS_/Worksheet_LD.png), and the
[workspace](../libs/module/student/src/worksheets/workspace/workspace.ts) follows
[Worksheet II_LD.png](<../.design/LEARNERS_/Worksheet II_LD.png>). Submission and
read-only feedback use an inferred layout within the workspace.

| State or action                    | URL or behaviour                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Search, subject, topic             | `q=:search&subjectId=:subjectId&topicId=:topicId`                                                             |
| Term                               | `term=first`, `second`, `third`, or `all`; First Term is the default                                          |
| Status tab                         | `status=assigned`, `completed`, `in-progress`, or `not-started`; omit for All                                 |
| Pagination / selected detail panel | `page=:page&worksheetId=:worksheetId`                                                                         |
| Printable worksheets               | `printable=1` shows records with question content                                                             |
| Start / Continue / Review          | `/student/worksheets/:worksheetId`, retaining list filters                                                    |
| Save & Exit / Back                 | Returns to the overview with filters, page, and selection preserved                                           |
| Save & Continue                    | Saves and focuses the next unanswered question; offers submission when all are answered                       |
| Submit Worksheet                   | Confirms unanswered questions, grades, saves, and opens read-only feedback                                    |
| Download / Print                   | Downloads a text worksheet, or opens browser print / Save as PDF; answers are optional                        |
| Ask Tutor                          | `/student/ask-tutor?contextType=worksheet&contextId=:worksheetId&questionId=:questionId&subjectId=:subjectId` |

The twenty records use the existing lesson IDs. Six have question content for
operations, place value, patterns, parts of speech, living things, and sentence
types. Other completed fixtures show score summaries; unavailable activities
stay locked. Counts, scores, section completion, and insights derive from these
records rather than the design image's illustrative numbers. Initially sixteen
of twenty worksheets are completed, so the dashboard shows 80%. Overview metrics
follow the selected term and subject. New submissions update dashboard completion,
the corresponding lesson activity badge, and the pending worksheet task.

Written answers, review marks, question position, scratch notes, submitted work,
and study time persist in session storage for the current tab. Numeric answers
accept commas; short answers ignore case and surrounding whitespace. Unanswered
questions score zero. Scratch notes are not graded. Submitted work is read-only.
Account persistence, tutor marking, and server grading remain backend work.

Reusable written answer fields and unit conversion live under `libs/shared`;
the workspace also reuses existing cards, progress indicators, question navigator,
calculator, tabs, pagination, and modal components. New components follow the
shared 13/14/16px typography scale and do not introduce `src/lib` folders.

The [browser checks](../apps/shell-e2e/src/learner-worksheets.spec.ts) cover overview
filters, selection, pagination, saved work, grading and cross-page updates, tools,
downloads, print layout, locked and missing records, and mobile layouts. Unit
tests check grading, section progress, and validation of restored drafts.

## Portfolio Tasks implementation

The [overview](../libs/module/student/src/portfolio/portfolio.ts) follows
[Portfolio Tasks_LD.png](<../.design/LEARNERS_/Portfolio Tasks_LD.png>), and the
[task workspace](../libs/module/student/src/portfolio/task/task.ts) follows
[Portfolio Task II_LD.png](<../.design/LEARNERS_/Portfolio Task II_LD.png>).
My Work, Submission, Feedback, and Rubric use inferred contents because only the
Overview tab was supplied. Task art uses the established icon system.

| State or action                             | URL or behaviour                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Search / subject / term                     | `q=:search&subjectId=:subjectId&term=first` (or `second`, `third`, `all`)                 |
| Status                                      | `status=in-progress`, `submitted`, `completed`, `needs-revision`, or `not-started`        |
| Sorting / pagination                        | `sort=updated`, `title`, or `progress`; default Due Date; `page=:page`                    |
| Open task                                   | `/student/portfolio-tasks/:taskId`; keeps list filters and page                           |
| Legacy task selection                       | `?taskId=:taskId&tab=:tab` redirects to the task route                                    |
| Task tabs                                   | `tab=work`, `submission`, `feedback`, or `rubric`; omit for Overview                      |
| Task guide / upload chooser / common rubric | Overview `view=guide`, `upload`, or `rubric`                                              |
| Save & Exit / Back                          | Restores the portfolio overview filters, sort, and pagination                             |
| Download brief / template                   | Text task brief; CSV market comparison template or text outline                           |
| Attach evidence                             | Validated local files; preview, download, and removal before submission                   |
| Submit / resubmit                           | Requires work or evidence and a reflection, confirms, and saves a read-only local receipt |
| Ask Tutor                                   | `/student/ask-tutor?contextType=portfolio&contextId=:taskId&subjectId=:subjectId`         |

Fourteen sample records resolve all thirteen mathematics and science lesson
portfolio links and an independent English dictionary assignment. The existing
market task remains `market-price-comparison`. First Term contains twelve tasks:
two in progress, three submitted, four completed, one needing revision, and two
locked/not started. The overview's counts and insights follow term and subject;
skill percentages come from assessed task scores. The shared sample rubric has
five criteria totalling 100 marks. Personal dictionary feedback is scored 82%;
the rounding task provides a sample revision request.

Planning, work, reflection, notes, checklist values, study time, and actual file
blobs save to IndexedDB on the current device. Supported uploads are PDF, DOCX,
XLSX, PNG, JPG/JPEG, TXT, and CSV, with up to five files, 10 MB each and 20 MB
combined. Text and image previews use the stored file contents. Other formats
are available for download. Saved work is browser-local practice, without tutor
delivery, account sync, or server upload/marking.

Submitted work is read-only. A requested revision is editable and creates a new
submission version; previous feedback stays labelled as earlier feedback and a
new grade is not fabricated. Submission snapshots retain the work, reflection,
planning, and file names. Dashboard progress counts tasks handed in (submitted
or completed), initially 9/14 or 64%. New submissions update the card and lesson
activity badge and remove the task from pending work. English lesson activities
marked N/A retain that state; the independent dictionary task links to its lesson
for learning context.

Shared file upload, checklist, rating, and rubric components receive display data
and events. Portfolio workflow, validation, and storage stay in the feature.
Written answer fields are reused for the longer work and reflection responses.
All new text follows the shared readable font scale.

The [browser checks](../apps/shell-e2e/src/learner-portfolio.spec.ts) cover filters,
saved drafts and attachment bytes, previews/downloads, submission, revision,
feedback, cross-page status, locked/invalid records, and responsive layouts.
Unit tests cover progress, submission rules, upload limits, tutor score bounds,
and restored drafts and blobs.

## Feedback implementation

The [Feedback feature](../libs/module/student/src/feedback/feedback.ts) follows
[Feedback_LD.png](../.design/LEARNERS_/Feedback_LD.png). It combines recent
feedback, a selected detail panel, review progress, topic focus areas, and next
steps. Shared cards, badges, tabs, pagination, progress indicators, and the new
feedback-note component provide the reusable presentation. Feature data and
workflow remain under `src/feedback/`; there is no nested `src/lib` folder.

Records come from the existing assessment results, completed worksheets, and
portfolio tutor comments. Initially there are 42 items across all terms: 19
assessment results, 16 completed worksheets, and seven portfolio assessments.
First Term contains 34. Unsubmitted worksheets and unassessed portfolio work do
not acquire feedback. Submitted quiz and worksheet practice adds an automatic
answer review, clearly distinguished from sample tutor comments. Portfolio
revision retains its original rubric score and identifies the earlier submission
while the new one awaits feedback.

Search, subject, term, category/status, sort order, pagination, and `feedbackId`
are URL state. All Terms is the initial scope. The selected item can remain open
outside the current list page or filter, with an explanatory message. Unknown
IDs show a dismissible notice; empty filters show a clear state. Counts and score
averages follow the selected term and subject, while list tabs also follow the
search. Average Performance converts the mean percentage to a five-point scale;
Focus Areas show the lowest topic averages from actual activity scores.

Reviewing an item is an explicit action independent of activity completion. The
status saves in local storage under `school-hub:feedback-review:v1` on this device
and updates the dashboard's existing Whole Numbers feedback card. Both reviewed
and needs-action overrides survive refresh. This storage is separate from
session-only quiz/worksheet answers and IndexedDB portfolio work. Storage failure
keeps status for the current visit and displays a notice.

View Answer Review / View Marked Work opens the existing activity result;
score-only sample records use View Score Summary, and portfolio feedback opens
`?tab=feedback`. No annotated submission viewer is implied. A validated
`feedbackReturn` query provides Back to Feedback with the original selection and
filters from results, worksheet workspaces, portfolio tasks, and follow-up quiz
instructions/attempts/results. The `#feedback-detail` anchor brings the detail
panel into view on narrow screens.

Quick Actions reflect availability: continue/start a related worksheet, review
completed practice, revise portfolio work, or review the lesson. Follow-up quizzes
respect existing attempt limits; unavailable attempts link to quiz details.
Ask Tutor passes the selected feedback, activity, and subject context. Resources opens the implemented library with its topic and subject context. Ask Tutor resolves the feedback into a linked question; new messages remain local and unsent.
Progress opens the implemented overview with the current subject and term.
Tutor delivery, account storage, and live marking require a backend.

[Browser checks](../apps/shell-e2e/src/learner-feedback.spec.ts) cover filters,
review persistence and dashboard state, marked-work return links, new practice
reviews, tutor context, invalid selection, font size, and mobile layout. Unit
checks cover source mapping, unsubmitted work, original revision scores, summary
calculations, stored status validation, and allowed return destinations.

## Progress implementation

The [Progress feature](../libs/module/student/src/progress/progress.ts) follows
[Progress_LD.png](../.design/LEARNERS_/Progress_LD.png). It includes four overview
metrics, weekly quiz performance, subject progress, topic mastery, portfolio skill
evidence, a progress snapshot, strengths/focus areas, recent achievements, and
recommended next steps. It reuses shared cards, progress indicators, the
performance chart, tabs, dialogs, feedback notes, and pagination. New shared
score-table and activity-list components provide reusable evidence and activity
presentation; the subject table stays in the student feature. All sources remain
directly under `src/`, without a nested `lib` folder.

The overview reads the existing lesson fixtures and quiz, worksheet, portfolio,
and feedback stores. All Terms is the default. Initially academic learning
coverage is 84%, quiz average 70% across 17 quiz results, worksheet completion
80% (16/20), and portfolio completion 64% (9/14 handed in). Academic coverage
includes the current lesson's 80% partial progress; the dashboard's separate
Lessons Completed measure remains 16/20, or 80%. Completing practice does not
mark a lesson complete.

Performance Overview uses a compact title/subtitle header, period selector,
purple line, softly shaded area, percentage labels above markers, and short week
labels. Topic Mastery uses a compact Topic / Progress / Mastery table with inline
percentage bars and shield status badges; the adjacent skills table uses the
same row alignment. Explanations remain in the info/detail dialogs.

Subject and term selections apply to all evidence and metrics. `area` focuses
recent achievements and next steps while leaving the overview scoped to the
selected subject and term. Existing dashboard `?area=...` and subject
`?subjectId=...&term=...` links are handled. Empty selections show no scores,
zero completion counts, and a Clear filters action.

| State                   | Query parameter                                                                |
| ----------------------- | ------------------------------------------------------------------------------ |
| Subject                 | `subjectId=mathematics`, `english-language`, or `basic-science`                |
| Term                    | `term=first`, `second`, or `third`; omit for All Terms                         |
| Activity focus          | `area=lessons`, `quizzes`, `worksheets`, or `portfolio`; omit for All Progress |
| Chart period            | `range=4` or `all`; omit for Last 8 Weeks                                      |
| Detail dialog           | `view=topics`, `skills`, `achievements`, `recommendations`, or `calculation`   |
| Achievement dialog page | `page=:page`; ten entries per page                                             |

Quiz averages include all recorded quiz attempts, matching the dashboard.
The performance chart groups actual quiz results into Monday–Sunday school
weeks using Lagos time. The chart keeps every week in the selected four- or eight-week period.
Weeks without a score stay unassessed, with a dash and no connecting line or
shaded area across the gap. Diagnostic and other assessment kinds do
not enter the quiz average. Period selection affects this chart only.

Topic scores average the latest quiz result, completed worksheet score, and
available portfolio rubric score associated with the lesson. No scored evidence
shows No Score Yet, distinct from a real zero. Mastery bands are Strong (85–100),
Good (70–84), Developing (60–69), and Needs Support (below 60). Subject mastery
uses the subject's average quiz score. The calculation dialog explains these
measures and the difference between completion and performance.

Portfolio skill evidence uses actual tutor rubric marks relative to each
criterion's maximum. A revised submission retains its earlier assessed evidence
while awaiting a new review; a new unassessed submission receives no score.
Academic coverage and skill evidence are independent measures, not complementary
shares of a 100% total. Learning Engagement counts activities with recorded
progress/results; Lessons Completed and Feedback Received use their actual
records. Attendance, visits, streaks, and unsupported skill ratings are not
invented.

Achievements are dated lesson/worksheet/quiz completions, portfolio submissions,
and portfolio reviews. The full list is paginated. Recommendations use available
lessons, quizzes with a remaining or resumable attempt, unfinished worksheets,
editable portfolio work, and unreviewed feedback. Completed or locked work is
not offered as a new attempt. New practice changes scores, completion, evidence,
feedback counts, achievements, and recommendations through the same stores used
by the other pages.

Activity links and subject table links use existing registered screens. A
validated internal `progressReturn` query provides Back to Progress with its
subject, term, activity focus, and chart period intact from lesson/subject
pages, quiz instructions/attempts/results, worksheet overview/workspaces,
portfolio workspaces, and Feedback. Feedback keeps this context while selecting
items and returning from marked work. Personalized feedback and tutor links
carry the relevant learning context. No extra sidebar destinations are added.

[Browser checks](../apps/shell-e2e/src/learner-progress.spec.ts) cover metric
consistency, filters and history, dialogs/pagination, context return links,
quiz/worksheet/portfolio updates, empty selections, fonts, and mobile overflow.
Unit checks cover weighting, scoping, latest-attempt topic evidence, rubric
retention, school-calendar weeks, availability gates, achievements, and return
URL validation. The page uses sample data and device-saved practice until the
learner backend is connected.

## Live Classes implementation

The [schedule](../libs/module/student/src/live-classes/live-classes.ts) and
[classroom](../libs/module/student/src/live-classes/room/room.ts) follow
`Live Classes_LD.png` and `Live Classes II_LD.png`. Twelve lesson-linked fixtures
use explicit Lagos dates and times. Upcoming/past categories, search, subject,
pagination, selected class, calendar month/day, and room panel use URL state.
The dashboard's `whole-numbers-live` link resolves to the same class record.

The overview provides next-class countdown, upcoming rows, past recaps, today's
schedule, class rules, class-code entry, browser/device checks, and calendar
export. Full, ended, inaccessible, and missing classes have explicit states.
Class codes resolve records before entry. Calendar downloads are real ICS events
with UTC timestamps. Saved-class bookmarks use the current tab's session storage;
they do not schedule notifications. The sample schedule is fixed in November 2026.

`/student/live-classes/:classId` is a server-rendered local practice classroom.
Its slide board, outline, zoom, fullscreen, participant strip, toolbar, vocabulary,
practice questions, chat, notes, and resources are interactive. The English room
opens the subject/predicate examples at slide four of eight. Other subjects use
subject-specific materials. Notes, answers, messages, reactions, and elapsed
practice time survive refresh in session storage. Practice checks do not change
quiz scores, tutor assessments, or real attendance.

Camera and microphone access starts only after an explicit test/control click.
Device previews remain local, stop on dismissal/leave/page exit, and stay off on
refresh. Browser connectivity and capability checks do not claim measured call
quality. Navigation away from a joined practice room asks whether to stay or leave;
returning restores list filters. Related lessons, worksheets, and portfolio work
open in another tab; class and personal notes download as actual text files.

Tutor portraits and conversation are labelled samples. A real-time call service,
shared chat, real attendance, tutor delivery, recordings, and account persistence
remain backend work. Past classes provide written recaps rather than fabricated
video recordings. [Browser checks](../apps/shell-e2e/src/learner-live-classes.spec.ts)
cover navigation, calendar downloads, saved work, controls, simulated device
permissions and cleanup, activity feedback, error states, and mobile layouts.
Unit checks cover availability boundaries, calendar encoding, storage recovery,
answer checks, and return context.

## Resources implementation

The [resource library](../libs/module/student/src/resources/resources.ts) and
[detail screen](../libs/module/student/src/resources/detail/detail.ts) follow
`Resources_LD.png` and `Resources II_LD.png`. The library contains 23 original
sample resources across the three enrolled subjects: ten notes, four videos,
three exam-style practice papers, four downloadable sheets, and two external
learning links. Counts derive from the catalog and current subject/term/topic
scope. Sample practice papers are explicitly distinguished from official exams.

Category, search, subject, term, sort, page, featured selection, quick-access
collection, and lesson/topic context use query parameters. Existing dashboard
weak-area links, lesson materials, subject resources, and feedback focus areas
resolve to matching records. `/resources/:resourceId` is lazy-loaded and server
rendered; legacy `?resourceId=...` links resolve to it. Back to Resources restores
the library filters. Missing, locked, empty, storage-error, and download-error
states are explicit.

The video screen uses actual local silent revision clips, native playback and
fullscreen controls, speed selection, English captions, chapter seeking, a
matching transcript, and saved playback position. Clips are 2:30, 1:00, 1:15,
and 1:00 long. They use original text slides rather than the reference image's
illustrative 18-minute lesson. `scripts/generate-resource-videos.mjs` regenerates
MP4, SVG poster, VTT, and the typed metadata using FFmpeg and DejaVu fonts.
Assets are bundled in `apps/shell/public/resources/videos/`; regeneration is not
required to run the application.

Text resources display their actual contents and download as UTF-8 TXT files.
Downloads use real bytes; metadata does not claim PDF page counts or file types
that are not supplied. Related resources retain library context, and related
lessons open in another tab. External links open their verified destination in a
new tab. The resource request dialog downloads an unsent text draft or opens Ask
Tutor with the request context; it does not send a request to a service.

Saved resources, likes, manual resource completion, playback position, bookmarks,
viewing history, download history, and timestamped personal notes use local storage
on the current device. Bookmarks are separate from saved resources and can include
video time zero. Notes support editing, export, and confirmed deletion. Resource
completion does not alter lesson progress or assessment scores. Storage management
clears only resource metadata, with confirmation before clearing notes and saved
work. Browser-downloaded files are managed separately by the browser. Storage
figures use measured resource metadata and the browser's estimated origin quota,
rather than an invented account limit.

Shared artwork, cards, resource tables, media playback, chapters, and browser
file-download helpers live under `libs/shared/ui-elements/src/`, without a
nested `src/lib`. Catalog lookup, filtering, storage, downloads, availability,
and navigation stay in the student feature. [Browser checks](../apps/shell-e2e/src/learner-resources.spec.ts)
cover catalog navigation, filters, collections, actual playback and downloads,
notes, storage controls, context links, errors, and mobile overflow. Unit checks
cover catalog references, filter combinations, collection semantics, export
metadata, return links, and bounded recovery from damaged saved data.

## Profile implementation

The [Profile feature](../libs/module/student/src/profile/profile.ts) follows
[Profile_LD.png](../.design/LEARNERS_/Profile_LD.png), using the existing three
enrolled subjects and learner records. Reusable identity cards, achievement
cards, progress lists, preference lists, and weekly activity controls live
directly under `libs/shared/ui-elements/src/`. Shared summary tiles and the
month calendar support this page as well as their existing consumers.

| Action                                        | URL or behaviour                                                      |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Edit Profile                                  | `?view=edit`; validates and saves contact details on this device      |
| Edit Goals                                    | `?view=goals`; three all-time goals with measure, subject, and target |
| View All achievements / selected badge        | `?view=achievements` or `?badge=:badgeId`                             |
| Activity calendar / selected day              | `?view=calendar&month=YYYY-MM&date=YYYY-MM-DD`                        |
| Snapshot explanation                          | `?view=snapshot`                                                      |
| View Progress / Manage Subjects               | `/student/progress` or `/student/subjects`                            |
| Continue / Review subject                     | Existing available lesson overview with its actual `lessonId`         |
| Security, language, video, notification links | Registered Settings placeholder with the matching `section`           |

Identity, goals, and the Wi-Fi preference use `school-hub:learner-profile:v1`.
Name changes update the header, dashboard greeting, and practice classroom;
other open tabs receive storage updates. Edits do not change sign-in credentials.
Invalid saved fields recover to defaults, and unavailable storage retains changes
for the current visit with a visible message. Sample contact email uses the
reserved `example.test` domain; authentication and security services are not connected.

Lessons completed and quiz average use the same records as Progress. Practice
time sums recorded worksheet and portfolio seconds; estimated lesson durations
and untracked video or quiz time are excluded. Milestones require ten completed
lessons, a quiz score of at least 80%, or seven consecutive recorded learning days.
The streak and calendar use dated lesson completions, assessment submissions,
completed worksheets, and portfolio submissions in Lagos time, ignoring future
records. Page visits and tutor feedback dates add no activity. The current streak
may continue through yesterday; the seven-day badge retains an earned milestone.
Goals support quiz averages, completed lessons, completed worksheets, and handed-in
portfolio tasks. Missing quiz evidence displays no score rather than zero.

Wi-Fi-only downloads default off. When enabled, resource files allow known Wi-Fi
or wired connections, block known cellular connections, and require a per-file
confirmation when the browser cannot identify its connection. This preference
does not claim to control every browser export or provide offline caching.

[Profile browser checks](../apps/shell-e2e/src/learner-profile.spec.ts) cover local
editing, validation, cross-tab identity, goal persistence, actual learning evidence,
calendar links, download restrictions, damaged storage, and readable mobile layouts.
Profile unit checks cover validation, recovery, goals, time, milestones, and Lagos-day streak boundaries.

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
| Worksheet workspace   | Save & Continue                                       | Save progress and focus the next unanswered question; completed answers can be confirmed and submitted for practice review                          |
| Worksheet workspace   | Ask Tutor                                             | `/ask-tutor` with the worksheet and optional question context                                                                                       |
| Portfolio Tasks       | Continue Task / View Submission / View Feedback       | `/portfolio-tasks/:taskId` with `?tab=work`, `?tab=submission`, or `?tab=feedback`                                                                  |
| Portfolio Tasks       | Open Portfolio Rubric                                 | Common sample rubric in `?view=rubric`; each task's Rubric tab uses the same criteria                                                               |
| Portfolio task        | Upload My Work / Continue Working                     | The task's submission or work tab, keeping the same task ID                                                                                         |
| Portfolio task        | Back to Portfolio Tasks                               | `/portfolio-tasks`, restoring the previous filter and sort                                                                                          |
| Portfolio task        | Ask Tutor                                             | `/ask-tutor` with the task context                                                                                                                  |
| Feedback              | Select a feedback item                                | Update the detail panel on the same page with `?feedbackId=:feedbackId`                                                                             |
| Feedback              | View Marked Work                                      | Existing assessment answer review, worksheet result, or portfolio feedback tab                                                                      |
| Feedback              | Redo Practice / Take Follow-up Quiz                   | Related available worksheet, portfolio revision, lesson review, or assessment details                                                               |
| Feedback              | View full progress                                    | `/progress`                                                                                                                                         |
| Feedback              | Ask Tutor                                             | `/ask-tutor` with the selected feedback and activity context                                                                                        |
| Progress              | Review, Retake, Start, or Submit a recommended action | The related lesson, assessment, worksheet, or portfolio task                                                                                        |
| Progress              | View personalized feedback                            | `/feedback`, filtered or selected for the relevant feedback                                                                                         |
| Progress              | View all subjects                                     | `/subjects`                                                                                                                                         |
| Progress              | Message your tutor                                    | `/ask-tutor`                                                                                                                                        |
| Live Classes          | Join Class / valid class-code entry                   | `/live-classes/:classId` after resolving and checking access to the class                                                                           |
| Live Classes          | Open a past class                                     | A class recap dialog and actual lesson-note download; sample videos are unavailable                                                                 |
| Live classroom        | Leave Class / Back to Live Classes                    | `/live-classes`, restoring filters after leave confirmation; retain local work and stop device previews                                             |
| Live classroom        | Open materials after class                            | Related lesson or resource, linked by its record ID                                                                                                 |
| Resources             | View a resource                                       | `/resources/:resourceId`; external links can open the external destination                                                                          |
| Resource detail       | Back to Resources                                     | `/resources`, restoring the previous filters                                                                                                        |
| Resource detail       | Open a related resource                               | `/resources/:resourceId` for that resource                                                                                                          |
| Ask Tutor             | Select a subject / open a previous question           | Keep the same page and update the conversation: `?subjectId=:subjectId&conversationId=:conversationId`                                              |
| Profile               | Edit Profile / account-security shortcut              | `/profile?view=edit` or `/settings?section=security`                                                                                                |
| Profile               | View Progress                                         | `/progress`                                                                                                                                         |
| Profile               | View All Subjects / Manage Subjects                   | `/subjects`; enrollment permissions and management design need definition                                                                           |
| Profile               | Continue learning in a subject                        | The next lesson for that subject, using its actual lesson ID                                                                                        |
| Profile               | Edit Goals / learning preferences                     | `/profile?view=goals`; Wi-Fi switch saves locally; other preferences use `/settings?section=learning`                                               |
| Settings              | Select a settings category                            | Stay on `/settings` and set `?section=account`, `learning`, `notifications`, `security`, `appearance`, `storage`, `language`, `support`, or `about` |
| Shared header         | Open learner profile                                  | `/profile`                                                                                                                                          |
| Shared help panel     | Chat with a tutor                                     | `/ask-tutor`, retaining the originating page's learning context when available                                                                      |

For tutor links, the supported context shape is
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
- Worksheet practice submission and completed review use inferred layouts; tutor marking and backend policies remain to be defined.
- Portfolio work, submission, feedback, and rubric use inferred contents; tutor delivery, marking, and account sync remain backend work.
- Calendar links from lessons, assessments, live classes, and profile: no dedicated
  learner calendar screen is supplied.
- Dashboard and My Lessons "View all tasks": decide whether this opens an
  aggregated task page or an existing filtered activity list.
- Resource collections and local notes/download management are implemented. Backend resource requests and annotated-work viewers still need definition.
- Tutor selection, support/help centre, notifications, messages, and global search
  results: define their page, panel, or modal destinations.
- Detailed contents of settings categories and backend account/security services.
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

## Ask Tutor implementation

`/student/ask-tutor` uses the supplied conversation design with the three enrolled
subjects and sample human-tutor assignments. The tutor directory does not claim
live availability. Sample replies are labelled; new questions and follow-ups are
explicitly **Not sent**. No AI replies or remote delivery are simulated.

- `subjectId` selects the subject; `conversationId` opens a sample or saved local
  conversation; `new=1` opens the subject's independent draft.
- `contextType`, `contextId`, and optional `questionId` resolve subject, lesson,
  worksheet, portfolio, assessment, and feedback references against existing
  learner records. Resource requests and live-class support are also supported.
  The portfolio overview can attach general portfolio context without a task ID.
- Topic links prefill a question without replacing an existing draft. Invalid
  activity/conversation IDs show recovery messages.
- Questions, drafts, sample-answer ratings, and actual attachment bytes persist
  in IndexedDB (`school-hub-tutor`, version 1). Storage failure keeps the current
  visit usable and shows that changes cannot be saved for later.
- Each message accepts up to three PNG/JPEG/WebP/PDF/TXT files, 2 MB each; all
  tutor attachments are limited to 20 MB. Images and text preview locally; PDFs
  can be downloaded. Conversations can be exported and local questions deleted
  after confirmation. Limits are 20 questions, 40 messages per question, 50
  drafts, and 2,000 characters per message.
- `view` opens tutor, topic, history, attachment, preview, or deletion dialogs.
  History can be searched; Escape closes dialogs and restores trigger focus.

`learner-tutor.spec.ts` covers persistence, navigation, attachments, downloads,
invalid IDs, storage failure, and desktop/mobile layouts. Tutor delivery, live
availability, account sync, and real tutor responses require backend services.
