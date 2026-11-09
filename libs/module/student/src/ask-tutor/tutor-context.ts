import { ParamMap } from '@angular/router';
import {
  LEARNER_SUBJECTS,
  LearnerSubjectId,
} from '../data/subject-catalog.data';
import { ProgressScope } from '../progress/progress.model';
import { TutorContext, TutorContextRef } from './tutor.model';

export function tutorSubject(
  value: string | null | undefined,
): LearnerSubjectId | undefined {
  return LEARNER_SUBJECTS.find((subject) => subject.id === value)?.id;
}
export function resolveTutorContext(
  ref: TutorContextRef | undefined,
  subjectId: LearnerSubjectId,
  source: ProgressScope,
): TutorContext | undefined {
  if (!ref) return undefined;
  const subject = LEARNER_SUBJECTS.find((subject) => subject.id === ref.id);
  if (ref.type === 'subject' && subject)
    return {
      ...ref,
      title: subject.name,
      subjectId: subject.id,
      route: '/student/subjects',
      query: { subjectId: subject.id },
    };
  const lesson = source.lessons.find((item) => item.id === ref.id);
  if (ref.type === 'lesson' && lesson)
    return {
      ...ref,
      title: lesson.title,
      subjectId: lesson.subjectId as LearnerSubjectId,
      route: '/student/lessons',
      query: { lessonId: lesson.id },
    };
  const worksheet = source.worksheets.find((item) => item.id === ref.id);
  if (ref.type === 'worksheet' && worksheet) {
    const question = worksheet.available
      ? worksheet.questions.find((item) => item.id === ref.questionId)
      : undefined;
    return {
      type: ref.type,
      id: worksheet.id,
      ...(question ? { questionId: question.id } : {}),
      title: worksheet.title,
      description: question?.prompt,
      subjectId: worksheet.subjectId as LearnerSubjectId,
      route: worksheet.available
        ? '/student/worksheets/' + worksheet.id
        : '/student/worksheets',
      query: worksheet.available ? undefined : { worksheetId: worksheet.id },
    };
  }
  const portfolio = source.portfolios.find((item) => item.id === ref.id);
  // The portfolio overview also links here without selecting a task.
  if (ref.type === 'portfolio' && !ref.id)
    return {
      type: ref.type,
      title: 'Portfolio tasks',
      subjectId,
      route: '/student/portfolio-tasks',
      query: { subjectId },
    };
  if (ref.type === 'portfolio' && portfolio)
    return {
      ...ref,
      title: portfolio.title,
      subjectId: portfolio.subjectId as LearnerSubjectId,
      route: '/student/portfolio-tasks/' + portfolio.id,
    };
  const assessment = source.assessments.find((item) => item.id === ref.id);
  if (ref.type === 'assessment' && assessment)
    return {
      ...ref,
      title: assessment.title,
      subjectId: assessment.subjectId as LearnerSubjectId,
      route: '/student/assessments',
      query: { assessmentId: assessment.id },
    };
  const feedback = source.feedback.find((item) => item.id === ref.id);
  if (ref.type === 'feedback' && feedback)
    return {
      ...ref,
      title: feedback.title,
      subjectId: feedback.subjectId as LearnerSubjectId,
      route: '/student/feedback',
      query: { feedbackId: feedback.id },
    };
  if (ref.type === 'resource-request')
    return {
      type: ref.type,
      title: 'Resource request',
      subjectId,
      route: '/student/resources',
      query: { subjectId },
    };
  if (ref.type === 'live-class-support')
    return {
      type: ref.type,
      title: 'Live class help',
      subjectId,
      route: '/student/live-classes',
    };
  return undefined;
}
export function contextFromQuery(
  params: ParamMap,
): TutorContextRef | undefined {
  const type = params.get('contextType');
  return type
    ? {
        type,
        id: params.get('contextId') ?? undefined,
        questionId: params.get('questionId') ?? undefined,
      }
    : undefined;
}
export function contextRef(
  context: TutorContext | undefined,
): TutorContextRef | undefined {
  return context
    ? {
        type: context.type,
        ...(context.id ? { id: context.id } : {}),
        ...(context.questionId ? { questionId: context.questionId } : {}),
      }
    : undefined;
}
export function tutorDraftKey(
  subjectId: LearnerSubjectId,
  conversationId: string | undefined,
  context?: TutorContextRef,
): string {
  return conversationId
    ? 'reply:' + conversationId
    : `new:${subjectId}:${context?.type ?? ''}:${context?.id ?? ''}:${context?.questionId ?? ''}`;
}
