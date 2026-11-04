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
- `src/pagination/` provides result counts and page navigation.
- `src/learning-steps/` displays an interactive learning journey.
- `src/dialog-panel/` provides a native modal with focus containment and Escape dismissal.
- `src/summary-stat/` presents a labelled count or metric with its icon and supporting text.
- `src/performance-chart/` plots a labelled series of percentage scores.
- `src/choice-list/` renders native radio choices, including disabled answer review.
- `src/question-navigator/` displays question position, answered state, and review marks.
- `src/calculator/` provides an arithmetic calculator with a restricted expression parser.

Filter tabs optionally display result counts. Their filtering and sorting logic
remain in the feature that consumes them.

Shared components receive display data through inputs. Learner record data and
navigation choices belong in the student feature, not in the UI components.

Place controls in `src/<component-name>/`, keeping their templates,
styles, and tests together. Export their public APIs from `src/index.ts` and add
a test target when tests are introduced. Page-level showcases belong in a feature
library rather than in shared UI.
