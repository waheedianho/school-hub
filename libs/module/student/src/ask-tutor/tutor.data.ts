import { TutorSample } from './tutor.model';
export const SUBJECT_TUTORS = [
  {
    id: 'english-language',
    name: 'Mrs. Funke A.',
    image: '/images/live-classes/tutor-funke.jpg',
    initials: 'FA',
    description: 'English Language',
  },
  {
    id: 'mathematics',
    name: 'Mr. Adewale',
    image: '/images/live-classes/tutor-adewale.jpg',
    initials: 'MA',
    description: 'Mathematics',
  },
  {
    id: 'basic-science',
    name: 'Mrs. Bolanle A.',
    image: '',
    initials: 'BA',
    description: 'Basic Science',
  },
] as const;
function sample(
  id: string,
  subjectId: TutorSample['subjectId'],
  title: string,
  lessonId: string,
  answer: string,
  day: string,
): TutorSample {
  const at = Date.parse(day + 'T10:15:00+01:00');
  return {
    id,
    subjectId,
    title,
    context: { type: 'lesson', id: lessonId },
    messages: [
      { id: id + '-question', role: 'you', text: title, at },
      { id: id + '-answer', role: 'tutor', text: answer, at: at + 60000 },
      {
        id: id + '-thanks',
        role: 'you',
        text: 'Thank you! That makes sense now.',
        at: at + 180000,
      },
    ],
  };
}
export const TUTOR_SAMPLES: readonly TutorSample[] = [
  sample(
    'nouns-help',
    'english-language',
    'Please explain nouns with examples.',
    'nouns',
    'I’ll be happy to explain.\n\nA noun is a naming word. It names a person, place, thing, or idea.\n\nExamples:\n• Person: teacher, learner, doctor\n• Place: Lagos, school, Nigeria\n• Thing: book, pen, chair\n• Idea: honesty, love, hope\n\nIn a sentence, a noun can be the subject or the object.\n\n• The teacher is kind. (teacher = subject)\n• I saw the book on the table. (book = object)',
    '2026-11-03',
  ),
  sample(
    'pronoun-help',
    'english-language',
    'What is a pronoun? Give examples.',
    'parts-of-speech',
    'A pronoun takes the place of a noun so we do not keep repeating the same name.\n\nAmina has a book. She reads it.\n• She replaces Amina.\n• It replaces the book.\n\nOther examples include I, you, he, we, and they.',
    '2026-11-02',
  ),
  sample(
    'adjective-help',
    'english-language',
    'How do I identify adjectives?',
    'parts-of-speech',
    'An adjective describes a noun. Look for a word that tells you more about a person, place, or thing.\n\nIn “the small green bag”, small and green describe the bag.\n\nTry writing a sentence about a tall tree. Which word describes the tree?',
    '2026-11-01',
  ),
  sample(
    'place-value-help',
    'mathematics',
    'How does place value work in 4,268?',
    'whole-numbers',
    'A digit’s position tells us its value.\n\nIn 4,268:\n• 4 represents 4 thousands = 4,000\n• 2 represents 2 hundreds = 200\n• 6 represents 6 tens = 60\n• 8 represents 8 ones = 8\n\nSo 4,268 = 4,000 + 200 + 60 + 8.',
    '2026-11-03',
  ),
  sample(
    'plant-help',
    'basic-science',
    'What do the roots and leaves of a plant do?',
    'plant-parts',
    'Roots hold the plant in the soil and absorb water and minerals. Leaves help the plant make food using light.\n\nThe stem supports the plant and carries water between its parts. Try labelling these parts on a plant drawing.',
    '2026-11-02',
  ),
];
