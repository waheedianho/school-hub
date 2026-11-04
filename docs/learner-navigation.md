# Learner navigation and page map

Use this document to cross-check the learner implementation against `.design/LEARNERS_`.
The menu order below comes from the purple learner designs, with Settings included.
The blue Dashboard and My Lessons screens use an earlier-looking visual style;
the folder does not establish which style is final.

URLs below are proposed implementation targets. Keep the existing `/student`
portal prefix and use learner-facing labels in the interface. `:lessonId` and
similar segments represent actual record IDs. Query parameters describe page
state; they do not represent extra sidebar items.

## Current code

- [Portal routes](../libs/module/student/src/student.routes.ts) register only the
  dashboard, whose component still contains placeholder content.
- [Sidebar configuration](../libs/module/student/src/student-sidebar.config.ts)
  currently uses a different school-management menu. Its eight non-dashboard
  links do not have matching student routes.
- [Shared sidebar](../libs/shared/layout/src/sidebar/sidebar.html) currently uses
  exact active-link matching. During implementation, detail screens should keep
  their owning menu item highlighted too.

## Sidebar menu to main page

Every route in this table is relative to `/student`.

| Sidebar item          | Proposed route     | Design reference                                                    | Current status                        |
| --------------------- | ------------------ | ------------------------------------------------------------------- | ------------------------------------- |
| Dashboard             | `/dashboard`       | [Learner dashboard](<../.design/LEARNERS_/Learners_ dashboard.png>) | Route exists; screen is a placeholder |
| My Lessons            | `/lessons`         | [My Lessons](<../.design/LEARNERS_/My lessons_LD.png>)              | Not routed                            |
| My Subjects           | `/subjects`        | No dedicated screen supplied                                        | Not routed; design needed             |
| Quizzes & Assessments | `/assessments`     | [Assessment overview](../.design/LEARNERS_/QA_LD.png)               | Not routed                            |
| Worksheets            | `/worksheets`      | [Worksheet overview](../.design/LEARNERS_/Worksheet_LD.png)         | Not routed                            |
| Portfolio Tasks       | `/portfolio-tasks` | [Portfolio overview](<../.design/LEARNERS_/Portfolio Tasks_LD.png>) | Not routed                            |
| Feedback              | `/feedback`        | [Feedback](../.design/LEARNERS_/Feedback_LD.png)                    | Not routed                            |
| Progress              | `/progress`        | [Progress](../.design/LEARNERS_/Progress_LD.png)                    | Not routed                            |
| Live Classes          | `/live-classes`    | [Class overview](<../.design/LEARNERS_/Live Classes_LD.png>)        | Not routed                            |
| Resources             | `/resources`       | [Resource library](../.design/LEARNERS_/Resources_LD.png)           | Not routed                            |
| Ask Tutor             | `/ask-tutor`       | [Tutor conversation](<../.design/LEARNERS_/Ask Tutor_LD.png>)       | Not routed                            |
| Profile               | `/profile`         | [Profile](../.design/LEARNERS_/Profile_LD.png)                      | Not routed                            |
| Settings              | `/settings`        | [Settings](../.design/LEARNERS_/Settings_LD.png)                    | Not routed                            |

That gives 13 sidebar destinations: 12 designed main screens and My Subjects,
which appears in navigation but has no dedicated design.

## Designed detail and activity screens

These five screens open from the main pages and retain their owning sidebar item.
Their routes are also relative to `/student`; none is registered yet.

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
| Quizzes & Assessments | Open a recent result                                  | `/assessments/:assessmentId/results/:attemptId` (result/review design needed)                                                                       |
| Quizzes & Assessments | Go to Worksheets                                      | `/worksheets`, filtered to the relevant subject or topic where available                                                                            |
| Quiz attempt          | Submit completed attempt                              | The result/review page for the saved attempt; submission flow needs definition                                                                      |
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

- My Subjects overview and subject details.
- Lesson player, preview, review, and guided-practice views.
- Assessment instructions, submission confirmation, result/review, and retry flows.
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
