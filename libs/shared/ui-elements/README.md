# Shared UI elements

Reusable UI controls, exported through `@school-hub/ui-elements`.

- `src/page-placeholder/` contains a placeholder screen with configurable title,
  description, and icon. It presents learner pages while their features are built.
- `src/dashboard-card/` provides a card with a title, coloured icon, and projected content.
- `src/icon-badge/` provides solid or tinted icon badges.
- `src/progress-bar/` provides labelled, accessible progress indicators.
- `src/progress-stat/` combines a metric, progress, and navigation link.
- `src/task-list/` renders due tasks with their destinations and an empty state.
- `src/subject-icon/` provides reusable mathematics, English, and science illustrations.
- `src/subject-card/` presents a subject's latest lesson and progress.
  An optional `summary` input adds the expanded catalog presentation with status,
  lesson counts, next lesson, and description. The compact dashboard variant is retained.
- `src/status-badge/` displays a semantic label with a configurable tone and icon.
- `src/progress-ring/` provides a circular, labelled progress indicator.
- `src/filter-tabs/` provides keyboard-accessible tabs for filtering result panels.
  The optional `appearance="pills"` renders separate purple subject buttons that
  wrap at narrow widths; boxed and underlined appearances remain available.
- `src/countdown/` renders a time remaining display from supplied timestamps.
- `src/session-card/` renders scheduled session metadata and actions.
- `src/month-calendar/` displays selectable days with event markers and month navigation.
- `src/lesson-board/` presents slides with navigation, zoom, and fullscreen.
- `src/local-video/` displays a supplied media stream; it never requests devices.
- `src/participant-strip/` presents sample/learner tiles and an optional local video preview.
- `src/classroom-toolbar/` emits classroom actions and reflects supplied device states.
- `src/chat-panel/` presents supplied messages, reactions, a composer, and emoji entry.
  `appearance="conversation"` supports question threads with attachment actions,
  configurable composer labels/limits, and projected tools. Conversations open
  at the beginning and scroll to newly appended learner follow-ups. Storage,
  file handling, and delivery decisions belong to the consuming feature.
- `src/resource-artwork/` provides code-native cover artwork with a supplied title, symbol, icon, and colour.
- `src/resource-card/` presents material metadata, a destination, and a save action.
- `src/resource-table/` presents an accessible, horizontally contained library table with view/visit actions.
- `src/media-player/` wraps native video controls with captions, playback speed, resume position, and seek requests.
- `src/chapter-list/` presents a timestamped video outline and emits seek actions.
- `src/utils/download-file.ts` starts real Blob/text file downloads; content and history decisions stay in the feature.
- `src/resource-list/` presents internal resource links and download actions.
- `src/pagination/` provides result counts and page navigation.
- `src/learning-steps/` displays an interactive learning journey.
- `src/dialog-panel/` provides a native modal with focus containment and Escape dismissal.
- `src/summary-stat/` presents a labelled count or metric with its icon and supporting text.
- `src/performance-chart/` plots a labelled series of percentage scores.
- `src/choice-list/` renders native radio choices, including disabled answer review.
- `src/question-navigator/` displays question position, answered state, and review marks.
- `src/calculator/` provides an arithmetic calculator with a restricted expression parser.
- `src/written-answer/` provides labelled short and long answer fields with read-only feedback.
- `src/unit-converter/` converts length, mass, and capacity with labelled native controls.
- `src/file-upload/` provides a file picker, drag and drop, errors, and attachment actions; validation and storage remain in the feature.
- `src/checklist/` renders labelled native checkboxes with per-item read-only states.
- `src/rating-stars/` presents a percentage rating with an accessible label.
- `src/score-table/` renders compact topic/mastery or skill/level tables with inline percentage bars, unassessed states, and optional shield badges.
- `src/activity-list/` renders linked achievements or next steps with icons, descriptions, date metadata, or action labels.
- `src/feedback-note/` renders a titled, themed feedback section with text or bullet items.
- `src/return-link/` renders an internal return URL with query parameters and fragment intact.
- `src/rubric-table/` presents criteria, maximum marks, and optional tutor scores in a scrollable table.
- `src/profile-card/` presents identity, contacts, membership metadata, and an edit action.
- `src/achievement-card/` presents earned or locked milestones and emits the selected ID.
- `src/progress-list/` presents labelled progress rows, optional details, and internal action links.
- `src/preference-list/` presents settings links, read-only values, and native accessible switches.
- `src/activity-week/` presents seven dated activity states and emits a selected date.

Summary stats support `appearance="tile"` for vertical pastel snapshot tiles.
The month calendar accepts its accessible `label`, `eventName`, and
`eventPluralName`; class-calendar defaults remain available. `shiftCalendarMonth`
is exported from `src/utils/calendar-month.ts`. Feature stores supply all dates,
counts, identity, progress, milestones, and preference behaviour.

Written answer fields support configurable length, rows, placeholder, and full
width so worksheet answers and longer portfolio responses use the same control.

Filter tabs optionally display result counts and an underline appearance. Their filtering and sorting logic
remain in the feature that consumes them.

Shared components receive display data through inputs. Learner record data and
navigation choices belong in the student feature, not in the UI components.

`src/styles/_typography.scss` defines the shared learner text scale: 13px captions,
14px interface text, and 16px reading text and section headings at the default
root size. Use its Sass tokens in learner and shared component styles. Keep
mobile supporting text at the same readable minimum; let content wrap instead
of shrinking it. Chart labels use HTML text so resizing the SVG does not shrink
their font.

Place controls in `src/<component-name>/`, keeping their templates,
styles, and tests together. Export their public APIs from `src/index.ts` and add
a test target when tests are introduced. Page-level showcases belong in a feature
library rather than in shared UI.

Performance charts support line and shaded area presentation, labels above markers,
and missing-value gaps. On narrow screens, the area chart initially shows the
latest weeks and retains its vertical axis while scrolling. Dashboard cards
support compact headings, optional subtitles, and optional icons.
