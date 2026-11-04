import { SubjectIcon, UiTone } from '@school-hub/ui-elements';

export type LearnerSubjectId =
  | 'mathematics'
  | 'english-language'
  | 'basic-science';

export interface LearnerSubject {
  id: LearnerSubjectId;
  name: string;
  description: string;
  icon: SubjectIcon;
  tone: UiTone;
  lessonTone: UiTone;
  symbol: string;
}

/** Sample enrolled subjects shared by the learner pages. */
export const LEARNER_SUBJECTS: readonly LearnerSubject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description:
      'Build confidence with numbers, patterns, and everyday problem solving.',
    icon: 'mathematics',
    tone: 'purple',
    lessonTone: 'blue',
    symbol: '123',
  },
  {
    id: 'english-language',
    name: 'English Language',
    description:
      'Develop your reading, writing, and communication skills, one lesson at a time.',
    icon: 'english',
    tone: 'green',
    lessonTone: 'green',
    symbol: 'Aa',
  },
  {
    id: 'basic-science',
    name: 'Basic Science',
    description:
      'Explore living things, your environment, and the science of the world around you.',
    icon: 'science',
    tone: 'blue',
    lessonTone: 'orange',
    symbol: '',
  },
];
