# Shared layout

Reusable portal layout components, exported through `@school-hub/layout`.

```text
src/
├── footer/    # Footer component and tests
├── header/    # Header component and tests
├── models/    # Sidebar menu interfaces
├── shell/     # Composes the layout around the routed portal content
└── sidebar/   # Configurable portal navigation and tests
```

Keep each component's template and tests beside its TypeScript file. Add a
stylesheet in the same folder when component-specific styles are needed.
Portal-specific menu configuration belongs in the corresponding module library.

The shell's optional `learner` variant provides the compact learner header, blue
sidebar, and encouragement panel. Its styles are scoped to `.learner-shell`.
The `user` input configures the avatar, displayed identity, and profile/settings
destinations. The mobile drawer closes when a link or its close control is used.

Run `pnpm nx test layout` to execute the unit tests.
