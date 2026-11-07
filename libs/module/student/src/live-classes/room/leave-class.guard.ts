import { CanDeactivateFn } from '@angular/router';
import type { LiveClassroomComponent } from './room';
export const leaveLiveClassGuard: CanDeactivateFn<LiveClassroomComponent> = (
  component,
) => component.canLeave();
