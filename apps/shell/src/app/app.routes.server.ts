import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'student/assessments/:assessmentId/attempt',
    renderMode: RenderMode.Server,
  },
  {
    path: 'student/assessments/:assessmentId/results/:attemptId',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
