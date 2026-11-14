import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'student/resources/:resourceId', renderMode: RenderMode.Server },
  { path: 'student/live-classes/:classId', renderMode: RenderMode.Server },
  { path: 'student/portfolio-tasks/:taskId', renderMode: RenderMode.Server },
  {
    path: 'student/worksheets/:worksheetId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'student/assessments/:assessmentId/attempt',
    renderMode: RenderMode.Server,
  },
  {
    path: 'student/assessments/:assessmentId/results/:attemptId',
    renderMode: RenderMode.Server,
  },
  { path: 'teacher/live-classes/:id', renderMode: RenderMode.Server },
  { path: 'teacher/assignments/:id', renderMode: RenderMode.Server },
  { path: 'teacher/reports/:id', renderMode: RenderMode.Server },
  {
    path: 'super-admin/support-centre/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
