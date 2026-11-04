# Shared UI elements

Reserved for reusable UI controls, exported through `@school-hub/ui-elements`.
The generated placeholder and template button gallery have been removed; this
library currently has no components or tests.

Place future controls in `src/<component-name>/`, keeping their templates,
styles, and tests together. Export their public APIs from `src/index.ts` and add
a test target when tests are introduced. Page-level showcases belong in a feature
library rather than in shared UI.
