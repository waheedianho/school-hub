import {
  LEARNER_SUBJECTS,
  LearnerSubjectId,
} from '../data/subject-catalog.data';
import { LiveClass } from './live-class.model';
import { classLessonMaterials } from './lesson-materials.data';
import {
  ENGLISH_PRACTICE,
  ENGLISH_SLIDES,
  MATH_PRACTICE,
  MATH_SLIDES,
  SCIENCE_PRACTICE,
  SCIENCE_SLIDES,
} from './live-class-content.data';

const tutors = {
  mathematics: ['Mr. Adewale', '/images/live-classes/tutor-adewale.jpg'],
  'english-language': ['Mrs. Funke A.', '/images/live-classes/tutor-funke.jpg'],
  'basic-science': ['Mrs. Bolanle A.', '/images/live-classes/tutor-funke.jpg'],
};
function session(
  id: string,
  subjectId: LearnerSubjectId,
  title: string,
  description: string,
  lessonId: string,
  date: string,
  time: string,
  options: Partial<LiveClass> = {},
): LiveClass {
  const subject = LEARNER_SUBJECTS.find((item) => item.id === subjectId);
  if (!subject) throw new Error('Missing live class subject');
  return {
    id,
    title,
    description,
    subjectId,
    subject: subject.name,
    lessonId,
    tutor: tutors[subjectId][0],
    tutorImage: tutors[subjectId][1],
    tone:
      subjectId === 'mathematics'
        ? 'blue'
        : subjectId === 'english-language'
          ? 'purple'
          : 'green',
    icon:
      subjectId === 'mathematics'
        ? 'ri-square-root'
        : subjectId === 'english-language'
          ? 'ri-book-open-line'
          : 'ri-flask-line',
    startsAt: `${date}T${time}:00+01:00`,
    endsAt: `${date}T${String(Number(time.slice(0, 2)) + 1).padStart(2, '0')}${time.slice(2)}:00+01:00`,
    code: 'SH-' + id.toUpperCase().replace(/-LIVE$/, ''),
    capacity: 50,
    enrolled: 28,
    accessible: true,
    attended: false,
    objectives:
      subjectId === 'english-language'
        ? [
            'Define subject and predicate.',
            'Identify the subject in a sentence.',
            'Identify the predicate in a sentence.',
            'Use complete sentences of your own.',
          ]
        : subjectId === 'mathematics'
          ? [
              'Choose the correct operation for a problem.',
              'Align digits by place value.',
              'Show your working clearly.',
              'Check answers with an inverse operation.',
            ]
          : [
              'Identify living and non-living things.',
              'Describe familiar life processes.',
              'Explain the role of plant parts.',
              'Use examples to support your answers.',
            ],
    vocabulary:
      subjectId === 'english-language'
        ? [
            { word: 'Subject', meaning: 'Who or what a sentence is about.' },
            {
              word: 'Predicate',
              meaning: 'What the subject does or what is said about it.',
            },
            {
              word: 'Sentence',
              meaning: 'Words that express a complete thought.',
            },
            {
              word: 'Noun',
              meaning: 'A word that names a person, place, thing, or idea.',
            },
            {
              word: 'Verb',
              meaning: 'A word that expresses an action or state.',
            },
          ]
        : subjectId === 'mathematics'
          ? [
              { word: 'Sum', meaning: 'The result of addition.' },
              { word: 'Difference', meaning: 'The result of subtraction.' },
              { word: 'Product', meaning: 'The result of multiplication.' },
              { word: 'Quotient', meaning: 'The result of division.' },
            ]
          : [
              { word: 'Living', meaning: 'Able to carry out life processes.' },
              {
                word: 'Non-living',
                meaning: 'Not able to carry out life processes.',
              },
              {
                word: 'Roots',
                meaning: 'Plant parts that take in water from the soil.',
              },
              {
                word: 'Nutrients',
                meaning: 'Materials needed for growth and life.',
              },
            ],
    slides:
      subjectId === 'english-language'
        ? ENGLISH_SLIDES
        : subjectId === 'mathematics'
          ? MATH_SLIDES
          : SCIENCE_SLIDES,
    practice:
      subjectId === 'english-language'
        ? ENGLISH_PRACTICE
        : subjectId === 'mathematics'
          ? MATH_PRACTICE
          : SCIENCE_PRACTICE,
    ...classLessonMaterials(lessonId),
    ...options,
  };
}
export const LIVE_CLASSES: readonly LiveClass[] = [
  session(
    'subject-predicate-live',
    'english-language',
    'English Language: Subject & Predicate',
    'Understanding the parts of a sentence',
    'simple-sentences',
    '2026-11-05',
    '15:00',
    { code: 'SH-ENGLISH-0511', enrolled: 24 },
  ),
  session(
    'whole-numbers-live',
    'mathematics',
    'Mathematics: Whole Numbers – Operations',
    'Addition, subtraction, multiplication and division',
    'whole-numbers',
    '2026-11-05',
    '16:00',
    {
      code: 'SH-WHOLE-0511',
      enrolled: 5,
      worksheetId: 'whole-numbers-worksheet',
      portfolioId: 'market-price-comparison',
    },
  ),
  session(
    'study-hour-live',
    'mathematics',
    'Study Hour: Questions & Revision',
    'Bring your questions about whole numbers and operations',
    'whole-numbers',
    '2026-11-05',
    '18:00',
    { code: 'SH-STUDY-0511', enrolled: 12 },
  ),
  session(
    'living-things-live',
    'basic-science',
    'Basic Science: Living and Non-living Things',
    'Characteristics and everyday examples',
    'living-things',
    '2026-11-06',
    '16:00',
    { enrolled: 18, worksheetId: 'living-things-worksheet' },
  ),
  session(
    'parts-of-speech-live',
    'english-language',
    'English Language: Parts of Speech',
    'How words work together in a sentence',
    'parts-of-speech',
    '2026-11-09',
    '16:00',
    { enrolled: 22, worksheetId: 'parts-of-speech-worksheet' },
  ),
  session(
    'plant-parts-live',
    'basic-science',
    'Basic Science: Parts of a Plant',
    'Explore roots, stems, leaves, and their functions',
    'plant-parts',
    '2026-11-10',
    '16:00',
    { enrolled: 16 },
  ),
  session(
    'rounding-numbers-live',
    'mathematics',
    'Mathematics: Rounding Numbers',
    'Estimate and check everyday quantities',
    'rounding-numbers',
    '2026-11-11',
    '16:00',
    { enrolled: 50 },
  ),
  session(
    'reading-whole-numbers-live',
    'mathematics',
    'Mathematics: Reading Large Numbers',
    'Read and compare numbers using place value',
    'reading-whole-numbers',
    '2026-11-12',
    '16:00',
    { accessible: false, enrolled: 20 },
  ),
  session(
    'addition-facts-recap',
    'mathematics',
    'Mathematics: Addition & Subtraction',
    'Review addition, subtraction, and checking your working',
    'addition-facts',
    '2026-11-03',
    '16:00',
    { attended: true, worksheetId: 'addition-facts-worksheet' },
  ),
  session(
    'sentences-recap',
    'english-language',
    'English Language: Complete Sentences',
    'Subjects, predicates, and writing complete thoughts',
    'simple-sentences',
    '2026-11-02',
    '15:00',
    { attended: true },
  ),
  session(
    'plant-parts-recap',
    'basic-science',
    'Basic Science: Plants Around Us',
    'Roots, stems, leaves, and what plants need',
    'plant-parts',
    '2026-11-01',
    '16:00',
    { attended: true },
  ),
  session(
    'number-patterns-recap',
    'mathematics',
    'Mathematics: Number Patterns',
    'Recognise and describe number patterns',
    'number-patterns',
    '2026-10-30',
    '16:00',
    { attended: false, worksheetId: 'number-patterns-worksheet' },
  ),
];
export const CLASS_RULES = [
  { icon: 'ri-time-line', text: 'Be on time and prepared.' },
  { icon: 'ri-mic-off-line', text: 'Mute your mic when not speaking.' },
  { icon: 'ri-hand', text: 'Raise your hand to speak.' },
  { icon: 'ri-heart-line', text: 'Be respectful to everyone.' },
  { icon: 'ri-user-voice-line', text: 'Stay on topic and participate.' },
];
export const SAMPLE_CLASS_PEOPLE = [
  { id: 'maryam', name: 'Maryam B.', initials: 'MB', tone: 'teal' as const },
  { id: 'chinedu', name: 'Chinedu O.', initials: 'CO', tone: 'blue' as const },
  { id: 'zainab', name: 'Zainab I.', initials: 'ZI', tone: 'orange' as const },
  { id: 'tunde', name: 'Tunde A.', initials: 'TA', tone: 'purple' as const },
];
